import ElementType from '../../types/ElementType';
import EtchElement from '../EtchElement';
import EtchPoint from '../EtchPoint';
import EtchContextColor from '../EtchContextColor';
import EtchColor from '../../types/EtchColor';

export class LazyPathElement extends EtchElement {
  private points: EtchPoint[];
  private radius: number;
  private color: EtchContextColor;
  constructor(points: EtchPoint[], radius: number, color: EtchContextColor) {
    super({ position: points[0], selected: false });
    this.points = points;
    this.radius = radius;
    this.color = color;
    this.select();
  }
  public getPoints(): EtchPoint[] {
    return this.points;
  }
  public getRadius() {
    return this.radius;
  }
  public getElementType(): ElementType {
    return ElementType.LazyPath;
  }
  public getColor(): EtchContextColor {
    return this.color;
  }
  public render(context: CanvasRenderingContext2D) {
    context.lineWidth = this.getRadius() * 2;
    context.strokeStyle = this.getColor().getContextColor();
    context.lineCap = 'round';
    for (let i = 0; i < this.points.length - 1; i++) {
      context.beginPath();
      context.moveTo(this.points[i].getX(), this.points[i].getY());
      context.lineTo(this.points[i + 1].getX(), this.points[i + 1].getY());
      context.stroke();
    }
  }
  public trace(context: CanvasRenderingContext2D): void {
    let maxX = this.points[0].getX();
    let maxY = this.points[0].getY();
    let minX = this.points[0].getX();
    let minY = this.points[0].getY();
    for (const point of this.points) {
      if (point.getX() > maxX) {
        maxX = point.getX();
      }
      if (point.getY() > maxY) {
        maxY = point.getY();
      }
      if (point.getX() < minX) {
        minX = point.getX();
      }
      if (point.getY() < minY) {
        minY = point.getY();
      }
    }
    this._trace(new EtchPoint(minX, minY), new EtchPoint(maxX, maxY), context);
  }
}

