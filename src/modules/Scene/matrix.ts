import { scale as _scale, compose } from "transformation-matrix";
//  sx     skewX  tx
//  skewY  sy     ty
//  persp0 persp1 persp2
export type TransformationMatrix = [
  sx: number,
  skewX: number,
  tx: number,
  skewY: number,
  sy: number,
  ty: number,
  persp0: number,
  persp1: number,
  persp2: number
];

export const identityMatrix = (): TransformationMatrix => [1, 0, 0, 0, 1, 0, 0, 0, 1];

export const scale = (sx: number, sy: number, m: TransformationMatrix): TransformationMatrix => {
  const matrixObj = {
    a: m[0],
    b: m[1],
    c: m[2],
    d: m[3],
    e: m[4],
    f: m[5],
  };

  const scaledMatrix = compose(_scale(sx, sy), matrixObj);

  return [scaledMatrix.a, scaledMatrix.b, scaledMatrix.c, scaledMatrix.d, scaledMatrix.e, scaledMatrix.f, 0, 0, 1];
};
