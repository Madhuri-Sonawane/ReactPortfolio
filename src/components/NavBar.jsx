import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full h-16 px-[8%] flex items-center justify-between bg-slate-950/60 backdrop-blur-md">
      <div className="text-lg font-semibold text-slate-200">
        <Link to="/" className="text-lg font-semibold text-slate-200 hover:text-sky-400 transition">
           Madhuri
        </Link>

      </div>

      <nav className="flex gap-8 text-sm text-slate-300">
        <Link to="/about" className="hover:text-sky-400 transition">
          About
        </Link>

         <Link to="/experience" className="hover:text-sky-400 transition">
          Experience
        </Link>

        <Link to="/projects" className="hover:text-sky-400 transition">
          Projects
        </Link>

        <Link to="/contact" className="hover:text-sky-400 transition">
          Contact
        </Link>

      </nav>
    </header>
  );
}
