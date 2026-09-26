// Drizzle schema foundation. Krish owns; DATA-MODEL.md documents it. Forward-only migrations in db/migrations.
import { pgTable, text, timestamp, integer, uniqueIndex } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  // Mapped from fixture event.submissions_close. DB clock is the authority for the deadline check.
  submissionDeadline: timestamp("submission_deadline", { withTimezone: true }).notNull(),
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
