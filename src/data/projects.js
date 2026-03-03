import cineflix from "../assets/cineflix.png";
import portfolio from "../assets/portfolio.png";
import TestEnvironment from "../assets/TestEnvironment.png";
import assaasdashboard from "../assets/assaasdashboard.png"
export const projects = [
  {
    title: "AI-SAAS-DASHBOARD",
    image: assaasdashboard,
    points: [
      "Email/password and Google OAuth login",
      "Protected routes and persistent sessions",
      "Real-time chat assistant with Google Gemini AI API",
      "Markdown rendering and conversation history in Firestore",
      "AI-powered message editing and feedback",
      "Responsive design with dark/light mode and analytics charts (Recharts, Tailwind CSS v4)",
    ],
    tech: [
      "React",
      "Tailwind CSS v4",
      "Vite",
      "Firebase Auth",
      "Firestore:Google Gemini API",
      "React Router",
      "Recharts",
    ],
    code: "https://github.com/Madhuri-Sonawane/as-saas-dashboard",
  },

  {
    title: "CineFlix – Streaming Platform UI",
    image: cineflix,
    points: [
      "Core Features",
      "Multi-profile system with avatar selection, Kids mode & Owner role",
      "Real-time movie search & discovery via TMDB API with debounced input",
      "Genre, rating & year filters with instant live results",
      "Per-profile Watch Later list & Watch Activity history via localStorage",

      "UI/UX",
      "Cinematic launch screen with GSAP logo animation and progress bar",
      "I'm feeling… mood bar for one-click genre filtering",
      "3D card tilt effect on hover using GSAP mouse tracking",
      "Animated hero banner with genre tags, star rating bar & letterbox bars",
      "Skeleton loading cards, frosted glass sidebar, scroll-aware navbar",

      "Technical",

      "CSS token-based Deep Purple + Gold design system",
      "Fully responsive — sticky sidebar on desktop, animated drawer on mobile",
      "GSAP timeline animations for page entrances & micro-interactions",
      "Route-protected pages with auto-redirect on first visit",
    ],
    tech: ["React", "JavaScript", "Tailwind CSS", "REST API","Vercel","TDMB API","GSAP","Vite",],
    live: "https://cine-flix-pi.vercel.app/",
    code: "https://github.com/Madhuri-Sonawane/cineflix",
  },

  {
    title: "Secure Exam Environment (MERN Full Stack)",
    image: TestEnvironment,
    points: [
      "Built secure proctored exam system tab monitoring",
      "Separate Employer & Candidate dashboards",
      "Backend authentication with JWT and MongoDB Atlas",
    ],
    tech: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Tailwind CSS",
      "JWT",
      "MongoDB Atlas",
    ],

    live: [
      { label: "Frontend", url: "https://online-exam-checker-six.vercel.app/" },
      {
        label: "Backend API",
        url: "https://exam-secure-environment.onrender.com/",
      },
      {
        label: "Employer Panel",
        url: "https://exam-secure-environment.onrender.com/employer/",
      },
    ],

    code: [
      {
        label: "Frontend Repo",
        url: "https://github.com/Madhuri-Sonawane/exam-secure-environment",
      },
      {
        label: "Backend Repo",
        url: "https://github.com/Madhuri-Sonawane/exam-secure-environment",
      },
    ],
  },

  {
    title: "Personal Portfolio Website",
    image: portfolio,
    points: [
      "Designed a clean, responsive UI with structured sections",
      "Implemented subtle animations using GSAP",
      "Focused on performance and maintainable React components",
    ],
    tech: ["React", "Tailwind CSS", "GSAP", "Vite"],
    live: "https://react-portfolio-gold-delta.vercel.app/",
    code: "https://github.com/Madhuri-Sonawane/ReactPortfolio",
  },
];
