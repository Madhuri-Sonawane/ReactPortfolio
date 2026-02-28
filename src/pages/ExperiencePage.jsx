import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ── */
const ROLE = {
  title: "Junior React Developer",
  company: "Makedreams Technologies",
  period: "Oct 2024 – Present",
  type: "Full-time",
  location: "Remote",
};

const CONTRIBUTIONS = [
  {
    id: "01",
    tag: "UI Development",
    color: "sky",
    headline: "Building Interfaces",
    body: "Developed responsive web interfaces using React, JavaScript (ES6+), HTML, and CSS — focusing on reusable components and consistent UI behavior across devices.",
    stack: ["React", "JavaScript", "HTML5", "CSS3"],
  },
  {
    id: "02",
    tag: "State & Data",
    color: "indigo",
    headline: "Data & State Handling",
    body: "Integrated REST APIs and managed application state using React Hooks and Context API, ensuring predictable data flow and smooth user interactions.",
    stack: ["React Hooks", "Context API", "REST APIs", "Axios"],
  },
  {
    id: "03",
    tag: "Collaboration",
    color: "emerald",
    headline: "Collaboration & Delivery",
    body: "Collaborated closely with UI/UX designers, used Git and GitHub for version control, and deployed applications on Vercel and Netlify as part of real delivery cycles.",
    stack: ["Git", "GitHub", "Vercel", "Netlify"],
  },
];

const METRICS = [
  { value: "1+", label: "Year Experience" },
  { value: "3+", label: "Projects Shipped" },
  { value: "10+", label: "Components Built" },
  { value: "100%", label: "Remote Ready" },
];

const COLOR_MAP = {
  sky:     { dot: "bg-sky-400",     border: "border-sky-400/25",     tag: "bg-sky-400/10 text-sky-300 border-sky-400/25",     glow: "rgba(56,189,248,0.08)",  line: "bg-sky-400/40"    },
  indigo:  { dot: "bg-indigo-400",  border: "border-indigo-400/25",  tag: "bg-indigo-400/10 text-indigo-300 border-indigo-400/25",  glow: "rgba(129,140,248,0.08)", line: "bg-indigo-400/40" },
  emerald: { dot: "bg-emerald-400", border: "border-emerald-400/25", tag: "bg-emerald-400/10 text-emerald-300 border-emerald-400/25", glow: "rgba(52,211,153,0.08)",  line: "bg-emerald-400/40" },
};

/* ── Blinking cursor ── */
function Cursor() {
  return (
    <span className="inline-block w-[2px] h-[1em] bg-sky-400 ml-0.5 align-middle
                     animate-[blink_1s_step-end_infinite]" />
  );
}

/* ── Contribution block ── */
function ContributionBlock({ item, index }) {
  const blockRef = useRef(null);
  const c = COLOR_MAP[item.color];

  useEffect(() => {
    gsap.fromTo(blockRef.current,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0, duration: 0.65, ease: "power3.out",
        scrollTrigger: { trigger: blockRef.current, start: "top 88%" },
        delay: index * 0.1,
      }
    );
  }, [index]);

  return (
    <div
      ref={blockRef}
      className={`group relative rounded-2xl border ${c.border} p-6
                  transition-all duration-300 hover:-translate-y-1
                  hover:shadow-[0_20px_50px_var(--glow)]`}
      style={{
        opacity: 0,
        background: `radial-gradient(ellipse at top left, ${c.glow}, transparent 70%)`,
        "--glow": c.glow,
      }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between gap-4 mb-4">
        {/* Process ID + tag */}
        <div className="flex items-center gap-3">
          <span className="font-[Sora] text-xs font-bold text-slate-600 tracking-widest">
            {item.id}
          </span>
          <span className={`px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider
                            rounded-full border ${c.tag}`}>
            {item.tag}
          </span>
        </div>
        {/* Animated status dot */}
        <div className="flex items-center gap-1.5">
          <div className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse`} />
          <span className="text-[10px] text-slate-600 uppercase tracking-widest">active</span>
        </div>
      </div>

      {/* Headline */}
      <h3 className="text-xl font-bold text-slate-100 font-[Sora] leading-snug mb-3
                     group-hover:text-white transition-colors duration-200">
        {item.headline}
      </h3>

      {/* Body */}
      <p className="text-sm text-slate-400 leading-relaxed mb-5">
        {item.body}
      </p>

      {/* Stack pills */}
      <div className="flex flex-wrap gap-2">
        {item.stack.map((s) => (
          <span key={s}
            className="px-2.5 py-1 text-[11px] rounded-md border border-white/8
                       bg-white/[0.03] text-slate-400
                       transition-colors duration-200 group-hover:border-white/15">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Metric card ── */
function MetricCard({ value, label, index }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 24, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.4)",
        scrollTrigger: { trigger: ref.current, start: "top 92%" },
        delay: index * 0.08,
      }
    );
  }, [index]);

  return (
    <div ref={ref}
      className="rounded-2xl border border-white/8 bg-slate-900/50 p-6 text-center
                 transition-all duration-300 hover:-translate-y-1
                 hover:border-sky-400/30 hover:shadow-[0_16px_40px_rgba(56,189,248,0.1)]"
      style={{ opacity: 0 }}>
      <p className="text-3xl font-black text-sky-400 font-[Sora]">{value}</p>
      <p className="mt-1.5 text-xs text-slate-500 uppercase tracking-widest">{label}</p>
    </div>
  );
}

/* ── Page ── */
export default function ExperiencePage() {
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const jobCardRef = useRef(null);
  const [typed, setTyped] = useState("");
  const fullText = "Junior React Developer";

  /* Typewriter on mount */
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (i <= fullText.length) {
        setTyped(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(id);
      }
    }, 55);
    return () => clearInterval(id);
  }, []);

  /* GSAP header + job card entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(Array.from(headerRef.current.children),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: headerRef.current, start: "top 88%" },
        }
      );
      gsap.fromTo(jobCardRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: jobCardRef.current, start: "top 88%" },
          delay: 0.15,
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative min-h-screen px-[8%] py-28 overflow-hidden">

      {/* ── Atmosphere ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px]
                        rounded-full bg-sky-400/[0.03] blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px]
                        rounded-full bg-indigo-500/[0.03] blur-[120px]" />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(rgba(148,163,184,0.8) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* ── Page header ── */}
      <div ref={headerRef} className="max-w-6xl mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-xs uppercase tracking-[0.25em] text-sky-400 font-semibold">
            Experience
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-100 font-[Sora]
                       leading-tight tracking-tight" style={{ opacity: 0 }}>
          How I Work<span className="text-sky-400">.</span>
        </h1>
        <p className="mt-5 text-base text-slate-500 max-w-xl leading-relaxed" style={{ opacity: 0 }}>
          A designer–developer approach to building React applications —
          combining clean UI, interaction thinking, and real-world engineering.
        </p>
      </div>

      {/* ── Job card ── */}
      <div ref={jobCardRef}
        className="max-w-6xl mb-20 rounded-2xl border border-white/8 bg-slate-900/40
                   overflow-hidden"
        style={{ opacity: 0 }}>

        {/* Terminal top bar */}
        <div className="flex items-center gap-2 px-5 py-3 bg-slate-900/80 border-b border-white/6">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
          <span className="ml-3 text-xs text-slate-600 font-mono">experience.json</span>
        </div>

        {/* Card body */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Left — title */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-slate-600">role:</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-100 font-[Sora] leading-tight">
              {typed}<Cursor />
            </h2>

            <div className="mt-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-semibold text-emerald-400">Currently Active</span>
            </div>
          </div>

          {/* Right — meta */}
          <div className="font-mono text-sm space-y-3">
            {[
              { key: "company",  value: ROLE.company  },
              { key: "period",   value: ROLE.period   },
              { key: "type",     value: ROLE.type     },
              { key: "location", value: ROLE.location },
            ].map(({ key, value }) => (
              <div key={key} className="flex items-baseline gap-3">
                <span className="text-sky-400/70 min-w-[72px]">{key}</span>
                <span className="text-slate-400">"<span className="text-slate-200">{value}</span>"</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section label ── */}
      <div className="max-w-6xl mb-8 flex items-center gap-4">
        <span className="text-xs uppercase tracking-[0.2em] text-slate-600 font-semibold">
          Contributions
        </span>
        <div className="flex-1 h-px bg-white/6" />
        <span className="text-xs text-slate-700 font-mono">{CONTRIBUTIONS.length} processes</span>
      </div>

      {/* ── Contribution blocks ── */}
      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {CONTRIBUTIONS.map((item, i) => (
          <ContributionBlock key={item.id} item={item} index={i} />
        ))}
      </div>

      {/* ── Metrics ── */}
      <div className="max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-xs uppercase tracking-[0.2em] text-slate-600 font-semibold">
            Stats
          </span>
          <div className="flex-1 h-px bg-white/6" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {METRICS.map((m, i) => (
            <MetricCard key={m.label} value={m.value} label={m.label} index={i} />
          ))}
        </div>
      </div>

      {/* ── CSS for blinking cursor ── */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}