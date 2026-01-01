import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div
      className="
        fixed
        left-6
        top-1/2
        -translate-y-1/2
        z-40
        lg:flex
        flex-col
        gap-4
      "
    >
      {/* GitHub */}
      <a
        href="https://github.com/Madhuri-Sonawane"
        target="_blank"
        rel="noopener noreferrer"
        className="
          w-10 h-10
          flex items-center justify-center
          rounded-full
          bg-slate-900/70
          border border-white/10
          text-slate-300
          hover:text-white
          hover:bg-sky-400
          transition
        "
        aria-label="GitHub"
      >
        <FaGithub size={18} />
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/madhuri-sonawane-42a305368"
        target="_blank"
        rel="noopener noreferrer"
        className="
          w-10 h-10
          flex items-center justify-center
          rounded-full
          bg-slate-900/70
          border border-white/10
          text-slate-300
          hover:text-white
          hover:bg-sky-400
          transition
        "
        aria-label="LinkedIn"
      >
        <FaLinkedinIn size={18} />
      </a>
    </div>
  );
}
