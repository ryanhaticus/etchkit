import { IEtchCanvasContextProps } from '../../providers/EtchCanvasProvider';
import { EtchBoundingBox } from '../EtchBoundingBox';
import { EtchColor } from '../EtchColor';
import { EtchElement } from '../EtchElement';
import { EtchPoint } from '../EtchPoint';

export class EtchRectangleElement extends EtchElement {
  private point: EtchPoint;
  private width: number;
  private height: number;
  private fillColor: EtchColor;
  constructor(
    point: EtchPoint,
    width: number,
    height: number,
    fillColor?: EtchColor
  ) {
    super(0);
    this.point = point;
    this.width = width;
    this.height = height;
    this.fillColor = fillColor || new EtchColor(0, 0, 0, 0);
    this.calculateBoundingBox();
  }
  public onAnimationFrame({ drawingContext }: IEtchCanvasContextProps): void {
    if (!drawingContext) {
      return;
    }
    drawingContext.lineWidth = this.getStrokeWidth() * 2;
    drawingContext.strokeStyle = this.getColor().toRGBAString();
    drawingContext.beginPath();
    drawingContext.rect(
      this.point.getX(),
      this.point.getY(),
      this.width,
      this.height
    );
    drawingContext.fillStyle = this.fillColor.toRGBAString();
    drawingContext.fill();
    drawingContext.stroke();
  }
  public calculateBoundingBox(): void {
    this.setBoundingBox(
      new EtchBoundingBox(
        new EtchPoint(this.point.getX(), this.point.getY()),
        this.width,
        this.height
      )
    );
  }
}
