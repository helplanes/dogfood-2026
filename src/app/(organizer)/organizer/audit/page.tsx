import Link from "next/link";
import { redirect } from "next/navigation";
import { authorize } from "@/policy";
import { getActorFromCookies } from "@/server/auth";

export const dynamic = "force-dynamic";

// No audit_log table exists yet (see DATA-MODEL.md). This page is gated correctly but shows
// an honest empty state rather than fabricated entries; do not claim a hash chain we don't have.
export default async function OrganizerAuditPage() {
  const actor = await getActorFromCookies();
  const decision = authorize(actor, "organizer:manage");
  if (!decision.ok) redirect("/login");

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
          <p className="text-stone-400 text-sm">Not implemented yet. This page is access-gated to organizers only.</p>
        </header>

        <div className="rounded-2xl bg-surface border border-stone-800 p-12 text-center font-mono text-xs text-stone-500">
          No audit log storage exists yet. Score writes are not yet recorded to an append-only log.
        </div>
      </div>
    </div>
  );
}
