import React, { useState, useEffect, useCallback } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Handle scroll locking
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (isMobileMenuOpen) {
      const scrollbarWidth = window.innerWidth - body.clientWidth;
      body.style.position = 'fixed';
      body.style.top = `-${window.scrollY}px`;
      body.style.width = '100%';
      body.style.paddingRight = `${scrollbarWidth}px`;
      html.style.overflow = 'hidden';
    } else {
      const scrollY = body.style.top;
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      body.style.paddingRight = '';
      html.style.overflow = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isMobileMenuOpen]);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  const handleSectionVisibility = useCallback(() => {
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
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleSectionVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleSectionVisibility);
    };
  }, [handleScroll, handleSectionVisibility]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = useCallback((href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      // Small delay to allow scroll unlocking
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 10);
    }
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'py-4' : 'py-6'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 transition-all duration-300 ${
            isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
          }`} 
        />

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
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

            {/* Desktop Navigation */}
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
                  
                  <div className={`absolute inset-0 transition-all duration-300 ${
                    activeSection === link.href.substring(1)
                      ? 'bg-blue-50 rounded-xl'
                      : 'bg-transparent group-hover:bg-gray-50 rounded-xl'
                  }`} />
                </button>
              ))}
            </div>

            <div className="w-10 h-10 hidden md:block" />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <div className={`absolute w-5 h-0.5 bg-blue-600 transition-all duration-300 transform-gpu ${
                isMobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'
              }`} />
              <div className={`absolute w-5 h-0.5 bg-blue-600 transition-all duration-300 transform-gpu ${
                isMobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'
              }`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 transition-all duration-300 transform-gpu ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="absolute inset-0 bg-white/95 backdrop-blur-xl" />
        <div className="relative h-full flex flex-col items-center justify-center -translate-y-20 space-y-8 p-4">
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