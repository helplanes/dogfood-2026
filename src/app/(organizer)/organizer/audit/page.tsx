import Link from "next/link";

/**
 * Organizer Audit Log — /organizer/audit
 * Append-only log viewer. Each row has prev_hash + hash for integrity.
 * Organizer/admin only. No UPDATE/DELETE in this table (Krish enforces at DB level).
 * TODO: replace MOCK_AUDIT with Krish's typed server function:
 *   getAuditLog(eventId: string): Promise<AuditEntry[]>
 */

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuditEntry {
  id: string;
  timestamp: string;
  actorId: string;
  actorName: string;
  actorRole: "organizer" | "judge" | "participant" | "system";
  action: string;
  resource: string;
  resourceId: string;
  detail: string;
  prevHash: string;
  hash: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_AUDIT: AuditEntry[] = [
  { id:"aud_001", timestamp:"2026-03-01T18:01:05Z", actorId:"system",  actorName:"System",       actorRole:"system",    action:"DEADLINE_CLOSED",  resource:"event",   resourceId:"evt_01", detail:"Submission window closed for Sample Hack 2026", prevHash:"0000000000000000", hash:"a1b2c3d4e5f67890" },
  { id:"aud_002", timestamp:"2026-03-01T18:05:12Z", actorId:"org_01",  actorName:"Organizer",    actorRole:"organizer", action:"RUBRIC_PUBLISHED",  resource:"rubric",  resourceId:"evt_01", detail:"Rubric locked: Func 40%, Quality 30%, Innovation 30%", prevHash:"a1b2c3d4e5f67890", hash:"b2c3d4e5f6789012" },
  { id:"aud_003", timestamp:"2026-03-01T18:10:44Z", actorId:"system",  actorName:"System",       actorRole:"system",    action:"ASSIGNMENTS_GENERATED", resource:"assignment", resourceId:"evt_01", detail:"Greedy min-load assignment: 126 records created, k=3 per project", prevHash:"b2c3d4e5f6789012", hash:"c3d4e5f678901234" },
  { id:"aud_004", timestamp:"2026-03-02T09:14:22Z", actorId:"jdg_24",  actorName:"Diego Herrera",actorRole:"judge",     action:"SCORE_SUBMITTED",   resource:"score",   resourceId:"prj_14", detail:"criteria=functionality value=5", prevHash:"c3d4e5f678901234", hash:"d4e5f67890123456" },
  { id:"aud_005", timestamp:"2026-03-02T09:14:31Z", actorId:"jdg_24",  actorName:"Diego Herrera",actorRole:"judge",     action:"SCORE_SUBMITTED",   resource:"score",   resourceId:"prj_14", detail:"criteria=quality value=4", prevHash:"d4e5f67890123456", hash:"e5f6789012345678" },
  { id:"aud_006", timestamp:"2026-03-02T09:15:01Z", actorId:"jdg_24",  actorName:"Diego Herrera",actorRole:"judge",     action:"SCORE_SUBMITTED",   resource:"score",   resourceId:"prj_14", detail:"criteria=innovation value=5", prevHash:"e5f6789012345678", hash:"f67890123456789a" },
  { id:"aud_007", timestamp:"2026-03-02T10:02:55Z", actorId:"jdg_01",  actorName:"Tomas Varga",  actorRole:"judge",     action:"SCORE_SUBMITTED",   resource:"score",   resourceId:"prj_02", detail:"criteria=functionality value=2", prevHash:"f67890123456789a", hash:"0789012345678901" },
  { id:"aud_008", timestamp:"2026-03-02T11:30:18Z", actorId:"org_01",  actorName:"Organizer",    actorRole:"organizer", action:"DUPLICATE_FLAGGED", resource:"project", resourceId:"prj_41", detail:"Duplicate of prj_07 (same repo URL). Flagged, not deleted.", prevHash:"0789012345678901", hash:"1890123456789012" },
  { id:"aud_009", timestamp:"2026-03-02T14:20:03Z", actorId:"jdg_26",  actorName:"Jonas Vogel",  actorRole:"judge",     action:"SCORE_SUBMITTED",   resource:"score",   resourceId:"prj_06", detail:"criteria=functionality value=4", prevHash:"1890123456789012", hash:"2901234567890123" },
  { id:"aud_010", timestamp:"2026-03-02T14:45:11Z", actorId:"jdg_07",  actorName:"Iva Petrova",  actorRole:"judge",     action:"SCORE_SUBMITTED",   resource:"score",   resourceId:"prj_09", detail:"criteria=innovation value=4 [ZV-FLAGGED: zero variance]", prevHash:"2901234567890123", hash:"3012345678901234" },
  { id:"aud_011", timestamp:"2026-03-03T08:00:00Z", actorId:"system",  actorName:"System",       actorRole:"system",    action:"NORMALISATION_RUN", resource:"event",   resourceId:"evt_01", detail:"Z-score normalisation complete. jdg_01 and jdg_07 mean-centred with reduced weight.", prevHash:"3012345678901234", hash:"4123456789012345" },
  { id:"aud_012", timestamp:"2026-03-03T08:01:10Z", actorId:"system",  actorName:"System",       actorRole:"system",    action:"RESULTS_LOCKED",    resource:"event",   resourceId:"evt_01", detail:"Final ranked results published. 13 ranked, 2 unranked (<3 reviews).", prevHash:"4123456789012345", hash:"523456789abcdef0" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ACTION_CONFIG: Record<string, { bg: string; text: string; border: string }> = {
  SCORE_SUBMITTED:       { bg:"bg-[#22c55e]/10",   text:"text-[#22c55e]",   border:"border-[#22c55e]/30" },
  DEADLINE_CLOSED:       { bg:"bg-[#fe330a]/10",   text:"text-[#fe330a]",   border:"border-[#fe330a]/30" },
  RUBRIC_PUBLISHED:      { bg:"bg-[#a855f7]/10",   text:"text-[#a855f7]",   border:"border-[#a855f7]/30" },
  ASSIGNMENTS_GENERATED: { bg:"bg-[#00f0ff]/10",   text:"text-[#00f0ff]",   border:"border-[#00f0ff]/30" },
  DUPLICATE_FLAGGED:     { bg:"bg-[#ba1a1a]/10",   text:"text-[#ba1a1a]",   border:"border-[#ba1a1a]/30" },
  NORMALISATION_RUN:     { bg:"bg-[#f59e0b]/10",   text:"text-[#f59e0b]",   border:"border-[#f59e0b]/30" },
  RESULTS_LOCKED:        { bg:"bg-[#a855f7]/10",   text:"text-[#a855f7]",   border:"border-[#a855f7]/30" },
};

const ROLE_COLOR: Record<AuditEntry["actorRole"], string> = {
  organizer:   "text-[#a855f7]",
  judge:       "text-[#00f0ff]",
  participant: "text-[#22c55e]",
  system:      "text-slate-500",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month:"short", day:"numeric", hour:"2-digit", minute:"2-digit", second:"2-digit",
    timeZone:"UTC", hour12:false,
  }) + " UTC";
}

function shortHash(h: string) {
  return h.slice(0, 8);
}

export default function OrganizerAuditPage() {
  // Sorted newest first for display, but chain is oldest-first
  const sorted = [...MOCK_AUDIT].reverse();

  return (
    <div className="min-h-screen bg-[#111318]">
      {/* Hero */}
      <div className="border-b border-white/[0.08] py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#a855f7] font-mono text-xs uppercase tracking-widest mb-2">Sample Hack 2026</p>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}>
            Audit Log
          </h1>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-2">
            Append-only · {MOCK_AUDIT.length} entries · hash-chained
          </p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">

        {/* Integrity note */}
        <div className="bg-[#191c20] border border-white/[0.08] rounded-xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-3">
            {/* Chain icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#a855f7] shrink-0" aria-hidden="true">
              <path d="M8.5 11.5a3.5 3.5 0 0 0 4.95 0l2-2a3.5 3.5 0 0 0-4.95-4.95l-1.07 1.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M11.5 8.5a3.5 3.5 0 0 0-4.95 0l-2 2a3.5 3.5 0 0 0 4.95 4.95l1.07-1.07" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <div>
              <p className="text-sm font-bold text-white">Hash-chained integrity</p>
              <p className="text-xs text-slate-500">Each entry stores <code className="font-mono text-slate-300">prev_hash</code> and <code className="font-mono text-slate-300">hash</code>. No UPDATE or DELETE is granted to the application role.</p>
            </div>
          </div>
          <div className="sm:ml-auto shrink-0">
            <div className="flex items-center gap-2 px-3 py-2 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
              <span className="text-xs font-mono text-[#22c55e] uppercase tracking-wider">Chain intact</span>
            </div>
          </div>
        </div>

        {/* Action legend */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(ACTION_CONFIG).map(([action, cfg]) => (
            <span key={action}
              className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-sm border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
              {action.replace(/_/g, " ")}
            </span>
          ))}
        </div>

        {/* ── Audit entries — timeline style ── */}
        <div className="relative flex flex-col gap-0">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/[0.06]" aria-hidden="true" />

          {sorted.map((entry, i) => {
            const cfg = ACTION_CONFIG[entry.action] ?? { bg:"bg-white/[0.04]", text:"text-slate-400", border:"border-white/10" };
            return (
              <div key={entry.id} className="relative pl-12 pb-6">
                {/* Timeline dot */}
                <div className={[
                  "absolute left-0 w-10 h-10 rounded-full border flex items-center justify-center",
                  cfg.bg, cfg.border,
                ].join(" ")} style={{ top:0 }}>
                  <span className={`text-[9px] font-black ${cfg.text}`}>
                    {entry.actorRole === "system" ? "SYS" :
                     entry.actorRole === "organizer" ? "ORG" :
                     entry.actorRole === "judge" ? "JDG" : "PTH"}
                  </span>
                </div>

                {/* Card */}
                <div className={[
                  "bg-[#191c20] border rounded-xl p-4 ml-2",
                  i === 0 ? "border-[#a855f7]/30" : "border-white/[0.08]",
                ].join(" ")}>
                  {/* Top row */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-sm border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                      {entry.action.replace(/_/g, " ")}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {formatDate(entry.timestamp)}
                    </span>
                    {i === 0 && (
                      <span className="text-[9px] font-mono uppercase tracking-widest bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/30 px-1.5 py-0.5 rounded-sm">
                        Latest
                      </span>
                    )}
                  </div>

                  {/* Actor + resource */}
                  <div className="flex flex-wrap gap-x-6 gap-y-1 mb-2">
                    <span className="text-xs">
                      <span className="text-slate-600 font-mono text-[10px] uppercase tracking-wider mr-1">Actor</span>
                      <span className={`font-bold ${ROLE_COLOR[entry.actorRole]}`}>{entry.actorName}</span>
                      <span className="text-slate-600 font-mono text-[10px] ml-1">({entry.actorId})</span>
                    </span>
                    <span className="text-xs">
                      <span className="text-slate-600 font-mono text-[10px] uppercase tracking-wider mr-1">Resource</span>
                      <span className="text-white font-mono">{entry.resource}</span>
                      <span className="text-slate-600 font-mono text-[10px] ml-1">#{entry.resourceId}</span>
                    </span>
                  </div>

                  {/* Detail */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{entry.detail}</p>

                  {/* Hash chain */}
                  <div className="flex flex-wrap gap-4 pt-2 border-t border-white/[0.04]">
                    <span className="font-mono text-[10px]">
                      <span className="text-slate-600 uppercase tracking-wider mr-1">prev</span>
                      <span className="text-slate-500">{shortHash(entry.prevHash)}…</span>
                    </span>
                    <span className="font-mono text-[10px]">
                      <span className="text-slate-600 uppercase tracking-wider mr-1">hash</span>
                      <span className="text-[#00f0ff]">{shortHash(entry.hash)}…</span>
                    </span>
                    <span className="font-mono text-[10px] text-slate-700">{entry.id}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-white/[0.08] pt-6 flex flex-wrap gap-6">
          <Link href="/organizer/dashboard" className="text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-[#a855f7] transition-colors">← Dashboard</Link>
          <Link href="/organizer/results"   className="text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-[#a855f7] transition-colors">Results →</Link>
        </div>
      </main>
    </div>
  );
}
