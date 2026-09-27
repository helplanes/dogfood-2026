import Link from "next/link";

/**
 * Organizer Assignment Board — /organizer/assignments
 * Shows which judges are assigned to which projects, with track eligibility.
 * TODO: replace MOCK_* with Krish's typed server function:
 *   getAssignmentBoard(): Promise<AssignmentRow[]>
 * from src/repo. Must be organizer-scoped — never expose judge scores here.
 */

// ─── Mock data ────────────────────────────────────────────────────────────────

const JUDGES = [
  { id:"jdg_01", name:"Tomas Varga",  tracks:["Accessibility"],              zeroVariance:true  },
  { id:"jdg_02", name:"Wei Lindqvist",tracks:["Data & Analytics","Security"], zeroVariance:false },
  { id:"jdg_07", name:"Iva Petrova",  tracks:["Health"],                     zeroVariance:true  },
  { id:"jdg_09", name:"Sofia Duarte", tracks:["Developer Tools"],            zeroVariance:false },
  { id:"jdg_24", name:"Diego Herrera",tracks:["Developer Tools","Education"],zeroVariance:false },
  { id:"jdg_26", name:"Jonas Vogel",  tracks:["Accessibility","Dev Tools"],  zeroVariance:false },
];

const PROJECTS_SAMPLE = [
  { id:"prj_01", title:"Glass Signal",  track:"Security",         teamId:"tm_01", assignments:["jdg_01","jdg_02","jdg_09"], reviewsDone:2, reviewsRequired:3 },
  { id:"prj_02", title:"Small Meadow", track:"Accessibility",    teamId:"tm_02", assignments:["jdg_01","jdg_26","jdg_12"], reviewsDone:3, reviewsRequired:3 },
  { id:"prj_05", title:"North Compass",track:"Data & Analytics",  teamId:"tm_05", assignments:["jdg_02","jdg_16","jdg_25"],reviewsDone:3, reviewsRequired:3 },
  { id:"prj_06", title:"Dry Compass",  track:"Developer Tools",  teamId:"tm_06", assignments:["jdg_09","jdg_24","jdg_26"], reviewsDone:3, reviewsRequired:3 },
  { id:"prj_07", title:"Dry Harbour",  track:"Accessibility",    teamId:"tm_07", assignments:["jdg_07","jdg_01","jdg_26"], reviewsDone:3, reviewsRequired:3 },
  { id:"prj_09", title:"Hollow Signal",track:"Health",           teamId:"tm_09", assignments:["jdg_07","jdg_27","jdg_29"], reviewsDone:3, reviewsRequired:3 },
  { id:"prj_14", title:"Green Lantern",track:"Education",        teamId:"tm_14", assignments:["jdg_24","jdg_04","jdg_11","jdg_14","jdg_22"], reviewsDone:5, reviewsRequired:3 },
  { id:"prj_41", title:"Dry Harbour",  track:"Accessibility",    teamId:"tm_23", assignments:["jdg_01","jdg_18"], reviewsDone:2, reviewsRequired:3, duplicate:true },
];

const TOTAL_ASSIGNMENTS = 126; // 41 projects × ~3 judges avg
const TOTAL_JUDGES = 30;
const AVG_LOAD = (TOTAL_ASSIGNMENTS / TOTAL_JUDGES).toFixed(1);

// Judge workload (number of projects assigned)
const JUDGE_LOADS: {id:string; name:string; assigned:number; scored:number; tracks:string[]; zv:boolean}[] = [
  { id:"jdg_01", name:"Tomas Varga",   assigned:5, scored:1, tracks:["Accessibility"],             zv:true  },
  { id:"jdg_02", name:"Wei Lindqvist", assigned:6, scored:6, tracks:["Data & Analytics","Security"],zv:false },
  { id:"jdg_07", name:"Iva Petrova",   assigned:5, scored:5, tracks:["Health"],                    zv:true  },
  { id:"jdg_09", name:"Sofia Duarte",  assigned:4, scored:4, tracks:["Developer Tools"],           zv:false },
  { id:"jdg_24", name:"Diego Herrera", assigned:6, scored:6, tracks:["Developer Tools","Education"],zv:false },
  { id:"jdg_26", name:"Jonas Vogel",   assigned:5, scored:5, tracks:["Accessibility","Dev Tools"],  zv:false },
];

export default function OrganizerAssignmentsPage() {
  return (
    <div className="min-h-screen bg-[#111318]">
      {/* Hero */}
      <div className="border-b border-white/[0.08] py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#a855f7] font-mono text-xs uppercase tracking-widest mb-2">Sample Hack 2026</p>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}>
            Judge Assignments
          </h1>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-2">
            {TOTAL_ASSIGNMENTS} total assignments · {TOTAL_JUDGES} judges · avg {AVG_LOAD} projects/judge
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-10">

        {/* Demo notice */}
        <div className="flex items-start gap-3 bg-[#191c20] border border-[#00f0ff]/20 rounded-lg px-4 py-3">
          <span className="text-[#00f0ff] font-mono text-xs uppercase tracking-widest shrink-0 mt-0.5">DEMO</span>
          <p className="text-slate-400 text-xs leading-relaxed">
            Showing a sample of the 30-judge, 41-project assignment matrix. Replace with{" "}
            <code className="text-white font-mono">getAssignmentBoard()</code> from{" "}
            <code className="text-white font-mono">src/repo</code> when Krish&apos;s backend is wired.
          </p>
        </div>

        {/* ── Judge workload grid ── */}
        <section>
          <h2 className="text-lg font-black uppercase tracking-tight text-white mb-5"
              style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}>
            Judge Workloads
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {JUDGE_LOADS.map((j) => {
              const pct = Math.round((j.scored / j.assigned) * 100);
              const done = j.scored === j.assigned;
              return (
                <div key={j.id}
                  className={[
                    "bg-[#191c20] border rounded-xl p-5 flex flex-col gap-3",
                    j.zv ? "border-[#f59e0b]/30" : done ? "border-[#22c55e]/30" : "border-white/[0.08]",
                  ].join(" ")}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className={[
                        "w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shrink-0",
                        j.zv ? "bg-[#f59e0b]/10 border border-[#f59e0b]/40 text-[#f59e0b]"
                              : "bg-[#a855f7]/10 border border-[#a855f7]/30 text-[#a855f7]",
                      ].join(" ")}>
                        {j.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{j.name}</p>
                        <p className="text-[10px] font-mono text-slate-600">{j.id}</p>
                      </div>
                    </div>
                    {j.zv && (
                      <span title="Zero-variance judge"
                        className="text-[9px] font-mono uppercase tracking-widest bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/30 px-1.5 py-0.5 rounded-sm shrink-0">
                        ZV
                      </span>
                    )}
                    {done && !j.zv && (
                      <span className="text-[9px] font-mono uppercase tracking-widest bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 px-1.5 py-0.5 rounded-sm shrink-0">
                        ✓ Done
                      </span>
                    )}
                  </div>
                  {/* Tracks */}
                  <div className="flex flex-wrap gap-1">
                    {j.tracks.map(t => (
                      <span key={t} className="text-[9px] font-mono uppercase tracking-wider bg-[#282a2f] text-slate-500 px-1.5 py-0.5 rounded-sm">{t}</span>
                    ))}
                  </div>
                  {/* Progress */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-white/[0.06] rounded-full h-1.5 overflow-hidden">
                      <div className="h-full rounded-full transition-all"
                        style={{ width:`${pct}%`, backgroundColor: j.zv ? "#f59e0b" : done ? "#22c55e" : "#a855f7" }} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 tabular-nums shrink-0">
                      {j.scored}/{j.assigned}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Project assignment table (sample) ── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-black uppercase tracking-tight text-white"
                style={{ fontFamily: "Syne, Geist, system-ui, sans-serif" }}>
              Project Assignments (Sample)
            </h2>
            <span className="text-xs font-mono text-slate-600 uppercase tracking-widest">
              Showing {PROJECTS_SAMPLE.length} of 41
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="bg-[#191c20] border-b border-white/[0.08]">
                  {["Project","Track","Reviews","Judges Assigned","Status"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] font-mono uppercase tracking-widest text-slate-500 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PROJECTS_SAMPLE.map((p) => {
                  const complete = p.reviewsDone >= p.reviewsRequired;
                  const isDup = (p as typeof p & {duplicate?:boolean}).duplicate;
                  return (
                    <tr key={p.id} className={[
                      "border-b border-white/[0.04] transition-colors hover:bg-white/[0.02]",
                      isDup ? "bg-[#ba1a1a]/[0.03]" : "",
                    ].join(" ")}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="text-xs font-bold text-white uppercase tracking-tight">{p.title}</p>
                            <p className="text-[10px] font-mono text-slate-600">{p.id}</p>
                          </div>
                          {isDup && (
                            <span className="text-[9px] font-mono uppercase bg-[#ba1a1a]/10 text-[#ba1a1a] border border-[#ba1a1a]/30 px-1.5 py-0.5 rounded-sm shrink-0">DUP</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[10px] font-mono text-slate-400 bg-[#282a2f] px-2 py-0.5 rounded-sm whitespace-nowrap">{p.track}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={[
                          "text-sm font-black tabular-nums",
                          p.reviewsDone < p.reviewsRequired ? "text-[#ba1a1a]" : "text-[#22c55e]",
                        ].join(" ")}>
                          {p.reviewsDone}
                        </span>
                        <span className="text-slate-600 font-mono text-xs">/{p.reviewsRequired}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {p.assignments.map(jId => {
                            const jl = JUDGE_LOADS.find(j => j.id === jId);
                            return (
                              <span key={jId}
                                className={[
                                  "text-[9px] font-mono px-1.5 py-0.5 rounded-sm border",
                                  jl?.zv
                                    ? "bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30"
                                    : "bg-[#282a2f] text-slate-400 border-white/10",
                                ].join(" ")}
                                title={jl?.name ?? jId}>
                                {jId}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {complete ? (
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#22c55e]">✓ Complete</span>
                        ) : (
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#ba1a1a]">Needs review</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-white/[0.08] pt-6 flex flex-wrap gap-6">
          <Link href="/organizer/results"   className="text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-[#a855f7] transition-colors">Results →</Link>
          <Link href="/organizer/dashboard" className="text-xs font-mono uppercase tracking-widest text-slate-500 hover:text-[#a855f7] transition-colors">Dashboard →</Link>
        </div>
      </main>
    </div>
  );
}
