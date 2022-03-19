export class EtchPoint {
  private x: number;
  private y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  public getX(): number {
    return this.x;
  }
  public getY(): number {
    return this.y;
  }
  public setX(x: number): void {
    this.x = x;
  }
  public setY(y: number): void {
    this.y = y;
  }
  public set(point: EtchPoint): void {
    this.x = point.getX();
    this.y = point.getY();
  }
  public static calculateDistance(
    point1: EtchPoint,
    point2: EtchPoint
  ): number {
    return Math.sqrt(
      Math.pow(point1.getX() - point2.getX(), 2) +
        Math.pow(point1.getY() - point2.getY(), 2)
    );
  }
}
