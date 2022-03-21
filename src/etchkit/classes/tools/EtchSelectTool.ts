import { IEtchCanvasContextProps } from '../../providers/EtchCanvasProvider';
import { IEtchElementContextProps } from '../../providers/EtchElementProvider';
import { IEtchInputContextProps } from '../../providers/EtchInputProvider';
import { IEtchToolContextProps } from '../../providers/EtchToolProvider';
import { ToolType } from '../../types/ToolType';
import { EtchRectangleElement } from '../elements/EtchRectangleElement';
import { EtchColor } from '../EtchColor';
import { EtchPoint } from '../EtchPoint';
import { EtchTool } from '../EtchTool';

export class EtchSelectTool extends EtchTool {
  private startPoint?: EtchPoint;
  constructor() {
    super(ToolType.Select);
    this.setStrokeWidth(1);
  }
  public onAnimationFrame(
    { setSelectedCursor, drawingContext }: IEtchCanvasContextProps,
    { toolPosition }: IEtchToolContextProps,
    { isMouseDown }: IEtchInputContextProps,
    { elements, selectedElements }: IEtchElementContextProps
  ): void {
    if (setSelectedCursor) {
      setSelectedCursor('default');
    }

    if (!this.startPoint && isMouseDown) {
      selectedElements.length = 0;
      this.startPoint = new EtchPoint(toolPosition.getX(), toolPosition.getY());
    }

    if (this.startPoint && !isMouseDown) {
      this.startPoint = undefined;
      return;
    }

    if (!this.startPoint) {
      return;
    }

    if (!drawingContext) {
      return;
    }

    const selectionRectangle = new EtchRectangleElement(
      this.startPoint,
      toolPosition.getX() - this.startPoint.getX(),
      toolPosition.getY() - this.startPoint.getY(),
      new EtchColor(2, 132, 199, 0.1)
    );
    selectionRectangle.setStrokeWidth(this.getStrokeWidth());
    selectionRectangle.setColor(new EtchColor(2, 132, 199, 0.5));
    selectionRectangle.onAnimationFrame({ drawingContext });

    for (const element of elements) {
      const elementBoundingBox = element.getBoundingBox();
      const selectionBoundingBox = selectionRectangle.getBoundingBox();
      if (selectionBoundingBox.overlapsBoundingBox(elementBoundingBox)) {
        if (!selectedElements.includes(element)) {
          selectedElements.push(element);
        }
      } else {
        const index = selectedElements.indexOf(element);
        if (index !== -1) {
          selectedElements.splice(index, 1);
        }
      }
    }
  }
}
