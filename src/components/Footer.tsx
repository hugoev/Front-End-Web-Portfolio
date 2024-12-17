import React, { memo } from 'react';
import { motion, LazyMotion, domAnimation } from 'framer-motion';

// Memoized link components
const QuickLink = memo(({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
    {children}
  </a>
));

const SocialLink = memo(({ href, icon }: { href: string; icon: JSX.Element }) => (
  <motion.a
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 bg-[#1A1A1A] rounded-lg text-gray-400 hover:text-blue-400 border border-blue-500/10 hover:border-blue-500/20 transition-colors duration-300 transform-gpu"
  >
    {icon}
  </motion.a>
));

// Static data
const links = {
  main: [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ],
  social: [
    { 
      name: 'GitHub',
      href: 'https://github.com/hugoev',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      )
    },
    { 
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/hugoev',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    }
  ]
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <LazyMotion features={domAnimation}>
      <footer className="relative bg-[#0A0A0A] py-12 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(29, 78, 216, 0.3) 2px, transparent 2px)`,
              backgroundSize: '48px 48px',
              transform: 'translateZ(0)'
            }}
          />
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3 }}
                className="space-y-4 transform-gpu"
              >
                <div className="flex items-center space-x-2">
                  <div className="relative w-10 h-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl blur-sm opacity-75" />
                    <div className="relative w-full h-full bg-[#0A0A0A] rounded-xl flex items-center justify-center text-white font-bold">
                      H
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-white">Hugo</span>
                </div>
                <p className="text-gray-400">
                  Building exceptional digital experiences with modern technologies.
                </p>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="space-y-3">
                {links.main.map((link) => (
                  <li key={link.name}>
                    <QuickLink href={link.href}>{link.name}</QuickLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Social */}
            <div className="space-y-6">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-white">Contact</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3 text-gray-400">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>hugoev@live.com</span>
                  </li>
                  <li className="flex items-center space-x-3 text-gray-400">
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>San Antonio, TX</span>
                  </li>
                </ul>
                <div className="flex space-x-4">
                  {links.social.map((item) => (
                    <SocialLink key={item.name} href={item.href} icon={item.icon} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-blue-500/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © {currentYear} Hugo. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <QuickLink href="#">Privacy Policy</QuickLink>
                <QuickLink href="#">Terms of Service</QuickLink>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </LazyMotion>
  );
};

export default memo(Footer);