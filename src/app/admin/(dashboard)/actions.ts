"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import type { SocialLink } from "@/lib/types";

function revalidateAll() {
  revalidatePath("/");
  revalidatePath("/admin");
}

// ---------- Profile ----------

function parseSocialLinks(raw: string): SocialLink[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split("|").map((s) => s.trim());
      return { label: label || "Link", url: rest.join("|") || "" };
    })
    .filter((link) => link.url);
}

export async function updateProfile(formData: FormData) {
  const bio = String(formData.get("bio") ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  await prisma.profile.upsert({
    where: { id: 1 },
    update: {
      name: String(formData.get("name") ?? ""),
      tagline: String(formData.get("tagline") ?? ""),
      bio,
      location: String(formData.get("location") ?? ""),
      email: String(formData.get("email") ?? ""),
      resumeUrl: String(formData.get("resumeUrl") ?? "") || null,
      socialLinks: parseSocialLinks(String(formData.get("socialLinks") ?? "")),
    },
    create: {
      id: 1,
      name: String(formData.get("name") ?? ""),
      tagline: String(formData.get("tagline") ?? ""),
      bio,
      location: String(formData.get("location") ?? ""),
      email: String(formData.get("email") ?? ""),
      resumeUrl: String(formData.get("resumeUrl") ?? "") || null,
      socialLinks: parseSocialLinks(String(formData.get("socialLinks") ?? "")),
    },
  });

  revalidateAll();
}

// ---------- Skill groups ----------

function parseSkills(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function createSkillGroup(formData: FormData) {
  const count = await prisma.skillGroup.count();
  await prisma.skillGroup.create({
    data: {
      title: String(formData.get("title") ?? ""),
      skills: parseSkills(String(formData.get("skills") ?? "")),
      order: count,
    },
  });
  revalidateAll();
}

export async function updateSkillGroup(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  await prisma.skillGroup.update({
    where: { id },
    data: {
      title: String(formData.get("title") ?? ""),
      skills: parseSkills(String(formData.get("skills") ?? "")),
    },
  });
  revalidateAll();
}

export async function deleteSkillGroup(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  await prisma.skillGroup.delete({ where: { id } });
  revalidateAll();
}

// ---------- Projects ----------

function parseTags(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function createProject(formData: FormData) {
  const count = await prisma.project.count();
  await prisma.project.create({
    data: {
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      tags: parseTags(String(formData.get("tags") ?? "")),
      liveUrl: String(formData.get("liveUrl") ?? "") || null,
      repoUrl: String(formData.get("repoUrl") ?? "") || null,
      imageUrl: String(formData.get("imageUrl") ?? "") || null,
      featured: formData.get("featured") === "on",
      order: count,
    },
  });
  revalidateAll();
}

export async function updateProject(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  await prisma.project.update({
    where: { id },
    data: {
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      tags: parseTags(String(formData.get("tags") ?? "")),
      liveUrl: String(formData.get("liveUrl") ?? "") || null,
      repoUrl: String(formData.get("repoUrl") ?? "") || null,
      imageUrl: String(formData.get("imageUrl") ?? "") || null,
      featured: formData.get("featured") === "on",
    },
  });
  revalidateAll();
}

export async function deleteProject(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  await prisma.project.delete({ where: { id } });
  revalidateAll();
}

// ---------- Experience ----------

export async function createExperience(formData: FormData) {
  const count = await prisma.experienceEntry.count();
  await prisma.experienceEntry.create({
    data: {
      role: String(formData.get("role") ?? ""),
      company: String(formData.get("company") ?? ""),
      startDate: String(formData.get("startDate") ?? ""),
      endDate: String(formData.get("endDate") ?? ""),
      description: String(formData.get("description") ?? ""),
      tags: parseTags(String(formData.get("tags") ?? "")),
      order: count,
    },
  });
  revalidateAll();
}

export async function updateExperience(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  await prisma.experienceEntry.update({
    where: { id },
    data: {
      role: String(formData.get("role") ?? ""),
      company: String(formData.get("company") ?? ""),
      startDate: String(formData.get("startDate") ?? ""),
      endDate: String(formData.get("endDate") ?? ""),
      description: String(formData.get("description") ?? ""),
      tags: parseTags(String(formData.get("tags") ?? "")),
    },
  });
  revalidateAll();
}

export async function deleteExperience(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  await prisma.experienceEntry.delete({ where: { id } });
  revalidateAll();
}
