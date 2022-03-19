import { IEtchCanvasContextProps } from '../../providers/EtchCanvasProvider';
import { IEtchToolContextProps } from '../../providers/EtchToolProvider';
import { ToolType } from '../../types/ToolType';
import { EtchTool } from '../EtchTool';

export class EtchLineTool extends EtchTool {
  constructor() {
    super(ToolType.Line);
  }
  public onAnimationFrame(
    { interfaceContext, drawingContext }: IEtchCanvasContextProps,
    { activeTool, toolPosition }: IEtchToolContextProps
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
  }
}
