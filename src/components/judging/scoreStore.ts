/**
 * scoreStore.ts — client-side localStorage score store (demo/mock only).
 * TODO: remove entirely once Krish's real API is wired. The ScoringForm
 * will call POST /api/judge/scores directly, and the dashboard will fetch
 * from getAssignedProjects(judgeId) which reads live DB data.
 */

import type { Criterion } from "@/contracts";

export type StoredScores = Partial<Record<Criterion, number>>;

export interface StoredProjectEntry {
  scores: StoredScores;
  notes: string;
  savedAt: string; // ISO timestamp
}

const STORE_KEY = "dogfood_judge_mock_scores";

function readStore(): Record<string, StoredProjectEntry> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, StoredProjectEntry>) : {};
  } catch {
    return {};
  }
}

function writeStore(data: Record<string, StoredProjectEntry>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(data));
  } catch {
    // storage full or unavailable — silently ignore in demo
  }
}

/** Save scores + notes for a project. */
export function saveProjectScores(
  projectId: string,
  scores: StoredScores,
  notes: string
): void {
  const store = readStore();
  store[projectId] = { scores, notes, savedAt: new Date().toISOString() };
  writeStore(store);
}

/** Get saved scores + notes for a project, or null if not yet saved. */
export function getProjectScores(projectId: string): StoredProjectEntry | null {
  return readStore()[projectId] ?? null;
}

/** Get the full store (used by the dashboard to render status). */
export function getAllSavedScores(): Record<string, StoredProjectEntry> {
  return readStore();
}
