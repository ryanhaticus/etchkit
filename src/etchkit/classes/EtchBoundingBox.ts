import { EtchPoint } from "./EtchPoint";

export class EtchBoundingBox {
  private point1: EtchPoint;
  private point2: EtchPoint;
  constructor(point1: EtchPoint, point2: EtchPoint) {
    this.point1 = point1;
    this.point2 = point2;
  }
  public getPoint1(): EtchPoint {
    return this.point1;
  }
  public getPoint2(): EtchPoint {
    return this.point2;
  }
}