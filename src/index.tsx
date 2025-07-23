import { useEffect, useRef } from "react";

/**
 * useDebounce
 * Calls the provided function after the user stops triggering it for `delay` ms.
 *
 * @param callback Function to run after debounce delay
 * @param delay Delay in ms
 * @returns A debounced version of the function
 */
export function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): T {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedCallback = useRef(callback);

  // Keep the latest callback reference
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  function debouncedFunction(...args: Parameters<T>) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      savedCallback.current(...args);
    }, delay);
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return debouncedFunction as T;
}
