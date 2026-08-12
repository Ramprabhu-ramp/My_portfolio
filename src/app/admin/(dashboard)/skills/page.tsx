import { prisma } from "@/lib/prisma";
import { createSkillGroup, deleteSkillGroup, updateSkillGroup } from "../actions";

export default async function SkillsAdminPage() {
  const groups = await prisma.skillGroup.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="text-xl font-semibold">Skills</h1>
      <p className="mt-1 text-sm text-muted">Grouped skill badges shown in the Skills section.</p>

      <div className="mt-8 space-y-4">
        {groups.map((group) => (
          <form
            key={group.id}
            action={updateSkillGroup}
            className="rounded-xl border border-border bg-surface p-5"
          >
            <input type="hidden" name="id" value={group.id} />
            <div className="grid gap-3 sm:grid-cols-[200px_1fr]">
              <input
                name="title"
                defaultValue={group.title}
                placeholder="Group title (e.g. Core)"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
              />
              <input
                name="skills"
                defaultValue={group.skills.join(", ")}
                placeholder="Comma-separated skills"
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
            <div className="mt-3 flex gap-3">
              <button
                type="submit"
                className="rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-white hover:opacity-90"
              >
                Save
              </button>
              <button
                type="submit"
                formAction={deleteSkillGroup}
                className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted hover:text-red-500"
              >
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>

      <h2 className="mt-10 text-sm font-medium text-muted">Add a new group</h2>
      <form
        action={createSkillGroup}
        className="mt-3 rounded-xl border border-dashed border-border p-5"
      >
        <div className="grid gap-3 sm:grid-cols-[200px_1fr]">
          <input
            name="title"
            required
            placeholder="Group title (e.g. Core)"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
          <input
            name="skills"
            required
            placeholder="Comma-separated skills"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>
        <button
          type="submit"
          className="mt-3 rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-white hover:opacity-90"
        >
          Add group
        </button>
      </form>
    </div>
  );
}
