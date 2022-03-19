import { IEtchCanvasContextProps } from '../../providers/EtchCanvasProvider';
import { EtchBoundingBox } from '../EtchBoundingBox';
import { EtchElement } from '../EtchElement';
import { EtchPoint } from '../EtchPoint';

export class EtchLineElement extends EtchElement {
  private point1: EtchPoint;
  private point2: EtchPoint;
  constructor(point1: EtchPoint, point2: EtchPoint) {
    super(0);
    this.point1 = point1;
    this.point2 = point2;
    this.calculateBoundingBox();
  }
  public getPoint1(): EtchPoint {
    return this.point1;
  }
  public getPoint2(): EtchPoint {
    return this.point2;
  }
  public setPoint1(point1: EtchPoint): void {
    this.point1 = point1;
    this.calculateBoundingBox();
  }
  public setPoint2(point2: EtchPoint): void {
    this.point2 = point2;
    this.calculateBoundingBox();
  }
  public calculateBoundingBox(): void {
    this.setBoundingBox(
      new EtchBoundingBox(
        new EtchPoint(
          Math.min(this.point1.getX(), this.point2.getX()),
          Math.min(this.point1.getY(), this.point2.getY())
        ),
        new EtchPoint(
          Math.max(this.point1.getX(), this.point2.getX()),
          Math.max(this.point1.getY(), this.point2.getY())
        )
      )
    );
  }
  public onAnimationFrame({ drawingContext }: IEtchCanvasContextProps): void {
    if (!drawingContext) {
      return;
    }
    drawingContext.lineWidth = this.getStrokeWidth() * 2;
    drawingContext.strokeStyle = this.getColor().toRGBAString();
    drawingContext.beginPath();
    drawingContext.moveTo(this.point1.getX(), this.point1.getY());
    drawingContext.lineTo(this.point2.getX(), this.point2.getY());
    drawingContext.stroke();
  }
}
