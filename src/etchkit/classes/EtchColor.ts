export class EtchColor {
  private r: number;
  private g: number;
  private b: number;
  private a: number;
  constructor(r: number, g: number, b: number, a: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
  public getR(): number {
    return this.r;
  }
  public getG(): number {
    return this.g;
  }
  public getB(): number {
    return this.b;
  }
  public getA(): number {
    return this.a;
  }
  public toHex(): string {
    return `#${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(
      16
    )}${this.a.toString(16)}`;
  }
  public toRGBAString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }
  public static fromHex(hex: string): EtchColor {
    const r = parseInt(hex.substring(1, 2), 16);
    const g = parseInt(hex.substring(3, 2), 16);
    const b = parseInt(hex.substring(5, 2), 16);
    const a = parseInt(hex.substring(7, 2), 16) / 255;
    return new EtchColor(r, g, b, a);
  }
}
