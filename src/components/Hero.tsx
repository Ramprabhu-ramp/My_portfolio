import type { Profile } from "@/lib/types";

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="top" className="mx-auto max-w-4xl px-6 pb-20 pt-16 sm:pt-24">
      <div className="flex flex-col-reverse items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Hi, I&apos;m {profile.name}
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-3 max-w-xl text-xl text-muted sm:text-2xl">{profile.tagline}</p>
        </div>
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border border-border bg-surface sm:h-32 sm:w-32">
          {profile.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.photoUrl}
              alt={profile.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-2xl text-muted">
              {initials(profile.name) || "🙂"}
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href="#projects"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          View my work
        </a>
        <a
          href="#contact"
          className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}
