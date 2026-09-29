import Link from "next/link";
import { redirect } from "next/navigation";
import { authorize } from "@/policy";
import { getActorFromCookies } from "@/server/auth";
import { listAuditLog } from "@/repo/queries";

export const metadata = { title: "Audit Log" };

export const dynamic = "force-dynamic";

// Append-only: the app never updates or deletes rows here (src/repo/queries.ts: recordAudit).
export default async function OrganizerAuditPage() {
  const actor = await getActorFromCookies();
  const decision = authorize(actor, "organizer:manage");
  if (!decision.ok) redirect("/login");

  const entries = await listAuditLog(200);

  return (
    <div className="min-h-screen bg-background text-stone-100 antialiased selection:bg-primary/30 px-4 py-8 md:px-12 md:py-12 flex flex-col font-sans">
      <div className="max-w-7xl mx-auto space-y-8 w-full">
        <header className="flex flex-col gap-4 pb-6 border-b border-stone-800/50">
          <div className="flex items-center gap-3">
            <Link href="/organizer/dashboard" className="text-xs font-mono text-stone-400 hover:text-primary transition-colors">
              &larr; DASHBOARD
            </Link>
            <span className="text-stone-600">/</span>
            <span className="text-xs font-mono text-primary tracking-widest uppercase">Security</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-syne text-white tracking-tight">Audit Log</h1>
          <p className="text-stone-400 text-sm">
            Append-only. {entries.length} of the most recent {entries.length === 200 ? "200+" : entries.length} entries.
          </p>
        </header>

        {entries.length === 0 ? (
          <div className="rounded-2xl bg-surface border border-stone-800 p-12 text-center font-mono text-xs text-stone-500">
            No activity recorded yet.
          </div>
        ) : (
          <div className="rounded-2xl bg-surface border border-stone-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-background/50 text-xs font-mono text-stone-400 border-b border-stone-800">
                  <tr>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider">Time</th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider">Action</th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider">Actor</th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider">Entity</th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider">Detail</th>
                    <th className="px-4 py-3 font-semibold uppercase tracking-wider">SHA-256</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60 font-mono text-xs">
                  {entries.map((e) => (
                    <tr key={e.id} className="hover:bg-background/30 transition-colors">
                      <td className="px-4 py-3 text-stone-500">{new Date(e.createdAt).toISOString()}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded bg-stone-900 border border-stone-700 text-stone-300">{e.action}</span>
                      </td>
                      <td className="px-4 py-3 text-stone-400">{e.actorId ?? "—"}</td>
                      <td className="px-4 py-3 text-stone-400">{e.entity}</td>
                      <td className="px-4 py-3 text-stone-500 max-w-xs truncate">{e.detail}</td>
                      <td className="px-4 py-3 text-stone-500" title={`Previous: ${e.prevHash}\nEntry: ${e.hash}`}>
                        {e.hash.slice(0, 12)}…
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
