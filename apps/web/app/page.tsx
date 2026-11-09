import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Letter } from "../components/Letter";
import { Nav } from "../components/Nav";
import { Notes } from "../components/Notes";
import { Outcomes } from "../components/Outcomes";
import { ShellSetup } from "../components/ShellSetup";

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Outcomes />
        <ShellSetup />
        <Notes />
        <Letter />
      </main>
      <Footer />
    </>
  );
}
