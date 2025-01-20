import React, { useRef, memo, useState } from 'react';
import { motion, useInView, LazyMotion, domAnimation } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const ContactSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });
  const [formData, setFormData] = useState<{ name: string; email: string; subject: string; message: string }>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; subject?: string; message?: string }>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      title: "Email",
      value: "hugoev@live.com",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Location",
      value: "San Antonio, TX",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Current Status",
      value: "Available for Opportunities",
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      badge: "Active"
    }
  ];

  const socialLinks = [
    { 
      name: 'GitHub Profile',
      href: 'https://github.com/hugoev',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      )
    },
    { 
      name: 'LinkedIn Profile',
      href: 'https://www.linkedin.com/in/hugoev',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    }
  ];

  const validateForm = () => {
      const newErrors: { name?: string; email?: string; subject?: string; message?: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target as { id: keyof typeof errors; value: string };
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setFormStatus({ type: '', message: '' });

    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormStatus({
        type: 'success',
        message: 'Thank you for your message. I will get back to you shortly.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'An error occurred. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <section 
        ref={containerRef}
        id="contact" 
        className="relative py-32 bg-gray-50"
        aria-labelledby="contact-heading"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/80" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            <h2 
              id="contact-heading"
              className="text-4xl font-bold text-gray-900 sm:text-5xl mb-6"
            >
              Get in Touch
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              I'm currently available for new opportunities and collaborations.
              Feel free to reach out for discussions about potential projects.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr,1.5fr] gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100">
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div 
                      key={info.title}
                      className="group flex items-center gap-5 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                    >
                      <div className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center p-2.5 group-hover:scale-105 transition-transform duration-300">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">{info.title}</p>
                        <h4 className="text-lg font-medium text-gray-900">{info.value}</h4>
                        {info.badge && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 mt-2">
                            <span className="w-1 h-1 bg-green-600 rounded-full mr-1.5" />
                            {info.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-8 border-t border-gray-100">
                  <h4 className="text-sm font-medium text-gray-900 mb-6">
                    Professional Networks
                  </h4>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-gray-900 text-white rounded-xl flex items-center justify-center hover:scale-105 transition-transform duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Visit ${social.name}`}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100">
                <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-gray-900'} focus:border-transparent transition-all duration-300`}
                          placeholder="John Doe"
                          aria-describedby={errors.name ? "name-error" : undefined}
                        />
                        {errors.name && (
                          <p id="name-error" className="mt-1 text-sm text-red-500">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-gray-900'} focus:border-transparent transition-all duration-300`}
                          placeholder="john@example.com"
                          aria-describedby={errors.email ? "email-error" : undefined}
                        />
                        {errors.email && (
                          <p id="email-error" className="mt-1 text-sm text-red-500">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.subject ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-gray-900'} focus:border-transparent transition-all duration-300`}
                        placeholder="Project Discussion"
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                      />
                      {errors.subject && (
                        <p id="subject-error" className="mt-1 text-sm text-red-500">
                          {errors.subject}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-gray-900'} focus:border-transparent transition-all duration-300 resize-none`}
                        placeholder="Please describe your project or inquiry..."
                        aria-describedby={errors.message ? "message-error" : undefined}
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-1 text-sm text-red-500">
                          {errors.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {formStatus.message && (
                    <div 
                      role="alert"
                      className={`${
                        formStatus.type === 'success' 
                          ? 'bg-green-50 text-green-800 border-green-200'
                          : 'bg-red-50 text-red-800 border-red-200'
                      } mb-6 p-4 rounded-xl border flex items-center gap-3`}
                    >
                      {formStatus.type === 'success' ? (
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      <p className="text-sm">{formStatus.message}</p>
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-gray-900 text-white rounded-xl hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin mr-2 h-5 w-5" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-8 flex items-center justify-center gap-2 text-gray-600">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm">Average response time: 24 hours</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default memo(ContactSection);