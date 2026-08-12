import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { getContent } from "@/lib/get-content";

// Always render fresh: once content is backed by the database, this makes
// sure admin edits show up on next page load without needing a redeploy.
export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Header name={content.profile.name} />
      <main className="flex-1">
        <Hero profile={content.profile} />
        <About profile={content.profile} />
        <Skills skillGroups={content.skillGroups} />
        <Projects projects={content.projects} />
        <Experience experience={content.experience} />
        <Contact profile={content.profile} />
      </main>
      <Footer name={content.profile.name} />
    </>
  );
}
