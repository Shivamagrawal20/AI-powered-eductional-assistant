import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component will scroll the window to the top whenever the pathname changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      // Force scroll to top
      window.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
    };

    // Immediate scroll
    scrollToTop();

    // Scroll after a slight delay to ensure content is rendered
    const timeoutId = setTimeout(scrollToTop, 0);

    // Scroll after animations might have completed
    const secondTimeoutId = setTimeout(scrollToTop, 100);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(secondTimeoutId);
    };
  }, [pathname]);

  const handleScrollToTop = () => {
    console.log("Scrolling to top");
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return null;
};

export default ScrollToTop; 