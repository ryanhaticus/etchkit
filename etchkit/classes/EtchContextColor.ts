import { EtchColor } from "../types/EtchColor";

export default class EtchContextColor {
  private color: EtchColor;
  private opacity: number;
  constructor(color: EtchColor, opacity?: number) {
    this.color = color;
    this.opacity = opacity || 100;
  }
  public getContextColor(): string {
    const hexOpacity = Math.round(this.opacity * 2.55);
    return `${this.color.toString()}${hexOpacity.toString(16)}`;
  }
  public getColor(): EtchColor {
    return this.color;
  }
  public setColor(color: EtchColor) {
    this.color = color;
  }
  public getOpacity(): number {
    return this.opacity;
  }
  public setOpacity(opacity: number) {
    this.opacity = opacity;
  }
}