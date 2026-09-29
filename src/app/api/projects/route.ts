import { getPublicProjects } from "@/repo/queries";

export const dynamic = "force-dynamic";

// Public, unauthenticated — the API-first mirror of the /projects gallery page. No project has
// scores in this response; that's a separate, role-gated concern (see /api/judge/scores).
export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") ?? undefined;
  const track = url.searchParams.get("track") ?? undefined;
  return Response.json({ projects: await getPublicProjects({ q, track }) });
}
