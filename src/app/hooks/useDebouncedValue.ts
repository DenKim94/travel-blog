import { useState, useEffect } from "react";

/**
 * Custom hook for debouncing a value.
 * 
 * Delays the update of a value by a specified delay.
 * 
 * @param {T} value The value to debounce.
 * @param {number} delay The delay in milliseconds.
 * @returns {T} The debounced value.
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}