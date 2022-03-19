import React, { createContext, useContext, useEffect } from 'react';
import { useEtchConfigurationProvider } from '../EtchKit';

export interface IEtchCanvasContextProps {
  interfaceContext?: CanvasRenderingContext2D;
  drawingContext?: CanvasRenderingContext2D;
}

const EtchCanvasContext = createContext<IEtchCanvasContextProps>({});

export interface IEtchCanvasProviderProps {}

export const EtchCanvasProvider: React.FunctionComponent<
  IEtchCanvasProviderProps
> = (props) => {
  const { children } = props;
  const { width, height } = useEtchConfigurationProvider();

  const interfaceCanvas = React.useRef<HTMLCanvasElement>(null);
  const drawingCanvas = React.useRef<HTMLCanvasElement>(null);

  const [interfaceContext, setInterfaceContext] =
    React.useState<CanvasRenderingContext2D>();
  const [drawingContext, setDrawingContext] =
    React.useState<CanvasRenderingContext2D>();

  useEffect(() => {
    if (interfaceCanvas.current)
      setInterfaceContext(
        interfaceCanvas.current.getContext('2d') as CanvasRenderingContext2D
      );
    if (drawingCanvas.current)
      setDrawingContext(
        drawingCanvas.current.getContext('2d') as CanvasRenderingContext2D
      );
  }, [interfaceCanvas, drawingCanvas]);

  return (
    <>
      <canvas
        style={{
          zIndex: 20,
          position: 'absolute',
        }}
        width={width || window.innerWidth}
        height={height || window.innerHeight}
        ref={interfaceCanvas}
      ></canvas>
      <canvas
        style={{
          zIndex: 10,
          position: 'absolute',
        }}
        width={width || window.innerWidth}
        height={height || window.innerHeight}
        ref={drawingCanvas}
      ></canvas>
      <EtchCanvasContext.Provider value={{ interfaceContext, drawingContext }}>
        {children}
      </EtchCanvasContext.Provider>
    </>
  );
};

export const useEtchCanvasProvider = () => useContext(EtchCanvasContext);
