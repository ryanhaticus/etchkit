import { EtchTool } from '../EtchTool';
import { ToolType } from '../../types/ToolType';

export class EtchMoveTool extends EtchTool {
  constructor() {
    super(ToolType.Move);
  }
  public onAnimationFrame(): void {}
}
