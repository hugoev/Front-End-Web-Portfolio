import { useEffect } from 'react';

const GoogleAnalytics: React.FC = () => {
  useEffect(() => {
    // Check if script is already present
    const existingScript = document.querySelector('script[src*="gtag/js"]');
    if (existingScript) {
      console.log('GA script already exists');
      return;
    }

    try {
      console.log('Initializing Google Analytics...');
      
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
          page_path: window.location.pathname,
          stream_id: '10259972967'
        });
      `;

      // Append scripts to head
      document.head.appendChild(script1);
      document.head.appendChild(script2);

      console.log('Google Analytics scripts added to head');

      // Monitor script loading
      script1.onload = () => console.log('GA base script loaded');
      script1.onerror = (error) => console.error('Error loading GA script:', error);

      // No cleanup in production
      return () => {
        if (process.env.NODE_ENV === 'development') {
          document.head.removeChild(script1);
          document.head.removeChild(script2);
        }
      };
    } catch (error) {
      console.error('Error initializing Google Analytics:', error);
    }
  }, []);

  return null;
};

export default GoogleAnalytics;