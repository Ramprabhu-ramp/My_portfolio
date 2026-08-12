import { SectionHeading } from "./SectionHeading";
import type { SkillGroup } from "@/lib/types";

export function Skills({ skillGroups }: { skillGroups: SkillGroup[] }) {
  const sorted = [...skillGroups].sort((a, b) => a.order - b.order);

  return (
    <section id="skills" className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading number="02" title="Skills" />
      <div className="space-y-6">
        {sorted.map((group) => (
          <div key={group.id}>
            <h3 className="mb-3 text-sm font-medium text-muted">{group.title}</h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
