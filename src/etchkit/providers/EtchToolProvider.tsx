import React, { createContext, useContext, useEffect, useState } from 'react';
import { EtchPoint } from '../classes/EtchPoint';
import { EtchTool } from '../classes/EtchTool';
import { EtchLineTool } from '../classes/tools/EtchLineTool';
import { EtchMoveTool } from '../classes/tools/EtchMoveTool';
import { EtchSelectTool } from '../classes/tools/EtchSelectTool';
import { ToolType } from '../types/ToolType';
import { useEtchCanvasProvider } from './EtchCanvasProvider';
import { useEtchInputProvider } from './EtchInputProvider';

export interface IEtchToolContextProps {
  toolPosition: EtchPoint;
  activeTool: EtchTool;
  switchTool: (tool: ToolType) => EtchTool;
}

const EtchToolContext = createContext<IEtchToolContextProps>({
  activeTool: new EtchSelectTool(),
  toolPosition: new EtchPoint(0, 0),
  switchTool: () => new EtchSelectTool(),
});

export interface IEtchToolProviderProps {}

export const EtchToolProvider: React.FunctionComponent<
  IEtchToolProviderProps
> = (props) => {
  const { children } = props;
  const { mousePosition } = useEtchInputProvider();
  const { drawingContext } = useEtchCanvasProvider();

  const [activeTool, setActiveTool] = useState(new EtchLineTool());
  const [toolPosition, setToolPosition] = useState(new EtchPoint(0, 0));

  useEffect(() => {
    const target = drawingContext?.canvas;
    if (!target) {
      return;
    }
    const x = mousePosition.getX();
    const y = mousePosition.getY();
    const newToolPosition = new EtchPoint(
      Math.min(Math.max(x - target.offsetLeft, 0), target.width),
      Math.min(Math.max(y - target.offsetTop, 0), target.height)
    );
    setToolPosition(newToolPosition);
  }, [mousePosition]);

  const switchTool = (toolType: ToolType): EtchTool => {
    let tool;
    switch (toolType) {
      case ToolType.Move:
        tool = new EtchMoveTool();
        setActiveTool(tool);
        break;
      case ToolType.Line:
        tool = new EtchLineTool();
        setActiveTool(tool);
        break;
      default:
        tool = new EtchSelectTool();
        setActiveTool(tool);
        break;
    }
    return tool;
  };

  return (
    <EtchToolContext.Provider value={{ activeTool, toolPosition, switchTool }}>
      {children}
    </EtchToolContext.Provider>
  );
};

export const useEtchToolProvider = () => useContext(EtchToolContext);
