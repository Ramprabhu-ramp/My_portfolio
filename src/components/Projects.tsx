import { SectionHeading } from "./SectionHeading";
import type { Project } from "@/lib/types";

export function Projects({ projects }: { projects: Project[] }) {
  const sorted = [...projects].sort((a, b) => a.order - b.order);

  return (
    <section id="projects" className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading number="02" title="Projects" />
      <div className="grid gap-6 sm:grid-cols-2">
        {sorted.map((project) => (
          <article
            key={project.id}
            className="flex flex-col rounded-xl border border-border bg-surface p-6"
          >
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="mt-2 flex-1 text-sm text-muted">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-background px-2.5 py-1 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            {(project.liveUrl || project.repoUrl) && (
              <div className="mt-4 flex gap-4 text-sm">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent hover:underline"
                  >
                    Live site →
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent hover:underline"
                  >
                    Source →
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
