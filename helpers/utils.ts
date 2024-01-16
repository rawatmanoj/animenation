// Mobile detection helper function
export const isMobile = (): boolean => {
    const userAgent = navigator.userAgent || navigator.vendor;
  
    // Check if the user agent contains any keywords indicating a mobile device
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
    // Check for touch support
    const hasTouch = 'ontouchstart' in window || ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0);
  
    return isMobileDevice || hasTouch;
  };
  