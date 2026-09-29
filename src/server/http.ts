// Denials are raw 4xx JSON, never redirects (the checker follows redirects).
export function apiError(status: number, error: string) {
  return Response.json({ error }, { status });
}
