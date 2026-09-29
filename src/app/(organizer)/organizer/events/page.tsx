import Link from "next/link";
import { redirect } from "next/navigation";
import { authorize } from "@/policy";
import { getActorFromCookies } from "@/server/auth";
import { listEvents, listTracks } from "@/repo/queries";
import { EventForm } from "@/components/organizer/EventForm";
import { EventEditForm } from "@/components/organizer/EventEditForm";
import { TrackForm } from "@/components/organizer/TrackForm";

export const dynamic = "force-dynamic";

export default async function OrganizerEventsPage() {
  const actor = await getActorFromCookies();
  const decision = authorize(actor, "organizer:manage");
  if (!decision.ok) redirect("/login");

  const [events, tracks] = await Promise.all([listEvents(), listTracks()]);
  const tracksByEvent = new Map<string, typeof tracks>();
  for (const t of tracks) tracksByEvent.set(t.eventId, [...(tracksByEvent.get(t.eventId) ?? []), t]);

  return (
    <div className="min-h-screen bg-background text-stone-100 antialiased selection:bg-primary/30 px-4 py-8 md:px-12 md:py-12 flex flex-col font-sans">
      <div className="max-w-5xl mx-auto space-y-8 w-full">
        <header className="flex flex-col gap-4 pb-6 border-b border-stone-800/50">
          <Link href="/organizer/dashboard" className="text-xs font-mono text-stone-400 hover:text-primary transition-colors w-fit">
            &larr; DASHBOARD
          </Link>
          <h1 className="text-4xl md:text-5xl font-syne text-white tracking-tight">Events</h1>
          <p className="text-stone-400 text-sm">Create events with a submission deadline and prizes, and configure their tracks.</p>
        </header>

        <div className="rounded-2xl bg-surface border border-stone-800 p-6">
          <h2 className="text-sm font-mono uppercase tracking-widest text-stone-400 mb-4">New Event</h2>
          <EventForm />
        </div>

        <div className="space-y-4">
          {events.map((ev) => (
            <div key={ev.id} className="rounded-2xl bg-surface border border-stone-800 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-syne font-bold text-white">{ev.name}</h3>
                  <p className="text-xs font-mono text-stone-500 mt-1">ID: {ev.id}</p>
                </div>
                <span className="text-xs font-mono text-stone-400">
                  Closes {new Date(ev.submissionDeadline).toISOString()}
                </span>
              </div>
              {ev.prizes ? <p className="text-sm text-stone-300 font-sans">{ev.prizes}</p> : null}

              <EventEditForm
                eventId={ev.id}
                deadline={new Date(ev.submissionDeadline).toISOString()}
                prizes={ev.prizes}
              />

              <div className="pt-4 border-t border-stone-800/80 space-y-3">
                <p className="text-[10px] font-mono uppercase tracking-widest text-stone-500">Tracks</p>
                <div className="flex flex-wrap gap-2">
                  {(tracksByEvent.get(ev.id) ?? []).map((t) => (
                    <span key={t.id} className="px-2 py-1 rounded bg-stone-900 border border-stone-700/50 text-[10px] font-mono text-stone-300">
                      {t.name}
                    </span>
                  ))}
                </div>
                <TrackForm eventId={ev.id} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
