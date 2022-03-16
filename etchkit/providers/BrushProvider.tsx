import { createContext, useContext, useEffect, useState } from 'react';
import useAnimationFrame from '../hooks/AnimationFrame';
import EtchBrush from '../classes/EtchBrush';
import LazyBrush from '../classes/brushes/EtchLazyBrush';
import { useInputProvider } from './InputProvider';
import { useElementProvider } from './ElementProvider';

interface BrushContextProps {
  brush: EtchBrush;
}

const BrushContext = createContext<BrushContextProps>(null);

const BrushProvider = ({ children }) => {
  const [brush, setBrush] = useState<EtchBrush>(null);
  const inputProvider = useInputProvider();
  const elementProvider = useElementProvider();
  useEffect(() => {
    const { canvasX, canvasY } = inputProvider;
    setBrush(new LazyBrush(canvasX, canvasY, 10, 15));
  }, []);
  useAnimationFrame(() => {
    if (!brush) {
      return;
    }
    brush.draw(inputProvider, elementProvider);
  });
  return (
    <BrushContext.Provider
      value={{
        brush
      }}
    >
      {children}
    </BrushContext.Provider>
  );
};

export default BrushProvider;

export const useBrushProvider = () => useContext(BrushContext);
