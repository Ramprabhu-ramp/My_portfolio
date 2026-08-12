import { prisma } from "@/lib/prisma";
import { createExperience, deleteExperience, updateExperience } from "../actions";

export const dynamic = "force-dynamic";

export default async function ExperienceAdminPage() {
  const entries = await prisma.experienceEntry.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="text-xl font-semibold">Experience</h1>
      <p className="mt-1 text-sm text-muted">Your work-history timeline.</p>

      <div className="mt-8 space-y-4">
        {entries.map((entry) => (
          <form
            key={entry.id}
            action={updateExperience}
            className="rounded-xl border border-border bg-surface p-5"
          >
            <input type="hidden" name="id" value={entry.id} />
            <div className="grid gap-3 sm:grid-cols-2">
              <LabeledInput label="Role" name="role" defaultValue={entry.role} />
              <LabeledInput label="Company" name="company" defaultValue={entry.company} />
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <LabeledInput label="Start (e.g. 2022)" name="startDate" defaultValue={entry.startDate} />
              <LabeledInput label="End (e.g. Present)" name="endDate" defaultValue={entry.endDate} />
            </div>
            <div className="mt-3">
              <label className="mb-1 block text-xs text-muted">Description</label>
              <textarea
                name="description"
                defaultValue={entry.description}
                rows={2}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
            <div className="mt-3">
              <LabeledInput label="Tags (comma-separated)" name="tags" defaultValue={entry.tags.join(", ")} />
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
                formAction={deleteExperience}
                className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted hover:text-red-500"
              >
                Delete
              </button>
            </div>
          </form>
        ))}
      </div>

      <h2 className="mt-10 text-sm font-medium text-muted">Add a new entry</h2>
      <form action={createExperience} className="mt-3 rounded-xl border border-dashed border-border p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <LabeledInput label="Role" name="role" required />
          <LabeledInput label="Company" name="company" required />
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <LabeledInput label="Start (e.g. 2022)" name="startDate" required />
          <LabeledInput label="End (e.g. Present)" name="endDate" required />
        </div>
        <div className="mt-3">
          <label className="mb-1 block text-xs text-muted">Description</label>
          <textarea
            name="description"
            rows={2}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>
        <div className="mt-3">
          <LabeledInput label="Tags (comma-separated)" name="tags" />
        </div>
        <button
          type="submit"
          className="mt-3 rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-white hover:opacity-90"
        >
          Add entry
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
