import { EtchPoint } from './EtchPoint';

export class EtchBoundingBox {
  private point: EtchPoint;
  private width: number;
  private height: number;
  constructor(point: EtchPoint, width: number, height: number) {
    let x = 0,
      y = 0,
      w = 0,
      h = 0;
    if (width < 0) {
      x = point.getX() + width;
      w = Math.abs(width);
    } else {
      x = point.getX();
      w = width;
    }
    if (height < 0) {
      y = point.getY() + height;
      h = Math.abs(height);
    } else {
      y = point.getY();
      h = height;
    }
    this.point = new EtchPoint(x, y);
    this.width = w;
    this.height = h;
  }
  public getPoint(): EtchPoint {
    return this.point;
  }
  public getWidth() {
    return this.width;
  }
  public getHeight() {
    return this.height;
  }
  public overlapsBoundingBox(boundingBox: EtchBoundingBox) {
    return (
      this.point.getX() <= boundingBox.getPoint().getX() &&
      this.point.getY() <= boundingBox.getPoint().getY() &&
      this.point.getX() + this.width >=
        boundingBox.getPoint().getX() + boundingBox.getWidth() &&
      this.point.getY() + this.height >=
        boundingBox.getPoint().getY() + boundingBox.getHeight()
    );
  }
}
