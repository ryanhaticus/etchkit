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
    { setSelectedCursor }: IEtchCanvasContextProps,
    { toolPosition, switchTool }: IEtchToolContextProps,
    { isMouseDown }: IEtchInputContextProps,
    elementContext: IEtchElementContextProps
  ) {
    if (setSelectedCursor) {
      setSelectedCursor('crosshair');
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
      switchTool(ToolType.Select);
    }
  }
}
