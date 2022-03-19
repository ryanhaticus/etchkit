import { IEtchCanvasContextProps } from '../providers/EtchCanvasProvider';
import { IEtchElementContextProps } from '../providers/EtchElementProvider';
import { IEtchInputContextProps } from '../providers/EtchInputProvider';
import { IEtchToolContextProps } from '../providers/EtchToolProvider';
import { ToolType } from '../types/ToolType';

export abstract class EtchTool {
  private toolType: ToolType;
  private strokeWidth: number;
  constructor(toolType: ToolType, defaultStrokeWidth?: number) {
    this.toolType = toolType;
    this.strokeWidth = defaultStrokeWidth || 10;
  }
  public getToolType(): ToolType {
    return this.toolType;
  }
  public getStrokeWidth() {
    return this.strokeWidth;
  }
  public setStrokeWidth(defaultStrokeWidth: number) {
    this.strokeWidth = defaultStrokeWidth;
  }
  public abstract onAnimationFrame(
    canvasContext: IEtchCanvasContextProps,
    toolContext: IEtchToolContextProps,
    inputContext: IEtchInputContextProps,
    elementContext: IEtchElementContextProps
  ): void;
}
