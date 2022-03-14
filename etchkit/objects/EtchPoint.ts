export default class EtchPoint {
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
  public static calculateDistance(point1: EtchPoint, point2: EtchPoint): number {
    const dx = point1.getX() - point2.getX();
    const dy = point1.getY() - point2.getY();
    return Math.sqrt(dx * dx + dy * dy);
  }
}
