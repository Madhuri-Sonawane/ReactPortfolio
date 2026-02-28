import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILL_GROUPS = [
  {
    title: "Frontend",
    desc: "Component-based UI and modern JavaScript development.",
    color: "sky",
    skills: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "TypeScript"],
  },
  {
    title: "State Management",
    desc: "Managing application state with modern React patterns.",
    color: "sky",
    skills: ["React Hooks", "Context API", "Redux (Basic)"],
  },
  {
    title: "Styling & UI",
    desc: "Clean, responsive, and scalable UI systems.",
    color: "sky",
    skills: ["Tailwind CSS", "Bootstrap", "Material UI", "Responsive Design"],
  },
  {
    title: "Backend & APIs",
    desc: "Working with APIs and backend services.",
    color: "sky",
    skills: ["Node.js", "MongoDB", "REST APIs", "JSON", "Axios"],
  },
  {
    title: "Tools & Deployment",
    desc: "Modern development workflow and deployment.",
    color: "sky",
    skills: ["Git", "GitHub", "VS Code", "npm", "Chrome DevTools", "Vercel", "Netlify"],
  },
  {
    title: "Soft Skills",
    desc: "Professional skills for effective collaboration.",
    color: "sky",
    skills: ["Problem-solving", "Teamwork", "Adaptability", "Communication"],
  },
];

const ACADEMICS = [
  { degree: "MCA", detail: "CGPA: 9.0", color: "sky" },
  { degree: "B.Sc. (Physics)", detail: "73%", color: "indigo" },
  { degree: "HSC (Science)", detail: "66.92%", color: "emerald" },
  { degree: "SSC (State Board)", detail: "84.80%", color: "amber" },
];

const HIGHLIGHTS = [
  { value: "1+", label: "Year of hands-on experience building React applications" },
  { value: "Multiple", label: "Production-style projects with real-world UI structure" },
  { value: "Clean UI", label: "Focused on maintainable code, clarity, and performance" },
];

export default function About() {
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const introRef = useRef(null);
  const academicsRef = useRef(null);
  const academicItemsRef = useRef([]);
  const skillsHeadingRef = useRef(null);
  const skillCardsRef = useRef([]);
  const extraRef = useRef(null);
  const highlightsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Page header ── */
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 88%" } }
      );

      /* ── Intro text ── */
      gsap.fromTo(introRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: introRef.current, start: "top 85%" } }
      );

      /* ── Academics heading ── */
      gsap.fromTo(academicsRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: academicsRef.current, start: "top 85%" } }
      );

      /* ── Academic timeline items stagger ── */
      gsap.fromTo(academicItemsRef.current,
        { opacity: 0, x: 30, scale: 0.96 },
        {
          opacity: 1, x: 0, scale: 1,
          duration: 0.5, ease: "power3.out", stagger: 0.15,
          scrollTrigger: { trigger: academicItemsRef.current[0], start: "top 85%" },
        }
      );

      /* ── Skills heading ── */
      gsap.fromTo(skillsHeadingRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: skillsHeadingRef.current, start: "top 88%" } }
      );

      /* ── Skill cards stagger ── */
      gsap.fromTo(skillCardsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.55, ease: "power3.out", stagger: 0.1,
          scrollTrigger: { trigger: skillCardsRef.current[0], start: "top 85%" },
        }
      );

      /* ── Extra curricular ── */
      gsap.fromTo(extraRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: extraRef.current, start: "top 88%" } }
      );

      /* ── Highlights stagger ── */
      gsap.fromTo(highlightsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.5, ease: "power3.out", stagger: 0.12,
          scrollTrigger: { trigger: highlightsRef.current[0], start: "top 88%" },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={pageRef} className="min-h-screen px-[8%] py-28">

      {/* ── Page Header ── */}
      <div ref={headerRef} className="max-w-5xl" style={{ opacity: 0 }}>
        <h1 className="text-4xl font-semibold text-slate-100">About Me</h1>
        <p className="mt-4 text-base text-slate-400 max-w-xl">
          A brief overview of my background, skills, and academic journey.
        </p>
      </div>

      {/* ── Intro + Academics ── */}
      <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl">

        {/* LEFT — Introduction */}
        <div ref={introRef} style={{ opacity: 0 }}>
          <h2 className="text-2xl font-semibold text-slate-100">Introduction</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            I am a Frontend Developer with 1+ year of experience working with React,
            modern JavaScript, and component-based UI development. I focus on building
            clean, maintainable, and scalable user interfaces that align with real
            product requirements.
          </p>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            My work involves translating designs into responsive interfaces,
            integrating APIs, and ensuring consistent user experiences across
            devices. I value clarity in code, collaboration in teams, and continuous
            improvement in my skill set.
          </p>
        </div>

        {/* RIGHT — Academics Timeline */}
        <div ref={academicsRef} style={{ opacity: 0 }}>
          <h2 className="text-2xl font-semibold text-slate-100 mb-8">Academics</h2>

          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-sky-400/40 via-sky-400/20 to-transparent" />

            {ACADEMICS.map((item, i) => {
              const isRight = i % 2 !== 0;
              return (
                <div
                  key={item.degree}
                  ref={(el) => (academicItemsRef.current[i] = el)}
                  className={`relative mb-10 ${isRight ? "lg:ml-[-10rem] lg:text-right" : "ml-6"}`}
                  style={{ opacity: 0 }}
                >
                  {/* Dot */}
                  <div className={`absolute left-[-1.65rem] top-5 w-2.5 h-2.5 rounded-full
                    bg-${item.color}-400/80 ring-2 ring-${item.color}-400/30`} />

                  <div className={`inline-block rounded-xl border border-${item.color}-400/30
                    bg-slate-900/50 p-5 max-w-sm transition-all duration-300
                    hover:-translate-y-1 hover:border-${item.color}-400/60
                    hover:shadow-[0_12px_30px_rgba(56,189,248,0.1)]`}
                  >
                    <p className="text-slate-200 font-medium">{item.degree}</p>
                    <p className="text-sm text-slate-400 mt-0.5">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Technical Skills ── */}
      <div className="mt-28 max-w-6xl">
        <div ref={skillsHeadingRef} style={{ opacity: 0 }}>
          <h2 className="text-3xl font-semibold text-slate-100">Technical Skills</h2>
          <p className="mt-4 text-base text-slate-400 max-w-2xl">
            Technologies and tools I work with while building production-ready
            frontend applications.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SKILL_GROUPS.map((group, i) => (
            <div
              key={group.title}
              ref={(el) => (skillCardsRef.current[i] = el)}
              className="rounded-2xl bg-sky-400/5 border border-sky-400/20 p-6
                         transition-all duration-300
                         hover:-translate-y-1 hover:border-sky-400/40
                         hover:shadow-[0_16px_40px_rgba(56,189,248,0.12)]"
              style={{ opacity: 0 }}
            >
              <h3 className="text-base font-semibold text-slate-100">{group.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{group.desc}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="px-3 py-1 text-xs rounded-full bg-white/5 text-slate-300 border border-white/10
                               transition-colors hover:border-sky-400/40 hover:text-sky-300"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Extra-Curricular ── */}
      <div ref={extraRef} className="mt-28 max-w-5xl" style={{ opacity: 0 }}>
        <h2 className="text-3xl font-semibold text-slate-100">
          Extra-Curricular Activities
        </h2>
        <div className="mt-8 px-6 py-5 border-l-2 border-sky-400/40 bg-sky-400/5 rounded-r-xl">
          <p className="text-base leading-relaxed text-slate-400">
            Active member of the{" "}
            <span className="text-slate-200 font-medium">National Cadet Corps (NCC)</span>{" "}
            during college, participating in drills, training camps, and community service
            activities. This experience helped develop discipline, teamwork, and a strong
            sense of responsibility.
          </p>
        </div>
      </div>

      {/* ── Highlights ── */}
      <div className="mt-28 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HIGHLIGHTS.map((h, i) => (
            <div
              key={h.value}
              ref={(el) => (highlightsRef.current[i] = el)}
              className="rounded-2xl bg-sky-400/5 border border-sky-400/20 p-6 text-center
                         transition-all duration-300
                         hover:-translate-y-1 hover:border-sky-400/40
                         hover:shadow-[0_20px_40px_rgba(56,189,248,0.15)]"
              style={{ opacity: 0 }}
            >
              <h3 className="text-3xl font-bold text-sky-300">{h.value}</h3>
              <p className="mt-2 text-sm text-slate-400">{h.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}