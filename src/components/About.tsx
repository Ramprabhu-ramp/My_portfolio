import { SectionHeading } from "./SectionHeading";
import type { Profile } from "@/lib/types";

export function About({ profile }: { profile: Profile }) {
  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading number="01" title="About" />
      <div className="grid gap-8 sm:grid-cols-3">
        <div className="space-y-4 text-muted sm:col-span-2">
          {profile.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <dl className="space-y-3 text-sm">
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
          {profile.socialLinks.map((link) => (
            <div key={link.label}>
              <dt className="text-muted">{link.label}</dt>
              <dd>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent"
                >
                  {link.url.replace(/^https?:\/\//, "")}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
