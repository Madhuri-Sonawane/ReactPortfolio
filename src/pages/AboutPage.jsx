export default function AboutPage() {
  return (
    <section className="min-h-screen px-[8%] py-28">
      {/* Page Header */}
      <div className="max-w-5xl">
        <h1 className="text-4xl font-semibold text-slate-100">
          About Me
        </h1>

        <p className="mt-4 text-base text-slate-400 max-w-xl">
          A brief overview of my background, skills, and academic journey.
        </p>
      </div>

      {/* Intro + Academics */}
<div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl">
  
  {/* LEFT — INTRODUCTION */}
  <div>
    <h2 className="text-2xl font-semibold text-slate-100">
      Introduction
    </h2>

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

  {/* RIGHT — ACADEMICS */}
    {/* RIGHT — ACADEMICS TIMELINE */}
<div>
  <h2 className="text-2xl font-semibold text-slate-100 mb-8">
    Academics
  </h2>

  <div className="relative pl-8">

    {/* Vertical Line */}
    <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-sky-400/40 via-sky-400/20 to-transparent"></div>

    {/* MCA */}
    <div className="relative mb-10 ml-6">
      <div className="rounded-xl border border-sky-400/30 bg-slate-900/40 p-5 max-w-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:border-sky-400/60
                hover:bg-slate-900/60">
        <p className="text-slate-200 font-medium">MCA</p>
        <p className="text-sm text-slate-400">CGPA: 9.0</p>
      </div>
    </div>

    {/* BSc */}
    <div className="relative mb-10 lg:ml-[-10rem] lg:text-right">
      <div className="inline-block rounded-xl border border-indigo-400/40 bg-slate-900/40 p-5 max-w-sm">
        <p className="text-slate-200 font-medium">B.Sc. (Physics)</p>
        <p className="text-sm text-slate-400">73%</p>
      </div>
    </div>

    {/* HSC */}
    <div className="relative mb-10 ml-6">
      <div className="rounded-xl border border-emerald-400/40 bg-slate-900/40 p-5 max-w-sm">
        <p className="text-slate-200 font-medium">HSC (Science)</p>
        <p className="text-sm text-slate-400">66.92%</p>
      </div>
    </div>

    {/* SSC */}
    <div className="relative lg:ml-[-10rem] lg:text-right">
      <div className="inline-block rounded-xl border border-amber-400/40 bg-slate-900/40 p-5 max-w-sm">
        <p className="text-slate-200 font-medium">SSC (State Board)</p>
        <p className="text-sm text-slate-400">84.80%</p>
      </div>
    </div>

  </div>
</div>

</div>

{/* Skills Section */}
<div className="mt-28 max-w-6xl">
  <h2 className="text-3xl font-semibold text-slate-100">
    Technical Skills
  </h2>

  <p className="mt-4 text-base text-slate-400 max-w-2xl">
    Technologies and tools I work with while building production-ready
    frontend applications.
  </p>

  <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
    
    {/* Frontend */}
    <div className="rounded-2xl bg-sky-400/10 border border-sky-400/30 p-6 text-center
                transition-all duration-300
                shadow-[0_20px_40px_rgba(56,189,248,0.25)]">

      <h3 className="text-lg font-semibold text-slate-100">
        Frontend
      </h3>
      <p className="mt-2 text-sm text-slate-400">
        Component-based UI and modern JavaScript development.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "TypeScript"].map(
          (skill) => (
            <li
              key={skill}
              className="px-3 py-1 text-xs rounded-full
                         bg-white/5 text-slate-300 border border-white/10"
            >
              {skill}
            </li>
          )
        )}
      </ul>
    </div>

    {/* State Management */}
    <div className="rounded-2xl bg-sky-400/10 border border-sky-400/30 p-6 text-center
                transition-all duration-300
                shadow-[0_20px_40px_rgba(56,189,248,0.25)]">

      <h3 className="text-lg font-semibold text-slate-100">
        State Management
      </h3>
      <p className="mt-2 text-sm text-slate-400">
        Managing application state with modern React patterns.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {["React Hooks", "Context API", "Redux (Basic)"].map((skill) => (
          <li
            key={skill}
            className="px-3 py-1 text-xs rounded-full
                       bg-white/5 text-slate-300 border border-white/10"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>

    {/* Styling */}
    <div className="rounded-2xl bg-sky-400/10 border border-sky-400/30 p-6 text-center
                transition-all duration-300
                shadow-[0_20px_40px_rgba(56,189,248,0.25)]">

      <h3 className="text-lg font-semibold text-slate-100">
        Styling & UI
      </h3>
      <p className="mt-2 text-sm text-slate-400">
        Clean, responsive, and scalable UI systems.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {[
          "Tailwind CSS",
          "Bootstrap",
          "Material UI",
          "Responsive Design",
        ].map((skill) => (
          <li
            key={skill}
            className="px-3 py-1 text-xs rounded-full
                       bg-white/5 text-slate-300 border border-white/10"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>

    {/* Backend & APIs */}
   <div className="rounded-2xl bg-sky-400/10 border border-sky-400/30 p-6 text-center
                transition-all duration-300
                shadow-[0_20px_40px_rgba(56,189,248,0.25)]">

      <h3 className="text-lg font-semibold text-slate-100">
        Backend & APIs
      </h3>
      <p className="mt-2 text-sm text-slate-400">
        Working with APIs and backend services.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {[
          "Node.js",
          "MongoDB",
          "REST APIs",
          "JSON",
          "Axios",
        ].map((skill) => (
          <li
            key={skill}
            className="px-3 py-1 text-xs rounded-full
                       bg-white/5 text-slate-300 border border-white/10"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>

    {/* Tools & Deployment */}
    <div className="rounded-2xl bg-sky-400/10 border border-sky-400/30 p-6 text-center
                transition-all duration-300
                shadow-[0_20px_40px_rgba(56,189,248,0.25)]">

      <h3 className="text-lg font-semibold text-slate-100">
        Tools & Deployment
      </h3>
      <p className="mt-2 text-sm text-slate-400">
        Modern development workflow and deployment.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {[
          "Git",
          "GitHub",
          "VS Code",
          "npm",
          "Chrome DevTools",
          "Vercel",
          "Netlify",
        ].map((skill) => (
          <li
            key={skill}
            className="px-3 py-1 text-xs rounded-full
                       bg-white/5 text-slate-300 border border-white/10"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>

    {/* Soft Skills */}
    <div className="rounded-2xl bg-sky-400/10 border border-sky-400/30 p-6 text-center
                transition-all duration-300
                shadow-[0_20px_40px_rgba(56,189,248,0.25)]">

      <h3 className="text-lg font-semibold text-slate-100">
        Soft Skills
      </h3>
      <p className="mt-2 text-sm text-slate-400">
        Professional skills for effective collaboration.
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {[
          "Problem-solving",
          "Teamwork",
          "Adaptability",
          "Communication",
        ].map((skill) => (
          <li
            key={skill}
            className="px-3 py-1 text-xs rounded-full
                       bg-white/5 text-slate-300 border border-white/10"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>

  </div>
</div>

{/* Extra-Curricular */}
<div className="mt-28 max-w-5xl">
  <h2 className="text-3xl font-semibold text-slate-100">
    Extra-Curricular Activities
  </h2>

  <div className="mt-8 px-6 py-5 border-l-2 border-sky-400/40">
    <p className="text-base leading-relaxed text-slate-400">
      Active member of the <span className="text-slate-200">National Cadet Corps (NCC)</span> during
      college, participating in drills, training camps, and community service
      activities. This experience helped develop discipline, teamwork, and a
      strong sense of responsibility.
    </p>
  </div>
</div>
{/* Highlights */}
<div className="mt-28 max-w-6xl">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

    <div className="rounded-2xl bg-sky-400/10 border border-sky-400/30 p-6 text-center
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_20px_40px_rgba(56,189,248,0.25)]">

      <h3 className="text-3xl font-semibold text-sky-300">
        1+
      </h3>
      <p className="mt-2 text-sm text-slate-400">
        Year of hands-on experience building React applications
      </p>
    </div>

   <div className="rounded-2xl bg-sky-400/10 border border-sky-400/30 p-6 text-center
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_20px_40px_rgba(56,189,248,0.25)]">
      <h3 className="text-3xl font-semibold text-sky-400">
        Multiple
      </h3>
      <p className="mt-2 text-sm text-slate-400">
        Production-style projects with real-world UI structure
      </p>
    </div>

    <div className="rounded-2xl bg-sky-400/10 border border-sky-400/30 p-6 text-center
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_20px_40px_rgba(56,189,248,0.25)]">
      <h3 className="text-3xl font-semibold text-sky-400">
        Clean UI
      </h3>
      <p className="mt-2 text-sm text-slate-400">
        Focused on maintainable code, clarity, and performance
      </p>
    </div>

  </div>
</div>

    </section>
  );
}
