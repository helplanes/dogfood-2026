"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Converts a stored ISO timestamp to the value <input type="datetime-local"> expects (local,
// no timezone/seconds), and back to ISO on save.
function toLocalInput(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function EventEditForm({
  eventId,
  deadline,
  prizes,
  customQuestions,
}: {
  eventId: string;
  deadline: string;
  prizes: string;
  customQuestions: string[];
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [localDeadline, setLocalDeadline] = useState(() => toLocalInput(deadline));
  const [localPrizes, setLocalPrizes] = useState(prizes);
  const [localQuestions, setLocalQuestions] = useState(customQuestions.join("\n"));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/organizer/events/${eventId}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          submissionDeadline: new Date(localDeadline).toISOString(),
          prizes: localPrizes,
          customQuestions: localQuestions.split("\n").map((q) => q.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        setError(body.error ?? "Could not save.");
        return;
      }
      setEditing(false);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-[10px] font-mono font-bold uppercase tracking-wider"
      >
        Edit
      </button>
    );
  }

  return (
    <div className="space-y-3 p-4 rounded-xl bg-background border border-stone-800">
      {error && <div className="text-xs text-red-400 font-mono">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
          Deadline
          <input
            type="datetime-local"
            value={localDeadline}
            onChange={(e) => setLocalDeadline(e.target.value)}
            className="mt-1 w-full px-3 py-2 rounded-lg bg-surface border border-stone-700 text-sm text-stone-100"
          />
        </label>
        <label className="text-[10px] font-mono uppercase tracking-widest text-stone-500">
          Prizes
          <input
            value={localPrizes}
            onChange={(e) => setLocalPrizes(e.target.value)}
            className="mt-1 w-full px-3 py-2 rounded-lg bg-surface border border-stone-700 text-sm text-stone-100"
          />
        </label>
      </div>
      <label className="block text-[10px] font-mono uppercase tracking-widest text-stone-500">
        Custom submission questions (one per line)
        <textarea
          value={localQuestions}
          onChange={(e) => setLocalQuestions(e.target.value)}
          rows={3}
          className="mt-1 w-full px-3 py-2 rounded-lg bg-surface border border-stone-700 text-sm text-stone-100"
        />
      </label>
      <div className="flex gap-2">
        <button
          onClick={save}
          disabled={saving}
          className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-[10px] font-mono font-bold uppercase tracking-wider disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save"}
        </button>
        <button
          onClick={() => setEditing(false)}
          className="px-4 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-[10px] font-mono font-bold uppercase tracking-wider"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
