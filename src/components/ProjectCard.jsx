export default function ProjectCard({ project }) {
  return (
    <div
      className="group rounded-2xl bg-slate-900/50 border border-white/10
                overflow-hidden
                shadow-[0_20px_40px_rgba(0,0,0,0.4)]
                hover:-translate-y-1
                hover:shadow-[0_30px_60px_rgba(0,0,0,0.6)]
                transition"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-100">
          {project.title}
        </h3>

        <ul className="mt-4 space-y-2 text-sm text-slate-400 list-disc list-inside">
          {project.points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="text-xs px-3 py-1 rounded-full
                         bg-white/5 text-slate-300 border border-white/10"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-6 text-sm">
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center
               rounded-full bg-sky-400 px-5 py-2
               text-sm font-medium text-slate-900
               hover:-translate-y-0.5 transition"
          >
            Live Demo
          </a>
          <a
            href={project.code}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center
               rounded-full border border-white/20 px-5 py-2
               text-sm text-slate-200
               hover:bg-white/5 transition"
          >
            Source Code
          </a>
        </div>
      </div>
    </div>
  );
}
