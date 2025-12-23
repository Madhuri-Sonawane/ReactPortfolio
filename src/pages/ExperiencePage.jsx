export default function ExperiencePage() {
  return (
    <section className="min-h-screen px-[8%] py-28">

      {/* Page intro */}
      <div className="max-w-6xl mb-24">
        <h1 className="text-5xl font-semibold text-slate-100 leading-tight">
          How I Work
        </h1>

        <p className="mt-6 text-lg text-slate-400 max-w-2xl">
          A designer–developer approach to building React applications —
          combining clean UI, interaction thinking, and real-world engineering.
        </p>
      </div>

      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 max-w-6xl">

        {/* LEFT — STORY (STICKY) */}
        <div className="lg:sticky lg:top-32 h-fit">
          <h2 className="text-3xl font-semibold text-slate-100">
            Junior React Developer
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Makedreams Technologies · Oct 2024 – Present
          </p>

          <p className="mt-8 text-base leading-relaxed text-slate-400">
            I work at the intersection of design and development — translating
            UI concepts into responsive, scalable React interfaces while keeping
            performance and maintainability in focus.
          </p>

          <p className="mt-4 text-base leading-relaxed text-slate-400">
            My role goes beyond writing components. I think about layout flow,
            interaction feedback, and how users experience each screen.
          </p>
        </div>

        {/* RIGHT — INTERACTION BLOCKS */}
        <div className="space-y-20">

          {/* Block 1 */}
          <div className="group border-l-2 border-sky-400/30 pl-8 transition-all hover:border-sky-400">
            <h3 className="text-xl font-medium text-slate-100">
              Building Interfaces
            </h3>

            <p className="mt-3 text-slate-400 leading-relaxed">
              Developed responsive web interfaces using React, JavaScript (ES6+),
              HTML, and CSS — focusing on reusable components and consistent UI
              behavior across devices.
            </p>
          </div>

          {/* Block 2 */}
          <div className="group border-l-2 border-indigo-400/30 pl-8 transition-all hover:border-indigo-400">
            <h3 className="text-xl font-medium text-slate-100">
              Data & State Handling
            </h3>

            <p className="mt-3 text-slate-400 leading-relaxed">
              Integrated REST APIs and managed application state using React
              Hooks and Context API, ensuring predictable data flow and smooth
              user interactions.
            </p>
          </div>

          {/* Block 3 */}
          <div className="group border-l-2 border-emerald-400/30 pl-8 transition-all hover:border-emerald-400">
            <h3 className="text-xl font-medium text-slate-100">
              Collaboration & Delivery
            </h3>

            <p className="mt-3 text-slate-400 leading-relaxed">
              Collaborated closely with UI/UX designers, used Git and GitHub for
              version control, and deployed applications on Vercel and Netlify
              as part of real delivery cycles.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
