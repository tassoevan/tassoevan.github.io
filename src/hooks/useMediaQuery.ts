import { useEffect, useState } from 'react';

export const useStaticMediaQuery = (_query: string) => {
  return false;
};

export const useDynamicMediaQuery = (query: string) => {
  const [isMatching, setMatching] = useState(() => matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = matchMedia(query);

    const handleChange = () => {
      setMatching(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return isMatching;
};

export const useMediaQuery =
  typeof window !== 'undefined' && !!window.matchMedia
    ? useDynamicMediaQuery
    : useStaticMediaQuery;
