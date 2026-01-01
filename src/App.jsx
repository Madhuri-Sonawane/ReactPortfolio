import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Hero from "./sections/Hero";
import AboutPage from "./pages/AboutPage";
import Skills from "./sections/Skills";
import ExperiencePage from "./pages/ExperiencePage";
import ContactPage from "./pages/ContactPage";
import ProjectsPage from "./pages/ProjectsPage";
import CustomCursor from "./components/CustomCursor";
import SocialLinks from "./components/SocialLinks";

function App() {
  return (
    <>
      <CustomCursor />
      <NavBar />
       <SocialLinks />

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
