import { Color } from "../../utils";

export class FillStyle {
  constructor(public color: Color) {}
}

export class StrokeStyle {
  constructor(public color: Color, public alpha: number, public width: number) {}
}
