export const scrollToTop = () => {
  // Force scroll to top using multiple methods to ensure it works
  window.scrollTo(0, 0);
  document.documentElement.scrollTo(0, 0);
  document.body.scrollTo(0, 0);
  
  // Also try smooth scrolling as a fallback
  try {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  } catch (error) {
    // Fallback for older browsers
    window.scrollTo(0, 0);
  }
}; 