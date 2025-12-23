import { useRef } from "react";

export default function About() {
  const academicsRef = useRef(null);
  const certRef = useRef(null);
  const extraRef = useRef(null);
  const socialRef = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ABOUT MAIN */}
      <section id="about" className="px-[8%] py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl relative">

          {/* LEFT CARD */}
          <div className="rounded-2xl bg-slate-900/40 p-8 border border-white/5 backdrop-blur-md">
            <h3 className="text-sm uppercase tracking-widest text-sky-400">
              About
            </h3>

            <h2 className="mt-4 text-3xl font-semibold text-slate-100 leading-snug">
              Building clean, usable, and maintainable frontend applications.
            </h2>

            <p className="mt-6 text-base text-slate-400">
              Frontend Developer · React · UI Engineering
            </p>
          </div>

          {/* RIGHT CARD */}
          <div className="rounded-2xl bg-slate-900/30 p-8 border border-white/5 backdrop-blur-md">
            <p className="text-base leading-relaxed text-slate-400">
              I’m a frontend developer specializing in React. I focus on writing
              readable component-based code, building responsive layouts, and
              adding subtle animations that improve user experience instead of
              distracting from it.
            </p>

            <p className="mt-4 text-base leading-relaxed text-slate-400">
              I’ve worked on projects like a Netflix-style streaming UI and other
              frontend applications where performance, structure, and clarity
              matter more than visual noise.
            </p>
          </div>

          {/* CONNECTOR LINE */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-sky-400/40 to-transparent" />
        </div>

        {/* INTERACTIVE CARDS */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
          <button onClick={() => scrollTo(academicsRef)} className="about-link-card">
            Academics
          </button>

          <button onClick={() => scrollTo(certRef)} className="about-link-card">
            Certifications
          </button>

          <button onClick={() => scrollTo(extraRef)} className="about-link-card">
            Extra-Curricular
          </button>

          <button onClick={() => scrollTo(socialRef)} className="about-link-card">
            Social Profiles
          </button>
        </div>
      </section>

      {/* TARGET SECTIONS */}
      <section ref={academicsRef} className="px-[8%] py-24 max-w-4xl">
        <h3 className="section-title">Academics</h3>
        <p className="section-text">
          MCA Graduate · Computer Applications · Strong foundation in programming and software development.
        </p>
      </section>

      <section ref={certRef} className="px-[8%] py-24 max-w-4xl">
        <h3 className="section-title">Certifications</h3>
        <p className="section-text">
          Frontend & React certifications (add verified links here).
        </p>
      </section>

      <section ref={extraRef} className="px-[8%] py-24 max-w-4xl">
        <h3 className="section-title">Extra-Curricular</h3>
        <p className="section-text">
          Technical blogging, continuous learning, and UI experimentation.
        </p>
      </section>

      <section ref={socialRef} className="px-[8%] py-24 max-w-4xl">
        <h3 className="section-title">Social Profiles</h3>
        <p className="section-text">
          LinkedIn · GitHub (add clean icon links here).
        </p>
      </section>
    </>
  );
}
