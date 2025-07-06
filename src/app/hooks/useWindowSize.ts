import { useState, useLayoutEffect, useCallback, useRef } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

interface UseWindowSizeOptions {
  debounceDelay?: number;
}


/**
 * Ein benutzerdefinierter Hook zur Ermittlung der Fenstergröße.
 * 
 * Ermittelt die Breite und Höhe des sichtbaren Fensters und aktualisiert diese Werte bei einer Größenänderung.
 * Optional kann ein Verzögerungsintervall für die Aktualisierung angegeben werden, um die Anzahl der
 * Neuberechnungen zu begrenzen.
 *
 * @param {UseWindowSizeOptions} options - Ein Objekt mit optionalen Einstellungen.
 * @param {number} [options.debounceDelay=0] - Die Verzögerung in Millisekunden zwischen den
 * Aktualisierungen der Fenstergröße. Wird verwendet, um die Häufigkeit der Neuberechnungen
 * bei einer Größenänderung zu reduzieren.
 *
 * @returns {WindowSize} Ein Objekt, das die aktuelle Breite und Höhe des sichtbaren Fensters enthält.
 */

const useWindowSize = (options: UseWindowSizeOptions = {}): WindowSize => {
    const { debounceDelay = 0 } = options;
    const timeoutRef = useRef<NodeJS.Timeout| undefined>(undefined);

    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: 0,
        height: 0,
    });

    const updateSize = useCallback(() => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, []);

    const debouncedUpdateSize = useCallback(() => {
        if (debounceDelay > 0) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(updateSize, debounceDelay);
        } else {
            updateSize();
        }

    }, [updateSize, debounceDelay]);

    useLayoutEffect(() => {
        updateSize();
        
        window.addEventListener('resize', debouncedUpdateSize);
        
        return () => window.removeEventListener('resize', debouncedUpdateSize);

    }, [debouncedUpdateSize, updateSize]);

    return windowSize;
};

export default useWindowSize;
