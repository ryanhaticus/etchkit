import { ElementContextProps } from "../providers/ElementProvider";
import { InputContextProps } from "../providers/InputProvider";
import EtchPoint from "./EtchPoint";

export default abstract class EtchBrush extends EtchPoint {
  private radius: number;
  constructor(x: number, y: number, radius: number) {
    super(x, y);
    this.radius = radius;
  }
  public getRadius(): number {
    return this.radius;
  }
  public setRadius(radius: number): void {
    this.radius = radius;
  }
  public abstract draw(inputProvider: InputContextProps, elementProvider: ElementContextProps): void;
}