import { useEffect, useState } from 'react';

export const useMediaQuery = (query) => {
  const [isMatching, setMatching] = useState(
    () => window.matchMedia && matchMedia(query).matches
  );

  useEffect(() => {
    if (!window.matchMedia) {
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
