import { useEffect } from "react";
import "./App.css";
import "./modules/PixiEnhancer";
import { useRef } from "react";
import * as PIXI from "pixi.js-legacy";
import { AssetsManager } from "./modules/Skia";
import CanvasKitInit, { CanvasKit } from "skia";
import { SurfaceRenderer } from "./modules/SurfaceRenderer";
import { PDFRenderer } from "./modules/PDFRenderer";
import { considerDeviceDPR } from "./utils";
import { getContent } from "./testUtils";
import { srcs } from "./resources";

const init = new Promise<{ ck: CanvasKit; skiaAssets: AssetsManager }>(async (r) => {
  PIXI.Assets.setPreferences({ preferWorkers: true, preferCreateImageBitmap: true });
  const [pixiAssets, ck] = await Promise.all([
    PIXI.Assets.load<PIXI.Texture>(srcs),
    await CanvasKitInit({ locateFile: (file) => `${import.meta.env.BASE_URL}/${file}` }),
  ]);
  const metadata = Object.values(pixiAssets).map(
    ({
      baseTexture: {
        uid,
        resource: { src },
      },
    }) => ({ src, id: uid })
  );

  const [skiaAssets] = await Promise.all([new AssetsManager(ck).load(metadata)]);
  r({ ck, skiaAssets });
});

const usePixi = (pixiCanvas: React.RefObject<HTMLCanvasElement>, skiaCanvas: React.RefObject<HTMLCanvasElement>, container: PIXI.Container) => {
  useEffect(() => {
    init.then(({ ck, skiaAssets }) => {
      considerDeviceDPR(skiaCanvas.current!);
      const skiaApp = SurfaceRenderer.makeCPUCanvas(
        {
          background: "#f11fff",
          resolution: window.devicePixelRatio,
          size: { width: 512, height: 512 },
          canvas: skiaCanvas.current!,
        },
        skiaAssets,
        ck
      );

      const pixiApp = new PIXI.Application({
        forceCanvas: true,
        view: pixiCanvas.current!,
        clearBeforeRender: true,
        background: "#f11fff",
        resolution: window.devicePixelRatio,
        width: 512,
        height: 512,
      });
      pixiApp.stage = container;

      pixiApp.stage.addChild(getContent(PIXI.Assets));
      setTimeout(() => {
        const tree = pixiApp.stage.toSceneObjectRecursive();
        skiaApp.stage.addChild(tree);
        skiaApp.render();
      }, 100);
    });
  }, []);
};

function App() {
  const container = useRef(new PIXI.Container());
  const canvasCK = useRef<HTMLCanvasElement>(null);
  const canvasPixi = useRef<HTMLCanvasElement>(null);

  usePixi(canvasPixi, canvasCK, container.current);

  return (
    <div className="app">
      <div className="canvases">
        <div className="canvas-wrapper">
          <h2>pixi</h2>
          <canvas width={512} height={512} ref={canvasPixi} />
        </div>
        <div className="canvas-wrapper">
          <h2>skia</h2>
          <canvas width={512} height={512} ref={canvasCK} />
        </div>
      </div>
      <div className="controls">
        <button
          onClick={async () => {
            const { skiaAssets, ck } = await init;
            const pdfRenderer = new PDFRenderer({ size: { height: 512, width: 512 }, background: "#f11fff" }, skiaAssets, ck);
            pdfRenderer.stage.addChild(container.current.toSceneObjectRecursive());
            pdfRenderer.render();
            pdfRenderer.export("ahahddhhahh.pdf");
          }}
        >
          В PDF
        </button>
        <button
          onClick={() => {
            document.location.reload();
          }}
        >
          Перезагрузить
        </button>
      </div>
    </div>
  );
}

export default App;
