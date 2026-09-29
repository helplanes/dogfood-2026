"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ProjectInput } from "@/contracts";

export default function SubmitProjectPage() {
  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    summary: "",
    repoUrl: "",
    track: "",
    thumbnailUrl: "",
    demoVideoUrl: "",
    liveUrl: "",
    techTags: "",
  });
  const [customQuestions, setCustomQuestions] = useState<string[]>([]);
  const [customAnswers, setCustomAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/event")
      .then((res) => (res.ok ? res.json() : null))
      .then((body) => body && setCustomQuestions(body.customQuestions ?? []))
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    // eventId is intentionally omitted: the API resolves it to the current event server-side
    // (there is only ever one open event), so the client never has to know or guess its id.
    const result = ProjectInput.omit({ eventId: true }).safeParse({
      title: formData.title,
      tagline: formData.tagline,
      summary: formData.summary,
      repoUrl: formData.repoUrl || null,
      track: formData.track || null,
      thumbnailUrl: formData.thumbnailUrl || null,
      demoVideoUrl: formData.demoVideoUrl || null,
      liveUrl: formData.liveUrl || null,
      techTags: formData.techTags.split(",").map((t) => t.trim()).filter(Boolean),
      customAnswers,
    });

    if (!result.success) {
      setError("Please check your input fields. Title is required, and URL fields must be valid URLs.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/projects/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) {
        let errorMessage = `Submission failed with status ${res.status}`;
        try {
          const rawText = await res.text();
          try {
            const errData = JSON.parse(rawText);
            errorMessage = errData?.error || errData?.message || rawText;
          } catch {
            if (rawText.trim().toLowerCase().startsWith("<!doctype html>") || rawText.trim().toLowerCase().startsWith("<html")) {
              errorMessage = `Submission failed (${res.status}): API endpoint not found or returned an HTML error page.`;
            } else {
              errorMessage = rawText || errorMessage;
            }
          }
        } catch {
          // ignore
        }
        setError(errorMessage);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error or unexpected failure.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-stone-100 p-4 lg:p-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight font-serif tracking-tight">Submit Project</h2>
          <p className="mt-2 font-mono text-sm text-stone-500">Draft and submit your team&apos;s project. You can edit everything below until the deadline.</p>
        </div>

        {success ? (
          <div className="rounded-2xl shadow-xl bg-surface border border-stone-800 p-8 text-white text-center">
            <h3 className="text-xl font-bold uppercase tracking-tight mb-4">Draft Created!</h3>
            <p className="text-stone-400 mb-6">Edit it further or submit it as final from your dashboard.</p>
            <Link href="/dashboard" className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-6 py-3 rounded-xl text-sm font-bold transition-colors inline-block">
              Return to Dashboard
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl shadow-xl bg-surface border border-stone-800 p-6 lg:p-8 text-white">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-xl bg-red-950/40 p-4 text-sm text-red-300 border border-red-800">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-stone-400">
                  Project Title *
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`mt-1 block w-full rounded-xl border bg-background py-2 px-3 text-white placeholder:text-stone-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] sm:text-sm ${error ? "border-red-800" : "border-stone-800"}`}
                  placeholder="e.g. Project Apollo"
                />
              </div>

              <div>
                <label htmlFor="tagline" className="block text-sm font-medium text-stone-400">
                  Tagline (optional)
                </label>
                <input
                  id="tagline"
                  type="text"
                  maxLength={300}
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="mt-1 block w-full rounded-xl border border-stone-800 bg-background py-2 px-3 text-white placeholder:text-stone-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] sm:text-sm"
                  placeholder="One line that sells it"
                />
              </div>

              <div>
                <label htmlFor="summary" className="block text-sm font-medium text-stone-400">
                  Description (optional)
                </label>
                <textarea
                  id="summary"
                  rows={4}
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="mt-1 block w-full rounded-xl border border-stone-800 bg-background py-2 px-3 text-white placeholder:text-stone-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] sm:text-sm"
                  placeholder="What does your project do?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="repoUrl" className="block text-sm font-medium text-stone-400">
                    Repository URL (optional)
                  </label>
                  <input
                    id="repoUrl"
                    type="url"
                    value={formData.repoUrl}
                    onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                    className="mt-1 block w-full rounded-xl border border-stone-800 bg-background py-2 px-3 text-white placeholder:text-stone-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] sm:text-sm"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div>
                  <label htmlFor="track" className="block text-sm font-medium text-stone-400">
                    Track (optional)
                  </label>
                  <input
                    id="track"
                    type="text"
                    value={formData.track}
                    onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                    className="mt-1 block w-full rounded-xl border border-stone-800 bg-background py-2 px-3 text-white placeholder:text-stone-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] sm:text-sm"
                    placeholder="e.g. trk_01"
                  />
                </div>

                <div>
                  <label htmlFor="liveUrl" className="block text-sm font-medium text-stone-400">
                    Live Link (optional)
                  </label>
                  <input
                    id="liveUrl"
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="mt-1 block w-full rounded-xl border border-stone-800 bg-background py-2 px-3 text-white placeholder:text-stone-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] sm:text-sm"
                    placeholder="https://your-demo.example.com"
                  />
                </div>

                <div>
                  <label htmlFor="demoVideoUrl" className="block text-sm font-medium text-stone-400">
                    Demo Video URL (optional)
                  </label>
                  <input
                    id="demoVideoUrl"
                    type="url"
                    value={formData.demoVideoUrl}
                    onChange={(e) => setFormData({ ...formData, demoVideoUrl: e.target.value })}
                    className="mt-1 block w-full rounded-xl border border-stone-800 bg-background py-2 px-3 text-white placeholder:text-stone-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] sm:text-sm"
                    placeholder="https://youtu.be/..."
                  />
                </div>

                <div>
                  <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-stone-400">
                    Thumbnail URL (optional)
                  </label>
                  <input
                    id="thumbnailUrl"
                    type="url"
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                    className="mt-1 block w-full rounded-xl border border-stone-800 bg-background py-2 px-3 text-white placeholder:text-stone-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] sm:text-sm"
                    placeholder="https://.../thumbnail.png"
                  />
                </div>

                <div>
                  <label htmlFor="techTags" className="block text-sm font-medium text-stone-400">
                    Tech Tags (optional, comma-separated)
                  </label>
                  <input
                    id="techTags"
                    type="text"
                    value={formData.techTags}
                    onChange={(e) => setFormData({ ...formData, techTags: e.target.value })}
                    className="mt-1 block w-full rounded-xl border border-stone-800 bg-background py-2 px-3 text-white placeholder:text-stone-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] sm:text-sm"
                    placeholder="Next.js, Postgres, Drizzle"
                  />
                </div>
              </div>

              {customQuestions.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-stone-800">
                  <p className="text-xs font-mono uppercase tracking-widest text-stone-500">Organizer Questions</p>
                  {customQuestions.map((q) => (
                    <div key={q}>
                      <label className="block text-sm font-medium text-stone-400">{q}</label>
                      <textarea
                        rows={2}
                        value={customAnswers[q] ?? ""}
                        onChange={(e) => setCustomAnswers({ ...customAnswers, [q]: e.target.value })}
                        className="mt-1 block w-full rounded-xl border border-stone-800 bg-background py-2 px-3 text-white placeholder:text-stone-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] sm:text-sm"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-4 flex gap-4 border-t border-stone-800">
                <Link href="/dashboard" className="text-center border border-stone-700 text-stone-300 px-6 py-2 rounded-xl text-sm font-bold transition-colors hover:bg-stone-800">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl bg-[var(--color-primary)] px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-[var(--color-primary-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary)] disabled:opacity-70"
                >
                  {isSubmitting ? "Saving..." : "Save Draft"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
