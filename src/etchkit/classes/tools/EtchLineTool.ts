import { IEtchCanvasContextProps } from '../../providers/EtchCanvasProvider';
import { IEtchElementContextProps } from '../../providers/EtchElementProvider';
import { IEtchInputContextProps } from '../../providers/EtchInputProvider';
import { IEtchToolContextProps } from '../../providers/EtchToolProvider';
import { ToolType } from '../../types/ToolType';
import { EtchLineElement } from '../elements/EtchLineElement';
import { EtchPoint } from '../EtchPoint';
import { EtchTool } from '../EtchTool';

export class EtchLineTool extends EtchTool {
  private temporaryElement?: EtchLineElement;
  constructor() {
    super(ToolType.Line);
  }
  public onAnimationFrame(
    { interfaceContext }: IEtchCanvasContextProps,
    { activeTool, toolPosition }: IEtchToolContextProps,
    { isMouseDown }: IEtchInputContextProps,
    elementContext: IEtchElementContextProps
  ) {
    if (interfaceContext) {
      // draw circular arc at tool position with activetool stroke width as radius
      interfaceContext.beginPath();
      interfaceContext.arc(
        toolPosition.getX(),
        toolPosition.getY(),
        activeTool.getStrokeWidth(),
        0,
        2 * Math.PI
      );
      interfaceContext.stroke();
    }

    if (isMouseDown && !this.temporaryElement) {
      this.temporaryElement = new EtchLineElement(
        new EtchPoint(toolPosition.getX(), toolPosition.getY()),
        new EtchPoint(toolPosition.getX(), toolPosition.getY())
      );
      const { elements } = elementContext;
      elements.push(this.temporaryElement);
    }

    if (this.temporaryElement) {
      this.temporaryElement.setPoint2(toolPosition);
    }

    if (!isMouseDown && this.temporaryElement) {
      this.temporaryElement = undefined;
    }
  }
}
