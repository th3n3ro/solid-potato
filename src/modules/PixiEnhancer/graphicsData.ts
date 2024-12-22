import { Color } from "../../utils";
import * as Scene from "../Scene";
import * as PIXI from "pixi.js-legacy";

interface ExportableToSceneGraphicsData {
  toSceneGeometry(): Scene.Geometry;
}

declare module "pixi.js-legacy" {
  interface GraphicsData extends ExportableToSceneGraphicsData {}
}

PIXI.GraphicsData.prototype.toSceneGeometry = function (this: PIXI.GraphicsData) {
  const { shape, fillStyle, lineStyle } = this;
  const fill = new Scene.FillStyle(Color.fromDecimal(fillStyle.color));
  const stroke = new Scene.StrokeStyle(Color.fromDecimal(lineStyle.color), lineStyle.alpha, lineStyle.width);

  return new Scene.Geometry(shape.toSceneShape(), { fill, stroke });
};
