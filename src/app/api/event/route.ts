import { getEventId, isSubmissionOpen } from "@/repo/queries";
import { apiError } from "@/server/http";

export const dynamic = "force-dynamic";

export async function GET() {
  const eventId = await getEventId();
  if (!eventId) return apiError(404, "no event configured");
  const open = await isSubmissionOpen(eventId);
  return Response.json({ eventId, submissionsOpen: open });
}
