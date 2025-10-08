import { useEffect, useRef } from 'react';

/**
 * Scroll-Sperre, um den Nutzer daran zu hindern, die Seite zu scrollen, wenn dies nicht erwünscht ist.
 * 
 * @param {boolean} isOpen - Ein boolean, der angibt, ob der Status aktiv ist oder nicht.
 * 
 * @example
 * useScrollLock(isOpen);
 */
export function useScrollLock(isOpen: boolean) {
  const savedY = useRef(0);

  useEffect(() => {
    if (!isOpen) return;

    // 1) aktuelle Scrollposition sichern
    savedY.current = window.scrollY;

    // 2) Body fixieren, Breite halten, Overflow aus
    const { style } = document.body;
    const original = {
      position: style.position,
      top: style.top,
      width: style.width,
      overflow: style.overflow,
    };

    style.position = 'fixed';
    style.top = `-${savedY.current}px`;
    style.width = '100%';
    style.overflow = 'hidden';

    // 3) Cleanup: Styles zurücksetzen und Position wiederherstellen
    return () => {
      style.position = original.position;
      style.top = original.top;
      style.width = original.width;
      style.overflow = original.overflow;
      window.scrollTo(0, savedY.current);
    };
  }, [isOpen]);
}
