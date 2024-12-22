import * as CanvasKit from "../../../libs/skia";
import { assert } from "../../utils";

type src = string;

export class AssetsManager {
  constructor(
    protected ck: CanvasKit.CanvasKit,
    protected cache: Map<string, ArrayBuffer> = new Map(),
    protected resourcePointers: Map<string, CanvasKit.Image> = new Map()
  ) {}

  public async load(resources: src[]): Promise<this> {
    const responses = await Promise.all(resources.map((src) => fetch(src)));
    const raw = await Promise.all(responses.map((r) => r.arrayBuffer()));
    resources.forEach((key, index) => this.cache.set(key, raw[index]));
    return this;
  }

  public getResourcePointer(id: string): CanvasKit.Image {
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
