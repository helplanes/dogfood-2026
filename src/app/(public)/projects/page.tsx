import Link from "next/link";
import { getPublicProjects } from "@/repo/queries";

export const dynamic = "force-dynamic";

// Server-rendered so fixture titles are in the initial HTML. Search (?q=) and filter (?track=) are query params.
export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ q?: string; track?: string }> }) {
  const { q, track } = await searchParams;
  const projects = await getPublicProjects({ q, track });
  return (
    <main>
      <h1>Projects</h1>
      <form method="get" role="search">
        <label>
          Search <input name="q" defaultValue={q ?? ""} />
        </label>
        <label>
          Track <input name="track" defaultValue={track ?? ""} placeholder="trk_01" />
        </label>
        <button type="submit">Filter</button>
      </form>
      <p>{projects.length} projects</p>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <Link href={`/projects/${p.id}`}>{p.title}</Link>
            {p.teamName ? <> — {p.teamName}</> : null}
            <p>{p.summary}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
