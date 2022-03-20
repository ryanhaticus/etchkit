import React, { createContext, useContext, useEffect, useState } from 'react';
import { useEtchConfigurationProvider } from '../EtchKit';

export interface IEtchCanvasContextProps {
  drawingContext?: CanvasRenderingContext2D;
  setSelectedCursor?: React.Dispatch<React.SetStateAction<string>>;
}

const EtchCanvasContext = createContext<IEtchCanvasContextProps>({});

export interface IEtchCanvasProviderProps {}

export const EtchCanvasProvider: React.FunctionComponent<
  IEtchCanvasProviderProps
> = (props) => {
  const { children } = props;
  const { width, height } = useEtchConfigurationProvider();

  const drawingCanvas = React.useRef<HTMLCanvasElement>(null);

  const [drawingContext, setDrawingContext] =
    useState<CanvasRenderingContext2D>();
  const [selectedCursor, setSelectedCursor] = useState('crosshair');

  useEffect(() => {
    if (drawingCanvas.current)
      setDrawingContext(
        drawingCanvas.current.getContext('2d') as CanvasRenderingContext2D
      );
  }, [drawingCanvas]);

  return (
    <>
      <canvas
        style={{
          position: 'absolute',
          zIndex: 10,
          cursor: selectedCursor,
        }}
        width={width || window.innerWidth}
        height={height || window.innerHeight}
        ref={drawingCanvas}
      ></canvas>
      <EtchCanvasContext.Provider value={{ drawingContext, setSelectedCursor }}>
        {children}
      </EtchCanvasContext.Provider>
    </>
  );
};

export const useEtchCanvasProvider = () => useContext(EtchCanvasContext);
