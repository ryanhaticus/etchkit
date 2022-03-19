import { useRef, useLayoutEffect, useState } from 'react';

export const useAnimationFrame = (callback: Function) => {
  const callbackRef = useRef(callback);
  const [frame, setFrame] = useState(-1);
  const [timer, setTimer] = useState(-1);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useLayoutEffect(() => {
    const loop = (time: number) => {
      setFrame(requestAnimationFrame(loop));
      let dt = 0;
      if (timer !== -1 && timer !== -1) {
        dt = time - timer;
      }
      const callback = callbackRef.current;
      callback(dt / 1000);
      setTimer(time);
    };
    setFrame(requestAnimationFrame(loop));
    return () => cancelAnimationFrame(frame);
  }, []);
};
