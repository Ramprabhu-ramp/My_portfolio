import type { PortfolioContent } from "./types";

// Placeholder content — replace via the /admin dashboard once the database
// is connected. Everything here is sample text so the site looks complete
// before any real content is entered.

export const placeholderContent: PortfolioContent = {
  profile: {
    name: "Your Name",
    tagline: "I'm a Frontend & Full-Stack Developer.",
    photoUrl: "",
    bio: [
      "I build user-centered web applications, focusing on clean interfaces and reliable, maintainable code.",
      "Over the past few years I've worked across the stack — from pixel-level UI details to the APIs and databases behind them — with a focus on React, TypeScript, and modern web tooling.",
    ],
    location: "Your City, Country",
    email: "you@example.com",
    resumeUrl: "",
    contactHeadline: "Got a challenge worth solving? Let's talk.",
    contactMessage:
      "I'm open to freelance work and new opportunities across the full stack. If you've got something interesting, I'd love to hear about it.",
    socialLinks: [
      { label: "GitHub", url: "https://github.com/yourhandle" },
      { label: "LinkedIn", url: "https://linkedin.com/in/yourhandle" },
    ],
  },
  skillGroups: [
    {
      id: "core",
      title: "Core",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      order: 0,
    },
    {
      id: "also",
      title: "Also using",
      skills: ["Node.js", "PostgreSQL", "REST APIs", "Git"],
      order: 1,
    },
  ],
  projects: [
    {
      id: "project-1",
      title: "Sample Project One",
      description:
        "A short description of this project — what it does, the problem it solves, and your role in building it.",
      tags: ["Next.js", "TypeScript", "Tailwind"],
      liveUrl: "",
      repoUrl: "",
      imageUrl: "",
      featured: true,
      order: 0,
    },
    {
      id: "project-2",
      title: "Sample Project Two",
      description:
        "Another project description. Swap this out with real work once you're ready.",
      tags: ["React", "Node.js"],
      liveUrl: "",
      repoUrl: "",
      imageUrl: "",
      featured: true,
      order: 1,
    },
  ],
  experience: [
    {
      id: "exp-1",
      role: "Job Title",
      company: "Company Name",
      startDate: "2024",
      endDate: "Present",
      description: "A brief summary of your responsibilities and impact in this role.",
      tags: ["React", "TypeScript"],
      order: 0,
    },
    {
      id: "exp-2",
      role: "Previous Job Title",
      company: "Previous Company",
      startDate: "2022",
      endDate: "2024",
      description: "What you worked on here, and what you learned or delivered.",
      tags: ["JavaScript", "CSS"],
      order: 1,
    },
  ],
};
