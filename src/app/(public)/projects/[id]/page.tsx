import { notFound } from "next/navigation";
import { getPublicProject } from "@/repo/queries";

export const dynamic = "force-dynamic";

// Public view: no scores, ever.
export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = await getPublicProject(id);
  if (!p) notFound();
  return (
    <main>
      <h1>{p.title}</h1>
      {p.teamName ? <p>Team: {p.teamName}</p> : null}
      <p>{p.summary}</p>
      {p.repoUrl ? <a href={p.repoUrl} rel="noopener noreferrer">Repository</a> : null}
    </main>
  );
}
