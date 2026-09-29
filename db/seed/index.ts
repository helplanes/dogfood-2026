// Loads fixtures.json (unchanged) into the schema and prints the fixed demo logins. Idempotent.
import { readFileSync } from "node:fs";
import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";
import { Pool } from "pg";
import * as t from "../../src/repo/schema";

interface Fixtures {
  event: { id: string; name: string; submissions_close: string };
  tracks: { id: string; name: string }[];
  judges: { id: string; name: string; email: string; tracks: string[] }[];
  teams: { id: string; name: string; members: string[] }[];
  projects: { id: string; team: string; track: string; title: string; summary: string; repo_url: string; submitted_at: string }[];
  scores: { judge: string; project: string; criteria: Record<string, number>; comment?: string }[];
}

// Demo-only fixed tokens (documented; the checker never logs in). judge_a/judge_b are the two
// busiest fixture judges so both have real scores.
const DEMO = {
  organizer: { token: "org_7f2a", userId: "usr_organizer", email: "organizer@example.org", name: "Demo Organizer", role: "organizer" },
  judge_a: { token: "jdg_a_91bc", userId: "jdg_24" },
  judge_b: { token: "jdg_b_44de", userId: "jdg_26" },
  participant: { token: "prt_2e88", userId: "usr_participant", email: "priya1@example.org", name: "Demo Participant", role: "participant" },
} as const;

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

async function main() {
  const fx: Fixtures = JSON.parse(readFileSync(process.env.FIXTURES_PATH ?? "fixtures.json", "utf8"));
  const pool = new Pool({ connectionString: process.env.DATABASE_URL_ADMIN ?? process.env.DATABASE_URL });
  const db = drizzle(pool);

  await db.transaction(async (tx) => {
    // rubric_weights, audit_log, rate_limits carry no FK to these tables, so an explicit list
    // (not just CASCADE) keeps every reseed fully deterministic rather than leaving stray rows
    // from a previous session's organizer actions or rate-limit counters behind.
    await tx.execute(sql`TRUNCATE scores, comparisons, rubric_weights, audit_log, rate_limits, sessions, projects, team_members, teams, judge_tracks, tracks, users, events, team_invites CASCADE`);
    await tx.insert(t.events).values({ id: fx.event.id, name: fx.event.name, submissionDeadline: new Date(fx.event.submissions_close) });
    await tx.insert(t.tracks).values(fx.tracks.map((x) => ({ id: x.id, eventId: fx.event.id, name: x.name })));
    await tx.insert(t.users).values([
      ...fx.judges.map((j) => ({ id: j.id, email: j.email, name: j.name, role: "judge" })),
      { id: DEMO.organizer.userId, email: DEMO.organizer.email, name: DEMO.organizer.name, role: DEMO.organizer.role },
      { id: DEMO.participant.userId, email: DEMO.participant.email, name: DEMO.participant.name, role: DEMO.participant.role },
    ]);
    await tx.insert(t.judgeTracks).values(fx.judges.flatMap((j) => j.tracks.map((trackId) => ({ judgeId: j.id, trackId }))));
    await tx.insert(t.teams).values(fx.teams.map((x) => ({ id: x.id, eventId: fx.event.id, name: x.name })));
    await tx.insert(t.teamMembers).values(fx.teams.flatMap((x) => x.members.map((email) => ({ teamId: x.id, email }))));

    // Flag (never delete) duplicates by normalized title or repo_url, keeping the earliest fixture row.
    const seenTitle = new Map<string, string>();
    const seenRepo = new Map<string, string>();
    const rows = fx.projects.map((p) => {
      const dup = seenTitle.get(norm(p.title)) ?? seenRepo.get(norm(p.repo_url)) ?? null;
      if (!dup) {
        seenTitle.set(norm(p.title), p.id);
        seenRepo.set(norm(p.repo_url), p.id);
      }
      return {
        id: p.id, eventId: fx.event.id, teamId: p.team, title: p.title, summary: p.summary,
        repoUrl: p.repo_url, track: p.track, status: "submitted", submittedAt: new Date(p.submitted_at), duplicateOf: dup,
      };
    });
    await tx.insert(t.projects).values(rows);

    const scoreRows = fx.scores.flatMap((s) =>
      Object.entries(s.criteria).map(([criterion, value]) => ({
        judgeId: s.judge, projectId: s.project, criterion, value, comment: s.comment ?? "",
      })),
    );
    for (let i = 0; i < scoreRows.length; i += 500) await tx.insert(t.scores).values(scoreRows.slice(i, i + 500));

    await tx.insert(t.sessions).values([
      { token: DEMO.organizer.token, userId: DEMO.organizer.userId },
      { token: DEMO.judge_a.token, userId: DEMO.judge_a.userId },
      { token: DEMO.judge_b.token, userId: DEMO.judge_b.userId },
      { token: DEMO.participant.token, userId: DEMO.participant.userId },
    ]);
  });

  console.log(`seeded ${fx.projects.length} projects, ${fx.judges.length} judges, ${fx.scores.length} score records.`);
  console.log("seeded. test logins:");
  console.log(`  organizer    Cookie: session=${DEMO.organizer.token}`);
  console.log(`  judge_a      Cookie: session=${DEMO.judge_a.token}   (${DEMO.judge_a.userId})`);
  console.log(`  judge_b      Cookie: session=${DEMO.judge_b.token}   (${DEMO.judge_b.userId})`);
  console.log(`  participant  Cookie: session=${DEMO.participant.token}`);
  await pool.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
