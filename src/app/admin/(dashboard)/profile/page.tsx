import { prisma } from "@/lib/prisma";
import type { SocialLink } from "@/lib/types";
import { updateProfile } from "../actions";

export default async function ProfileAdminPage() {
  const profile = await prisma.profile.findUnique({ where: { id: 1 } });
  const socialLinks = (profile?.socialLinks as unknown as SocialLink[]) ?? [];

  return (
    <div>
      <h1 className="text-xl font-semibold">Profile</h1>
      <p className="mt-1 text-sm text-muted">
        Powers the Hero, About and Contact sections.
      </p>

      <form action={updateProfile} className="mt-8 max-w-xl space-y-5">
        <Field label="Name" name="name" defaultValue={profile?.name} required />
        <Field
          label="Tagline"
          name="tagline"
          defaultValue={profile?.tagline}
          required
          hint="Shown as the big headline on the homepage."
        />
        <div>
          <label className="block text-sm font-medium">Bio</label>
          <p className="mb-1.5 text-xs text-muted">
            Separate paragraphs with a blank line. The first paragraph also appears in the hero.
          </p>
          <textarea
            name="bio"
            rows={5}
            defaultValue={profile?.bio.join("\n\n")}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>
        <Field label="Location" name="location" defaultValue={profile?.location} />
        <Field label="Email" name="email" type="email" defaultValue={profile?.email} required />
        <Field
          label="Resume URL (optional)"
          name="resumeUrl"
          defaultValue={profile?.resumeUrl ?? ""}
        />
        <div>
          <label className="block text-sm font-medium">Social links</label>
          <p className="mb-1.5 text-xs text-muted">
            One per line, format: <code>Label | https://url</code>
          </p>
          <textarea
            name="socialLinks"
            rows={4}
            defaultValue={socialLinks.map((l) => `${l.label} | ${l.url}`).join("\n")}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  type = "text",
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  required?: boolean;
  type?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      {hint && <p className="mb-1.5 text-xs text-muted">{hint}</p>}
      <input
        type={type}
        name={name}
        defaultValue={defaultValue ?? ""}
        required={required}
        className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
      />
    </div>
  );
}
