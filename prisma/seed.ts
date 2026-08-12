import { PrismaClient } from "@prisma/client";
import { placeholderContent } from "../src/lib/placeholder-data";

const prisma = new PrismaClient();

async function main() {
  const { profile, skillGroups, projects, experience } = placeholderContent;

  await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: profile.name,
      tagline: profile.tagline,
      bio: profile.bio,
      location: profile.location,
      email: profile.email,
      resumeUrl: profile.resumeUrl || null,
      socialLinks: profile.socialLinks,
    },
  });

  // Only seed the lists if they're empty, so re-running seed doesn't
  // duplicate rows or wipe out real edits made through /admin.
  if ((await prisma.skillGroup.count()) === 0) {
    for (const group of skillGroups) {
      await prisma.skillGroup.create({
        data: { title: group.title, skills: group.skills, order: group.order },
      });
    }
  }

  if ((await prisma.project.count()) === 0) {
    for (const project of projects) {
      await prisma.project.create({
        data: {
          title: project.title,
          description: project.description,
          tags: project.tags,
          liveUrl: project.liveUrl || null,
          repoUrl: project.repoUrl || null,
          imageUrl: project.imageUrl || null,
          featured: project.featured,
          order: project.order,
        },
      });
    }
  }

  if ((await prisma.experienceEntry.count()) === 0) {
    for (const entry of experience) {
      await prisma.experienceEntry.create({
        data: {
          role: entry.role,
          company: entry.company,
          startDate: entry.startDate,
          endDate: entry.endDate,
          description: entry.description,
          tags: entry.tags,
          order: entry.order,
        },
      });
    }
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
