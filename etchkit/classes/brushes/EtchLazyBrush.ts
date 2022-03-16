import { BrushType } from "../../types/BrushType";
import EtchBrush from "../EtchBrush";
import EtchPoint from "../EtchPoint";
import { LazyPathElement } from "../elements/LazyPathElement";

export default class LazyBrush extends EtchBrush {
  private lazyRadius: number;
  private lazyPosition: EtchPoint;
  constructor(x: number, y: number, radius: number, lazyRadius: number) {
    super(x, y, radius);
    this.lazyRadius = lazyRadius;
    this.lazyPosition = new EtchPoint(x, y);
  }
  public getLazyRadius(): number {
    return this.lazyRadius;
  }
  public setLazyRadius(lazyRadius: number): void {
    this.lazyRadius = lazyRadius;
  }
  public getLazyPosition(): EtchPoint {
    return this.lazyPosition;
  }
  public draw({ canvasX, canvasY, isDown }, { temporaryElement, setTemporaryElement }) {
    if (
      Math.abs(canvasX - this.lazyPosition.getX()) >
      this.lazyRadius ||
      Math.abs(canvasY - this.lazyPosition.getY()) >
      this.lazyRadius
    ) {
     
      this.lazyPosition.setXY(this);
      const angle = Math.atan2(
        canvasY - this.lazyPosition.getY(),
        canvasX - this.lazyPosition.getX()
      );
      const dist =
        Math.sqrt(
          Math.pow(canvasX - this.getX(), 2) +
          Math.pow(canvasY - this.getY(), 2)
        ) - this.lazyRadius;
      const newBrushX =
        this.lazyPosition.getX() + dist * Math.cos(angle);
      const newBrushY =
        this.lazyPosition.getY() + dist * Math.sin(angle);
      this.setXY(new EtchPoint(newBrushX, newBrushY));
    }
    if (isDown) {
      if (temporaryElement && temporaryElement.getBrushType() == BrushType.Lazy) {
        temporaryElement.getPoints().push(new EtchPoint(this.lazyPosition.getX(), this.lazyPosition.getY()));
      }
      if (!temporaryElement) {
        setTemporaryElement(new LazyPathElement([new EtchPoint(this.lazyPosition.getX(), this.lazyPosition.getY())], this.getRadius()));
      }
    }
  }
}