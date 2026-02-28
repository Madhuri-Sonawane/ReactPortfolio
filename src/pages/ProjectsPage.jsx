import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiGithub } from "react-icons/si";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsPage() {
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Animated underline ── */
      gsap.fromTo(lineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 88%" },
        }
      );

      /* ── Header children stagger ── */
      gsap.fromTo(
        Array.from(headerRef.current.children),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.65, ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: headerRef.current, start: "top 88%" },
        }
      );

      /* ── Cards cascade in ── */
      gsap.fromTo(
        cardRefs.current.filter(Boolean),
        { opacity: 0, y: 60, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.65, ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: gridRef.current, start: "top 85%" },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={pageRef} className="relative min-h-screen px-[8%] py-28 overflow-hidden">

      {/* ── Background glow blobs ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[400px] rounded-full
                        bg-sky-400/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full
                        bg-indigo-500/[0.04] blur-[120px]" />
      </div>

      {/* ── Page Header ── */}
      <div ref={headerRef} className="relative max-w-5xl">
        <p className="text-sm uppercase tracking-widest text-sky-400 font-medium">
          Selected Work
        </p>

        <h1 className="mt-3 text-5xl font-bold text-slate-100 leading-tight font-[Sora]">
          Projects
        </h1>

        <p className="mt-4 text-base text-slate-400 max-w-xl leading-relaxed">
          A selection of frontend projects focused on clean UI, reusable
          components, and real-world React development practices.
        </p>

        {/* Animated underline */}
        <div
          ref={lineRef}
          className="mt-8 h-px w-24 bg-gradient-to-r from-sky-400 to-transparent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* ── Projects Grid ── */}
      <div
        ref={gridRef}
        className="relative mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl"
      >
        {projects.map((project, i) => (
          <div
            key={project.title}
            ref={(el) => (cardRefs.current[i] = el)}
            style={{ opacity: 0 }}
          >
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>

      {/* ── Footer CTA ── */}
      <div className="relative mt-20 max-w-6xl flex items-center justify-between
                      border-t border-white/5 pt-8 flex-wrap gap-4">
        <p className="text-sm text-slate-500">
          More experiments and open-source work on GitHub
        </p>
        <a
          href="https://github.com/Madhuri-Sonawane"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                     border border-white/10 text-sm text-slate-300
                     hover:border-sky-400/40 hover:text-sky-300
                     transition-all duration-200 hover:-translate-y-0.5 group"
        >
          <SiGithub className="text-base" />
          View GitHub
          <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
        </a>
      </div>
    </section>
  );
}