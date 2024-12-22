import { Geometry } from "./geometry";
import { TransformationMatrix } from "./matrix";
import { Size } from "./shared";
import cloneDeep from "lodash/cloneDeep";

export abstract class SceneObject {
  constructor(public transform: TransformationMatrix, public childrens: SceneObject[]) {}

  public addChild(child: SceneObject): void {
    this.childrens.push(child);
  }

  public clone(): SceneObject {
    return cloneDeep(this);
  }
  // Реализация итератора

  public *[Symbol.iterator](): IterableIterator<SceneObject> {
    yield this;
    for (const child of this.childrens) {
      yield* child;
    }
  }
}

export class Container extends SceneObject {}

export class Sprite extends SceneObject {
  constructor(public transform: TransformationMatrix, public childrens: SceneObject[], public assetId: string, public size: Size) {
    super(transform, childrens);
  }
}

export class Graphics extends SceneObject {
  constructor(public transform: TransformationMatrix, public childrens: SceneObject[], public geometries: Geometry[]) {
    super(transform, childrens);
  }
}
