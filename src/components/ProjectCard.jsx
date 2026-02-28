import { useRef } from "react";
import gsap from "gsap";
import { SiGithub } from "react-icons/si";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";

export default function ProjectCard({ project, index = 0 }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const imageRef = useRef(null);

  /* ── Mouse-tracking glow effect ── */
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(glow, {
      x: x - 150,
      y: y - 150,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleMouseEnter = () => {
    gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
    gsap.to(imageRef.current, { scale: 1.05, duration: 0.5, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
    gsap.to(imageRef.current, { scale: 1, duration: 0.5, ease: "power2.out" });
  };

  /* ── Resolve live/code links ── */
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

  /* ── Accent color per card index ── */
  const accents = [
    { glow: "rgba(56,189,248,0.15)", border: "rgba(56,189,248,0.5)", bar: "from-sky-400 via-cyan-300 to-sky-500" },
    { glow: "rgba(129,140,248,0.15)", border: "rgba(129,140,248,0.5)", bar: "from-indigo-400 via-violet-400 to-indigo-500" },
    { glow: "rgba(52,211,153,0.15)", border: "rgba(52,211,153,0.5)", bar: "from-emerald-400 via-teal-300 to-emerald-500" },
    { glow: "rgba(251,191,36,0.15)", border: "rgba(251,191,36,0.5)", bar: "from-amber-400 via-yellow-300 to-amber-500" },
  ];
  const accent = accents[index % accents.length];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl bg-slate-900/60 border border-white/8
                 overflow-hidden transition-all duration-300
                 hover:-translate-y-2"
      style={{
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* ── Mouse-tracking glow blob ── */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute w-[300px] h-[300px] rounded-full blur-[80px]"
        style={{
          background: accent.glow,
          opacity: 0,
          top: 0,
          left: 0,
        }}
      />

      {/* ── Animated top border bar ── */}
      <div
        className={`h-[2px] w-full bg-gradient-to-r ${accent.bar}
                    opacity-40 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* ── Project Image ── */}
      {project.image && (
        <div className="relative h-48 w-full overflow-hidden bg-slate-800/80">
          <img
            ref={imageRef}
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
            style={{ transformOrigin: "center center" }}
          />
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

          {/* Floating index number */}
          <div className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-slate-950/80
                          border border-white/10 flex items-center justify-center
                          text-xs font-bold text-slate-400 font-[Sora]">
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Quick action buttons on hover — appear over image */}
          <div className="absolute top-3 right-3 flex gap-2
                          opacity-0 group-hover:opacity-100 transition-all duration-300
                          translate-y-1 group-hover:translate-y-0">
            {liveLinks[0] && (
              <a
                href={liveLinks[0].url}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-950/80 border border-white/20
                           flex items-center justify-center text-slate-300
                           hover:text-sky-400 hover:border-sky-400/50 transition-colors"
                title="Live Demo"
              >
                <HiArrowTopRightOnSquare className="text-sm" />
              </a>
            )}
            {codeLinks[0] && (
              <a
                href={codeLinks[0].url}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-950/80 border border-white/20
                           flex items-center justify-center text-slate-300
                           hover:text-sky-400 hover:border-sky-400/50 transition-colors"
                title="Source Code"
              >
                <SiGithub className="text-sm" />
              </a>
            )}
          </div>
        </div>
      )}

      {/* ── Card Content ── */}
      <div className="relative z-10 p-6">

        {/* Title row */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-100 leading-snug font-[Sora]
                         group-hover:text-white transition-colors duration-200">
            {project.title}
          </h3>

          {/* Icon links (shown when no image, or always on mobile) */}
          {!project.image && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {codeLinks[0] && (
                <a
                  href={codeLinks[0].url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-500 hover:text-sky-400 transition-colors"
                  title="Source Code"
                >
                  <SiGithub className="text-lg" />
                </a>
              )}
              {liveLinks[0] && (
                <a
                  href={liveLinks[0].url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-500 hover:text-sky-400 transition-colors"
                  title="Live Demo"
                >
                  <HiArrowTopRightOnSquare className="text-lg" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Description / bullet points */}
        {project.description && (
          <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        )}

        {project.points && project.points.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {project.points.slice(0, 3).map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-sky-400/60 flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        )}

        {/* Divider */}
        <div className="mt-5 h-px w-full bg-white/5" />

        {/* Tech pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="text-xs px-2.5 py-1 rounded-full
                         bg-white/5 text-slate-400 border border-white/8
                         transition-all duration-200
                         group-hover:border-white/15 group-hover:text-slate-300"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        {(liveLinks.length > 0 || codeLinks.length > 0) && (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {/* Live buttons */}
            {liveLinks.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full
                           bg-sky-400 px-4 py-2 text-xs font-semibold text-slate-900
                           transition-all duration-200
                           hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(56,189,248,0.4)]"
              >
                <HiArrowTopRightOnSquare className="text-sm" />
                {item.label}
              </a>
            ))}

            {/* Code buttons */}
            {codeLinks.map((item, i) => (
              <a
                key={i}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full
                           border border-white/15 px-4 py-2 text-xs text-slate-300
                           transition-all duration-200
                           hover:border-sky-400/40 hover:text-sky-300 hover:-translate-y-0.5"
              >
                <SiGithub className="text-sm" />
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}