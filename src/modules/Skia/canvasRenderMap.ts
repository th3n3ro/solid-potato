import * as CanvasKit from "../../../libs/skia";
import * as Scene from "../Scene";
import { AssetsManager } from "./assetManager";
import { assert } from "../../utils";

// eslint-disable-next-line
type ConstructorType<T> = { new (...args: any[]): T };
type SceneObjectRenderer<T> = (v: T, ctx: { am: AssetsManager; canvas: CanvasKit.Canvas; ck: CanvasKit.CanvasKit }) => void;
type ShapeRenderer<T> = (v: T, ctx: { canvas: CanvasKit.Canvas; ck: CanvasKit.CanvasKit; paint: CanvasKit.Paint }) => void;

class RenderMap<BaseClass, Renderer> {
  constructor(protected map: Map<string, Renderer> = new Map()) {}

  public addRenderer(ctor: ConstructorType<BaseClass>, renderer: Renderer) {
    this.map.set(ctor.name, renderer);
  }

  public getRenderer(ctor: BaseClass): Renderer {
    const name = (ctor as unknown as { constructor: ConstructorType<BaseClass> }).constructor.name;
    const renderer = this.map.has(name);
    assert(renderer, `Missing scene object renderer for ${name}`);
    return this.map.get(name)!;
  }
}

const shapeRendererMap = new RenderMap<Scene.Shape, ShapeRenderer<Scene.Shape>>();
export const displayObjectRendererMap = new RenderMap<Scene.SceneObject, SceneObjectRenderer<Scene.SceneObject>>();

const renderSprite: SceneObjectRenderer<Scene.Sprite> = (sprite: Scene.Sprite, { am, canvas }) => {
  const resourcePtr = am.getResourcePointer(sprite.assetId);
  canvas.save();
  canvas.setMatrix(...sprite.transform);
  canvas.drawImage(resourcePtr, 0, 0);
  canvas.restore();
};

const renderGraphics: SceneObjectRenderer<Scene.Graphics> = (graphics: Scene.Graphics, { canvas, ck }) => {
  canvas.save();
  canvas.setMatrix(...graphics.transform);
  const paint = new ck.Paint();

  for (const geometry of graphics.geometries) {
    const { shape, styles } = geometry;
    const { fill, stroke } = styles;
    const renderer = shapeRendererMap.getRenderer(shape);

    // fill first
    paint.setStyle(ck.PaintStyle.Fill);
    paint.setColor(ck.Color(fill.color.r, fill.color.g, fill.color.b));
    renderer(shape, { canvas, ck, paint });
    // stroke after
    paint.setStyle(ck.PaintStyle.Stroke);
    paint.setStrokeWidth(stroke.width);
    paint.setColor(ck.Color(stroke.color.r, stroke.color.g, stroke.color.b));
    renderer(shape, { canvas, ck, paint });
  }
  canvas.restore();
};

displayObjectRendererMap.addRenderer(Scene.Sprite, renderSprite as SceneObjectRenderer<Scene.SceneObject>);
displayObjectRendererMap.addRenderer(Scene.Graphics, renderGraphics as SceneObjectRenderer<Scene.SceneObject>);
displayObjectRendererMap.addRenderer(Scene.Container, (() => {}) as SceneObjectRenderer<Scene.SceneObject>);

const renderCircle: ShapeRenderer<Scene.Circle> = (circle: Scene.Circle, { canvas, paint }) => {
  canvas.drawCircle(circle.center.x, circle.center.y, circle.r, paint);
};

const renderRect: ShapeRenderer<Scene.Rectangle> = (rect: Scene.Rectangle, { canvas, ck, paint }) => {
  const { position, size } = rect;
  const ckRect = ck.XYWHRect(position.x, position.y, size.width, size.height);
  canvas.drawRect(ckRect, paint);
};

const renderEllipse: ShapeRenderer<Scene.Ellipse> = (ellipse: Scene.Ellipse, { canvas, ck, paint }) => {
  const { center, size } = ellipse;
  const ckRect = ck.LTRBRect(center.x - size.width, center.y - size.height, center.x + size.width, center.y + size.height);
  canvas.drawOval(ckRect, paint);
};

const renderRRect: ShapeRenderer<Scene.RoundedRectangle> = (rrect: Scene.RoundedRectangle, { canvas, ck, paint }) => {
  const { position, size } = rrect;
  const ckRect = ck.XYWHRect(position.x, position.y, size.width, size.height);
  canvas.drawRRect(ckRect, paint);
};

const renderPolygon: ShapeRenderer<Scene.Polygon> = (poly: Scene.Polygon, { canvas, ck, paint }) => {
  const { points } = poly;
  if (!points.length) return;

  const [begin, ...rest] = points;
  const path = new ck.Path();
  path.moveTo(begin.x, begin.y);

  for (const point of rest) {
    path.lineTo(point.x, point.y);
  }

  canvas.drawPath(path, paint);
};
shapeRendererMap.addRenderer(Scene.Circle, renderCircle as ShapeRenderer<Scene.Shape>);
shapeRendererMap.addRenderer(Scene.Rectangle, renderRect as ShapeRenderer<Scene.Shape>);
shapeRendererMap.addRenderer(Scene.Ellipse, renderEllipse as ShapeRenderer<Scene.Shape>);
shapeRendererMap.addRenderer(Scene.Polygon, renderPolygon as ShapeRenderer<Scene.Shape>);
shapeRendererMap.addRenderer(Scene.RoundedRectangle, renderRRect as ShapeRenderer<Scene.Shape>);
