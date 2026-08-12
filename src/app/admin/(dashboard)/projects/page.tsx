import { prisma } from "@/lib/prisma";
import { createProject, deleteProject, updateProject } from "../actions";

export default async function ProjectsAdminPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="text-xl font-semibold">Projects</h1>
      <p className="mt-1 text-sm text-muted">Cards shown in the Projects section.</p>

      <div className="mt-8 space-y-4">
        {projects.map((project) => (
          <form
            key={project.id}
            action={updateProject}
            className="rounded-xl border border-border bg-surface p-5"
          >
            <input type="hidden" name="id" value={project.id} />
            <div className="grid gap-3 sm:grid-cols-2">
              <LabeledInput label="Title" name="title" defaultValue={project.title} />
              <LabeledInput label="Tags (comma-separated)" name="tags" defaultValue={project.tags.join(", ")} />
            </div>
            <div className="mt-3">
              <label className="mb-1 block text-xs text-muted">Description</label>
              <textarea
                name="description"
                defaultValue={project.description}
                rows={2}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              <LabeledInput label="Live URL" name="liveUrl" defaultValue={project.liveUrl ?? ""} />
              <LabeledInput label="Repo URL" name="repoUrl" defaultValue={project.repoUrl ?? ""} />
              <LabeledInput label="Image URL" name="imageUrl" defaultValue={project.imageUrl ?? ""} />
            </div>
            <label className="mt-3 flex items-center gap-2 text-sm text-muted">
              <input type="checkbox" name="featured" defaultChecked={project.featured} />
              Featured
            </label>
            <div className="mt-3 flex gap-3">
              <button
                type="submit"
                className="rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-white hover:opacity-90"
              >
                Save
              </button>
              <button
                type="submit"
                formAction={deleteProject}
                className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted hover:text-red-500"
              >
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>

      <h2 className="mt-10 text-sm font-medium text-muted">Add a new project</h2>
      <form action={createProject} className="mt-3 rounded-xl border border-dashed border-border p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <LabeledInput label="Title" name="title" required />
          <LabeledInput label="Tags (comma-separated)" name="tags" />
        </div>
        <div className="mt-3">
          <label className="mb-1 block text-xs text-muted">Description</label>
          <textarea
            name="description"
            rows={2}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <LabeledInput label="Live URL" name="liveUrl" />
          <LabeledInput label="Repo URL" name="repoUrl" />
          <LabeledInput label="Image URL" name="imageUrl" />
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm text-muted">
          <input type="checkbox" name="featured" defaultChecked />
          Featured
        </label>
        <button
          type="submit"
          className="mt-3 rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-white hover:opacity-90"
        >
          Add project
        </button>
      </form>
    </div>
  );
}

function LabeledInput({
  label,
  name,
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs text-muted">{label}</label>
      <input
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
      />
    </div>
  );
}
