import { useEffect, useRef } from 'react';
import { useCanvasProvider } from './providers/CanvasProvider';

export interface EtchCanvasParams {
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

const EtchCanvas = ({ width, height, children }: EtchCanvasParams) => {
  const { setInterfaceRef, setDrawingRef } = useCanvasProvider();
  const interfaceRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    setInterfaceRef(interfaceRef);
    setDrawingRef(drawingRef);
  });
  return (
    <div className='relative'>
      <canvas
        className='absolute z-20'
        ref={drawingRef}
        width={width || window.innerWidth}
        height={height || window.innerHeight}
      ></canvas>
      <canvas
        className='absolute z-30'
        ref={interfaceRef}
        width={width || window.innerWidth}
        height={height || window.innerHeight}
      ></canvas>

      {children}
    </div>
  );
};

export default EtchCanvas;
