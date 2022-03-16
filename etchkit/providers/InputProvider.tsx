import { createContext, useContext, useEffect, useState } from 'react';
import { useCanvasProvider } from './CanvasProvider';

export interface InputContextProps {
  inputX: number;
  inputY: number;
  isDown: boolean;
  canvasX: number;
  canvasY: number;
}

const InputContext = createContext<InputContextProps>(null);

const InputProvider = ({ children }) => {
  const [inputX, setInputX] = useState(0);
  const [inputY, setInputY] = useState(0);
  const [canvasX, setCanvasX] = useState(0);
  const [canvasY, setCanvasY] = useState(0);
  const [isDown, setIsDown] = useState(false);
  const { interfaceRef, interfaceContext } = useCanvasProvider();
  const onInputMove = ({ x, y }) => {
    // Set Input X and Y
    setInputX(x);
    setInputY(y);
    // Translate Input X and Y to Canvas X and Y
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
  useEffect(() => {
    window.onmousemove = (e) => onInputMove(e);
    window.onmousedown = () => setIsDown(true);
    window.onmouseup = () => setIsDown(false);
    window.ontouchmove = (e) =>
      onInputMove({ x: e.touches[0].pageX, y: e.touches[0].pageY });
    window.ontouchstart = () => setIsDown(true);
    window.ontouchend = () => setIsDown(false);
  });
  return (
    <InputContext.Provider
      value={{
        inputX,
        inputY,
        isDown,
        canvasX,
        canvasY
      }}
    >
      {children}
    </InputContext.Provider>
  );
};

export default InputProvider;

export const useInputProvider = () => useContext(InputContext);
