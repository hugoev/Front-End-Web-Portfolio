// GoogleAnalytics.tsx
import { useEffect } from 'react';

const GoogleAnalytics: React.FC = () => {
  useEffect(() => {
    try {
      // Create and load the first script
      const script1 = document.createElement('script');
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-E2BH2D4S2S';
      script1.async = true;

      // Create and load the second script
      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-E2BH2D4S2S', {
          send_page_view: false // We'll handle this manually for better control
        });
      `;

      // Append scripts to head
      document.head.appendChild(script1);
      document.head.appendChild(script2);

      // Send initial pageview once scripts are loaded
      script1.onload = () => {
        if (window.gtag) {
          window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
          });
        }
      };

      // Cleanup function
      return () => {
        document.head.removeChild(script1);
        document.head.removeChild(script2);
      };
    } catch (error) {
      console.error('Error initializing Google Analytics:', error);
    }
  }, []);

  return null;
};

export default GoogleAnalytics;

// Extend the Window interface
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}