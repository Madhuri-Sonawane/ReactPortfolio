import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiGithub } from "react-icons/si";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   FULL-SCREEN OVERLAY MODAL
───────────────────────────────────────────── */
function ProjectModal({ project, onClose }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const contentRef = useRef(null);

  const liveLinks = Array.isArray(project.live)
    ? project.live
    : project.live && project.live !== "#"
    ? [{ url: project.live, label: "Live Demo" }]
    : [];

  const codeLinks = Array.isArray(project.code)
    ? project.code
    : project.code && project.code !== "#"
    ? [{ url: project.code, label: "Source Code" }]
    : [];

  /* ── Open animation ── */
  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    )
    .fromTo(panelRef.current,
      { opacity: 0, scale: 0.94, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out" },
      "-=0.1"
    )
    .fromTo(contentRef.current.children,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", stagger: 0.07 },
      "-=0.2"
    );

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  /* ── Close animation ── */
  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current.children, {
      opacity: 0, y: -16, duration: 0.2, ease: "power2.in", stagger: 0.03,
    })
    .to(panelRef.current, { opacity: 0, scale: 0.94, y: 30, duration: 0.35, ease: "power3.in" }, "-=0.1")
    .to(overlayRef.current, { opacity: 0, duration: 0.25, ease: "power2.in" }, "-=0.2");
  };

  /* Close on Escape key */
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    /* ── Backdrop ── */
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{ opacity: 0 }}
    >
      {/* Click outside to close */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
        onClick={handleClose}
      />

      {/* ── Sliding panel ── */}
      <div
        ref={panelRef}
        className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-slate-950
                   rounded-2xl border border-white/10 overflow-y-auto shadow-[0_32px_80px_rgba(0,0,0,0.8)]"
        style={{ opacity: 0 }}
      >
        {/* ── Sticky top bar: title left, close right ── */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-3 py-2
                        bg-slate-950/95 backdrop-blur-sm border-b border-white/6 rounded-t-2xl">
          <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">
            Project Details
          </span>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-xl border border-white/10 bg-slate-900
                       flex items-center justify-center text-slate-400 text-base leading-none
                       hover:border-sky-400/50 hover:text-sky-400 hover:bg-sky-400/10
                       transition-all duration-200"
            title="Close (Esc)"
          >
            ✕
          </button>
        </div>

        {/* ── Panel content ── */}
        <div ref={contentRef} className="px-8 py-8 flex flex-col gap-10">

          {/* Project number + title */}
          <div>
            <span className="text-xs font-bold text-sky-400 font-[Sora] tracking-widest">
              Project
            </span>
            <h2 className="mt-2 text-xl md:text-4xl font-black text-slate-100
                           font-[Sora] leading-tight">
              {project.title}
            </h2>
          </div>

          {/* Screenshot */}
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-semibold">
              Preview
            </p>
            {project.image ? (
              <div className="rounded-2xl overflow-hidden border border-white/10
                              shadow-[0_20px_60px_rgba(0,0,0,0.6)] group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full object-cover transition-transform duration-700
                             group-hover:scale-[1.02]"
                />
              </div>
            ) : (
              <div className="w-full h-48 rounded-2xl border border-white/8 bg-slate-900/60
                              flex items-center justify-center">
                <span className="text-slate-600 text-sm">No preview available</span>
              </div>
            )}
          </div>

          {/* About */}
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-4 font-semibold">
              About
            </p>
            {project.description && (
              <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
            )}
            {project.points && project.points.length > 0 && (
              <ul className="mt-4 space-y-2.5">
                {project.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-sky-400/60 flex-shrink-0" />
                    {pt}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Tech Stack */}
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500 mb-4 font-semibold">
              Tech Stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t}
                  className="px-3 py-1.5 text-xs rounded-full font-medium
                             bg-sky-400/8 border border-sky-400/20 text-sky-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links
          {(liveLinks.length > 0 || codeLinks.length > 0) && (
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-4 font-semibold">
                Links
              </p>
              <div className="flex flex-col gap-3">
                {liveLinks.map((item, i) => (
                  <a key={i} href={item.url} target="_blank" rel="noreferrer"
                     className="flex items-center justify-between px-5 py-3.5 rounded-xl
                                border border-white/8 bg-slate-900/60 group/link
                                hover:border-sky-400/40 transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <HiArrowTopRightOnSquare className="text-sky-400 text-base" />
                      <div>
                        <p className="text-sm font-medium text-slate-200">{item.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5 truncate max-w-xs">
                          {item.url}
                        </p>
                      </div>
                    </div>
                    <span className="text-slate-600 group-hover/link:text-sky-400
                                     group-hover/link:translate-x-1
                                     transition-all duration-200 text-sm">→</span>
                  </a>
                ))}
                {codeLinks.map((item, i) => (
                  <a key={i} href={item.url} target="_blank" rel="noreferrer"
                     className="flex items-center justify-between px-5 py-3.5 rounded-xl
                                border border-white/8 bg-slate-900/60 group/link
                                hover:border-sky-400/40 transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <SiGithub className="text-slate-400 text-base" />
                      <div>
                        <p className="text-sm font-medium text-slate-200">{item.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5 truncate max-w-xs">
                          {item.url.replace("https://", "")}
                        </p>
                      </div>
                    </div>
                    <span className="text-slate-600 group-hover/link:text-sky-400
                                     group-hover/link:translate-x-1
                                     transition-all duration-200 text-sm">→</span>
                  </a>
                ))}
              </div>
            </div>
          )} */}

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 pb-4">
            {liveLinks.map((item, i) => (
              <a key={i} href={item.url} target="_blank" rel="noreferrer"
                 className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                            bg-sky-400 text-slate-900 text-sm font-semibold
                            transition-all duration-200 hover:-translate-y-0.5
                            hover:shadow-[0_8px_24px_rgba(56,189,248,0.4)]">
                <HiArrowTopRightOnSquare />
                {item.label}
              </a>
            ))}
            {codeLinks.map((item, i) => (
              <a key={i} href={item.url} target="_blank" rel="noreferrer"
                 className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                            border border-white/15 text-slate-300 text-sm
                            transition-all duration-200 hover:-translate-y-0.5
                            hover:border-sky-400/40 hover:text-sky-300">
                <SiGithub />
                {item.label}
              </a>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROJECT ROW
───────────────────────────────────────────── */
function ProjectRow({ project, index, onOpen }) {
  const rowRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    gsap.fromTo(rowRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.65, ease: "power3.out",
        scrollTrigger: { trigger: rowRef.current, start: "top 90%" },
        delay: index * 0.07,
      }
    );
  }, [index]);

  return (
    <div ref={rowRef} style={{ opacity: 0 }}>
      <div
        className={`relative border-t border-white/8 cursor-pointer rounded-xl
                    transition-colors duration-300 px-4 py-7
                    ${hovered ? "bg-slate-800/50" : "bg-transparent"}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={onOpen}
      >
        {/* Active left bar on hover */}
        <div className={`absolute left-0 top-2 bottom-2 w-[2px] rounded-full
                         transition-all duration-300
                         ${hovered ? "bg-sky-400 opacity-100" : "opacity-0"}`} />

        <div className="grid grid-cols-12 gap-4 items-center">

          {/* Number */}
          <div className="col-span-1">
            <span className={`text-xs font-bold font-[Sora] tracking-wider
                              transition-colors duration-300
                              ${hovered ? "text-sky-400" : "text-slate-600"}`}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Title + tags */}
          <div className="col-span-7 md:col-span-4">
            <h3 className={`text-xl md:text-2xl font-bold font-[Sora] leading-tight
                            transition-colors duration-300
                            ${hovered ? "text-white" : "text-slate-300"}`}>
              {project.title}
            </h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.tech.slice(0, 3).map((t) => (
                <span key={t}
                  className={`text-[10px] px-2 py-0.5 rounded-full border
                              transition-all duration-300
                              ${hovered
                                ? "border-sky-400/30 text-sky-400/80"
                                : "border-white/10 text-slate-500"}`}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="hidden md:block col-span-4">
            <p className={`text-sm leading-relaxed transition-colors duration-300
              ${hovered ? "text-slate-400" : "text-slate-600"}`}>
              {(project.description || project.points?.[0] || "").slice(0, 90)}…
            </p>
          </div>

          {/* Arrow */}
          <div className="col-span-4 md:col-span-3 flex items-center justify-end">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center
                             text-base font-bold transition-all duration-300
                             ${hovered
                               ? "border-sky-400/60 bg-sky-400/15 text-sky-400 translate-x-1"
                               : "border-white/8 text-slate-600"}`}>
              →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState(null);
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: headerRef.current, start: "top 88%" },
      });
      tl.fromTo(".hdr-tag",   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
        .fromTo(".hdr-title", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.2")
        .fromTo(".hdr-sub",   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.2");

      gsap.fromTo(counterRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)",
          scrollTrigger: { trigger: counterRef.current, start: "top 90%" } }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative min-h-screen px-[8%] py-28 overflow-hidden">

      {/* ── Atmosphere ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] rounded-full
                        bg-sky-500/[0.025] blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full
                        bg-indigo-500/[0.025] blur-[140px]" />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Header ── */}
      <div ref={headerRef} className="relative max-w-6xl mb-16">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <p className="hdr-tag text-xs uppercase tracking-[0.25em] text-sky-400
                          font-semibold mb-3" style={{ opacity: 0 }}>
              Portfolio
            </p>
            <h1 className="hdr-title text-6xl md:text-7xl font-black text-slate-100
                           leading-none font-[Sora] tracking-tight" style={{ opacity: 0 }}>
              Work<span className="text-sky-400">.</span>
            </h1>
            <p className="hdr-sub mt-4 text-base text-slate-500 max-w-sm leading-relaxed"
               style={{ opacity: 0 }}>
              Click any project row to view full details — screenshots, tech stack &amp; links.
            </p>
          </div>

          <div ref={counterRef}
               className="flex-shrink-0 w-20 h-20 rounded-2xl border border-white/8
                          bg-slate-900/60 flex flex-col items-center justify-center"
               style={{ opacity: 0 }}>
            <span className="text-3xl font-black text-sky-400 font-[Sora] leading-none">
              {String(projects.length).padStart(2, "0")}
            </span>
            <span className="text-[9px] uppercase tracking-widest text-slate-500 mt-1">
              Projects
            </span>
          </div>
        </div>
      </div>

      {/* ── Project rows ── */}
      <div className="relative max-w-6xl">
        {projects.map((project, i) => (
          <ProjectRow
            key={project.title}
            project={project}
            index={i}
            onOpen={() => setActiveProject(project)}
          />
        ))}
        <div className="h-px w-full bg-white/8" />
      </div>

      {/* ── Footer ── */}
      <div className="relative max-w-6xl mt-16 flex items-center justify-between flex-wrap gap-4">
        <p className="text-xs text-slate-600 uppercase tracking-widest">More on GitHub →</p>
        <a href="https://github.com/Madhuri-Sonawane"
           target="_blank" rel="noreferrer"
           className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                      border border-white/10 text-sm text-slate-400
                      hover:border-sky-400/40 hover:text-sky-300
                      transition-all duration-200 hover:-translate-y-0.5 group">
          <SiGithub />
          GitHub
          <span className="group-hover:translate-x-0.5 transition-transform text-xs">→</span>
        </a>
      </div>

      {/* ── Modal overlay ── */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </div>
  );
}