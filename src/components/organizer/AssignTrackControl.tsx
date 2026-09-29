"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AssignTrackControl({
  judgeId,
  tracks,
}: {
  judgeId: string;
  tracks: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [trackId, setTrackId] = useState(tracks[0]?.id ?? "");
  const [busy, setBusy] = useState(false);

  async function assign() {
    if (!trackId) return;
    setBusy(true);
    try {
      await fetch("/api/organizer/judges/assign", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ judgeId, trackId }),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  if (tracks.length === 0) return null;

  return (
    <div className="flex items-center gap-2 pt-3">
      <select
        value={trackId}
        onChange={(e) => setTrackId(e.target.value)}
        className="flex-1 px-2 py-1.5 rounded-lg bg-background border border-stone-700 text-[10px] font-mono text-stone-300"
      >
        {tracks.map((t) => (
          <option key={t.id} value={t.id}>
            {t.name}
          </option>
        ))}
      </select>
      <button
        onClick={assign}
        disabled={busy}
        className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white text-[10px] font-mono font-bold disabled:opacity-50"
      >
        {busy ? "…" : "Assign"}
      </button>
    </div>
  );
}
