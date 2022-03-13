import { useEffect } from 'react';
import useAnimationFrame from './hook/AnimationFrame';
import { useBrushProvider } from './provider/BrushProvider';
import { useCanvasProvider } from './provider/CanvasProvider';
import { useMouseProvider } from './provider/MouseProvider';

const EtchRenderer = () => {
  const { interfaceContext, drawingContext } = useCanvasProvider();
  const { isDown, canvasX, canvasY } = useMouseProvider();
  const { brushX, brushY, oldBrushX, oldBrushY, brushRadius } =
    useBrushProvider();
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
    interfaceContext.arc(canvasX, canvasY, brushRadius, 0, 2 * Math.PI);
    interfaceContext.stroke();

    interfaceContext.beginPath();
    interfaceContext.lineWidth = 2;
    interfaceContext.strokeStyle = 'rgba(0,0,0,0.2)';
    interfaceContext.arc(brushX, brushY, brushRadius, 0, 2 * Math.PI);
    interfaceContext.stroke();

    if (isDown) {
      drawingContext.beginPath();
      drawingContext.lineWidth = brushRadius * 2;
      drawingContext.lineCap = 'round';
      drawingContext.strokeStyle = '#000';
      drawingContext.moveTo(brushX, brushY);
      drawingContext.lineTo(oldBrushX, oldBrushY);
      drawingContext.stroke();
    }
  };
  useAnimationFrame(() => {
    renderInterface();
  });
  return null;
};

export default EtchRenderer;
