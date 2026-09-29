import { apiError } from "@/server/http";
import { getPublicProject } from "@/repo/queries";

export const dynamic = "force-dynamic";

// Public, unauthenticated — the API-first mirror of the /projects/[id] gallery detail page.
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getPublicProject(id);
  if (!project) return apiError(404, "not found");
  return Response.json(project);
}
