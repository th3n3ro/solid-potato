import * as Scene from "../Scene";
import * as PIXI from "pixi.js-legacy";
import { Point } from "../Scene/shared";

interface ExportableToSceneShape {
  toSceneShape(): Scene.Shape;
}

declare module "pixi.js-legacy" {
  interface Polygon extends ExportableToSceneShape {}
  interface Circle extends ExportableToSceneShape {}
  interface Ellipse extends ExportableToSceneShape {}
  interface Rectangle extends ExportableToSceneShape {}
  interface RoundedRectangle extends ExportableToSceneShape {}
}

PIXI.Circle.prototype.toSceneShape = function (this: PIXI.Circle): Scene.Circle {
  const { x, y, radius } = this;
  return new Scene.Circle({ x, y }, radius);
};

PIXI.Ellipse.prototype.toSceneShape = function (this: PIXI.Ellipse): Scene.Ellipse {
  const { x, y, width, height } = this;
  return new Scene.Ellipse({ x, y }, { height, width });
};

PIXI.Rectangle.prototype.toSceneShape = function (this: PIXI.Rectangle): Scene.Rectangle {
  const { x, y, width, height } = this;
  return new Scene.Rectangle({ x, y }, { height, width });
};

PIXI.RoundedRectangle.prototype.toSceneShape = function (this: PIXI.RoundedRectangle): Scene.RoundedRectangle {
  const { x, y, width, height, radius } = this;
  return new Scene.RoundedRectangle({ x, y }, { height, width }, radius);
};

PIXI.Polygon.prototype.toSceneShape = function (this: PIXI.Polygon): Scene.Polygon {
  const { points } = this;

  const result: Point[] = [];

  if (points.length >= 4) {
    for (let i = 0; i < points.length; i += 2) {
      const x = points[i];
      const y = points[i + 1];
      result.push({ x, y });
    }
  }

  return new Scene.Polygon(result);
};
