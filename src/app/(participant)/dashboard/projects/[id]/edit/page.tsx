"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface OwnedProject {
  id: string;
  title: string;
  tagline: string;
  summary: string;
  repoUrl: string | null;
  track: string | null;
  status: string;
  thumbnailUrl: string | null;
  demoVideoUrl: string | null;
  liveUrl: string | null;
  techTags: string[];
  customAnswers: Record<string, string>;
}

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [project, setProject] = useState<OwnedProject | null>(null);
  const [techTagsInput, setTechTagsInput] = useState("");
  const [customQuestions, setCustomQuestions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((p: OwnedProject) => {
        setProject(p);
        setTechTagsInput((p.techTags ?? []).join(", "));
      })
      .catch(() => setError("Could not load this project."));

    fetch("/api/event")
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => body && setCustomQuestions(body.customQuestions ?? []))
      .catch(() => {});
  }, [id]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!project) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          title: project.title,
          tagline: project.tagline,
          summary: project.summary,
          repoUrl: project.repoUrl,
          track: project.track,
          thumbnailUrl: project.thumbnailUrl,
          demoVideoUrl: project.demoVideoUrl,
          liveUrl: project.liveUrl,
          techTags: techTagsInput.split(",").map((t) => t.trim()).filter(Boolean),
          customAnswers: project.customAnswers,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error ?? "Could not save.");
        return;
      }
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  async function submitFinal() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/projects/${id}/submit`, { method: "POST" });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error ?? "Could not submit.");
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-stone-400 font-mono text-sm">
        {error ?? "Loading…"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-stone-100 px-4 py-8 md:px-12 md:py-12 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        <Link href="/dashboard" className="text-xs font-mono text-stone-400 hover:text-primary transition-colors w-fit inline-block">
          &larr; DASHBOARD
        </Link>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-serif text-white">Edit Project</h1>
          <span className={`px-2 py-1 rounded text-[10px] font-mono uppercase tracking-wider border ${project.status === "submitted" ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/40" : "bg-amber-950/40 text-amber-300 border-amber-600/40"}`}>
            {project.status}
          </span>
        </div>

        {error && <div className="rounded-xl bg-red-950/40 p-4 text-sm text-red-300 border border-red-800">{error}</div>}
        {saved && <div className="rounded-xl bg-emerald-950/40 p-4 text-sm text-emerald-300 border border-emerald-800">Saved.</div>}

        <form onSubmit={save} className="space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-stone-400 mb-1">Title</label>
            <input
              value={project.title}
              onChange={(e) => setProject({ ...project, title: e.target.value })}
              className="w-full px-4 py-3 bg-surface border border-stone-800 rounded-xl text-sm text-stone-100"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-stone-400 mb-1">Tagline</label>
            <input
              value={project.tagline}
              onChange={(e) => setProject({ ...project, tagline: e.target.value })}
              className="w-full px-4 py-3 bg-surface border border-stone-800 rounded-xl text-sm text-stone-100"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase tracking-widest text-stone-400 mb-1">Description</label>
            <textarea
              value={project.summary}
              onChange={(e) => setProject({ ...project, summary: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-surface border border-stone-800 rounded-xl text-sm text-stone-100"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-stone-400 mb-1">Repository URL</label>
              <input
                value={project.repoUrl ?? ""}
                onChange={(e) => setProject({ ...project, repoUrl: e.target.value || null })}
                className="w-full px-4 py-3 bg-surface border border-stone-800 rounded-xl text-sm text-stone-100"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-stone-400 mb-1">Track ID</label>
              <input
                value={project.track ?? ""}
                onChange={(e) => setProject({ ...project, track: e.target.value || null })}
                placeholder="trk_01"
                className="w-full px-4 py-3 bg-surface border border-stone-800 rounded-xl text-sm text-stone-100"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-stone-400 mb-1">Live Link</label>
              <input
                value={project.liveUrl ?? ""}
                onChange={(e) => setProject({ ...project, liveUrl: e.target.value || null })}
                className="w-full px-4 py-3 bg-surface border border-stone-800 rounded-xl text-sm text-stone-100"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-stone-400 mb-1">Demo Video URL</label>
              <input
                value={project.demoVideoUrl ?? ""}
                onChange={(e) => setProject({ ...project, demoVideoUrl: e.target.value || null })}
                className="w-full px-4 py-3 bg-surface border border-stone-800 rounded-xl text-sm text-stone-100"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-stone-400 mb-1">Thumbnail URL</label>
              <input
                value={project.thumbnailUrl ?? ""}
                onChange={(e) => setProject({ ...project, thumbnailUrl: e.target.value || null })}
                className="w-full px-4 py-3 bg-surface border border-stone-800 rounded-xl text-sm text-stone-100"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-widest text-stone-400 mb-1">Tech Tags (comma-separated)</label>
              <input
                value={techTagsInput}
                onChange={(e) => setTechTagsInput(e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-stone-800 rounded-xl text-sm text-stone-100"
              />
            </div>
          </div>

          {customQuestions.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-stone-800">
              <p className="text-xs font-mono uppercase tracking-widest text-stone-500">Organizer Questions</p>
              {customQuestions.map((q) => (
                <div key={q}>
                  <label className="block text-xs font-mono uppercase tracking-widest text-stone-400 mb-1">{q}</label>
                  <textarea
                    rows={2}
                    value={project.customAnswers?.[q] ?? ""}
                    onChange={(e) => setProject({ ...project, customAnswers: { ...project.customAnswers, [q]: e.target.value } })}
                    className="w-full px-4 py-3 bg-surface border border-stone-800 rounded-xl text-sm text-stone-100"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-4 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-sm font-mono font-bold disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save Draft"}
            </button>
            {project.status !== "submitted" && (
              <button
                type="button"
                onClick={submitFinal}
                disabled={saving}
                className="flex-1 px-5 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-mono font-bold disabled:opacity-50"
              >
                Submit Final
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
