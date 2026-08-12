import { prisma } from "@/lib/prisma";
import type { SocialLink } from "@/lib/types";
import { updateProfile } from "../actions";

export const dynamic = "force-dynamic";

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
          hint="A short one-line subheading under your name, e.g. “Frontend & Full-Stack Developer”. Keep it brief — it's shown right below your name in the hero."
        />
        <Field
          label="Photo URL (optional)"
          name="photoUrl"
          defaultValue={profile?.photoUrl ?? ""}
          hint="A link to a photo of you (e.g. from GitHub, LinkedIn, or any image host). Leave blank to show your initials instead."
        />
        <div>
          <label className="block text-sm font-medium">Bio</label>
          <p className="mb-1.5 text-xs text-muted">
            Separate paragraphs with a blank line. Shown in the About section only (not repeated in the hero).
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
          hint="A link to your resume/CV (PDF). The hero's “Download resume” button is hidden if this is blank."
        />
        <Field
          label="Contact headline"
          name="contactHeadline"
          defaultValue={profile?.contactHeadline ?? ""}
          hint="Big headline in the Contact section, e.g. “Got a challenge worth solving? Let's talk.”"
        />
        <div>
          <label className="block text-sm font-medium">Contact message</label>
          <p className="mb-1.5 text-xs text-muted">
            Short paragraph under the contact headline.
          </p>
          <textarea
            name="contactMessage"
            rows={3}
            defaultValue={profile?.contactMessage ?? ""}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Social links</label>
          <p className="mb-1.5 text-xs text-muted">
            One per line. Just paste a URL (e.g. <code>github.com/yourhandle</code>) and the
            label is guessed automatically — or write <code>Label | https://url</code> to set
            your own label.
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
