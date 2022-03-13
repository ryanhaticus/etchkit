import { createContext, useContext, useEffect, useState } from 'react';
import { useCanvasProvider } from './CanvasProvider';

interface MouseContextProps {
  mouseX: number;
  mouseY: number;
  isDown: boolean;
  canvasX: number;
  canvasY: number;
}

const MouseContext = createContext<MouseContextProps>(null);

const MouseProvider = ({ children }) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [canvasX, setCanvasX] = useState(0);
  const [canvasY, setCanvasY] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const { interfaceRef, interfaceContext } = useCanvasProvider();
  useEffect(() => {
    window.onmousemove = ({ x, y }) => {
      // Set Mouse X and Y
      setMouseX(x);
      setMouseY(y);
      // Translate Mouse X and Y to Canvas X and Y
      const canvasX = Math.min(
        Math.max(x - interfaceRef.current.offsetLeft, 0),
        interfaceRef.current.width
      );
      const canvasY = Math.min(
        Math.max(y - interfaceRef.current.offsetTop, 0),
        interfaceRef.current.height
      );
      setCanvasX(canvasX);
      setCanvasY(canvasY);
    };
    window.onmousedown = () => setIsDown(true);
    window.onmouseup = () => setIsDown(false);
  });
  return (
    <MouseContext.Provider
      value={{
        mouseX,
        mouseY,
        isDown,
        canvasX,
        canvasY
      }}
    >
      {children}
    </MouseContext.Provider>
  );
};

export default MouseProvider;

export const useMouseProvider = () => useContext(MouseContext);
