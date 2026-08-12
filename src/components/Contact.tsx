import { SectionHeading } from "./SectionHeading";
import { iconForLabel } from "./icons";
import type { Profile } from "@/lib/types";

const DEFAULT_HEADLINE = "Got a challenge worth solving? Let's talk.";
const DEFAULT_MESSAGE =
  "I'm always open to new opportunities and interesting projects. The fastest way to reach me is by email.";

function Headline({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  if (words.length <= 2) {
    return <span className="underline decoration-wavy decoration-accent underline-offset-4">{text}</span>;
  }
  const lead = words.slice(0, -2).join(" ");
  const emphasis = words.slice(-2).join(" ");
  return (
    <>
      {lead}{" "}
      <span className="underline decoration-wavy decoration-accent underline-offset-4">{emphasis}</span>
    </>
  );
}

export function Contact({ profile }: { profile: Profile }) {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading number="04" title="Get in touch" />
      <div className="grid gap-10 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
            <Headline text={profile.contactHeadline || DEFAULT_HEADLINE} />
          </h3>
          <p className="mt-4 max-w-xl text-muted">
            {profile.contactMessage || DEFAULT_MESSAGE}
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-6 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Contact me
          </a>
        </div>

        <div className="space-y-6 text-sm">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-muted">Email</p>
            <a href={`mailto:${profile.email}`} className="underline hover:text-accent">
              {profile.email}
            </a>
          </div>
          {profile.socialLinks.length > 0 && (
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-muted">Elsewhere</p>
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
      </div>
    </section>
  );
}
