import { authorize } from "@/policy";
import { getActor } from "@/server/auth";
import { apiError } from "@/server/http";
import { getLeaderboard } from "@/repo/queries";

export const dynamic = "force-dynamic";

// Neutralize spreadsheet formula injection and quote per RFC 4180.
function cell(v: string | number | boolean | null): string {
  let s = v === null ? "" : String(v);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET(req: Request) {
  const actor = await getActor(req);
  const decision = authorize(actor, "export:csv");
  if (!decision.ok) return apiError(decision.status, decision.status === 401 ? "unauthenticated" : "forbidden");

  const rows = await getLeaderboard();
  const header = ["rank", "project_id", "title", "track", "n_reviews", "raw_score", "normalized_score", "rescaled_score_1_5", "variance_warning", "duplicate_of"];
  const lines = [header.join(",")].concat(
    rows.map((r) =>
      [r.rank, r.id, r.title, r.track, r.n_reviews, r.rawScore.toFixed(3), r.normalizedScore.toFixed(3), r.rescaledScore.toFixed(2), r.hasVarianceWarning, r.duplicateOf]
        .map(cell)
        .join(","),
    ),
  );
  return new Response(lines.join("\n") + "\n", {
    headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": 'attachment; filename="results.csv"' },
  });
}
