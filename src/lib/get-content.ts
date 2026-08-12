import { prisma } from "./prisma";
import type { PortfolioContent, SocialLink } from "./types";

// Single entry point the public site uses to read content — reads live
// from Postgres so that anything changed through /admin shows up on the
// next page load, no redeploy required.
export async function getContent(): Promise<PortfolioContent> {
  const [profile, skillGroups, projects, experience] = await Promise.all([
    prisma.profile.findUnique({ where: { id: 1 } }),
    prisma.skillGroup.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    prisma.experienceEntry.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!profile) {
    throw new Error(
      "No profile found in the database. Run `npm run db:seed` to add placeholder content."
    );
  }

  return {
    profile: {
      name: profile.name,
      tagline: profile.tagline,
      photoUrl: profile.photoUrl ?? undefined,
      bio: profile.bio,
      location: profile.location,
      email: profile.email,
      resumeUrl: profile.resumeUrl ?? undefined,
      contactHeadline: profile.contactHeadline ?? undefined,
      contactMessage: profile.contactMessage ?? undefined,
      socialLinks: (profile.socialLinks as unknown as SocialLink[]) ?? [],
    },
    skillGroups: skillGroups.map((g) => ({
      id: g.id,
      title: g.title,
      skills: g.skills,
      order: g.order,
    })),
    projects: projects.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      tags: p.tags,
      liveUrl: p.liveUrl ?? undefined,
      repoUrl: p.repoUrl ?? undefined,
      imageUrl: p.imageUrl ?? undefined,
      featured: p.featured,
      order: p.order,
    })),
    experience: experience.map((e) => ({
      id: e.id,
      role: e.role,
      company: e.company,
      startDate: e.startDate,
      endDate: e.endDate,
      description: e.description,
      tags: e.tags,
      order: e.order,
    })),
  };
}
