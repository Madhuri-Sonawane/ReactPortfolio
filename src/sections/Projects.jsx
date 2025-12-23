import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  return (
    <section
      id="projects"
      className="px-[8%] py-24"
    >
      <h3 className="text-sm uppercase tracking-widest text-sky-400">
        Projects
      </h3>

      <h2 className="mt-4 text-3xl font-semibold text-slate-100">
        Selected Work
      </h2>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl">
        <ProjectCard
          title="CineFlix – Movie Streaming UI"
          description="A Netflix-style frontend application built with React. Focused on component structure, API-driven data rendering, responsive layouts, and smooth UI animations."
          tech={["React", "JavaScript", "Tailwind CSS", "GSAP"]}
          live="https://cine-flix-pi.vercel.app/"
          code="https://github.com/Madhuri-Sonawane/CineFlix"
        />

        <ProjectCard
          title="Portfolio Website"
          description="A personal portfolio built with React and Tailwind CSS to showcase projects, skills, and frontend development practices with a clean, professional UI."
          tech={["React", "Tailwind CSS", "GSAP", "Vite"]}
          live="#"
          code="#"
        />
      </div>
    </section>
  );
}
