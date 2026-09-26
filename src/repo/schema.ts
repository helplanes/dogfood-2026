// Drizzle schema foundation. Krish owns; DATA-MODEL.md documents it. Forward-only migrations in db/migrations.
import { pgTable, text, timestamp, integer, real, uniqueIndex } from "drizzle-orm/pg-core";

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

export const projects = pgTable("projects", {
  id: text("id").primaryKey(),
  eventId: text("event_id").notNull().references(() => events.id),
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
    criterionId: text("criterion_id").notNull(),
    value: real("value").notNull(),
  },
  (t) => [uniqueIndex("scores_judge_project_criterion").on(t.judgeId, t.projectId, t.criterionId)],
);
