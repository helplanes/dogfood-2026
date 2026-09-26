import { PublicProject } from "@/contracts";

export function GalleryCard({ project }: { project: PublicProject }) {
  return (
    <div className="border border-border rounded-lg p-4 shadow-sm bg-card text-card-foreground flex flex-col h-full">
      <div className="flex-1">
        <h3 className="font-semibold text-lg mb-2 text-foreground">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{project.summary}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.track && (
            <span className="inline-block bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-md">
              {project.track}
            </span>
          )}
          {project.teamName && (
            <span className="inline-block bg-muted text-muted-foreground text-xs px-2 py-1 rounded-md">
              {project.teamName}
            </span>
          )}
        </div>
      </div>
      {project.repoUrl && (
        <a 
          href={project.repoUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline text-sm font-medium mt-auto"
        >
          View Source
        </a>
      )}
    </div>
  );
}
