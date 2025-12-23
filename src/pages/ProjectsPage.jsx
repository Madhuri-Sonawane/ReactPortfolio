import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function ProjectsPage() {
  return (
    <section className="min-h-screen px-[8%] py-28">
      {/* Page Header */}
      <div className="max-w-5xl">
        <h1 className="text-4xl font-semibold text-slate-100">
          Projects
        </h1>

        <p className="mt-4 text-base text-slate-400 max-w-xl">
          A selection of frontend projects focused on clean UI, reusable
          components, and real-world React development practices.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-14 max-w-6xl">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
