import { and, asc, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "@/server/db";
import { events, projects, scores, teams, users } from "@/repo/schema";
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
