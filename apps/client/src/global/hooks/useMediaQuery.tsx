import { useEffect, useState } from "react";

type Breakpoint = "sm" | "md" | "lg" | "xl";

const breakpoints: { [key in Breakpoint]: string } = {
  sm: "(max-width: 576px)",
  md: "(max-width: 768px)",
  lg: "(max-width: 1100px)",
  xl: "(min-width: 1100px)",
};

interface QueryProps {
  query: string;
  breakpoint?: undefined;
}

interface BreakpointProps {
  query?: undefined;
  breakpoint: Breakpoint;
}

type MediaQueryProps = QueryProps | BreakpointProps;

const useMediaQuery = ({ query, breakpoint }: MediaQueryProps): boolean => {
  const mediaQuery = query || (breakpoint && breakpoints[breakpoint]);

  const [matches, setMatches] = useState(() => {
    if (mediaQuery) {
      const mediaQueryList = window.matchMedia(mediaQuery);
      return mediaQueryList.matches;
    }
    return false;
  });

  useEffect(() => {
    if (mediaQuery) {
      const mediaQueryList = window.matchMedia(mediaQuery);
      const handleChange = (event: MediaQueryListEvent) =>
        setMatches(event.matches);
      mediaQueryList.addEventListener("change", handleChange);
      return () => {
        mediaQueryList.removeEventListener("change", handleChange);
      };
    }
  }, [mediaQuery]);

  return matches;
};

export default useMediaQuery;
