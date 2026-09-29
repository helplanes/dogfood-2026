import { and, asc, desc, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "@/server/db";
import { auditLog, comparisons, events, judgeTracks, projects, rubricWeights, scores, sessions, teamInvites, teamMembers, teams, tracks, users } from "@/repo/schema";
import type { PublicProject } from "@/contracts";
import { rankProjects } from "@/domain/normalize";
import { fitBradleyTerry } from "@/domain/bradleyTerry";

export async function getPublicProjects(filter?: { q?: string; track?: string }): Promise<PublicProject[]> {
  const conds = [eq(projects.status, "submitted")];
  if (filter?.track) conds.push(eq(projects.track, filter.track));
  if (filter?.q) {
    const like = `%${filter.q}%`;
    conds.push(or(ilike(projects.title, like), ilike(projects.summary, like))!);
  }
  const rows = await db
    .select({
      id: projects.id, title: projects.title, summary: projects.summary,
      repoUrl: projects.repoUrl, track: projects.track, teamName: teams.name,
    })
    .from(projects)
    .leftJoin(teams, eq(teams.id, projects.teamId))
    .where(and(...conds))
    .orderBy(asc(projects.submittedAt), asc(projects.id));
  return rows;
}

export async function getPublicProject(id: string): Promise<PublicProject | null> {
  const [row] = await db
    .select({
      id: projects.id, title: projects.title, summary: projects.summary,
      repoUrl: projects.repoUrl, track: projects.track, teamName: teams.name,
    })
    .from(projects)
    .leftJoin(teams, eq(teams.id, projects.teamId))
    .where(and(eq(projects.id, id), eq(projects.status, "submitted")));
  return row ?? null;
}

// A judge may score a project only in a track they are eligible for, and never their own team's.
export async function canJudgeScore(judgeId: string, projectId: string): Promise<boolean> {
  const res = await db.execute(sql`
    select 1 from projects p
    join judge_tracks jt on jt.track_id = p.track and jt.judge_id = ${judgeId}
    join users u on u.id = ${judgeId}
    where p.id = ${projectId} and p.status = 'submitted'
      and not exists (select 1 from team_members tm where tm.team_id = p.team_id and tm.email = u.email)
  `);
  return res.rows.length > 0;
}

export async function upsertScore(judgeId: string, projectId: string, criterion: string, value: number, comment = "") {
  await db
    .insert(scores)
    .values({ judgeId, projectId, criterion, value, comment })
    .onConflictDoUpdate({ target: [scores.judgeId, scores.projectId, scores.criterion], set: { value, comment } });
}

// Organizer progress: reviews per project and per judge.
export async function getProgress() {
  const perProject = await db.execute(sql`
    select p.id, p.title, count(distinct s.judge_id)::int as reviews
    from projects p left join scores s on s.project_id = p.id
    where p.status = 'submitted' group by p.id, p.title order by reviews, p.id`);
  return perProject.rows;
}

// Own scores only: the query is keyed by the authenticated judge, never a request parameter.
export async function getScoresForJudge(judgeId: string) {
  return db
    .select({ projectId: scores.projectId, criterion: scores.criterion, value: scores.value, comment: scores.comment })
    .from(scores)
    .where(eq(scores.judgeId, judgeId))
    .orderBy(asc(scores.projectId), asc(scores.criterion));
}

// DB clock is the authority for the deadline.
export async function isSubmissionOpen(eventId: string): Promise<boolean | null> {
  const [row] = await db
    .select({ open: sql<boolean>`now() < ${events.submissionDeadline}` })
    .from(events)
    .where(eq(events.id, eventId));
  return row ? row.open : null;
}

// The "current" event for flows that don't name one explicitly (submit, dashboard). Prefers
// whichever event is still open (soonest deadline first, so the nearest live event wins if an
// organizer runs several concurrently); if none are open, falls back to the most recently
// created event so demo/setup still has a sensible target.
export async function getEventId(): Promise<string | null> {
  const [open] = await db
    .select({ id: events.id })
    .from(events)
    .where(sql`now() < ${events.submissionDeadline}`)
    .orderBy(asc(events.submissionDeadline))
    .limit(1);
  if (open) return open.id;

  const [recent] = await db.select({ id: events.id }).from(events).orderBy(desc(events.createdAt)).limit(1);
  return recent?.id ?? null;
}

// Per (judge, project) score is the organizer-configured weighted mean across criteria, not a
// flat average — this is what makes the rubric weights (src/repo: getRubricWeights) actually
// affect rankings, per the T2 spec item "a scoring rubric the organizer can weight."
export async function getLeaderboard() {
  const weights = await getRubricWeights();
  const rawRows = await db
    .select({ judgeId: scores.judgeId, projectId: scores.projectId, criterion: scores.criterion, value: scores.value })
    .from(scores);

  const byPair = new Map<string, { judgeId: string; projectId: string; weightedSum: number; weightTotal: number }>();
  for (const r of rawRows) {
    const key = `${r.judgeId}::${r.projectId}`;
    const w = weights[r.criterion] ?? 1;
    const entry = byPair.get(key) ?? { judgeId: r.judgeId, projectId: r.projectId, weightedSum: 0, weightTotal: 0 };
    entry.weightedSum += r.value * w;
    entry.weightTotal += w;
    byPair.set(key, entry);
  }
  const rows = [...byPair.values()].map((e) => ({ judgeId: e.judgeId, projectId: e.projectId, value: e.weightTotal ? e.weightedSum / e.weightTotal : 0 }));
  const ranked = rankProjects(rows);

  // A raw z-score ("-1.2", "2.5") is correct but not legible to an organizer skimming a table.
  // Rescale it back onto the event's own 1-5 distribution (population mean + z * population
  // std), clamped to the scale's bounds. This is a presentation-only, monotonic transform: it
  // changes nothing about the ranking, only how the same ranking reads to a human. Both the raw
  // z-score and the rescaled score are exposed; nothing is hidden.
  const allValues = rows.map((r) => r.value);
  const popMean = allValues.length ? allValues.reduce((a, b) => a + b, 0) / allValues.length : 3;
  const popVariance = allValues.length ? allValues.reduce((a, b) => a + (b - popMean) ** 2, 0) / allValues.length : 0;
  const popStd = Math.sqrt(popVariance);
  const rescale = (z: number) => Math.max(1, Math.min(5, popMean + z * popStd));

  const projs = await db
    .select({ id: projects.id, title: projects.title, track: projects.track, duplicateOf: projects.duplicateOf })
    .from(projects);
  const byId = new Map(projs.map((p) => [p.id, p]));
  return ranked.map((r, i) => ({
    rank: i + 1,
    id: r.projectId,
    title: byId.get(r.projectId)?.title ?? "",
    track: byId.get(r.projectId)?.track ?? null,
    duplicateOf: byId.get(r.projectId)?.duplicateOf ?? null,
    n_reviews: r.nReviews,
    rawScore: r.rawMean,
    normalizedScore: r.normalized,
    rescaledScore: rescale(r.normalized),
    hasVarianceWarning: r.hasVarianceWarning,
  }));
}

export { users };

// Creates a draft for the participant's team. Returns null if they are not on a team.
export async function createDraftProject(userId: string, input: { eventId: string; title: string; summary: string; repoUrl: string | null; track: string | null }) {
  const res = await db.execute(sql`
    select tm.team_id from team_members tm join users u on u.email = tm.email
    where u.id = ${userId} limit 1`);
  const teamId = (res.rows[0] as { team_id?: string } | undefined)?.team_id;
  if (!teamId) return null;
  const id = `prj_${crypto.randomUUID().slice(0, 8)}`;
  await db.insert(projects).values({ id, teamId, status: "draft", ...input });
  return id;
}

export interface AssignedProject {
  id: string;
  title: string;
  summary: string;
  repoUrl: string | null;
  track: string | null;
  teamName: string | null;
  existingScores: Partial<Record<"functionality" | "quality" | "innovation", number>>;
}

// Assignment-scoped: only projects in the judge's eligible tracks, excluding their own team.
export async function getAssignedProjects(judgeId: string): Promise<AssignedProject[]> {
  const res = await db.execute(sql`
    select p.id, p.title, p.summary, p.repo_url as "repoUrl", p.track, t.name as "teamName"
    from projects p
    join judge_tracks jt on jt.track_id = p.track and jt.judge_id = ${judgeId}
    join users u on u.id = ${judgeId}
    left join teams t on t.id = p.team_id
    where p.status = 'submitted'
      and not exists (select 1 from team_members tm where tm.team_id = p.team_id and tm.email = u.email)
    order by p.id
  `);
  const rows = res.rows as unknown as Omit<AssignedProject, "existingScores">[];
  const scoreRows = await db
    .select({ projectId: scores.projectId, criterion: scores.criterion, value: scores.value })
    .from(scores)
    .where(eq(scores.judgeId, judgeId));
  const byProject = new Map<string, AssignedProject["existingScores"]>();
  for (const s of scoreRows) {
    const m = byProject.get(s.projectId) ?? {};
    m[s.criterion as "functionality" | "quality" | "innovation"] = s.value;
    byProject.set(s.projectId, m);
  }
  return rows.map((r) => ({ ...r, existingScores: byProject.get(r.id) ?? {} }));
}

export async function getAssignedProject(judgeId: string, projectId: string): Promise<AssignedProject | null> {
  const all = await getAssignedProjects(judgeId);
  return all.find((p) => p.id === projectId) ?? null;
}

export interface JudgeLoad {
  id: string;
  name: string;
  tracks: string[];
  assigned: number;
  scored: number;
}

export async function getJudgeLoads(): Promise<JudgeLoad[]> {
  const res = await db.execute(sql`
    select u.id, u.name,
      coalesce(array_agg(distinct trk.name) filter (where trk.name is not null), '{}') as tracks,
      (select count(*) from projects p where p.track in (select track_id from judge_tracks where judge_id = u.id) and p.status = 'submitted')::int as assigned,
      (select count(distinct s.project_id) from scores s where s.judge_id = u.id)::int as scored
    from users u
    left join judge_tracks jt on jt.judge_id = u.id
    left join tracks trk on trk.id = jt.track_id
    where u.role = 'judge'
    group by u.id, u.name
    order by u.name
  `);
  return res.rows as unknown as JudgeLoad[];
}

// ── Auth ──────────────────────────────────────────────────────────────────

export async function findUserByEmail(email: string) {
  const [row] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return row ?? null;
}

export async function createParticipant(input: { email: string; name: string; passwordHash: string }) {
  const id = `usr_${crypto.randomUUID().slice(0, 12)}`;
  await db.insert(users).values({ id, email: input.email, name: input.name, role: "participant", passwordHash: input.passwordHash });
  return id;
}

export async function createSession(userId: string, ttlDays = 30) {
  const token = crypto.randomUUID().replace(/-/g, "");
  const expiresAt = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000);
  await db.insert(sessions).values({ token, userId, expiresAt });
  return { token, expiresAt };
}

export async function deleteSession(token: string) {
  await db.delete(sessions).where(eq(sessions.token, token));
}

// ── Teams ─────────────────────────────────────────────────────────────────

// A user's team membership is keyed by email (fixture members are emails; see schema.ts).
export async function getMyTeam(userId: string) {
  const res = await db.execute(sql`
    select t.id, t.name from teams t
    join team_members tm on tm.team_id = t.id
    join users u on u.email = tm.email
    where u.id = ${userId} limit 1
  `);
  return (res.rows[0] as { id: string; name: string } | undefined) ?? null;
}

export async function createTeam(
  userId: string,
  input: { eventId: string; name: string },
): Promise<{ error: string } | { id: string; name: string; inviteCode: string }> {
  const existing = await getMyTeam(userId);
  if (existing) return { error: "already on a team" };

  const [user] = await db.select({ email: users.email }).from(users).where(eq(users.id, userId));
  if (!user) return { error: "user not found" };

  const id = `tm_${crypto.randomUUID().slice(0, 8)}`;
  await db.insert(teams).values({ id, eventId: input.eventId, name: input.name });
  await db.insert(teamMembers).values({ teamId: id, email: user.email });

  const token = crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  await db.insert(teamInvites).values({ token, teamId: id });

  return { id, name: input.name, inviteCode: token };
}

export async function getTeamInvite(teamId: string) {
  const [row] = await db.select({ token: teamInvites.token }).from(teamInvites).where(eq(teamInvites.teamId, teamId)).limit(1);
  return row?.token ?? null;
}

export async function joinTeamByInvite(
  userId: string,
  code: string,
): Promise<{ error: string } | { id: string; name: string }> {
  const existing = await getMyTeam(userId);
  if (existing) return { error: "already on a team" };

  const [invite] = await db.select().from(teamInvites).where(eq(teamInvites.token, code)).limit(1);
  if (!invite) return { error: "invalid invite code" };

  const [user] = await db.select({ email: users.email }).from(users).where(eq(users.id, userId));
  if (!user) return { error: "user not found" };

  await db.insert(teamMembers).values({ teamId: invite.teamId, email: user.email }).onConflictDoNothing();
  const [team] = await db.select({ id: teams.id, name: teams.name }).from(teams).where(eq(teams.id, invite.teamId));
  return team ?? { error: "team not found" };
}

export async function getTeamMembers(teamId: string) {
  return db.select({ email: teamMembers.email }).from(teamMembers).where(eq(teamMembers.teamId, teamId));
}

// ── Audit log (append-only: no update/delete helpers on purpose) ───────────

export async function recordAudit(actorId: string | null, action: string, entity: string, detail = "") {
  await db.insert(auditLog).values({ actorId, action, entity, detail });
}

export async function listAuditLog(limit = 100) {
  return db.select().from(auditLog).orderBy(sql`${auditLog.id} desc`).limit(limit);
}

// ── Rubric weights ───────────────────────────────────────────────────────

const DEFAULT_WEIGHTS: Record<string, number> = { functionality: 40, quality: 30, innovation: 30 };

export async function getRubricWeights(): Promise<Record<string, number>> {
  const rows = await db.select().from(rubricWeights);
  if (rows.length === 0) return { ...DEFAULT_WEIGHTS };
  const out: Record<string, number> = {};
  for (const r of rows) out[r.criterion] = r.weight;
  return out;
}

export async function setRubricWeights(weights: Record<string, number>) {
  await db.transaction(async (tx) => {
    for (const [criterion, weight] of Object.entries(weights)) {
      await tx
        .insert(rubricWeights)
        .values({ criterion, weight })
        .onConflictDoUpdate({ target: rubricWeights.criterion, set: { weight, updatedAt: new Date() } });
    }
  });
}

// ── Events & tracks (organizer) ─────────────────────────────────────────

export async function listEvents() {
  return db.select().from(events).orderBy(events.createdAt);
}

export async function createEvent(input: { name: string; submissionDeadline: Date; prizes: string }) {
  const id = `evt_${crypto.randomUUID().slice(0, 8)}`;
  await db.insert(events).values({ id, ...input });
  return id;
}

export async function updateEvent(id: string, patch: Partial<{ name: string; submissionDeadline: Date; prizes: string }>) {
  await db.update(events).set(patch).where(eq(events.id, id));
}

export async function listTracks(eventId?: string) {
  return eventId
    ? db.select().from(tracks).where(eq(tracks.eventId, eventId))
    : db.select().from(tracks);
}

export async function createTrack(eventId: string, name: string) {
  const id = `trk_${crypto.randomUUID().slice(0, 8)}`;
  await db.insert(tracks).values({ id, eventId, name });
  return id;
}

export async function deleteTrack(id: string) {
  await db.delete(judgeTracks).where(eq(judgeTracks.trackId, id));
  await db.delete(tracks).where(eq(tracks.id, id));
}

// ── Judge assignment (organizer) ────────────────────────────────────────

export async function assignJudgeToTrack(judgeId: string, trackId: string) {
  await db.insert(judgeTracks).values({ judgeId, trackId }).onConflictDoNothing();
}

export async function unassignJudgeFromTrack(judgeId: string, trackId: string) {
  await db.delete(judgeTracks).where(and(eq(judgeTracks.judgeId, judgeId), eq(judgeTracks.trackId, trackId)));
}

// ── Draft editing (participant) ─────────────────────────────────────────

export interface OwnedProject {
  id: string;
  title: string;
  summary: string;
  repoUrl: string | null;
  track: string | null;
  status: string;
}

// Every project belonging to the caller's team (draft and submitted).
export async function getMyProjects(userId: string): Promise<OwnedProject[]> {
  const team = await getMyTeam(userId);
  if (!team) return [];
  return db
    .select({ id: projects.id, title: projects.title, summary: projects.summary, repoUrl: projects.repoUrl, track: projects.track, status: projects.status })
    .from(projects)
    .where(eq(projects.teamId, team.id))
    .orderBy(projects.createdAt);
}

export async function getOwnedProject(userId: string, projectId: string): Promise<OwnedProject | null> {
  const team = await getMyTeam(userId);
  if (!team) return null;
  const [row] = await db
    .select({ id: projects.id, title: projects.title, summary: projects.summary, repoUrl: projects.repoUrl, track: projects.track, status: projects.status })
    .from(projects)
    .where(and(eq(projects.id, projectId), eq(projects.teamId, team.id)));
  return row ?? null;
}

// Editable at any time before the deadline, draft or already submitted (the spec calls for
// "edit it until the deadline", not "edit only while draft").
export async function updateOwnedProject(
  userId: string,
  projectId: string,
  patch: { title?: string; summary?: string; repoUrl?: string | null; track?: string | null },
): Promise<{ error: string } | { ok: true }> {
  const project = await getOwnedProject(userId, projectId);
  if (!project) return { error: "not found" };

  const open = await isSubmissionOpen((await db.select({ eventId: projects.eventId }).from(projects).where(eq(projects.id, projectId)))[0]?.eventId ?? "");
  if (!open) return { error: "submissions are closed for this event" };

  await db.update(projects).set(patch).where(eq(projects.id, projectId));
  return { ok: true };
}

export async function submitDraftProject(userId: string, projectId: string): Promise<{ error: string } | { ok: true }> {
  const project = await getOwnedProject(userId, projectId);
  if (!project) return { error: "not found" };
  if (project.status === "submitted") return { error: "already submitted" };

  const eventId = (await db.select({ eventId: projects.eventId }).from(projects).where(eq(projects.id, projectId)))[0]?.eventId ?? "";
  const open = await isSubmissionOpen(eventId);
  if (!open) return { error: "submissions are closed for this event" };

  await db.update(projects).set({ status: "submitted", submittedAt: new Date() }).where(eq(projects.id, projectId));
  return { ok: true };
}

// ── Pairwise judging (bonus mode) ───────────────────────────────────────

function canonicalPair(a: string, b: string): [string, string] {
  return a < b ? [a, b] : [b, a];
}

// A random unseen pair from the judge's eligible, submitted, non-own-team projects. Track-scoped
// so a judge only ever compares projects they're already allowed to see (same isolation rule as
// scoring). Returns null once the judge has compared every pair available to them.
export async function getNextPairwiseMatchup(judgeId: string): Promise<{ a: OwnedProject; b: OwnedProject } | null> {
  const res = await db.execute(sql`
    select p.id, p.title, p.summary, p.repo_url as "repoUrl", p.track, p.status
    from projects p
    join judge_tracks jt on jt.track_id = p.track and jt.judge_id = ${judgeId}
    join users u on u.id = ${judgeId}
    where p.status = 'submitted'
      and not exists (select 1 from team_members tm where tm.team_id = p.team_id and tm.email = u.email)
    order by p.id
  `);
  const eligible = res.rows as unknown as OwnedProject[];
  if (eligible.length < 2) return null;

  const seen = await db
    .select({ low: comparisons.projectLow, high: comparisons.projectHigh })
    .from(comparisons)
    .where(eq(comparisons.judgeId, judgeId));
  const seenPairs = new Set(seen.map((s) => `${s.low}::${s.high}`));

  const candidates: [OwnedProject, OwnedProject][] = [];
  for (let i = 0; i < eligible.length; i++) {
    for (let j = i + 1; j < eligible.length; j++) {
      const p1 = eligible[i]!;
      const p2 = eligible[j]!;
      const [low, high] = canonicalPair(p1.id, p2.id);
      if (!seenPairs.has(`${low}::${high}`)) candidates.push([p1, p2]);
    }
  }
  if (candidates.length === 0) return null;

  const pick = candidates[Math.floor(Math.random() * candidates.length)]!;
  return { a: pick[0], b: pick[1] };
}

export async function recordPairwiseVote(
  judgeId: string,
  projectAId: string,
  projectBId: string,
  winnerId: string,
): Promise<{ error: string } | { ok: true }> {
  if (winnerId !== projectAId && winnerId !== projectBId) return { error: "winner must be one of the two compared projects" };
  if (!(await canJudgeScore(judgeId, projectAId)) || !(await canJudgeScore(judgeId, projectBId))) {
    return { error: "not eligible to compare one or both of these projects" };
  }
  const [low, high] = canonicalPair(projectAId, projectBId);
  await db.insert(comparisons).values({ judgeId, projectLow: low, projectHigh: high, winnerId }).onConflictDoNothing();
  return { ok: true };
}

// Bonus ranking only — never replaces the required rubric-based leaderboard (see JUDGING.md).
export async function getPairwiseLeaderboard() {
  const rows = await db.select({ winnerId: comparisons.winnerId, projectLow: comparisons.projectLow, projectHigh: comparisons.projectHigh }).from(comparisons);
  const matchups = rows.map((r) => ({
    winnerId: r.winnerId,
    loserId: r.winnerId === r.projectLow ? r.projectHigh : r.projectLow,
  }));
  const ranked = fitBradleyTerry(matchups);

  const projs = await db.select({ id: projects.id, title: projects.title, track: projects.track }).from(projects);
  const byId = new Map(projs.map((p) => [p.id, p]));
  return ranked.map((r, i) => ({
    rank: i + 1,
    id: r.projectId,
    title: byId.get(r.projectId)?.title ?? "",
    track: byId.get(r.projectId)?.track ?? null,
    strength: r.strength,
    wins: r.wins,
    losses: r.losses,
    comparisons: r.comparisons,
  }));
}
