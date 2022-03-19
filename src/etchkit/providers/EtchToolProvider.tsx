import React, { createContext, useContext, useEffect, useState } from 'react';
import { EtchPoint } from '../classes/EtchPoint';
import { useEtchCanvasProvider } from './EtchCanvasProvider';
import { useEtchInputProvider } from './EtchInputProvider';

export interface IEtchToolContextProps {
  toolPosition: EtchPoint;
}

const EtchToolContext = createContext<IEtchToolContextProps>({
  toolPosition: new EtchPoint(0, 0),
});

export interface IEtchToolProviderProps {}

export const EtchToolProvider: React.FunctionComponent<
  IEtchToolProviderProps
> = (props) => {
  const { children } = props;
  const [toolPosition] = useState(new EtchPoint(0, 0));
  const { mousePosition } = useEtchInputProvider();
  const { interfaceContext } = useEtchCanvasProvider();

  useEffect(() => {
    const target = interfaceContext?.canvas;
    if (!target) {
      return;
    }
    const x = mousePosition.getX();
    const y = mousePosition.getY();
    const newToolPosition = new EtchPoint(
      Math.min(Math.max(x - target.offsetLeft, 0), target.width),
      Math.min(Math.max(y - target.offsetTop, 0), target.height)
    );
    toolPosition.set(newToolPosition);
  }, [mousePosition]);

  return (
    <EtchToolContext.Provider value={{ toolPosition }}>
      {children}
    </EtchToolContext.Provider>
  );
};

export const useEtchToolProvider = () => useContext(EtchToolContext);
