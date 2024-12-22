export function assert(condition: unknown, msg?: string): asserts condition {
  if (condition === false) throw new Error(msg);
}

export class Color {
  constructor(public r: number, public g: number, public b: number) {}

  public static decToHex(decimal: number): string {
    const hex = decimal.toString(16).toUpperCase().padStart(6, "0");

    return `#${hex}`;
  }

  public static fromDecimal(decimal: number): Color {
    const r = (decimal >> 16) & 0xff;
    const g = (decimal >> 8) & 0xff;
    const b = decimal & 0xff;
    return new Color(r, g, b);
  }
  public static fromHex(hex: string): Color {
    if (!/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
      throw new Error("Invalid hex color format");
    }

    const sanitizedHex = hex.startsWith("#") ? hex.slice(1) : hex;
    const r = parseInt(sanitizedHex.slice(0, 2), 16);
    const g = parseInt(sanitizedHex.slice(2, 4), 16);
    const b = parseInt(sanitizedHex.slice(4, 6), 16);

    return new Color(r, g, b);
  }
}

export class Downloader {
  public static fileTypes = { pdf: "application/pdf" } as const;
  constructor(public source: ArrayBuffer) {}
  public download(filename: string, type: keyof typeof Downloader.fileTypes) {
    const blob = new Blob([this.source], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}

export function considerDeviceDPR(canvas: HTMLCanvasElement) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  const ctx = canvas.getContext("2d");
  assert(ctx, "Unable to get canvas 2d ctx");
  ctx.scale(2, 2);
  return ctx;
}
