import { Matrix } from "pixi.js-legacy";
import { TransformationMatrix } from "../Scene";

declare module "pixi.js-legacy" {
  interface Matrix {
    toSceneMatrix(): TransformationMatrix;
  }
}

Matrix.prototype.toSceneMatrix = function (this: Matrix): TransformationMatrix {
  const { a: sx, b: skewY, c: skewX, d: sy, tx, ty } = this;
  return [sx, skewX, tx, skewY, sy, ty, 0, 0, 1];
};
