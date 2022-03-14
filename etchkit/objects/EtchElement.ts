import EtchPoint from "./EtchPoint";

interface EtchElementParams {
  position: EtchPoint;
  selected: boolean;
}

export default class EtchElement {
  private position: EtchPoint;
  private selected: boolean;
  constructor({ position }: EtchElementParams) {
    this.position = position;
    this.selected = false;
  }
  public getPosition() {
    return this.position;
  }
  public setSelected(selected: boolean): void {
    this.selected = selected;
  }
  public isSelected(): boolean {
    return this.selected;
  }
}
