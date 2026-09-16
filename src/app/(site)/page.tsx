import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { WorkIndex } from "@/components/sections/WorkIndex";

/**
 * Home — a classic portfolio.
 *
 * Hero, then what he works with, then evidence, then history, then approach, then
 * contact. Every section scrolls normally: no pinning, no scroll hijacking, no
 * scene the visitor has to sit through. Motion reveals content as it arrives and
 * never gates it.
 *
 * `<main>` comes from the (site) layout, so nothing here re-declares it.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Skills />
      <WorkIndex />
      <Experience />
      <About />
    </>
  );
}
