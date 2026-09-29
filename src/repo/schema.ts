// Drizzle schema foundation. Krish owns; DATA-MODEL.md documents it. Forward-only migrations in db/migrations.
import { pgTable, text, timestamp, integer, uniqueIndex } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  // Mapped from fixture event.submissions_close. DB clock is the authority for the deadline check.
  submissionDeadline: timestamp("submission_deadline", { withTimezone: true }).notNull(),
  prizes: text("prizes").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: text("role").notNull().default("participant"),
  passwordHash: text("password_hash"),
});

export const sessions = pgTable("sessions", {
  token: text("token").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
});

export const tracks = pgTable("tracks", {
  id: text("id").primaryKey(),
  eventId: text("event_id").notNull().references(() => events.id),
  name: text("name").notNull(),
});

// Judge eligibility by track (fixture judges[].tracks).
export const judgeTracks = pgTable(
  "judge_tracks",
  {
    judgeId: text("judge_id").notNull().references(() => users.id),
    trackId: text("track_id").notNull().references(() => tracks.id),
  },
  (t) => [uniqueIndex("judge_tracks_pk").on(t.judgeId, t.trackId)],
);

export const teams = pgTable("teams", {
  id: text("id").primaryKey(),
  eventId: text("event_id").notNull().references(() => events.id),
  name: text("name").notNull(),
});

// Fixture members are emails; a user row may not exist for every member.
export const teamMembers = pgTable(
  "team_members",
  {
    teamId: text("team_id").notNull().references(() => teams.id),
    email: text("email").notNull(),
  },
  (t) => [uniqueIndex("team_members_pk").on(t.teamId, t.email)],
);

export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  eventId: text("event_id").notNull().references(() => events.id),
  teamId: text("team_id").references(() => teams.id),
  submittedAt: timestamp("submitted_at", { withTimezone: true }),
  // Set (never delete) when normalized title or repo_url matches an earlier project; organizer reviews.
  duplicateOf: text("duplicate_of"),
  title: text("title").notNull(),
  summary: text("summary").notNull().default(""),
  repoUrl: text("repo_url"),
  track: text("track"),
  status: text("status").notNull().default("draft"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// A single-use-forever link per team; regenerable. `/team/join?code=<token>` is the invite link.
export const teamInvites = pgTable("team_invites", {
  token: text("token").primaryKey(),
  teamId: text("team_id").notNull().references(() => teams.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const scores = pgTable(
  "scores",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    judgeId: text("judge_id").notNull().references(() => users.id),
    projectId: text("project_id").notNull().references(() => projects.id),
    criterion: text("criterion").notNull(),
    value: integer("value").notNull(),
    comment: text("comment").notNull().default(""),
  },
  (t) => [uniqueIndex("scores_judge_project_criterion").on(t.judgeId, t.projectId, t.criterion)],
);

// Organizer-configurable rubric weights (T2: "a scoring rubric the organizer can weight").
// One row per criterion; missing rows default to equal weight in code (see repo/queries.ts).
export const rubricWeights = pgTable("rubric_weights", {
  criterion: text("criterion").primaryKey(),
  weight: integer("weight").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// Append-only: rows are written by the app, never updated or deleted (organizer/audit page,
// bonus "Threat Model" territory — a tamper-evident record of who did what).
export const auditLog = pgTable("audit_log", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  actorId: text("actor_id"),
  action: text("action").notNull(),
  entity: text("entity").notNull(),
  detail: text("detail").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Pairwise votes for the bonus "Pairwise" judging mode (spec: Bradley-Terry-style ranking, a
// documented bonus, never a replacement for the required rubric score). One vote per (judge,
// unordered project pair) — projectLow/projectHigh are stored in a canonical id order so the
// unique index catches a duplicate vote regardless of which project was shown first.
export const comparisons = pgTable(
  "comparisons",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    judgeId: text("judge_id").notNull().references(() => users.id),
    projectLow: text("project_low").notNull(),
    projectHigh: text("project_high").notNull(),
    winnerId: text("winner_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("comparisons_judge_pair").on(t.judgeId, t.projectLow, t.projectHigh)],
);
