import { SectionHeading } from "./SectionHeading";
import type { Profile } from "@/lib/types";

export function Contact({ profile }: { profile: Profile }) {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-16">
      <SectionHeading number="05" title="Contact" />
      <p className="max-w-xl text-muted">
        I&apos;m always open to new opportunities and interesting projects. The
        fastest way to reach me is by email.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <a
          href={`mailto:${profile.email}`}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {profile.email}
        </a>
        {profile.socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
}
