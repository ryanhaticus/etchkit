import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState
} from 'react';

interface CanvasContextProps {
  interfaceRef: React.RefObject<HTMLCanvasElement>;
  setInterfaceRef: Dispatch<
    React.SetStateAction<React.RefObject<HTMLCanvasElement>>
  >;
  drawingRef: React.RefObject<HTMLCanvasElement>;
  setDrawingRef: Dispatch<
    React.SetStateAction<React.RefObject<HTMLCanvasElement>>
  >;
  drawingContext: CanvasRenderingContext2D;
  interfaceContext: CanvasRenderingContext2D;
}

const CanvasContext = createContext<CanvasContextProps>(null);

const CanvasProvider = ({ children }) => {
  const [interfaceRef, setInterfaceRef] =
    useState<React.RefObject<HTMLCanvasElement>>(null);
  const [interfaceContext, setInterfaceContext] =
    useState<CanvasRenderingContext2D>(null);
  const [drawingRef, setDrawingRef] =
    useState<React.RefObject<HTMLCanvasElement>>(null);
  const [drawingContext, setDrawingContext] =
    useState<CanvasRenderingContext2D>(null);
  useEffect(() => {
    setInterfaceContext(interfaceRef?.current.getContext('2d'));
    setDrawingContext(drawingRef?.current.getContext('2d'));
  }, [interfaceRef]);
  return (
    <CanvasContext.Provider
      value={{
        interfaceRef,
        setInterfaceRef,
        drawingRef,
        setDrawingRef,
        drawingContext,
        interfaceContext
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasProvider;

export const useCanvasProvider = () => useContext(CanvasContext);
