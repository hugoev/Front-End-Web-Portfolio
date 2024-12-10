import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import Footer from './components/Footer';
import TechStack from './components/TechStack';
import ContactSection from './components/ContactSection';
import AboutSection from './components/AboutSection';

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <TechStack />
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default App;
