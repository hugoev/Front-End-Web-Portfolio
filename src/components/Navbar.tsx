import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleSectionVisibility = () => {
      const sections = ['home', 'about', 'projects', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleSectionVisibility);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleSectionVisibility);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}>
        {/* Backdrop */}
        <div className={`absolute inset-0 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`} />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between"> {/* or use: justify-around */}
            {/* Logo */}
            <a href="#home" className="group flex items-center space-x-2">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition duration-300" />
                <div className="relative w-full h-full bg-white rounded-xl flex items-center justify-center text-blue-600 font-bold border border-blue-100">
                  H
                </div>
              </div>
              <span className="text-gray-900 font-medium">Hugo</span>
            </a>

            {/* Desktop Navigation - Now Centered */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="relative px-4 py-2 group"
                >
                  <span className={`relative z-10 transition-colors duration-300 ${
                    activeSection === link.href.substring(1)
                      ? 'text-blue-600'
                      : 'text-gray-600 group-hover:text-gray-900'
                  }`}>
                    {link.name}
                  </span>
                  
                  {/* Active/Hover Background */}
                  <div className={`absolute inset-0 transition-all duration-300 ${
                    activeSection === link.href.substring(1)
                      ? 'bg-blue-50 rounded-xl'
                      : 'bg-transparent group-hover:bg-gray-50 rounded-xl'
                  }`} />
                </button>
              ))}
            </div>

            {/* Add an empty div for symmetry */}
            <div className="w-10 h-10 hidden md:block" />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center"
            >
              <div className={`absolute w-5 h-0.5 bg-blue-600 transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'
              }`} />
              <div className={`absolute w-5 h-0.5 bg-blue-600 transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'
              }`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-white/95 backdrop-blur-xl" />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center space-y-8 p-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className={`text-2xl font-light transition-colors duration-300 ${
                activeSection === link.href.substring(1)
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;