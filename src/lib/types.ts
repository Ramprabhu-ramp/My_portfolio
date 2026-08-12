// Shared content types.
//
// These shapes are the single source of truth for portfolio content. Right
// now `placeholder-data.ts` implements them as static objects; later, once
// the database is wired up (see /admin), the same shapes will come back
// from Postgres via Prisma instead. Keeping the UI components typed against
// these interfaces means swapping the data source won't require touching
// any component code.

export interface SocialLink {
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  tagline: string;
  photoUrl?: string;
  bio: string[]; // one entry per paragraph, shown in the About section
  location: string;
  email: string;
  resumeUrl?: string;
  socialLinks: SocialLink[];
}

export interface SkillGroup {
  id: string;
  title: string; // e.g. "Core", "Also using"
  skills: string[];
  order: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
  featured: boolean;
  order: number;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  startDate: string; // e.g. "2023"
  endDate: string; // e.g. "Present"
  description: string;
  tags: string[];
  order: number;
}

export interface PortfolioContent {
  profile: Profile;
  skillGroups: SkillGroup[];
  projects: Project[];
  experience: ExperienceEntry[];
}
