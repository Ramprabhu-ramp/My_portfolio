import { SectionHeading } from "./SectionHeading";
import { iconForLabel } from "./icons";
import type { Profile, SkillGroup } from "@/lib/types";

export function About({
  profile,
  skillGroups,
}: {
  profile: Profile;
  skillGroups: SkillGroup[];
}) {
  const sorted = [...skillGroups].sort((a, b) => a.order - b.order);
  const [primaryGroup, ...restGroups] = sorted;
  const moreSkills = restGroups.flatMap((g) => g.skills);

  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading number="01" title="About" />
      <div className="grid gap-10 sm:grid-cols-3">
        <div className="space-y-4 text-muted sm:col-span-2">
          {profile.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}

          {profile.socialLinks.length > 0 && (
            <div className="pt-2">
              <p className="text-sm text-muted">Find me at</p>
              <div className="mt-2 flex gap-3">
                {profile.socialLinks.map((link) => {
                  const Icon = iconForLabel(link.label);
                  return (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4 text-sm">
          {primaryGroup && (
            <div>
              <h3 className="mb-2 font-medium">Technologies I like</h3>
              <div className="flex flex-wrap gap-2">
                {primaryGroup.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {moreSkills.length > 0 && (
            <details className="group">
              <summary className="cursor-pointer text-muted marker:content-none hover:text-foreground">
                <span className="inline-block transition-transform group-open:rotate-90">▸</span>{" "}
                More, related technologies
              </summary>
              <div className="mt-2 flex flex-wrap gap-2">
                {moreSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-border bg-surface px-3 py-1 text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </details>
          )}

          <dl className="space-y-3 pt-2">
            <div>
              <dt className="text-muted">Location</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt className="text-muted">Email</dt>
              <dd>
                <a href={`mailto:${profile.email}`} className="hover:text-accent">
                  {profile.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
