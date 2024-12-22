import { Canvas, CanvasKit, SinglePagePDF } from "../../../libs/skia";
import { assert, Color, Downloader } from "../../utils";
import * as Scene from "../Scene";
import { AssetsManager, SkiaRenderer } from "../Skia";
type Size = { width: number; height: number };
type Options = { size: Size; background: string };

/**
 * Жизненный цикл класса - один раз экспортировать и сдохнуть
 */
export class PDFRenderer {
  public stage: Scene.SceneObject = new Scene.Container(Scene.identityMatrix(), []);
  protected document: SinglePagePDF;

  constructor(public options: Options, protected am: AssetsManager, protected ck: CanvasKit) {
    const document = this.ck.MakeSinglePagePDF({}, options.size);
    assert(document, "Cannot create software PDF document");
    this.document = document;
  }

  protected renderStageIntoCanvas(canvas: Canvas) {
    const stage = this.stage.clone();
    const c = Color.fromHex(this.options.background);
    canvas.clear(this.ck.Color4f(c.r / 255, c.g / 255, c.b / 255, 1));
    const renderer = new SkiaRenderer(canvas, this.am, this.ck);
    renderer.render(stage);
  }

  public render() {
    const canvas = this.document.getCanvas();
    assert(canvas, "Cannot acces PDF document canvas.");
    this.renderStageIntoCanvas(canvas);
  }

  public export(filename: string) {
    new Downloader(this.document.export()).download(filename, "pdf");
  }
}
