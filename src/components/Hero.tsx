import type { Profile } from "@/lib/types";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="top" className="mx-auto max-w-4xl px-6 pb-20 pt-16 sm:pt-24">
      <p className="mb-4 font-mono text-sm text-accent">Hi, I&apos;m {profile.name.split(" ")[0]} 👋</p>
      <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
        {profile.tagline}
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted">{profile.bio[0]}</p>
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
