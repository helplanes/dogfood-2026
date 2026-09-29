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
  tagline: z.string(),
  thumbnailUrl: z.string().nullable(),
  imageGallery: z.array(z.string()),
  demoVideoUrl: z.string().nullable(),
  liveUrl: z.string().nullable(),
  techTags: z.array(z.string()),
});
export type PublicProject = z.infer<typeof PublicProject>;

// The spec's stable submission field reference: name, tagline, long description, thumbnail,
// image gallery, hosted demo video URL, repository URL, live link, tech tags, plus
// organizer-defined custom questions (customAnswers, validated against the event's question
// list server-side — see updateOwnedProject/createDraftProject in src/repo/queries.ts).
export const ProjectInput = z.object({
  eventId: z.string(),
  title: z.string().min(1).max(200),
  tagline: z.string().max(300).default(""),
  summary: z.string().max(5000).default(""),
  repoUrl: z.string().url().nullable().default(null),
  track: z.string().nullable().default(null),
  thumbnailUrl: z.string().url().nullable().default(null),
  imageGallery: z.array(z.string().url()).max(10).default([]),
  demoVideoUrl: z.string().url().nullable().default(null),
  liveUrl: z.string().url().nullable().default(null),
  techTags: z.array(z.string().max(40)).max(20).default([]),
  customAnswers: z.record(z.string(), z.string()).default({}),
});
export type ProjectInput = z.infer<typeof ProjectInput>;

export const LoginInput = z.object({ email: z.string().email(), password: z.string().min(1) });
export type LoginInput = z.infer<typeof LoginInput>;

export const SignupInput = z.object({
  email: z.string().email(),
  password: z.string().min(8, "at least 8 characters"),
  name: z.string().min(1).max(200),
});
export type SignupInput = z.infer<typeof SignupInput>;

export const TeamInput = z.object({ eventId: z.string(), name: z.string().min(1).max(200) });
export type TeamInput = z.infer<typeof TeamInput>;

export const JoinTeamInput = z.object({ code: z.string().min(1) });
export type JoinTeamInput = z.infer<typeof JoinTeamInput>;

// Official fixtures: 3 criteria (functionality, quality, innovation), integer 1-5 scale.
export const Criterion = z.enum(["functionality", "quality", "innovation"]);
export type Criterion = z.infer<typeof Criterion>;

export const ScoreInput = z.object({
  projectId: z.string(),
  criterion: Criterion,
  value: z.number().int().min(1).max(5),
});
export type ScoreInput = z.infer<typeof ScoreInput>;

// Denials are always raw 4xx JSON, never redirects.
export const ApiError = z.object({ error: z.string() });
export type ApiError = z.infer<typeof ApiError>;
