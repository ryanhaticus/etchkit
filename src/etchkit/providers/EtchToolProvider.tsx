import React, { createContext, useContext, useEffect, useState } from 'react';
import { EtchPoint } from '../classes/EtchPoint';
import { EtchTool } from '../classes/EtchTool';
import { EtchMoveTool } from '../tools/EtchMoveTool';
import { useEtchCanvasProvider } from './EtchCanvasProvider';
import { useEtchInputProvider } from './EtchInputProvider';

export interface IEtchToolContextProps {
  toolPosition: EtchPoint;
  activeTool: EtchTool;
}

const EtchToolContext = createContext<IEtchToolContextProps>({
  activeTool: new EtchMoveTool(),
  toolPosition: new EtchPoint(0, 0),
});

export interface IEtchToolProviderProps {}

export const EtchToolProvider: React.FunctionComponent<
  IEtchToolProviderProps
> = (props) => {
  const { children } = props;
  const { mousePosition } = useEtchInputProvider();
  const { interfaceContext } = useEtchCanvasProvider();

  const [activeTool] = useState(new EtchMoveTool());
  const [toolPosition] = useState(new EtchPoint(0, 0));

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
    <EtchToolContext.Provider value={{ activeTool, toolPosition }}>
      {children}
    </EtchToolContext.Provider>
  );
};

export const useEtchToolProvider = () => useContext(EtchToolContext);
