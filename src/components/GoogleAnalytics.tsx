import { useEffect } from 'react';

const GoogleAnalytics: React.FC = () => {
  useEffect(() => {
    try {
      // Create and load the first script
      const script1 = document.createElement('script');
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-TMXF5ETKCZ';
      script1.async = true;

      // Create and load the second script
      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-TMXF5ETKCZ');
      `;

      // Append scripts to head
      document.head.appendChild(script1);
      document.head.appendChild(script2);

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