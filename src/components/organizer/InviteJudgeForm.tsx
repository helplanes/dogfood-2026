"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function InviteJudgeForm({ tracks }: { tracks: { id: string; name: string }[] }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [trackId, setTrackId] = useState(tracks[0]?.id ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ email: string; tempPassword: string } | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    if (!email || !name) {
      setError("Email and name are required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/organizer/judges/invite", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, name, trackId: trackId || undefined }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.error ?? "Could not invite judge.");
        return;
      }
      setResult({ email: body.email, tempPassword: body.tempPassword });
      setEmail("");
      setName("");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl bg-surface border border-stone-800 p-6 space-y-4">
      <h2 className="text-sm font-mono uppercase tracking-widest text-stone-400">Invite a Judge</h2>
      <p className="text-xs text-stone-500 font-sans">
        No email service is wired up (by design — no hosted-service dependency). You&apos;ll get a one-time temporary password back to share with them yourself.
      </p>

      {error && <div className="rounded-xl bg-red-950/40 p-3 text-xs text-red-300 border border-red-800">{error}</div>}
      {result && (
        <div className="rounded-xl bg-emerald-950/40 p-4 text-xs font-mono text-emerald-300 border border-emerald-800/50 space-y-1">
          <p>Judge account created for {result.email}.</p>
          <p>
            Temporary password: <span className="text-white font-bold">{result.tempPassword}</span>
          </p>
          <p className="text-emerald-400/70">Shown once — copy it now.</p>
        </div>
      )}

      <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="px-3 py-2 rounded-lg bg-background border border-stone-700 text-sm text-stone-100"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email@example.org"
          className="px-3 py-2 rounded-lg bg-background border border-stone-700 text-sm text-stone-100"
        />
        <select
          value={trackId}
          onChange={(e) => setTrackId(e.target.value)}
          className="px-3 py-2 rounded-lg bg-background border border-stone-700 text-sm text-stone-100"
        >
          <option value="">No initial track</option>
          {tracks.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-mono font-bold uppercase tracking-wider disabled:opacity-50"
        >
          {submitting ? "Inviting…" : "Invite"}
        </button>
      </form>
    </div>
  );
}
