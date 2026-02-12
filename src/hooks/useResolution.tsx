import { useState, useEffect } from "react";

type Breakpoints = {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
};

const defaultBreakpoints: Breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const useResolution = (breakpoints: Breakpoints = defaultBreakpoints) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isSmall: windowWidth < (breakpoints.sm || 640),
    isMedium: windowWidth < (breakpoints.md || 768),
    isLarge: windowWidth < (breakpoints.lg || 1024),
    isXLarge: windowWidth < (breakpoints.lg || 1280),
    width: windowWidth,
  };
};

export default useResolution;
