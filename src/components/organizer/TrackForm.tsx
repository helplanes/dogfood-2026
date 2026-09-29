"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function TrackForm({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name) return;
    setSubmitting(true);
    try {
      await fetch("/api/organizer/tracks", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ eventId, name }),
      });
      setName("");
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={submit} className="flex items-center gap-2">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New track name"
        className="flex-1 px-3 py-1.5 rounded-lg bg-background border border-stone-700 text-xs text-stone-100"
      />
      <button
        type="submit"
        disabled={submitting}
        className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-mono font-bold disabled:opacity-50"
      >
        Add Track
      </button>
    </form>
  );
}
