import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiVite,
} from "react-icons/si";

export default function Skills() {
  return (
    <section id="skills" className="px-[8%] py-24">
      <h3 className="text-sm uppercase tracking-widest text-sky-400">
        Skills
      </h3>

      <h2 className="mt-4 text-3xl font-semibold text-slate-100">
        Technologies I work with
      </h2>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl">
        {/* Frontend */}
        <div className="skill-card">
          <h4 className="skill-title">Frontend</h4>
          <div className="skill-icons">
            <SiReact />
            <SiJavascript />
            <SiHtml5 />
            <SiCss3 />
          </div>
          <p className="skill-desc">
            Component-based UI, modern JavaScript, responsive layouts.
          </p>
        </div>

        {/* Styling */}
        <div className="skill-card">
          <h4 className="skill-title">Styling</h4>
          <div className="skill-icons">
            <SiTailwindcss />
            <SiCss3 />
          </div>
          <p className="skill-desc">
            Utility-first styling with clean, scalable design systems.
          </p>
        </div>

        {/* Animation */}
        <div className="skill-card">
          <h4 className="skill-title">Animation</h4>
          <div className="skill-icons">
            <span className="text-lg font-semibold">GSAP</span>
          </div>
          <p className="skill-desc">
            Subtle UI animations that enhance user experience.
          </p>
        </div>

        {/* Tools */}
        <div className="skill-card">
          <h4 className="skill-title">Tools</h4>
          <div className="skill-icons">
            <SiGit />
            <SiGithub />
            <SiVite />
          </div>
          <p className="skill-desc">
            Modern development workflow and version control.
          </p>
        </div>
      </div>
      {/* Additional skills */}
<div className="mt-16 max-w-6xl">
  <h4 className="text-sm uppercase tracking-widest text-slate-400">
    Additional Technologies
  </h4>

  <div className="mt-6 flex flex-wrap gap-4">
    <span className="skill-pill">
      <SiHtml5 /> HTML
    </span>
    <span className="skill-pill">
      <SiCss3 /> CSS
    </span>
    <span className="skill-pill">
      <SiReact /> React
    </span>
    <span className="skill-pill">
      <SiJavascript /> JavaScript
    </span>
    <span className="skill-pill">
      <SiTailwindcss /> Tailwind
    </span>
    <span className="skill-pill">
      Node.js
    </span>
    <span className="skill-pill">
      REST APIs
    </span>
    <span className="skill-pill">
      Git
    </span>
  </div>
</div>

    </section>
  );
}
