import React, { createContext, useContext, useEffect, useState } from 'react';
import { EtchPoint } from '../classes/EtchPoint';
import { useEtchConfigurationProvider } from '../EtchKit';
import { useEtchCanvasProvider } from './EtchCanvasProvider';

export interface IEtchInputContextProps {
  isMouseDown: boolean;
  mousePosition: EtchPoint;
}

const EtchInputContext = createContext<IEtchInputContextProps>({
  isMouseDown: false,
  mousePosition: new EtchPoint(0, 0),
});

export interface IEtchInputProviderProps {}

export const EtchInputProvider: React.FunctionComponent<
  IEtchInputProviderProps
> = (props) => {
  const { children } = props;
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mousePosition, setMousePosition] = useState(new EtchPoint(0, 0));
  const { bindControlsToWindow } = useEtchConfigurationProvider();
  const { drawingContext } = useEtchCanvasProvider();

  const handleMouseDown = () => {
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (_event: Event) => {
    const event = _event as MouseEvent;
    setMousePosition(new EtchPoint(event.clientX, event.clientY));
  };

  useEffect(() => {
    const target = bindControlsToWindow ? window : drawingContext?.canvas;
    if (!target) {
      return;
    }
    target.addEventListener('mousedown', handleMouseDown);
    target.addEventListener('mouseup', handleMouseUp);
    target.addEventListener('mousemove', handleMouseMove);
    target.addEventListener('touchstart', handleMouseDown);
    target.addEventListener('touchend', handleMouseUp);
    target.addEventListener('touchmove', handleMouseMove);
    return () => {
      target.removeEventListener('mousedown', handleMouseDown);
      target.removeEventListener('mouseup', handleMouseUp);
      target.removeEventListener('mousemove', handleMouseMove);
      target.removeEventListener('touchstart', handleMouseDown);
      target.removeEventListener('touchend', handleMouseUp);
      target.removeEventListener('touchmove', handleMouseMove);
    };
  }, [drawingContext]);

  return (
    <EtchInputContext.Provider value={{ isMouseDown, mousePosition }}>
      {children}
    </EtchInputContext.Provider>
  );
};

export const useEtchInputProvider = () => useContext(EtchInputContext);
