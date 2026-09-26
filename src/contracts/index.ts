// Shared API contract (v0). Only Krish changes this file; request changes in HANDOFF.md.
import { z } from "zod";

export const Role = z.enum(["visitor", "participant", "judge", "organizer", "admin"]);
export type Role = z.infer<typeof Role>;

export const ProjectStatus = z.enum(["draft", "submitted"]);
export type ProjectStatus = z.infer<typeof ProjectStatus>;

export const PublicProject = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  repoUrl: z.string().nullable(),
  track: z.string().nullable(),
  teamName: z.string().nullable(),
});
export type PublicProject = z.infer<typeof PublicProject>;

export const ProjectInput = z.object({
  eventId: z.string(),
  title: z.string().min(1).max(200),
  summary: z.string().max(5000).default(""),
  repoUrl: z.string().url().nullable().default(null),
  track: z.string().nullable().default(null),
});
export type ProjectInput = z.infer<typeof ProjectInput>;

export const LoginInput = z.object({ email: z.string().email(), password: z.string().min(1) });
export type LoginInput = z.infer<typeof LoginInput>;

export const ScoreInput = z.object({
  projectId: z.string(),
  criterionId: z.string(),
  value: z.number().min(0).max(10),
});
export type ScoreInput = z.infer<typeof ScoreInput>;

// Denials are always raw 4xx JSON, never redirects.
export const ApiError = z.object({ error: z.string() });
export type ApiError = z.infer<typeof ApiError>;
