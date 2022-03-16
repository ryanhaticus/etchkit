import { BrushType } from "../types/BrushType";
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
  public abstract getBrushType(): BrushType;
  public abstract render(context: CanvasRenderingContext2D): void;
}
