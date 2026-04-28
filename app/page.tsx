import Navigation from "@/components/Navigation";
import ThemeToggle from "@/components/ThemeToggle";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Experience from "@/components/Experience";
import BattleLog from "@/components/BattleLog";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import AIAgent from "@/components/AIAgent";

export default function Home() {
  return (
    <>
      <Navigation />
      <ThemeToggle />
      <main>
        <Hero />
        <Projects />
        <About />
        <Experience />
        <BattleLog />
        <Stats />
        <Contact />
      </main>
      <footer
        className="py-8 text-center font-mono text-xs border-t"
        style={{ borderColor: "var(--border)", color: "var(--foreground)", opacity: 0.3 }}
      >
        © {new Date().getFullYear()} Vaibhav Jathar — Built with Next.js + Groq
      </footer>
      <AIAgent />
    </>
  );
}
