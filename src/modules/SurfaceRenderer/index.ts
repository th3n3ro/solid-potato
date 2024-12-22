import * as Scene from "../Scene";
import { CanvasKit, Surface } from "../../../libs/skia";
import { assert, Color } from "../../utils";
import { AssetsManager, SkiaRenderer } from "../Skia";
type Size = { width: number; height: number };

type Options = {
  size: Size;
  resolution: number;
  background: string;
  canvas: HTMLCanvasElement;
};

export class SurfaceRenderer {
  public stage: Scene.SceneObject = new Scene.Container(Scene.identityMatrix(), []);
  constructor(protected options: Options, protected am: AssetsManager, protected ck: CanvasKit, protected surface: Surface) {}

  public static makeCPUCanvas(options: Options, am: AssetsManager, ck: CanvasKit) {
    const surface = ck.MakeSWCanvasSurface(options.canvas);
    assert(surface, "Cannot initiate surface");
    return new SurfaceRenderer(options, am, ck, surface);
  }

  protected prescale(container: Scene.SceneObject) {
    for (const sceneObject of container) {
      sceneObject.transform = Scene.scale(this.options.resolution, this.options.resolution, sceneObject.transform);
    }
  }

  public render() {
    this.surface.drawOnce((canvas) => {
      const stage = this.stage.clone();
      const c = Color.fromHex(this.options.background);

      canvas.clear(this.ck.Color4f(c.r / 255, c.g / 255, c.b / 255, 1));
      this.prescale(stage);
      new SkiaRenderer(canvas, this.am, this.ck).render(stage);
    });
  }
}
