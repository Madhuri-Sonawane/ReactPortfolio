import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ────────────────────────────────────────────
   DATA — add more jobs to EXPERIENCES array
──────────────────────────────────────────── */
const EXPERIENCES = [
  {
    id: "01",
    title: "Junior React Developer",
    company: "Makedreams Technologies",
    period: "Oct 2024 – Present",
    type: "Full-time",
    location: "Remote",
    current: true,
    color: "sky",
    summary:
      "Building scalable React interfaces at the intersection of design and engineering — focused on clean components, API integration, and real delivery.",
    contributions: [
      {
        tag: "UI Development",
        headline: "Building Interfaces",
        body: "Developed responsive web interfaces using React, JavaScript (ES6+), HTML, and CSS — focusing on reusable components and consistent UI behavior across devices.",
        stack: ["React", "JavaScript", "HTML5", "CSS3"],
      },
      {
        tag: "State & Data",
        headline: "Data & State Handling",
        body: "Integrated REST APIs and managed application state using React Hooks and Context API, ensuring predictable data flow and smooth user interactions.",
        stack: ["React Hooks", "Context API", "REST APIs", "Axios"],
      },
      {
        tag: "Collaboration",
        headline: "Collaboration & Delivery",
        body: "Collaborated closely with UI/UX designers, used Git and GitHub for version control, and deployed applications on Vercel and Netlify.",
        stack: ["Git", "GitHub", "Vercel", "Netlify"],
      },
    ],
  },

  {
    id: "02",
    title: "Web Developer & SEO Specialist",
    company: "Premium Pet House",
    period: "Mar 2025 – Present",
    type: "Full-time",
    location: "Pune",
    current: true,
    color: "emerald",
    summary:
      "Redesigning and optimising the company website — combining frontend development with end-to-end SEO strategy to improve visibility, performance, and user experience.",
    contributions: [
      {
        tag: "Web Development",
        headline: "Website Redesign",
        body: "Redesigned the full company website using Bootstrap, CSS, and PHP — improving layout consistency, mobile responsiveness, and overall visual quality.",
        stack: ["Bootstrap", "CSS3", "PHP", "HTML5"],
      },
      {
        tag: "SEO Optimisation",
        headline: "SEO Strategy & Implementation",
        body: "Planned and executed a comprehensive SEO strategy covering keyword research, content optimisation, and search visibility improvements across the site.",
        stack: ["SEO", "Keyword Research", "Google Analytics", "Search Console"],
      },
      {
        tag: "Technical SEO",
        headline: "Technical SEO",
        body: "Improved site performance through technical SEO — including page speed, meta tags, structured data, sitemap, robots.txt, and crawlability fixes.",
        stack: ["Technical SEO", "Schema Markup", "Sitemap", "Core Web Vitals"],
      },
      {
        tag: "On-Page SEO",
        headline: "On-Page SEO",
        body: "Optimised on-page elements including title tags, meta descriptions, heading structure, internal linking, and image alt attributes across all key pages.",
        stack: ["On-Page SEO", "Meta Tags", "Internal Linking", "Content Optimisation"],
      },
    ],
  },
];

const METRICS = [
  { value: "2+",   label: "Years Experience" },
  { value: "2",    label: "Companies"         },
  { value: "10+",  label: "Components Built"  },
  { value: "4+",   label: "Skills Domains"    },
];

const COLOR = {
  sky:     { accent: "text-sky-400",     border: "border-sky-400/30",     bg: "bg-sky-400/8",     dot: "bg-sky-400",     tag: "bg-sky-400/10 text-sky-300 border border-sky-400/25",     activetab: "border-sky-400 text-sky-400",     glow: "rgba(56,189,248,0.07)"    },
  indigo:  { accent: "text-indigo-400",  border: "border-indigo-400/30",  bg: "bg-indigo-400/8",  dot: "bg-indigo-400",  tag: "bg-indigo-400/10 text-indigo-300 border border-indigo-400/25",  activetab: "border-indigo-400 text-indigo-400",  glow: "rgba(129,140,248,0.07)" },
  emerald: { accent: "text-emerald-400", border: "border-emerald-400/30", bg: "bg-emerald-400/8", dot: "bg-emerald-400", tag: "bg-emerald-400/10 text-emerald-300 border border-emerald-400/25", activetab: "border-emerald-400 text-emerald-400", glow: "rgba(52,211,153,0.07)"  },
  amber:   { accent: "text-amber-400",   border: "border-amber-400/30",   bg: "bg-amber-400/8",   dot: "bg-amber-400",   tag: "bg-amber-400/10 text-amber-300 border border-amber-400/25",   activetab: "border-amber-400 text-amber-400",   glow: "rgba(251,191,36,0.07)"  },
  rose:    { accent: "text-rose-400",    border: "border-rose-400/30",    bg: "bg-rose-400/8",    dot: "bg-rose-400",    tag: "bg-rose-400/10 text-rose-300 border border-rose-400/25",    activetab: "border-rose-400 text-rose-400",    glow: "rgba(251,113,133,0.07)" },
};

/* ── Blinking cursor ── */
function Cursor({ color = "sky" }) {
  const c = COLOR[color];
  return (
    <span className={`inline-block w-[2px] h-[0.85em] ${c.dot} ml-0.5 align-middle
                      animate-[blink_1s_step-end_infinite]`} />
  );
}

/* ── Sidebar job tab ── */
function JobTab({ exp, active, onClick }) {
  const c = COLOR[exp.color];
  return (
    <button
      onClick={onClick}
      className={`relative w-full text-left px-4 py-4 rounded-xl border
                  transition-all duration-300 overflow-hidden group
        ${active
          ? `${c.border} ${c.bg}`
          : "border-white/6 bg-transparent hover:border-white/12 hover:bg-white/[0.02]"
        }`}
    >
      {/* Active left bar */}
      {active && (
        <div className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full ${c.dot}`} />
      )}
      {/* Hover glow */}
      {active && (
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: `radial-gradient(ellipse at left center, ${c.glow}, transparent 70%)` }} />
      )}

      <div className="relative flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className={`text-xs font-bold font-[Sora] truncate transition-colors duration-200
                         ${active ? c.accent : "text-slate-400 group-hover:text-slate-200"}`}>
            {exp.title}
          </p>
          <p className="text-[11px] text-slate-600 truncate mt-0.5">{exp.company}</p>
          <p className="text-[10px] text-slate-700 font-mono mt-1">{exp.period}</p>
        </div>
        {exp.current && (
          <div className={`flex-shrink-0 mt-0.5 w-2 h-2 rounded-full ${c.dot} animate-pulse`} />
        )}
      </div>
    </button>
  );
}

/* ── Contribution row inside detail panel ── */
function ContributionRow({ item, index, color }) {
  const ref = useRef(null);
  const c = COLOR[color];

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, x: 16 },
      { opacity: 1, x: 0, duration: 0.45, ease: "power3.out", delay: index * 0.09 }
    );
  }, [index, color]);

  return (
    <div
      ref={ref}
      className={`group rounded-xl border ${c.border} bg-slate-900/40 p-5
                  transition-all duration-300 hover:-translate-y-0.5
                  hover:shadow-[0_10px_28px_var(--row-glow)]`}
      style={{ opacity: 0, "--row-glow": c.glow }}
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <h4 className="text-sm font-bold text-slate-100 font-[Sora] leading-snug">
          {item.headline}
        </h4>
        <span className={`flex-shrink-0 px-2 py-0.5 text-[10px] font-semibold uppercase
                          tracking-wider rounded-full ${c.tag}`}>
          {item.tag}
        </span>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.body}</p>
      <div className="flex flex-wrap gap-1.5">
        {item.stack.map((s) => (
          <span key={s} className="px-2 py-0.5 text-[10px] rounded-md border border-white/8
                                   bg-white/[0.03] text-slate-500 transition-colors
                                   group-hover:text-slate-400 group-hover:border-white/15">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Detail panel for selected job ── */
function ExperienceDetail({ exp }) {
  const panelRef = useRef(null);
  const c = COLOR[exp.color];
  const [typed, setTyped] = useState("");

  /* Typewriter on switch */
  useEffect(() => {
    setTyped("");
    let i = 0;
    const id = setInterval(() => {
      if (i <= exp.title.length) { setTyped(exp.title.slice(0, i)); i++; }
      else clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, [exp.title]);

  /* Fade on switch */
  useEffect(() => {
    gsap.fromTo(panelRef.current,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
    );
  }, [exp.id]);

  return (
    <div ref={panelRef} className="flex flex-col gap-7" style={{ opacity: 0 }}>

      {/* ── Role header card ── */}
      <div className={`rounded-2xl border ${c.border} overflow-hidden`}
           style={{ background: `radial-gradient(ellipse at top left, ${c.glow}, transparent 55%)` }}>

        {/* Terminal bar */}
        <div className="flex items-center gap-2 px-5 py-3 bg-slate-950/60 border-b border-white/6">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          <span className="ml-2 text-[11px] text-slate-600 font-mono">experience.json</span>
          {exp.current && (
            <span className="ml-auto flex items-center gap-1.5 text-[10px] text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Currently Active
            </span>
          )}
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
          {/* Title */}
          <div>
            <span className="text-[10px] font-mono text-slate-600 mb-2 block">role:</span>
            <h2 className={`text-2xl md:text-3xl font-black font-[Sora] ${c.accent} leading-tight`}>
              {typed}<Cursor color={exp.color} />
            </h2>
          </div>
          {/* JSON meta */}
          <div className="font-mono text-xs space-y-2 pt-1">
            {[
              { k: "company",  v: exp.company  },
              { k: "period",   v: exp.period   },
              { k: "type",     v: exp.type     },
              { k: "location", v: exp.location },
            ].map(({ k, v }) => (
              <div key={k} className="flex gap-3">
                <span className={`${c.accent} opacity-60 min-w-[60px]`}>{k}</span>
                <span className="text-slate-400">"<span className="text-slate-200">{v}</span>"</span>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="px-6 py-4 border-t border-white/6 bg-slate-950/30">
          <p className="text-xs text-slate-400 leading-relaxed italic">"{exp.summary}"</p>
        </div>
      </div>

      {/* ── Contributions ── */}
      <div>
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-semibold">
            Contributions
          </span>
          <div className="flex-1 h-px bg-white/6" />
          <span className="text-[10px] font-mono text-slate-700">
            {exp.contributions.length} tasks
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {exp.contributions.map((item, i) => (
            <ContributionRow key={item.tag} item={item} index={i} color={exp.color} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Metric card ── */
function MetricCard({ value, label, index }) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.4)",
        scrollTrigger: { trigger: ref.current, start: "top 92%" },
        delay: index * 0.08,
      }
    );
  }, [index]);

  return (
    <div ref={ref}
      className="rounded-2xl border border-white/8 bg-slate-900/40 p-5 text-center
                 transition-all duration-300 hover:-translate-y-1
                 hover:border-sky-400/30 hover:shadow-[0_16px_40px_rgba(56,189,248,0.08)]"
      style={{ opacity: 0 }}>
      <p className="text-3xl font-black text-sky-400 font-[Sora]">{value}</p>
      <p className="mt-1 text-[10px] text-slate-600 uppercase tracking-widest">{label}</p>
    </div>
  );
}

/* ────────────────────────────────────────────
   PAGE
──────────────────────────────────────────── */
export default function ExperiencePage() {
  const [activeId, setActiveId] = useState(EXPERIENCES[0].id);
  const pageRef   = useRef(null);
  const headerRef = useRef(null);

  const activeExp = EXPERIENCES.find((e) => e.id === activeId);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(Array.from(headerRef.current.children),
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: headerRef.current, start: "top 88%" },
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="relative min-h-screen px-[8%] py-28 overflow-hidden">

      {/* ── Background ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px]
                        rounded-full bg-sky-400/[0.025] blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px]
                        rounded-full bg-indigo-500/[0.025] blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(rgba(148,163,184,0.8) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* ── Header ── */}
      <div ref={headerRef} className="max-w-6xl mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="text-xs uppercase tracking-[0.25em] text-sky-400 font-semibold">
            Experience
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-100 font-[Sora]
                       leading-tight tracking-tight">
          How I Work<span className="text-sky-400">.</span>
        </h1>
        <p className="mt-5 text-base text-slate-500 max-w-xl leading-relaxed">
          A designer–developer approach to building React applications —
          combining clean UI, interaction thinking, and real-world engineering.
        </p>
      </div>

      {/* ── Two-column layout ── */}
      <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 mb-24 items-start">

        {/* LEFT — sticky sidebar */}
        <div className="lg:sticky lg:top-24 flex flex-col gap-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-semibold
                        mb-1 px-1">
            Companies
          </p>

          {EXPERIENCES.map((exp) => (
            <JobTab
              key={exp.id}
              exp={exp}
              active={activeId === exp.id}
              onClick={() => setActiveId(exp.id)}
            />
          ))}

          {/* Count badge */}
          <div className="mt-3 px-4 py-3 rounded-xl border border-white/6 bg-slate-900/30
                          text-center">
            <p className="text-2xl font-black text-slate-400 font-[Sora]">
              {String(EXPERIENCES.length).padStart(2, "0")}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-slate-600 mt-0.5">
              {EXPERIENCES.length === 1 ? "Company" : "Companies"}
            </p>
          </div>
        </div>

        {/* RIGHT — detail panel */}
        <ExperienceDetail key={activeExp.id} exp={activeExp} />
      </div>

      {/* ── Stats ── */}
      <div className="max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600 font-semibold">
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

      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}
