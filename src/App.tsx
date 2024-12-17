import React, { lazy, Suspense, useEffect, useState, useCallback, useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// Preload critical assets with priority hints
const Navbar = lazy(() => import(/* webpackPrefetch: true, webpackPreload: true */ './components/Navbar'));
const HeroSection = lazy(() => import(/* webpackPrefetch: true, webpackPreload: true */ './components/HeroSection'));

// Dynamic imports with chunk optimization
const AboutSection = lazy(() => 
  Promise.all([
    import(/* webpackChunkName: "about" */ './components/AboutSection'),
    new Promise(resolve => setTimeout(resolve, 100))
  ]).then(([module]) => module)
);

const lazyComponents = {
  ProjectsSection: lazy(() => import(/* webpackChunkName: "projects" */ './components/ProjectsSection')),
  TechStack: lazy(() => import(/* webpackChunkName: "tech" */ './components/TechStack')),
  ExperienceSection: lazy(() => import(/* webpackChunkName: "experience" */ './components/ExperienceSection')),
  ContactSection: lazy(() => import(/* webpackChunkName: "contact" */ './components/ContactSection')),
  Footer: lazy(() => import(/* webpackChunkName: "footer" */ './components/Footer'))
};

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center min-h-[200px] transform-gpu">
    <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-[spin_0.6s_linear_infinite]" />
  </div>
);

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => (
  <div role="alert" className="p-4 text-center transform-gpu">
    <p className="text-red-600">Something went wrong:</p>
    <pre className="text-sm">{error.message}</pre>
    <button
      onClick={resetErrorBoundary}
      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transform-gpu"
    >
      Try again
    </button>
  </div>
);

const App: React.FC = () => {
  const [mountedComponents, setMountedComponents] = useState<Set<string>>(new Set(['Navbar', 'HeroSection']));
  const intersectionObserver = useRef<IntersectionObserver | null>(null);

  // Performance monitoring setup
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.log(`${entry.name}: ${entry.startTime.toFixed(2)}ms`);
        });
      });

      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
      return () => observer.disconnect();
    }
  }, []);

  // Intersection Observer setup
  const setupIntersectionObserver = useCallback(() => {
    intersectionObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const componentId = entry.target.getAttribute('data-component');
            if (componentId) {
              setMountedComponents(prev => {
                const newSet = new Set(prev);
                newSet.add(componentId);
                return newSet;
              });
              intersectionObserver.current?.unobserve(entry.target);
            }
          }
        });
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.1
      }
    );

    // Observe elements
    const elements = document.querySelectorAll('[data-component]');
    elements.forEach(el => intersectionObserver.current?.observe(el));
  }, []);

  useEffect(() => {
    setupIntersectionObserver();
    return () => {
      if (intersectionObserver.current) {
        intersectionObserver.current.disconnect();
      }
    };
  }, [setupIntersectionObserver]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {/* Critical path rendering */}
        <div className="transform-gpu">
          <Suspense fallback={<div className="h-16 backdrop-blur-xl" />}>
            <Navbar />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <HeroSection />
          </Suspense>
        </div>

        {/* Progressive loading of non-critical components */}
        <main className="transform-gpu">
          <Suspense fallback={<LoadingSpinner />}>
            <AboutSection />
          </Suspense>

          {Object.entries(lazyComponents).map(([name, Component]) => (
            <div
              key={name}
              data-component={name}
              className="transform-gpu"
            >
              {mountedComponents.has(name) && (
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <Suspense fallback={<LoadingSpinner />}>
                    <Component />
                  </Suspense>
                </ErrorBoundary>
              )}
            </div>
          ))}
        </main>
      </ErrorBoundary>
    </div>
  );
};

// Prevent unnecessary re-renders
const MemoizedApp = React.memo(App, () => true);

export default MemoizedApp;