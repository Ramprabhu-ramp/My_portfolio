export function Footer({ name }: { name: string }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-4xl px-6 py-8 text-center text-xs text-muted">
        © {new Date().getFullYear()} {name}. Built with Next.js & Tailwind CSS.
      </div>
    </footer>
  );
}
