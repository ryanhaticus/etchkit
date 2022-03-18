import { ElementType } from "../types/ElementType";
import EtchColor from "../types/EtchColor";
import EtchContextColor from "./EtchContextColor";
import EtchPoint from "./EtchPoint";

interface EtchElementParams {
  position: EtchPoint;
  selected: boolean;
}

export default abstract class EtchElement {
  private position: EtchPoint;
  private selected: boolean;
  constructor({ position }: EtchElementParams) {
    this.position = position;
    this.selected = false;
  }
  public getPosition() {
    return this.position;
  }
  public isSelected(): boolean {
    return this.selected;
  }
  public select(): void {
    this.selected = true;
  }
  public deselect(): void {
    this.selected = false;
  }
  public abstract getElementType(): ElementType;
  public abstract render(context: CanvasRenderingContext2D): void;
  public abstract trace(context: CanvasRenderingContext2D): void;
  protected _trace(p1: EtchPoint, p2: EtchPoint, context: CanvasRenderingContext2D) {
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = new EtchContextColor(EtchColor.Gray, 80).getContextColor();
    context.setLineDash([8, 8]);
    const minX = p1.getX();
    const maxX = p2.getX();
    const minY = p1.getY();
    const maxY = p2.getY();
    context.moveTo(minX, minY);
    context.lineTo(maxX, minY);
    context.lineTo(maxX, maxY);
    context.lineTo(minX, maxY);
    context.lineTo(minX, minY);
    context.stroke();
    context.setLineDash([]);
  }

}
