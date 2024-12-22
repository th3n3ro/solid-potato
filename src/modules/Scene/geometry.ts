import { Shape } from "./shape";
import { FillStyle, StrokeStyle } from "./style";

export class Geometry {
  constructor(public shape: Shape, public styles: { fill: FillStyle; stroke: StrokeStyle }) {}
}
