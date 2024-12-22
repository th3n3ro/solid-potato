import * as Scene from "../Scene";
import * as CanvasKit from "../../../libs/skia";
import { AssetsManager } from "./assetManager";
import { displayObjectRendererMap } from "./canvasRenderMap";

export class SkiaRenderer implements Scene.Renderer {
  constructor(protected canvas: CanvasKit.Canvas, protected am: AssetsManager, protected ck: CanvasKit.CanvasKit) {}

  render(sceneObject: Scene.Container): void {
    const renderer = displayObjectRendererMap.getRenderer(sceneObject);
    renderer(sceneObject, { am: this.am, canvas: this.canvas, ck: this.ck });

    for (const child of sceneObject.childrens) {
      this.render(child);
    }
  }
}
