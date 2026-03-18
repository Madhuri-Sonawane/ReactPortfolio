import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiReact, SiJavascript, SiHtml5, SiCss3,
  SiTailwindcss, SiGit, SiGithub, SiNodedotjs,
  SiMongodb, SiVite, SiGoogleanalytics,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ─────────────────────────────────── */
const SKILLS = [
  { icon: <SiReact />,        label: "React",      color: "#38bdf8" },
  { icon: <SiJavascript />,   label: "JavaScript", color: "#facc15" },
  { icon: <SiHtml5 />,        label: "HTML5",      color: "#f97316" },
  { icon: <SiCss3 />,         label: "CSS3",       color: "#38bdf8" },
  { icon: <SiTailwindcss />,  label: "Tailwind",   color: "#22d3ee" },
  { icon: <SiNodedotjs />,    label: "Node.js",    color: "#4ade80" },
  { icon: <SiMongodb />,      label: "MongoDB",    color: "#4ade80" },
  { icon: <SiGit />,          label: "Git",        color: "#f97316" },
  { icon: <SiGithub />,       label: "GitHub",     color: "#94a3b8" },
  { icon: <SiVite />,         label: "Vite",       color: "#a78bfa" },
];

const SEO_SKILLS = [
  { icon: <SiGoogleanalytics />,                                    label: "Google Analytics", color: "#f97316" },
  { icon: <span className="text-[11px] font-black">GSC</span>,     label: "Search Console",   color: "#34d399" },
  { icon: <span className="text-[11px] font-black">UB</span>,      label: "Ubersuggest",      color: "#a78bfa" },
  { icon: <span className="text-[11px] font-black">SEO</span>,     label: "Blog SEO",         color: "#38bdf8" },
  { icon: <span className="text-[11px] font-black">RM</span>,      label: "Rank Math",        color: "#f43f5e" },
];

const ACADEMICS = [
  { degree: "MCA",           detail: "CGPA: 9.0", year: "2022–24", color: "#38bdf8" },
  { degree: "B.Sc. Physics", detail: "73%",       year: "2019–22", color: "#818cf8" },
  { degree: "HSC — Science", detail: "66.92%",    year: "2019",    color: "#34d399" },
  { degree: "SSC",           detail: "84.80%",    year: "2017",    color: "#fbbf24" },
];

const HIGHLIGHTS = [
  { value: "1+",  sub: "year",     label: "Experience" },
  { value: "9.0", sub: "CGPA",     label: "MCA Score"  },
  { value: "3+",  sub: "projects", label: "Shipped"    },
  { value: "10+", sub: "tools",    label: "In Toolkit" },
];

/* ── Bento card wrapper ───────────────────── */
function Card({ children, className = "", style = {}, cardRef }) {
  return (
    <div
      ref={cardRef}
      className={`rounded-2xl border border-white/8 bg-slate-900/50
                  transition-all duration-300
                  hover:border-white/14 hover:bg-slate-900/70 ${className}`}
      style={{ opacity: 0, ...style }}
    >
      {children}
    </div>
  );
}

/* ── Section label ────────────────────────── */
function Label({ children }) {
  return (
    <p className="text-[10px] uppercase tracking-[0.22em] text-slate-600 font-semibold mb-4">
      {children}
    </p>
  );
}

/* ── Interactive Academic Item ────────────── */
function AcademicItem({ item }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const dotRef  = useRef(null);

  const handleEnter = () => {
    gsap.to(cardRef.current, {
      y: -10, scale: 1.04, zIndex: 10, duration: 0.35, ease: "power3.out",
      boxShadow: `0 24px 50px ${item.color}33`,
    });
    gsap.to(dotRef.current, {
      scale: 1.7, duration: 0.3, ease: "back.out(2)",
      boxShadow: `0 0 20px ${item.color}88, 0 0 40px ${item.color}44`,
    });
    gsap.to(glowRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      y: 0, scale: 1, zIndex: 1, duration: 0.4, ease: "power3.out",
      boxShadow: "none",
    });
    gsap.to(dotRef.current, {
      scale: 1, duration: 0.35, ease: "power3.out",
      boxShadow: `0 0 10px ${item.color}44`,
    });
    gsap.to(glowRef.current, { opacity: 0, scale: 0.8, duration: 0.35, ease: "power2.in" });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative flex flex-col items-center text-center px-3 py-5
                 cursor-default rounded-2xl"
      style={{ position: "relative", zIndex: 1 }}
    >
      {/* Glow blob */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          opacity: 0,
          background: `radial-gradient(ellipse at center, ${item.color}18, transparent 70%)`,
          border: `1px solid ${item.color}30`,
        }}
      />

      {/* Dot */}
      <div
        ref={dotRef}
        className="relative z-10 w-3.5 h-3.5 rounded-full border-2 mb-5 flex-shrink-0"
        style={{
          borderColor: item.color,
          backgroundColor: `${item.color}28`,
          boxShadow: `0 0 10px ${item.color}44`,
          transformOrigin: "center",
        }}
      />

      {/* Year */}
      <span className="text-[10px] font-mono mb-2" style={{ color: item.color }}>
        {item.year}
      </span>

      {/* Degree */}
      <p className="text-sm font-bold text-slate-300 font-[Sora] leading-snug mb-1.5">
        {item.degree}
      </p>

      {/* Score pill */}
      <span
        className="px-2.5 py-0.5 text-[10px] rounded-full font-semibold"
        style={{
          backgroundColor: `${item.color}15`,
          border: `1px solid ${item.color}35`,
          color: item.color,
        }}
      >
        {item.detail}
      </span>
    </div>
  );
}

/* ── Academic Timeline ────────────────────── */
function AcademicTimeline({ aRef }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 relative mt-2">
      {/* Connecting line */}
      <div
        className="hidden md:block absolute top-[2.15rem] left-[12.5%] right-[12.5%] h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(148,163,184,0.12), rgba(148,163,184,0.12), transparent)",
        }}
      />

      {ACADEMICS.map((item, i) => (
        <div key={item.degree} ref={aRef(i)} style={{ opacity: 0 }}>
          <AcademicItem item={item} />
          {i < ACADEMICS.length - 1 && (
            <div
              className="md:hidden mx-auto w-px h-6 mt-1"
              style={{
                background: `linear-gradient(to bottom, ${item.color}50, transparent)`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Page ─────────────────────────────────── */
export default function AboutPage() {
  const pageRef      = useRef(null);
  const headerRef    = useRef(null);
  const bentoRefs    = useRef([]);
  const academicRefs = useRef([]);

  const bRef = (i) => (el) => { bentoRefs.current[i] = el; };
  const aRef = (i) => (el) => { academicRefs.current[i] = el; };

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Header */
      gsap.fromTo(
        Array.from(headerRef.current.children),
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: headerRef.current, start: "top 88%" },
        }
      );

      /* Bento cards */
      gsap.fromTo(
        bentoRefs.current.filter(Boolean),
        { opacity: 0, y: 36, scale: 0.98 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: bentoRefs.current[0], start: "top 88%" },
        }
      );

      /* Academic items */
      gsap.fromTo(
        academicRefs.current.filter(Boolean),
        { opacity: 0, x: 20 },
        {
          opacity: 1, x: 0, duration: 0.5, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: academicRefs.current[0], start: "top 88%" },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative min-h-screen px-[8%] py-28 overflow-hidden">

      {/* ── Atmosphere ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[400px] rounded-full
                        bg-sky-400/[0.025] blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full
                        bg-indigo-500/[0.025] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(rgba(148,163,184,0.9) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* ── Page header ── */}
      <div ref={headerRef} className="max-w-6xl mb-14">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-xs uppercase tracking-[0.25em] text-sky-400 font-semibold">
            About
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-100 font-[Sora]
                       leading-tight tracking-tight">
          About Me<span className="text-sky-400">.</span>
        </h1>
        <p className="mt-4 text-base text-slate-500 max-w-lg leading-relaxed">
          Frontend developer, lifelong learner, and detail-obsessed builder.
        </p>
      </div>

      {/* ══ ROW 1: Bio + Stats ══ */}
      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">

        {/* Bio */}
        <Card cardRef={bRef(0)} className="md:col-span-7 p-7">
          <Label>Introduction</Label>
          <h2 className="text-2xl font-bold text-slate-100 font-[Sora] mb-4 leading-snug">
            I build interfaces that<br />
            <span className="text-sky-400">feel right.</span>
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-3">
            Frontend Developer with 1+ year of experience in React, modern JavaScript,
            and component-based UI development. I focus on building clean, maintainable,
            and scalable interfaces that align with real product requirements.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            My work involves translating designs into responsive interfaces, integrating
            APIs, and ensuring consistent experiences across devices. I value clarity in
            code, collaboration in teams, and continuous improvement.
          </p>
        </Card>

        {/* Stats */}
        <div className="md:col-span-5 grid grid-cols-2 gap-4">
          {HIGHLIGHTS.map((h, i) => (
            <Card key={h.label} cardRef={bRef(i + 1)} className="p-5 flex flex-col justify-between">
              <span className="text-[10px] uppercase tracking-widest text-slate-600">
                {h.label}
              </span>
              <div className="mt-3">
                <span className="text-3xl font-black text-sky-400 font-[Sora] leading-none">
                  {h.value}
                </span>
                <span className="ml-1.5 text-xs text-slate-500">{h.sub}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ══ ROW 2: Skills + NCC ══ */}
      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">

        {/* Skills */}
        <Card cardRef={bRef(5)} className="md:col-span-8 p-7">
          <Label>Tech Stack</Label>

          {/* Icon grid */}
          <div className="grid grid-cols-5 gap-3">
            {SKILLS.map(({ icon, label, color }) => (
              <div
                key={label}
                className="group flex flex-col items-center gap-2 p-3 rounded-xl
                           border border-white/6 bg-white/[0.02]
                           hover:border-white/14 hover:bg-white/[0.04]
                           transition-all duration-200 cursor-default"
              >
                <span
                  className="text-2xl transition-transform duration-200 group-hover:scale-110"
                  style={{ color }}
                >
                  {icon}
                </span>
                <span className="text-[10px] text-slate-500 group-hover:text-slate-300
                                 transition-colors duration-200 text-center leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* SEO tools sub-section */}
          <div className="mt-5 pt-5 border-t border-white/6">
            <p className="text-[10px] uppercase tracking-[0.22em] text-slate-600 font-semibold mb-3">
              SEO Tools
            </p>
            <div className="flex flex-wrap gap-2">
              {SEO_SKILLS.map(({ icon, label, color }) => (
                <div
                  key={label}
                  className="group flex items-center gap-2 px-3 py-2 rounded-xl
                             border border-white/6 bg-white/[0.02]
                             hover:border-white/14 hover:bg-white/[0.04]
                             transition-all duration-200 cursor-default"
                >
                  <span
                    className="text-base w-5 flex items-center justify-center
                               transition-transform duration-200 group-hover:scale-110"
                    style={{ color }}
                  >
                    {icon}
                  </span>
                  <span className="text-[11px] text-slate-500 group-hover:text-slate-300
                                   transition-colors duration-200">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* NCC */}
        <Card cardRef={bRef(6)} className="md:col-span-4 p-7 flex flex-col justify-between">
          <div>
            <Label>Extra-Curricular</Label>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-400/10 border border-emerald-400/20
                              flex items-center justify-center text-emerald-400 text-sm font-bold">
                NCC
              </div>
              <span className="text-sm font-semibold text-slate-200">National Cadet Corps</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Active NCC member during college — drills, training camps, and community
              service. Built discipline, teamwork, and a strong sense of responsibility.
            </p>
          </div>
          <div className="mt-6 flex gap-1">
            {["bg-emerald-400/60", "bg-sky-400/60", "bg-indigo-400/60"].map((c, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full ${c}`} />
            ))}
          </div>
        </Card>
      </div>

      {/* ══ ROW 3: Academics ══ */}
      <div className="max-w-6xl">
        <Card cardRef={bRef(7)} className="p-7" style={{ opacity: 0 }}>
          <Label>Academic Journey</Label>
          <AcademicTimeline aRef={aRef} />
        </Card>
      </div>

    </div>
  );
}
