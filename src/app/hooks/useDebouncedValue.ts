import { useState, useEffect } from "react";


/**
 * Eine benutzerdefinierte Hook, der einen Wert mit einer Verzögerung
 * bereitstellt.
 *
 * @param {T} value - Der Wert, der verzögert werden soll.
 * @param {number} delay - Die Dauer der Verzögerung in Millisekunden.
 *
 * @returns {T} Der verzögerte Wert.
 */
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}