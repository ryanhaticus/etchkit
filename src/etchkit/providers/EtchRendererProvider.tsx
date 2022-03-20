import React from 'react';
import { EtchRectangleElement } from '../classes/elements/EtchRectangleElement';
import { EtchColor } from '../classes/EtchColor';
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
    const { drawingContext } = canvasContext;
    const { activeTool } = toolContext;

    if (!drawingContext || !activeTool) {
      return;
    }

    drawingContext.clearRect(
      0,
      0,
      drawingContext.canvas.width,
      drawingContext.canvas.height
    );

    activeTool.onAnimationFrame(
      canvasContext,
      toolContext,
      inputContext,
      elementContext
    );
    const { elements, selectedElements } = elementContext;
    const sortedElements = elements.sort((a, b) => b.getLayer() - a.getLayer());

    for (const element of sortedElements) {
      element.onAnimationFrame(canvasContext);
    }

    for (const element of selectedElements) {
      const boundingBox = element.getBoundingBox();
      const rectangle = new EtchRectangleElement(
        boundingBox.getPoint(),
        boundingBox.getWidth(),
        boundingBox.getHeight()
      );
      rectangle.setStrokeWidth(1);
      rectangle.setColor(new EtchColor(2, 132, 199, 0.5));
      rectangle.onAnimationFrame({ drawingContext });
    }
  });

  return <>{children}</>;
};
