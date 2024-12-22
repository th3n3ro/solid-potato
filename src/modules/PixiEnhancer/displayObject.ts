import { Container, Graphics, Sprite } from "pixi.js-legacy";
import * as Scene from "../Scene";
import { assert } from "../../utils";

interface ExportableToSceneObject {
  toSceneObject(): Scene.SceneObject;
  toSceneObjectRecursive(): Scene.SceneObject;
}

declare module "pixi.js-legacy" {
  interface Container extends ExportableToSceneObject {}
}

Container.prototype.toSceneObject = function (this: Container) {
  return new Scene.Container(this.transform.worldTransform.toSceneMatrix(), []);
};

Container.prototype.toSceneObjectRecursive = function (this: Container) {
  const that = this.toSceneObject();

  for (const child of this.children) {
    assert(child instanceof Container, "Unexpected DisplayObject type");
    that.childrens.push(child.toSceneObjectRecursive());
  }

  return that;
};

Sprite.prototype.toSceneObject = function (this: Sprite) {
  const { width, height, ...texture } = this.texture.baseTexture;
  const { src } = texture.resource;
  const id = new URL(src).pathname;
  return new Scene.Sprite(this.transform.worldTransform.toSceneMatrix(), [], id, { width, height });
};

Graphics.prototype.toSceneObject = function (this: Graphics) {
  const geometries: Scene.Geometry[] = [];

  for (const g of this.geometry.graphicsData) {
    geometries.push(g.toSceneGeometry());
  }

  return new Scene.Graphics(this.transform.worldTransform.toSceneMatrix(), [], geometries);
};
