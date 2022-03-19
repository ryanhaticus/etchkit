import React from 'react';
import { useAnimationFrame } from '../hooks/AnimationFrame';
import { useEtchCanvasProvider } from './EtchCanvasProvider';
import { useEtchElementProvider } from './EtchElementProvider';
import { useEtchInputProvider } from './EtchInputProvider';
import { useEtchToolProvider } from './EtchToolProvider';

export interface IEtchRendererProviderProps {}

export const EtchRendererProvider: React.FunctionComponent<
  IEtchRendererProviderProps
> = (props) => {
  const { children } = props;

  const canvasContext = useEtchCanvasProvider();
  const inputContext = useEtchInputProvider();
  const toolContext = useEtchToolProvider();
  const elementContext = useEtchElementProvider();

  useAnimationFrame(() => {
    const { interfaceContext, drawingContext } = canvasContext;
    const { activeTool } = toolContext;

    if (!interfaceContext || !drawingContext || !activeTool) {
      return;
    }

    drawingContext.clearRect(
      0,
      0,
      drawingContext.canvas.width,
      drawingContext.canvas.height
    );
    interfaceContext.clearRect(
      0,
      0,
      interfaceContext.canvas.width,
      interfaceContext.canvas.height
    );

    activeTool.onAnimationFrame(
      canvasContext,
      toolContext,
      inputContext,
      elementContext
    );

    const { elements } = elementContext;
    const sortedElements = elements.sort((a, b) => b.getLayer() - a.getLayer());

    for (let element of sortedElements) {
      element.onAnimationFrame(canvasContext);
    }
  });

  return <>{children}</>;
};
