import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Proof from "../components/Proof";
import Contact from "../components/Contact";
import { personal } from "../data/personal";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Experience />
        <Proof />
        <Contact />
      </main>
      <footer className="footer">
        © {new Date().getFullYear()} {personal.name}
      </footer>
    </>
  );
}
