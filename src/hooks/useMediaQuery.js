import { useEffect, useState } from 'react';

export const useMediaQuery = (query) => {
  const [isMatching, setMatching] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia &&
      matchMedia(query).matches
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) {
      return;
    }

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
