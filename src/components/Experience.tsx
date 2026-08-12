import { SectionHeading } from "./SectionHeading";
import type { ExperienceEntry } from "@/lib/types";

export function Experience({ experience }: { experience: ExperienceEntry[] }) {
  const sorted = [...experience].sort((a, b) => a.order - b.order);

  return (
    <section id="experience" className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading number="04" title="Experience" />
      <ol className="space-y-8 border-l border-border pl-6">
        {sorted.map((entry) => (
          <li key={entry.id} className="relative">
            <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-semibold">
                {entry.role} · {entry.company}
              </h3>
              <span className="font-mono text-xs text-muted">
                {entry.startDate} — {entry.endDate}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted">{entry.description}</p>
            {entry.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-surface px-2.5 py-1 text-xs text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
