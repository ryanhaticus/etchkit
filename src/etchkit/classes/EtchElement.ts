import { IEtchCanvasContextProps } from '../providers/EtchCanvasProvider';
import { EtchBoundingBox } from './EtchBoundingBox';
import { EtchColor } from './EtchColor';
import { EtchPoint } from './EtchPoint';

export abstract class EtchElement {
  private boundingBox: EtchBoundingBox = new EtchBoundingBox(
    new EtchPoint(0, 0),
    0,
    0
  );
  private layer: number;
  private strokeWidth: number;
  private color: EtchColor;
  constructor(layer: number, strokeWidth?: number, color?: EtchColor) {
    this.layer = layer;
    this.strokeWidth = strokeWidth || 10;
    this.color = color || new EtchColor(0, 0, 0, 1);
  }
  public getBoundingBox(): EtchBoundingBox {
    return this.boundingBox;
  }
  protected setBoundingBox(boundingBox: EtchBoundingBox) {
    this.boundingBox = boundingBox;
  }
  public getLayer(): number {
    return this.layer;
  }
  public setLayer(layer: number) {
    this.layer = layer;
  }
  public getStrokeWidth(): number {
    return this.strokeWidth;
  }
  public setStrokeWidth(strokeWidth: number) {
    this.strokeWidth = strokeWidth;
  }
  public getColor() {
    return this.color;
  }
  public setColor(color: EtchColor) {
    this.color = color;
  }
  public abstract onAnimationFrame(
    canvasContext: IEtchCanvasContextProps
  ): void;
  public abstract calculateBoundingBox(): void;
}
