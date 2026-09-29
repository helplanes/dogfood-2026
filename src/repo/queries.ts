import { and, asc, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "@/server/db";
import { events, projects, scores, sessions, teamInvites, teamMembers, teams, users } from "@/repo/schema";
import type { PublicProject } from "@/contracts";
import { rankProjects } from "@/domain/normalize";

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

export async function getEventId(): Promise<string | null> {
  const [row] = await db.select({ id: events.id }).from(events).orderBy(asc(events.id)).limit(1);
  return row?.id ?? null;
}

export async function getLeaderboard() {
  const rows = await db
    .select({ judgeId: scores.judgeId, projectId: scores.projectId, mean: sql<number>`avg(${scores.value})::float` })
    .from(scores)
    .groupBy(scores.judgeId, scores.projectId);
  const ranked = rankProjects(rows.map((r) => ({ judgeId: r.judgeId, projectId: r.projectId, value: r.mean })));
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
