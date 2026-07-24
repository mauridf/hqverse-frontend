import { useState, useEffect, useRef, useCallback } from 'react';

interface UseIntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

export function useIntersectionObserver<T extends Element>({
  root = null,
  rootMargin = '0px',
  threshold = 0,
  once = false,
}: UseIntersectionObserverOptions = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<T | null>(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      const intersecting = entry.isIntersecting;

      setIsIntersecting(intersecting);

      if (intersecting && once && !hasIntersected) {
        setHasIntersected(true);
      }
    },
    [once, hasIntersected]
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(callback, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [callback, root, rootMargin, threshold]);

  return {
    elementRef,
    isIntersecting: once ? hasIntersected || isIntersecting : isIntersecting,
  };
}
