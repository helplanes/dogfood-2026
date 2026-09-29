"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function EventForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [prizes, setPrizes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name || !deadline) {
      setError("Name and deadline are required.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/organizer/events", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, submissionDeadline: new Date(deadline).toISOString(), prizes }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "Could not create event.");
        return;
      }
      setName("");
      setDeadline("");
      setPrizes("");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {error && <div className="md:col-span-3 rounded-xl bg-red-950/40 p-3 text-xs text-red-300 border border-red-800">{error}</div>}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Event name"
        className="px-3 py-2 rounded-lg bg-background border border-stone-700 text-sm text-stone-100"
      />
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="px-3 py-2 rounded-lg bg-background border border-stone-700 text-sm text-stone-100"
      />
      <input
        value={prizes}
        onChange={(e) => setPrizes(e.target.value)}
        placeholder="Prizes (free text)"
        className="px-3 py-2 rounded-lg bg-background border border-stone-700 text-sm text-stone-100"
      />
      <button
        type="submit"
        disabled={submitting}
        className="md:col-span-3 px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-mono font-bold uppercase tracking-wider disabled:opacity-50"
      >
        {submitting ? "Creating…" : "Create Event"}
      </button>
    </form>
  );
}
