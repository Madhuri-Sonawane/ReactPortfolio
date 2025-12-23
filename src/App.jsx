import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import AboutPage from "./pages/AboutPage";
import Skills from "./sections/Skills";
import ExperiencePage from "./pages/ExperiencePage";
import ContactPage from "./pages/ContactPage";
import Contact from "./sections/Contact";
import ProjectsPage from "./pages/ProjectsPage";
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Skills />
            </>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
         <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}

export default App;
