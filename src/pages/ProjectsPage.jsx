import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiGithub } from "react-icons/si";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   EXPANDED DETAIL PANEL
───────────────────────────────────────────── */
function DetailPanel({ project, onClose }) {
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

  /* Animate in */
  useEffect(() => {
    gsap.fromTo(panelRef.current,
      { height: 0, opacity: 0 },
      { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out" }
    );
    gsap.fromTo(contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.15 }
    );
  }, []);

  const handleClose = () => {
    gsap.to(contentRef.current, { opacity: 0, y: -10, duration: 0.2, ease: "power2.in" });
    gsap.to(panelRef.current, {
      height: 0, opacity: 0, duration: 0.4, ease: "power3.in",
      onComplete: onClose,
    });
  };

  return (
    <div ref={panelRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
      <div ref={contentRef} className="border-t border-white/6 bg-slate-900/40 rounded-b-2xl"
           style={{ opacity: 0 }}>
        <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* LEFT — Screenshot */}
          <div>
            {project.image ? (
              <div className="relative rounded-xl overflow-hidden border border-white/10
                              shadow-[0_20px_60px_rgba(0,0,0,0.5)] group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                {/* Subtle scan overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent
                                to-slate-950/60 pointer-events-none" />
              </div>
            ) : (
              /* Placeholder when no image */
              <div className="w-full h-52 rounded-xl border border-white/8 bg-slate-800/60
                              flex items-center justify-center">
                <span className="text-slate-600 text-sm">No preview available</span>
              </div>
            )}

            {/* Action buttons below image */}
            <div className="mt-5 flex flex-wrap gap-3">
              {liveLinks.map((item, i) => (
                <a key={i} href={item.url} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                             bg-sky-400 text-slate-900 text-sm font-semibold
                             transition-all duration-200 hover:-translate-y-0.5
                             hover:shadow-[0_8px_24px_rgba(56,189,248,0.4)]">
                  <HiArrowTopRightOnSquare className="text-base" />
                  {item.label}
                </a>
              ))}
              {codeLinks.map((item, i) => (
                <a key={i} href={item.url} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                             border border-white/15 text-slate-300 text-sm
                             transition-all duration-200 hover:-translate-y-0.5
                             hover:border-sky-400/40 hover:text-sky-300">
                  <SiGithub className="text-base" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — Info */}
          <div className="flex flex-col gap-6">

            {/* About */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-sky-400 mb-3 font-semibold">
                About
              </h4>
              {project.description && (
                <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
              )}
              {project.points && project.points.length > 0 && (
                <ul className="mt-3 space-y-2">
                  {project.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                      <span className="mt-2 w-1 h-1 rounded-full bg-sky-400/70 flex-shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-sky-400 mb-3 font-semibold">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t}
                    className="px-3 py-1.5 text-xs rounded-full
                               bg-sky-400/8 border border-sky-400/20 text-sky-300
                               font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            {(liveLinks.length > 0 || codeLinks.length > 0) && (
              <div>
                <h4 className="text-xs uppercase tracking-widest text-sky-400 mb-3 font-semibold">
                  Links
                </h4>
                <div className="flex flex-col gap-2">
                  {liveLinks.map((item, i) => (
                    <a key={i} href={item.url} target="_blank" rel="noreferrer"
                       className="flex items-center gap-2 text-sm text-slate-400
                                  hover:text-sky-400 transition-colors group/link w-fit">
                      <HiArrowTopRightOnSquare className="text-sm group-hover/link:translate-x-0.5
                                                           transition-transform duration-200" />
                      {item.url}
                    </a>
                  ))}
                  {codeLinks.map((item, i) => (
                    <a key={i} href={item.url} target="_blank" rel="noreferrer"
                       className="flex items-center gap-2 text-sm text-slate-400
                                  hover:text-sky-400 transition-colors group/link w-fit">
                      <SiGithub className="text-sm" />
                      {item.url.replace("https://", "")}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Close */}
            <button
              onClick={handleClose}
              className="mt-auto self-start flex items-center gap-2 text-xs text-slate-600
                         hover:text-slate-400 transition-colors duration-200 uppercase tracking-widest"
            >
              <span className="rotate-45 text-base leading-none">+</span> Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROJECT ROW
───────────────────────────────────────────── */
function ProjectRow({ project, index }) {
  const rowRef = useRef(null);
  const numRef = useRef(null);
  const arrowRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  /* Scroll reveal */
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

  /* Arrow rotation on open/close */
  useEffect(() => {
    gsap.to(arrowRef.current, {
      rotate: open ? 45 : 0,
      duration: 0.35,
      ease: "power2.out",
    });
  }, [open]);

  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <div ref={rowRef} style={{ opacity: 0 }}>
      {/* ── Row ── */}
      <div
        className={`relative border-t border-white/8 cursor-pointer
                    transition-colors duration-300
                    ${hovered || open ? "bg-slate-800/40" : "bg-transparent"}
                    ${open ? "rounded-t-2xl" : "rounded-xl"}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleToggle}
      >
        {/* Active left bar */}
        <div
          className={`absolute left-0 top-0 h-full w-[2px] rounded-full
                      transition-all duration-300
                      ${open ? "bg-sky-400 opacity-100" : "bg-sky-400/0"}`}
        />

        <div className="py-7 px-4 grid grid-cols-12 gap-4 items-center">

          {/* Number */}
          <div className="col-span-1">
            <span
              className={`text-xs font-bold font-[Sora] tracking-wider transition-colors duration-300
                ${open ? "text-sky-400" : hovered ? "text-slate-400" : "text-slate-600"}`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Title + tags */}
          <div className="col-span-6 md:col-span-4">
            <h3
              className={`text-xl md:text-2xl font-bold font-[Sora] leading-tight
                          transition-colors duration-300
                          ${open || hovered ? "text-white" : "text-slate-300"}`}
            >
              {project.title}
            </h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.tech.slice(0, 3).map((t) => (
                <span key={t}
                  className={`text-[10px] px-2 py-0.5 rounded-full border
                              transition-all duration-300
                              ${open
                                ? "border-sky-400/30 text-sky-400/80"
                                : "border-white/10 text-slate-500"}`}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Description snippet — hidden on mobile */}
          <div className="hidden md:block col-span-4">
            <p className={`text-sm leading-relaxed transition-colors duration-300
              ${hovered || open ? "text-slate-400" : "text-slate-600"}`}>
              {project.description
                ? project.description.slice(0, 90) + "…"
                : project.points?.[0]?.slice(0, 90) + "…"}
            </p>
          </div>

          {/* Arrow button */}
          <div className="col-span-5 md:col-span-3 flex items-center justify-end">
            <div
              ref={arrowRef}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center
                          text-base font-bold transition-all duration-300
                          ${open
                            ? "border-sky-400/60 bg-sky-400/15 text-sky-400"
                            : hovered
                            ? "border-white/20 text-slate-300"
                            : "border-white/8 text-slate-600"}`}
            >
              →
            </div>
          </div>
        </div>
      </div>

      {/* ── Expandable detail panel ── */}
      {open && (
        <DetailPanel
          project={project}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function ProjectsPage() {
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
            <p className="hdr-tag text-xs uppercase tracking-[0.25em] text-sky-400 font-semibold mb-3"
               style={{ opacity: 0 }}>
              Portfolio
            </p>
            <h1 className="hdr-title text-6xl md:text-7xl font-black text-slate-100
                           leading-none font-[Sora] tracking-tight"
                style={{ opacity: 0 }}>
              Work<span className="text-sky-400">.</span>
            </h1>
            <p className="hdr-sub mt-4 text-base text-slate-500 max-w-sm leading-relaxed"
               style={{ opacity: 0 }}>
              Click any project to expand full details — screenshots, tech stack, and links.
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
      <div className="relative max-w-6xl space-y-0">
        {projects.map((project, i) => (
          <ProjectRow key={project.title} project={project} index={i} />
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
          github.com/Madhuri-Sonawane
          <span className="group-hover:translate-x-0.5 transition-transform duration-200 text-xs">→</span>
        </a>
      </div>
    </div>
  );
}