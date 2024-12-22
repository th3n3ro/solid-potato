import * as CanvasKit from "../../../libs/skia";
import { assert } from "../../utils";

type Resource = { id: number; src: string };
export class AssetsManager {
  constructor(
    protected ck: CanvasKit.CanvasKit,
    protected cache: Map<number, ArrayBuffer> = new Map(),
    protected resourcePointers: Map<number, CanvasKit.Image> = new Map()
  ) {}

  public async load(resources: Resource[]): Promise<this> {
    const responses = await Promise.all(resources.map((r) => fetch(r.src)));
    const raw = await Promise.all(responses.map((r) => r.arrayBuffer()));
    resources.forEach(({ id }, index) => this.cache.set(id, raw[index]));
    return this;
  }

  public getResourcePointer(id: number): CanvasKit.Image {
    if (!this.resourcePointers.has(id)) {
      const buffer = this.cache.get(id);
      assert(buffer, `Missing resource buffer with id - ${id}`);
      const ptr = this.ck.MakeImageFromEncoded(buffer);
      assert(ptr, `Cannot consume resource buffer with id - ${id}`);
      this.resourcePointers.set(id, ptr);
      this.cache.delete(id);
    }

    return this.resourcePointers.get(id)!;
  }
}
