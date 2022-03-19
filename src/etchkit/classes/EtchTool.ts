import { ToolType } from '../types/ToolType';

export abstract class EtchTool {
  private toolType: ToolType;
  constructor(toolType: ToolType) {
    this.toolType = toolType;
  }
  public getToolType(): ToolType {
    return this.toolType;
  }
  public abstract onAnimationFrame(): void;
}
