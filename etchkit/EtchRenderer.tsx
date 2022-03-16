import useAnimationFrame from './hooks/AnimationFrame';
import LazyBrush from './classes/brushes/EtchLazyBrush';
import { useBrushProvider } from './providers/BrushProvider';
import { useCanvasProvider } from './providers/CanvasProvider';
import { useInputProvider } from './providers/InputProvider';
import { useElementProvider } from './providers/ElementProvider';
import { BrushType } from './types/BrushType';
import { LazyPathElement } from './classes/elements/LazyPathElement';

const EtchRenderer = () => {
  const { interfaceContext, drawingContext } = useCanvasProvider();
  const { canvasX, canvasY } = useInputProvider();
  const { temporaryElement, elements } = useElementProvider();
  const { brush } = useBrushProvider();
  const renderInterface = () => {
    if (!interfaceContext || !drawingContext) {
      return;
    }

    interfaceContext.clearRect(
      0,
      0,
      interfaceContext.canvas.width,
      interfaceContext.canvas.height
    );

    interfaceContext.beginPath();
    interfaceContext.lineWidth = 2;
    interfaceContext.strokeStyle = 'rgba(0,0,0,0.5)';
    interfaceContext.arc(canvasX, canvasY, brush.getRadius(), 0, 2 * Math.PI);
    interfaceContext.stroke();

    interfaceContext.beginPath();
    interfaceContext.lineWidth = 2;
    interfaceContext.strokeStyle = 'rgba(0,0,0,0.2)';
    interfaceContext.arc(
      brush.getX(),
      brush.getY(),
      brush.getRadius(),
      0,
      2 * Math.PI
    );
    interfaceContext.stroke();
  };
  const renderElements = () => {
    if (!drawingContext) {
      return;
    }

    drawingContext.clearRect(
      0,
      0,
      drawingContext.canvas.width,
      drawingContext.canvas.height
    );

    drawingContext.strokeStyle = '#000';
    drawingContext.lineWidth = 1;
    drawingContext.setLineDash([]);

    for (const element of [temporaryElement, ...elements]) {
      if (!element) {
        continue;
      }
      switch (element.getBrushType()) {
        case BrushType.Lazy:
          (element as LazyPathElement).render(drawingContext);
          break;
      }
    }
  };
  useAnimationFrame(() => {
    renderInterface();
    renderElements();
  });
  return null;
};

export default EtchRenderer;
