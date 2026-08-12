const REPO_URL = "https://github.com/Ramprabhu-ramp/My_portfolio";

export function Footer({ name }: { name: string }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2 px-6 py-8 text-xs text-muted">
        <p>
          This website is built with <span className="font-medium text-foreground">React</span>,{" "}
          <span className="font-medium text-foreground">Next.js</span> and{" "}
          <span className="font-medium text-foreground">Tailwind CSS</span>.{" "}
          <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">
            Check it out on my GitHub
          </a>
          .
        </p>
        <p>
          © {new Date().getFullYear()} {name}
        </p>
      </div>
    </footer>
  );
}
