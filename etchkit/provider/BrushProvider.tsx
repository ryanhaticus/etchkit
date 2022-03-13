import { createContext, lazy, useContext, useEffect, useState } from 'react';
import useAnimationFrame from '../hook/AnimationFrame';
import { useCanvasProvider } from './CanvasProvider';
import { useMouseProvider } from './MouseProvider';
import { LazyBrush } from 'lazy-brush';

interface BrushContextProps {
  brushX: number;
  brushY: number;
  oldBrushX: number;
  oldBrushY: number;
  brushRadius: number;
}

const BrushContext = createContext<BrushContextProps>(null);

const BrushProvider = ({ children }) => {
  const [brushX, setBrushX] = useState(0);
  const [brushY, setBrushY] = useState(0);
  const [brushRadius, setBrushRadius] = useState(10);
  const { canvasX, canvasY } = useMouseProvider();
  const [oldBrushX, setOldBrushX] = useState(0);
  const [oldBrushY, setOldBrushY] = useState(0);
  useEffect(() => {
    setBrushX(canvasX);
    setBrushY(canvasY);
  }, []);
  useAnimationFrame(() => {
    if (
      Math.abs(canvasX - oldBrushX) < brushRadius &&
      Math.abs(canvasY - oldBrushY) < brushRadius
    ) {
      return;
    }
    setOldBrushX(brushX);
    setOldBrushY(brushY);
    const angle = Math.atan2(canvasY - oldBrushY, canvasX - oldBrushX);
    const dist =
      Math.sqrt(
        Math.pow(canvasX - oldBrushX, 2) + Math.pow(canvasY - oldBrushY, 2)
      ) - brushRadius;
    const newBrushX = oldBrushX + dist * Math.cos(angle);
    const newBrushY = oldBrushY + dist * Math.sin(angle);
    setBrushX(newBrushX);
    setBrushY(newBrushY);
  });
  return (
    <BrushContext.Provider
      value={{
        brushX,
        brushY,
        oldBrushX,
        oldBrushY,
        brushRadius
      }}
    >
      {children}
    </BrushContext.Provider>
  );
};

export default BrushProvider;

export const useBrushProvider = () => useContext(BrushContext);
