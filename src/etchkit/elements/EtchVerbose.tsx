import React from 'react';
import { useEtchCanvasProvider } from '../providers/EtchCanvasProvider';
import { useEtchInputProvider } from '../providers/EtchInputProvider';
import { useEtchToolProvider } from '../providers/EtchToolProvider';
import { EtchVerboseDisplay } from './EtchVerboseDisplay';

export interface IEtchVerboseProps {}

export const EtchVerbose: React.FunctionComponent<IEtchVerboseProps> = (
  props
) => {
  const { interfaceContext, drawingContext } = useEtchCanvasProvider();
  const { isMouseDown, mousePosition } = useEtchInputProvider();
  const { activeTool, toolPosition } = useEtchToolProvider();

  return (
    <div
      style={{
        position: 'absolute',
        height: '100%',
        display: 'flex',
        justifyContent: 'end',
        flexDirection: 'column',
      }}
    >
      <EtchVerboseDisplay
        name='interfaceContext'
        value={interfaceContext ? 'exists' : 'does not exist'}
      />
      <EtchVerboseDisplay
        name='drawingContext'
        value={drawingContext ? 'exists' : 'does not exist'}
      />
      <EtchVerboseDisplay name='isMouseDown' value={`${isMouseDown}`} />
      <EtchVerboseDisplay
        name='mousePosition'
        value={`(${mousePosition.getX()}, ${mousePosition.getY()})`}
      />
      <EtchVerboseDisplay
        name='activeTool'
        value={activeTool.getToolType().toString()}
      />
      <EtchVerboseDisplay
        name='toolPosition'
        value={`(${toolPosition.getX()}, ${toolPosition.getY()})`}
      />
    </div>
  );
};
