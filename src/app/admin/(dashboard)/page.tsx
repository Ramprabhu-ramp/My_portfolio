import Link from "next/link";

const CARDS = [
  { href: "/admin/profile", title: "Profile", description: "Name, tagline, bio, contact & links" },
  { href: "/admin/skills", title: "Skills", description: "Skill groups shown in the Skills section" },
  { href: "/admin/projects", title: "Projects", description: "Add, edit or remove projects" },
  { href: "/admin/experience", title: "Experience", description: "Your work history timeline" },
];

export default function AdminHome() {
  return (
    <div>
      <h1 className="text-xl font-semibold">Content dashboard</h1>
      <p className="mt-1 text-sm text-muted">
        Changes here go live on your portfolio immediately — no redeploy needed.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent"
          >
            <h2 className="font-medium">{card.title}</h2>
            <p className="mt-1 text-sm text-muted">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
