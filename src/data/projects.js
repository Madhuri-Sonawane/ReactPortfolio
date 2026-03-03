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
      "Built reusable React components for a scalable UI structure",
      "Integrated external movie API for dynamic content rendering",
      "Focused on responsive layouts and clean component architecture",
    ],
    tech: ["React", "JavaScript", "Tailwind CSS", "REST API"],
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
