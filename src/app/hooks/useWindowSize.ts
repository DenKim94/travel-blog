import { useState, useLayoutEffect, useCallback, useRef } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

interface UseWindowSizeOptions {
  debounceDelay?: number;
}

/**
 * Returns the current window size.
 * 
 * @param {UseWindowSizeOptions} [options] Options for the hook.
 * @param {number} [options.debounceDelay] Debounce delay in milliseconds (default = 0).
 * @returns {WindowSize} The current window size in pixel [width, height].
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
