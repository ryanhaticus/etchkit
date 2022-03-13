import { useRef, useLayoutEffect } from 'react';

// Adapted from pablomayobre/useAnimationFrame.js on GitHub
const useAnimationFrame = (callback) => {
  const callbackRef = useRef(callback);
  const frameRef = useRef<number>(null);
  const timerRef = useRef<number>(null);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useLayoutEffect(() => {
    const loop = (time) => {
      frameRef.current = requestAnimationFrame(loop);
      let dt = 0;
      if (timerRef.current !== undefined && timerRef.current !== null) {
        dt = time - timerRef.current;
      }
      const callback = callbackRef.current;
      callback(dt / 1000);
      timerRef.current = time;
    };
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);
};

export default useAnimationFrame;
