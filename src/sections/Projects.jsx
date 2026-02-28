import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiGithub } from "react-icons/si";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "CineFlix – Movie Streaming UI",
    description:
      "A Netflix-style frontend application built with React. Focused on component structure, API-driven data rendering, responsive layouts, and smooth UI animations.",
    tech: ["React", "JavaScript", "Tailwind CSS", "GSAP"],
    live: "https://cine-flix-pi.vercel.app/",
    code: "https://github.com/Madhuri-Sonawane/CineFlix",
    featured: true,
  },
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio built with React and Tailwind CSS to showcase projects, skills, and frontend development practices with a clean, professional UI.",
    tech: ["React", "Tailwind CSS", "GSAP", "Vite"],
    live: "#",
    code: "#",
    featured: false,
  },
];

function ProjectCard({ project, index, cardRef }) {
  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl border border-white/10 bg-slate-900/60
                 overflow-hidden transition-all duration-300
                 hover:-translate-y-1.5 hover:border-sky-400/40
                 hover:shadow-[0_24px_60px_rgba(56,189,248,0.12)]"
      style={{ opacity: 0 }}
    >
      {/* Top color bar */}
      <div className="h-1 w-full bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-400 opacity-60
                      group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-slate-100 leading-tight">
            {project.title}
          </h3>
          <div className="flex items-center gap-3 flex-shrink-0">
            {project.code !== "#" && (
              <a
                href={project.code}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-sky-400 transition-colors"
                title="View code"
              >
                <SiGithub className="text-xl" />
              </a>
            )}
            {project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="text-slate-400 hover:text-sky-400 transition-colors"
                title="Live demo"
              >
                <HiArrowTopRightOnSquare className="text-xl" />
              </a>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="mt-3 text-sm text-slate-400 leading-relaxed">
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-xs rounded-full
                         bg-sky-400/10 text-sky-300 border border-sky-400/20"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Heading */
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 88%" } }
      );

      /* Cards stagger */
      gsap.fromTo(cardRefs.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 0.6, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: cardRefs.current[0], start: "top 88%" },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={pageRef} className="min-h-screen px-[8%] py-28">

      {/* Header */}
      <div ref={headerRef} className="max-w-5xl" style={{ opacity: 0 }}>
        <h3 className="text-sm uppercase tracking-widest text-sky-400">Work</h3>
        <h1 className="mt-4 text-4xl font-semibold text-slate-100">Selected Projects</h1>
        <p className="mt-4 text-base text-slate-400 max-w-xl">
          A collection of frontend projects built with React, focused on clean UI,
          real-world structure, and smooth user experience.
        </p>
      </div>

      {/* Cards grid */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={i}
            cardRef={(el) => (cardRefs.current[i] = el)}
          />
        ))}
      </div>

      {/* CTA — More on GitHub */}
      <div className="mt-16 max-w-5xl">
        <a
          href="https://github.com/Madhuri-Sonawane"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-slate-400
                     hover:text-sky-400 transition-colors duration-200 group"
        >
          <SiGithub className="text-lg" />
          See more on GitHub
          <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
        </a>
      </div>
    </section>
  );
}