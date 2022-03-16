import { ElementType } from '../../types/ElementType';
import EtchElement from '../EtchElement';
import EtchPoint from '../EtchPoint';

export class LazyPathElement extends EtchElement {
  private points: EtchPoint[];
  private radius: number;
  constructor(points: EtchPoint[], radius: number) {
    super({ position: points[0], selected: false });
    this.points = points;
    this.radius = radius;
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
  public render(context: CanvasRenderingContext2D) {
    context.lineWidth = this.getRadius() * 2;
    context.lineCap = 'round';
    context.strokeStyle = '#000';
    for (let i = 0; i < this.points.length - 1; i++) {
      context.beginPath();
      context.moveTo(this.points[i].getX(), this.points[i].getY());
      context.lineTo(this.points[i + 1].getX(), this.points[i + 1].getY());
      context.stroke();
    }
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
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = 'rgba(0,0,0,0.2)';
    context.setLineDash([5, 5]);
    context.moveTo(minX, minY);
    context.lineTo(maxX, minY);
    context.lineTo(maxX, maxY);
    context.lineTo(minX, maxY);
    context.lineTo(minX, minY);
    context.stroke();
  }
}

