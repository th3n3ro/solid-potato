var CanvasKitInit = (() => {
  var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : undefined;
  if (typeof __filename !== "undefined") _scriptDir = _scriptDir || __filename;
  return function (moduleArg = {}) {
    var z = moduleArg,
      ba,
      ca;
    z.ready = new Promise((a, d) => {
      ba = a;
      ca = d;
    });
    (function (a) {
      a.ib = a.ib || [];
      a.ib.push(function () {
        a.MakeSWCanvasSurface = function (d) {
          var f = d,
            k = "undefined" !== typeof OffscreenCanvas && f instanceof OffscreenCanvas;
          if (!(("undefined" !== typeof HTMLCanvasElement && f instanceof HTMLCanvasElement) || k || ((f = document.getElementById(d)), f)))
            throw "Canvas with id " + d + " was not found";
          if ((d = a.MakeSurface(f.width, f.height))) d.cb = f;
          return d;
        };
        a.MakeCanvasSurface || (a.MakeCanvasSurface = a.MakeSWCanvasSurface);
        a.MakeSurface = function (d, f) {
          var k = { width: d, height: f, colorType: a.ColorType.RGBA_8888, alphaType: a.AlphaType.Unpremul, colorSpace: a.ColorSpace.SRGB },
            p = d * f * 4,
            q = a._malloc(p);
          if ((k = a.Surface._makeRasterDirect(k, q, 4 * d))) (k.cb = null), (k.Ic = d), (k.Ec = f), (k.Gc = p), (k.mc = q), k.getCanvas().clear(a.TRANSPARENT);
          return k;
        };
        a.MakeRasterDirectSurface = function (d, f, k) {
          return a.Surface._makeRasterDirect(d, f.byteOffset, k);
        };
        a.Surface.prototype.flush = function (d) {
          this._flush();
          if (this.cb) {
            var f = new Uint8ClampedArray(a.HEAPU8.buffer, this.mc, this.Gc);
            f = new ImageData(f, this.Ic, this.Ec);
            d ? this.cb.getContext("2d").putImageData(f, 0, 0, d[0], d[1], d[2] - d[0], d[3] - d[1]) : this.cb.getContext("2d").putImageData(f, 0, 0);
          }
        };
        a.Surface.prototype.dispose = function () {
          this.mc && a._free(this.mc);
          this.delete();
        };
        a.gd = a.gd || function () {};
        a.pc =
          a.pc ||
          function () {
            return null;
          };
      });
    })(z);
    (function (a) {
      function d(c, b, e, h, m) {
        for (var r = 0; r < c.length; r++) b[r * e + ((r * m + h + e) % e)] = c[r];
        return b;
      }
      function f(c) {
        for (var b = c * c, e = Array(b); b--; ) e[b] = 0 === b % (c + 1) ? 1 : 0;
        return e;
      }
      function k(c) {
        return c ? c.constructor === Float32Array && 4 === c.length : !1;
      }
      function p(c) {
        return ((w(255 * c[3]) << 24) | (w(255 * c[0]) << 16) | (w(255 * c[1]) << 8) | (w(255 * c[2]) << 0)) >>> 0;
      }
      function q(c) {
        if (c && c._ck) return c;
        if (c instanceof Float32Array) {
          for (var b = Math.floor(c.length / 4), e = new Uint32Array(b), h = 0; h < b; h++) e[h] = p(c.slice(4 * h, 4 * (h + 1)));
          return e;
        }
        if (c instanceof Uint32Array) return c;
        if (c instanceof Array && c[0] instanceof Float32Array) return c.map(p);
      }
      function y(c) {
        if (void 0 === c) return 1;
        var b = parseFloat(c);
        return c && -1 !== c.indexOf("%") ? b / 100 : b;
      }
      function w(c) {
        return Math.round(Math.max(0, Math.min(c || 0, 255)));
      }
      function x(c, b) {
        (b && b._ck) || a._free(c);
      }
      function t(c, b, e) {
        if (!c || !c.length) return R;
        if (c && c._ck) return c.byteOffset;
        var h = a[b].BYTES_PER_ELEMENT;
        e || (e = a._malloc(c.length * h));
        a[b].set(c, e / h);
        return e;
      }
      function I(c) {
        var b = { tb: R, count: c.length, colorType: a.ColorType.RGBA_F32 };
        if (c instanceof Float32Array) (b.tb = t(c, "HEAPF32")), (b.count = c.length / 4);
        else if (c instanceof Uint32Array) (b.tb = t(c, "HEAPU32")), (b.colorType = a.ColorType.RGBA_8888);
        else if (c instanceof Array) {
          if (c && c.length) {
            for (var e = a._malloc(16 * c.length), h = 0, m = e / 4, r = 0; r < c.length; r++) for (var A = 0; 4 > A; A++) (a.HEAPF32[m + h] = c[r][A]), h++;
            c = e;
          } else c = R;
          b.tb = c;
        } else throw "Invalid argument to copyFlexibleColorArray, Not a color array " + typeof c;
        return b;
      }
      function H(c) {
        if (!c) return R;
        var b = yb.toTypedArray();
        if (c.length) {
          if (6 === c.length || 9 === c.length) return t(c, "HEAPF32", Ca), 6 === c.length && a.HEAPF32.set(Nc, 6 + Ca / 4), Ca;
          if (16 === c.length)
            return (b[0] = c[0]), (b[1] = c[1]), (b[2] = c[3]), (b[3] = c[4]), (b[4] = c[5]), (b[5] = c[7]), (b[6] = c[12]), (b[7] = c[13]), (b[8] = c[15]), Ca;
          throw "invalid matrix size";
        }
        if (void 0 === c.m11) throw "invalid matrix argument";
        b[0] = c.m11;
        b[1] = c.m21;
        b[2] = c.m41;
        b[3] = c.m12;
        b[4] = c.m22;
        b[5] = c.m42;
        b[6] = c.m14;
        b[7] = c.m24;
        b[8] = c.m44;
        return Ca;
      }
      function N(c) {
        if (!c) return R;
        var b = zb.toTypedArray();
        if (c.length) {
          if (16 !== c.length && 6 !== c.length && 9 !== c.length) throw "invalid matrix size";
          if (16 === c.length) return t(c, "HEAPF32", Ka);
          b.fill(0);
          b[0] = c[0];
          b[1] = c[1];
          b[3] = c[2];
          b[4] = c[3];
          b[5] = c[4];
          b[7] = c[5];
          b[10] = 1;
          b[12] = c[6];
          b[13] = c[7];
          b[15] = c[8];
          6 === c.length && ((b[12] = 0), (b[13] = 0), (b[15] = 1));
          return Ka;
        }
        if (void 0 === c.m11) throw "invalid matrix argument";
        b[0] = c.m11;
        b[1] = c.m21;
        b[2] = c.m31;
        b[3] = c.m41;
        b[4] = c.m12;
        b[5] = c.m22;
        b[6] = c.m32;
        b[7] = c.m42;
        b[8] = c.m13;
        b[9] = c.m23;
        b[10] = c.m33;
        b[11] = c.m43;
        b[12] = c.m14;
        b[13] = c.m24;
        b[14] = c.m34;
        b[15] = c.m44;
        return Ka;
      }
      function u(c, b) {
        return t(c, "HEAPF32", b || xa);
      }
      function K(c, b, e, h) {
        var m = Ab.toTypedArray();
        m[0] = c;
        m[1] = b;
        m[2] = e;
        m[3] = h;
        return xa;
      }
      function P(c) {
        for (var b = new Float32Array(4), e = 0; 4 > e; e++) b[e] = a.HEAPF32[c / 4 + e];
        return b;
      }
      function O(c, b) {
        return t(c, "HEAPF32", b || W);
      }
      function oa(c, b) {
        return t(c, "HEAPF32", b || Bb);
      }
      function ha() {
        for (var c = 0, b = 0; b < arguments.length - 1; b += 2) c += arguments[b] * arguments[b + 1];
        return c;
      }
      function Ra(c, b, e) {
        for (var h = Array(c.length), m = 0; m < e; m++)
          for (var r = 0; r < e; r++) {
            for (var A = 0, G = 0; G < e; G++) A += c[e * m + G] * b[e * G + r];
            h[m * e + r] = A;
          }
        return h;
      }
      function Sa(c, b) {
        for (var e = Ra(b[0], b[1], c), h = 2; h < b.length; ) (e = Ra(e, b[h], c)), h++;
        return e;
      }
      a.Color = function (c, b, e, h) {
        void 0 === h && (h = 1);
        return a.Color4f(w(c) / 255, w(b) / 255, w(e) / 255, h);
      };
      a.ColorAsInt = function (c, b, e, h) {
        void 0 === h && (h = 255);
        return ((w(h) << 24) | (w(c) << 16) | (w(b) << 8) | ((w(e) << 0) & 268435455)) >>> 0;
      };
      a.Color4f = function (c, b, e, h) {
        void 0 === h && (h = 1);
        return Float32Array.of(c, b, e, h);
      };
      Object.defineProperty(a, "TRANSPARENT", {
        get: function () {
          return a.Color4f(0, 0, 0, 0);
        },
      });
      Object.defineProperty(a, "BLACK", {
        get: function () {
          return a.Color4f(0, 0, 0, 1);
        },
      });
      Object.defineProperty(a, "WHITE", {
        get: function () {
          return a.Color4f(1, 1, 1, 1);
        },
      });
      Object.defineProperty(a, "RED", {
        get: function () {
          return a.Color4f(1, 0, 0, 1);
        },
      });
      Object.defineProperty(a, "GREEN", {
        get: function () {
          return a.Color4f(0, 1, 0, 1);
        },
      });
      Object.defineProperty(a, "BLUE", {
        get: function () {
          return a.Color4f(0, 0, 1, 1);
        },
      });
      Object.defineProperty(a, "YELLOW", {
        get: function () {
          return a.Color4f(1, 1, 0, 1);
        },
      });
      Object.defineProperty(a, "CYAN", {
        get: function () {
          return a.Color4f(0, 1, 1, 1);
        },
      });
      Object.defineProperty(a, "MAGENTA", {
        get: function () {
          return a.Color4f(1, 0, 1, 1);
        },
      });
      a.getColorComponents = function (c) {
        return [Math.floor(255 * c[0]), Math.floor(255 * c[1]), Math.floor(255 * c[2]), c[3]];
      };
      a.parseColorString = function (c, b) {
        c = c.toLowerCase();
        if (c.startsWith("#")) {
          b = 255;
          switch (c.length) {
            case 9:
              b = parseInt(c.slice(7, 9), 16);
            case 7:
              var e = parseInt(c.slice(1, 3), 16);
              var h = parseInt(c.slice(3, 5), 16);
              var m = parseInt(c.slice(5, 7), 16);
              break;
            case 5:
              b = 17 * parseInt(c.slice(4, 5), 16);
            case 4:
              (e = 17 * parseInt(c.slice(1, 2), 16)), (h = 17 * parseInt(c.slice(2, 3), 16)), (m = 17 * parseInt(c.slice(3, 4), 16));
          }
          return a.Color(e, h, m, b / 255);
        }
        return c.startsWith("rgba")
          ? ((c = c.slice(5, -1)), (c = c.split(",")), a.Color(+c[0], +c[1], +c[2], y(c[3])))
          : c.startsWith("rgb")
          ? ((c = c.slice(4, -1)), (c = c.split(",")), a.Color(+c[0], +c[1], +c[2], y(c[3])))
          : c.startsWith("gray(") || c.startsWith("hsl") || !b || ((c = b[c]), void 0 === c)
          ? a.BLACK
          : c;
      };
      a.multiplyByAlpha = function (c, b) {
        c = c.slice();
        c[3] = Math.max(0, Math.min(c[3] * b, 1));
        return c;
      };
      a.Malloc = function (c, b) {
        var e = a._malloc(b * c.BYTES_PER_ELEMENT);
        return {
          _ck: !0,
          length: b,
          byteOffset: e,
          Ib: null,
          subarray: function (h, m) {
            h = this.toTypedArray().subarray(h, m);
            h._ck = !0;
            return h;
          },
          toTypedArray: function () {
            if (this.Ib && this.Ib.length) return this.Ib;
            this.Ib = new c(a.HEAPU8.buffer, e, b);
            this.Ib._ck = !0;
            return this.Ib;
          },
        };
      };
      a.Free = function (c) {
        a._free(c.byteOffset);
        c.byteOffset = R;
        c.toTypedArray = null;
        c.Ib = null;
      };
      var Ca = R,
        yb,
        Ka = R,
        zb,
        xa = R,
        Ab,
        na,
        W = R,
        Zb,
        Da = R,
        Cb,
        La = R,
        $b,
        Db = R,
        gb,
        Ta = R,
        ac,
        Bb = R,
        bc,
        cc = R,
        Nc = Float32Array.of(0, 0, 1),
        R = 0;
      a.onRuntimeInitialized = function () {
        function c(b, e, h, m, r, A, G) {
          A || ((A = 4 * m.width), m.colorType === a.ColorType.RGBA_F16 ? (A *= 2) : m.colorType === a.ColorType.RGBA_F32 && (A *= 4));
          var M = A * m.height;
          var L = r ? r.byteOffset : a._malloc(M);
          if (G ? !b._readPixels(m, L, A, e, h, G) : !b._readPixels(m, L, A, e, h)) return r || a._free(L), null;
          if (r) return r.toTypedArray();
          switch (m.colorType) {
            case a.ColorType.RGBA_8888:
            case a.ColorType.RGBA_F16:
              b = new Uint8Array(a.HEAPU8.buffer, L, M).slice();
              break;
            case a.ColorType.RGBA_F32:
              b = new Float32Array(a.HEAPU8.buffer, L, M).slice();
              break;
            default:
              return null;
          }
          a._free(L);
          return b;
        }
        Ab = a.Malloc(Float32Array, 4);
        xa = Ab.byteOffset;
        zb = a.Malloc(Float32Array, 16);
        Ka = zb.byteOffset;
        yb = a.Malloc(Float32Array, 9);
        Ca = yb.byteOffset;
        ac = a.Malloc(Float32Array, 12);
        Bb = ac.byteOffset;
        bc = a.Malloc(Float32Array, 12);
        cc = bc.byteOffset;
        na = a.Malloc(Float32Array, 4);
        W = na.byteOffset;
        Zb = a.Malloc(Float32Array, 4);
        Da = Zb.byteOffset;
        Cb = a.Malloc(Float32Array, 3);
        La = Cb.byteOffset;
        $b = a.Malloc(Float32Array, 3);
        Db = $b.byteOffset;
        gb = a.Malloc(Int32Array, 4);
        Ta = gb.byteOffset;
        a.ColorSpace.SRGB = a.ColorSpace._MakeSRGB();
        a.ColorSpace.DISPLAY_P3 = a.ColorSpace._MakeDisplayP3();
        a.ColorSpace.ADOBE_RGB = a.ColorSpace._MakeAdobeRGB();
        a.GlyphRunFlags = { IsWhiteSpace: a._GlyphRunFlags_isWhiteSpace };
        a.Path.MakeFromCmds = function (b) {
          var e = t(b, "HEAPF32"),
            h = a.Path._MakeFromCmds(e, b.length);
          x(e, b);
          return h;
        };
        a.Path.MakeFromVerbsPointsWeights = function (b, e, h) {
          var m = t(b, "HEAPU8"),
            r = t(e, "HEAPF32"),
            A = t(h, "HEAPF32"),
            G = a.Path._MakeFromVerbsPointsWeights(m, b.length, r, e.length, A, (h && h.length) || 0);
          x(m, b);
          x(r, e);
          x(A, h);
          return G;
        };
        a.Path.prototype.addArc = function (b, e, h) {
          b = O(b);
          this._addArc(b, e, h);
          return this;
        };
        a.Path.prototype.addCircle = function (b, e, h, m) {
          this._addCircle(b, e, h, !!m);
          return this;
        };
        a.Path.prototype.addOval = function (b, e, h) {
          void 0 === h && (h = 1);
          b = O(b);
          this._addOval(b, !!e, h);
          return this;
        };
        a.Path.prototype.addPath = function () {
          var b = Array.prototype.slice.call(arguments),
            e = b[0],
            h = !1;
          "boolean" === typeof b[b.length - 1] && (h = b.pop());
          if (1 === b.length) this._addPath(e, 1, 0, 0, 0, 1, 0, 0, 0, 1, h);
          else if (2 === b.length) (b = b[1]), this._addPath(e, b[0], b[1], b[2], b[3], b[4], b[5], b[6] || 0, b[7] || 0, b[8] || 1, h);
          else if (7 === b.length || 10 === b.length) this._addPath(e, b[1], b[2], b[3], b[4], b[5], b[6], b[7] || 0, b[8] || 0, b[9] || 1, h);
          else return null;
          return this;
        };
        a.Path.prototype.addPoly = function (b, e) {
          var h = t(b, "HEAPF32");
          this._addPoly(h, b.length / 2, e);
          x(h, b);
          return this;
        };
        a.Path.prototype.addRect = function (b, e) {
          b = O(b);
          this._addRect(b, !!e);
          return this;
        };
        a.Path.prototype.addRRect = function (b, e) {
          b = oa(b);
          this._addRRect(b, !!e);
          return this;
        };
        a.Path.prototype.addVerbsPointsWeights = function (b, e, h) {
          var m = t(b, "HEAPU8"),
            r = t(e, "HEAPF32"),
            A = t(h, "HEAPF32");
          this._addVerbsPointsWeights(m, b.length, r, e.length, A, (h && h.length) || 0);
          x(m, b);
          x(r, e);
          x(A, h);
        };
        a.Path.prototype.arc = function (b, e, h, m, r, A) {
          b = a.LTRBRect(b - h, e - h, b + h, e + h);
          r = ((r - m) / Math.PI) * 180 - 360 * !!A;
          A = new a.Path();
          A.addArc(b, (m / Math.PI) * 180, r);
          this.addPath(A, !0);
          A.delete();
          return this;
        };
        a.Path.prototype.arcToOval = function (b, e, h, m) {
          b = O(b);
          this._arcToOval(b, e, h, m);
          return this;
        };
        a.Path.prototype.arcToRotated = function (b, e, h, m, r, A, G) {
          this._arcToRotated(b, e, h, !!m, !!r, A, G);
          return this;
        };
        a.Path.prototype.arcToTangent = function (b, e, h, m, r) {
          this._arcToTangent(b, e, h, m, r);
          return this;
        };
        a.Path.prototype.close = function () {
          this._close();
          return this;
        };
        a.Path.prototype.conicTo = function (b, e, h, m, r) {
          this._conicTo(b, e, h, m, r);
          return this;
        };
        a.Path.prototype.computeTightBounds = function (b) {
          this._computeTightBounds(W);
          var e = na.toTypedArray();
          return b ? (b.set(e), b) : e.slice();
        };
        a.Path.prototype.cubicTo = function (b, e, h, m, r, A) {
          this._cubicTo(b, e, h, m, r, A);
          return this;
        };
        a.Path.prototype.dash = function (b, e, h) {
          return this._dash(b, e, h) ? this : null;
        };
        a.Path.prototype.getBounds = function (b) {
          this._getBounds(W);
          var e = na.toTypedArray();
          return b ? (b.set(e), b) : e.slice();
        };
        a.Path.prototype.lineTo = function (b, e) {
          this._lineTo(b, e);
          return this;
        };
        a.Path.prototype.moveTo = function (b, e) {
          this._moveTo(b, e);
          return this;
        };
        a.Path.prototype.offset = function (b, e) {
          this._transform(1, 0, b, 0, 1, e, 0, 0, 1);
          return this;
        };
        a.Path.prototype.quadTo = function (b, e, h, m) {
          this._quadTo(b, e, h, m);
          return this;
        };
        a.Path.prototype.rArcTo = function (b, e, h, m, r, A, G) {
          this._rArcTo(b, e, h, m, r, A, G);
          return this;
        };
        a.Path.prototype.rConicTo = function (b, e, h, m, r) {
          this._rConicTo(b, e, h, m, r);
          return this;
        };
        a.Path.prototype.rCubicTo = function (b, e, h, m, r, A) {
          this._rCubicTo(b, e, h, m, r, A);
          return this;
        };
        a.Path.prototype.rLineTo = function (b, e) {
          this._rLineTo(b, e);
          return this;
        };
        a.Path.prototype.rMoveTo = function (b, e) {
          this._rMoveTo(b, e);
          return this;
        };
        a.Path.prototype.rQuadTo = function (b, e, h, m) {
          this._rQuadTo(b, e, h, m);
          return this;
        };
        a.Path.prototype.stroke = function (b) {
          b = b || {};
          b.width = b.width || 1;
          b.miter_limit = b.miter_limit || 4;
          b.cap = b.cap || a.StrokeCap.Butt;
          b.join = b.join || a.StrokeJoin.Miter;
          b.precision = b.precision || 1;
          return this._stroke(b) ? this : null;
        };
        a.Path.prototype.transform = function () {
          if (1 === arguments.length) {
            var b = arguments[0];
            this._transform(b[0], b[1], b[2], b[3], b[4], b[5], b[6] || 0, b[7] || 0, b[8] || 1);
          } else if (6 === arguments.length || 9 === arguments.length)
            (b = arguments), this._transform(b[0], b[1], b[2], b[3], b[4], b[5], b[6] || 0, b[7] || 0, b[8] || 1);
          else throw "transform expected to take 1 or 9 arguments. Got " + arguments.length;
          return this;
        };
        a.Path.prototype.trim = function (b, e, h) {
          return this._trim(b, e, !!h) ? this : null;
        };
        a.Image.prototype.encodeToBytes = function (b, e) {
          var h = a.pc();
          b = b || a.ImageFormat.PNG;
          e = e || 100;
          return h ? this._encodeToBytes(b, e, h) : this._encodeToBytes(b, e);
        };
        a.Image.prototype.makeShaderCubic = function (b, e, h, m, r) {
          r = H(r);
          return this._makeShaderCubic(b, e, h, m, r);
        };
        a.Image.prototype.makeShaderOptions = function (b, e, h, m, r) {
          r = H(r);
          return this._makeShaderOptions(b, e, h, m, r);
        };
        a.Image.prototype.readPixels = function (b, e, h, m, r) {
          return c(this, b, e, h, m, r, a.pc());
        };
        a.SinglePagePDF.prototype.export = function () {
          return this._export();
        };
        a.Canvas.prototype.setMatrix = function (b, e, h, m, r, A, G, M, L) {
          this._setMatrix(b, e, h, m, r, A, G, M, L);
        };
        a.Canvas.prototype.clear = function (b) {
          b = u(b);
          this._clear(b);
        };
        a.Canvas.prototype.clipRRect = function (b, e, h) {
          b = oa(b);
          this._clipRRect(b, e, h);
        };
        a.Canvas.prototype.clipRect = function (b, e, h) {
          b = O(b);
          this._clipRect(b, e, h);
        };
        a.Canvas.prototype.concat = function (b) {
          b = N(b);
          this._concat(b);
        };
        a.Canvas.prototype.drawArc = function (b, e, h, m, r) {
          b = O(b);
          this._drawArc(b, e, h, m, r);
        };
        a.Canvas.prototype.drawAtlas = function (b, e, h, m, r, A, G) {
          if (b && m && e && h && e.length === h.length) {
            r || (r = a.BlendMode.SrcOver);
            var M = t(e, "HEAPF32"),
              L = t(h, "HEAPF32"),
              T = h.length / 4,
              S = t(q(A), "HEAPU32");
            if (G && "B" in G && "C" in G) this._drawAtlasCubic(b, L, M, S, T, r, G.B, G.C, m);
            else {
              let n = a.FilterMode.Linear,
                C = a.MipmapMode.None;
              G && ((n = G.filter), "mipmap" in G && (C = G.mipmap));
              this._drawAtlasOptions(b, L, M, S, T, r, n, C, m);
            }
            x(M, e);
            x(L, h);
            x(S, A);
          }
        };
        a.Canvas.prototype.drawCircle = function (b, e, h, m) {
          this._drawCircle(b, e, h, m);
        };
        a.Canvas.prototype.drawColor = function (b, e) {
          b = u(b);
          void 0 !== e ? this._drawColor(b, e) : this._drawColor(b);
        };
        a.Canvas.prototype.drawColorInt = function (b, e) {
          this._drawColorInt(b, e || a.BlendMode.SrcOver);
        };
        a.Canvas.prototype.drawColorComponents = function (b, e, h, m, r) {
          b = K(b, e, h, m);
          void 0 !== r ? this._drawColor(b, r) : this._drawColor(b);
        };
        a.Canvas.prototype.drawDRRect = function (b, e, h) {
          b = oa(b, Bb);
          e = oa(e, cc);
          this._drawDRRect(b, e, h);
        };
        a.Canvas.prototype.drawImage = function (b, e, h, m) {
          this._drawImage(b, e, h, m || null);
        };
        a.Canvas.prototype.drawImageCubic = function (b, e, h, m, r, A) {
          this._drawImageCubic(b, e, h, m, r, A || null);
        };
        a.Canvas.prototype.drawImageOptions = function (b, e, h, m, r, A) {
          this._drawImageOptions(b, e, h, m, r, A || null);
        };
        a.Canvas.prototype.drawImageNine = function (b, e, h, m, r) {
          e = t(e, "HEAP32", Ta);
          h = O(h);
          this._drawImageNine(b, e, h, m, r || null);
        };
        a.Canvas.prototype.drawImageRect = function (b, e, h, m, r) {
          O(e, W);
          O(h, Da);
          this._drawImageRect(b, W, Da, m, !!r);
        };
        a.Canvas.prototype.drawImageRectCubic = function (b, e, h, m, r, A) {
          O(e, W);
          O(h, Da);
          this._drawImageRectCubic(b, W, Da, m, r, A || null);
        };
        a.Canvas.prototype.drawImageRectOptions = function (b, e, h, m, r, A) {
          O(e, W);
          O(h, Da);
          this._drawImageRectOptions(b, W, Da, m, r, A || null);
        };
        a.Canvas.prototype.drawLine = function (b, e, h, m, r) {
          this._drawLine(b, e, h, m, r);
        };
        a.Canvas.prototype.drawOval = function (b, e) {
          b = O(b);
          this._drawOval(b, e);
        };
        a.Canvas.prototype.drawPaint = function (b) {
          this._drawPaint(b);
        };
        a.Canvas.prototype.drawParagraph = function (b, e, h) {
          this._drawParagraph(b, e, h);
        };
        a.Canvas.prototype.drawPatch = function (b, e, h, m, r) {
          if (24 > b.length) throw "Need 12 cubic points";
          if (e && 4 > e.length) throw "Need 4 colors";
          if (h && 8 > h.length) throw "Need 4 shader coordinates";
          const A = t(b, "HEAPF32"),
            G = e ? t(q(e), "HEAPU32") : R,
            M = h ? t(h, "HEAPF32") : R;
          m || (m = a.BlendMode.Modulate);
          this._drawPatch(A, G, M, m, r);
          x(M, h);
          x(G, e);
          x(A, b);
        };
        a.Canvas.prototype.drawPath = function (b, e) {
          this._drawPath(b, e);
        };
        a.Canvas.prototype.drawPicture = function (b) {
          this._drawPicture(b);
        };
        a.Canvas.prototype.drawPoints = function (b, e, h) {
          var m = t(e, "HEAPF32");
          this._drawPoints(b, m, e.length / 2, h);
          x(m, e);
        };
        a.Canvas.prototype.drawRRect = function (b, e) {
          b = oa(b);
          this._drawRRect(b, e);
        };
        a.Canvas.prototype.drawRect = function (b, e) {
          b = O(b);
          this._drawRect(b, e);
        };
        a.Canvas.prototype.drawRect4f = function (b, e, h, m, r) {
          this._drawRect4f(b, e, h, m, r);
        };
        a.Canvas.prototype.drawShadow = function (b, e, h, m, r, A, G) {
          var M = t(r, "HEAPF32"),
            L = t(A, "HEAPF32");
          e = t(e, "HEAPF32", La);
          h = t(h, "HEAPF32", Db);
          this._drawShadow(b, e, h, m, M, L, G);
          x(M, r);
          x(L, A);
        };
        a.getShadowLocalBounds = function (b, e, h, m, r, A, G) {
          b = H(b);
          h = t(h, "HEAPF32", La);
          m = t(m, "HEAPF32", Db);
          if (!this._getShadowLocalBounds(b, e, h, m, r, A, W)) return null;
          e = na.toTypedArray();
          return G ? (G.set(e), G) : e.slice();
        };
        a.Canvas.prototype.drawTextBlob = function (b, e, h, m) {
          this._drawTextBlob(b, e, h, m);
        };
        a.Canvas.prototype.drawVertices = function (b, e, h) {
          this._drawVertices(b, e, h);
        };
        a.Canvas.prototype.getDeviceClipBounds = function (b) {
          this._getDeviceClipBounds(Ta);
          var e = gb.toTypedArray();
          b ? b.set(e) : (b = e.slice());
          return b;
        };
        a.Canvas.prototype.getLocalToDevice = function () {
          this._getLocalToDevice(Ka);
          for (var b = Ka, e = Array(16), h = 0; 16 > h; h++) e[h] = a.HEAPF32[b / 4 + h];
          return e;
        };
        a.Canvas.prototype.getTotalMatrix = function () {
          this._getTotalMatrix(Ca);
          for (var b = Array(9), e = 0; 9 > e; e++) b[e] = a.HEAPF32[Ca / 4 + e];
          return b;
        };
        a.Canvas.prototype.makeSurface = function (b) {
          b = this._makeSurface(b);
          b.Cb = this.Cb;
          return b;
        };
        a.Canvas.prototype.readPixels = function (b, e, h, m, r) {
          return c(this, b, e, h, m, r);
        };
        a.Canvas.prototype.saveLayer = function (b, e, h, m) {
          e = O(e);
          return this._saveLayer(b || null, e, h || null, m || 0);
        };
        a.Canvas.prototype.writePixels = function (b, e, h, m, r, A, G, M) {
          if (b.byteLength % (e * h)) throw "pixels length must be a multiple of the srcWidth * srcHeight";
          var L = b.byteLength / (e * h);
          A = A || a.AlphaType.Unpremul;
          G = G || a.ColorType.RGBA_8888;
          M = M || a.ColorSpace.SRGB;
          var T = L * e;
          L = t(b, "HEAPU8");
          e = this._writePixels({ width: e, height: h, colorType: G, alphaType: A, colorSpace: M }, L, T, m, r);
          x(L, b);
          return e;
        };
        a.ColorFilter.MakeBlend = function (b, e, h) {
          b = u(b);
          h = h || a.ColorSpace.SRGB;
          return a.ColorFilter._MakeBlend(b, e, h);
        };
        a.ColorFilter.MakeMatrix = function (b) {
          if (!b || 20 !== b.length) throw "invalid color matrix";
          var e = t(b, "HEAPF32"),
            h = a.ColorFilter._makeMatrix(e);
          x(e, b);
          return h;
        };
        a.ContourMeasure.prototype.getPosTan = function (b, e) {
          this._getPosTan(b, W);
          b = na.toTypedArray();
          return e ? (e.set(b), e) : b.slice();
        };
        a.ImageFilter.prototype.getOutputBounds = function (b, e, h) {
          b = O(b, W);
          e = H(e);
          this._getOutputBounds(b, e, Ta);
          e = gb.toTypedArray();
          return h ? (h.set(e), h) : e.slice();
        };
        a.ImageFilter.MakeDropShadow = function (b, e, h, m, r, A) {
          r = u(r, xa);
          return a.ImageFilter._MakeDropShadow(b, e, h, m, r, A);
        };
        a.ImageFilter.MakeDropShadowOnly = function (b, e, h, m, r, A) {
          r = u(r, xa);
          return a.ImageFilter._MakeDropShadowOnly(b, e, h, m, r, A);
        };
        a.ImageFilter.MakeImage = function (b, e, h, m) {
          h = O(h, W);
          m = O(m, Da);
          if ("B" in e && "C" in e) return a.ImageFilter._MakeImageCubic(b, e.B, e.C, h, m);
          const r = e.filter;
          let A = a.MipmapMode.None;
          "mipmap" in e && (A = e.mipmap);
          return a.ImageFilter._MakeImageOptions(b, r, A, h, m);
        };
        a.ImageFilter.MakeMatrixTransform = function (b, e, h) {
          b = H(b);
          if ("B" in e && "C" in e) return a.ImageFilter._MakeMatrixTransformCubic(b, e.B, e.C, h);
          const m = e.filter;
          let r = a.MipmapMode.None;
          "mipmap" in e && (r = e.mipmap);
          return a.ImageFilter._MakeMatrixTransformOptions(b, m, r, h);
        };
        a.Paint.prototype.getColor = function () {
          this._getColor(xa);
          return P(xa);
        };
        a.Paint.prototype.setColor = function (b, e) {
          e = e || null;
          b = u(b);
          this._setColor(b, e);
        };
        a.Paint.prototype.setColorComponents = function (b, e, h, m, r) {
          r = r || null;
          b = K(b, e, h, m);
          this._setColor(b, r);
        };
        a.Path.prototype.getPoint = function (b, e) {
          this._getPoint(b, W);
          b = na.toTypedArray();
          return e ? ((e[0] = b[0]), (e[1] = b[1]), e) : b.slice(0, 2);
        };
        a.Picture.prototype.makeShader = function (b, e, h, m, r) {
          m = H(m);
          r = O(r);
          return this._makeShader(b, e, h, m, r);
        };
        a.Picture.prototype.cullRect = function (b) {
          this._cullRect(W);
          var e = na.toTypedArray();
          return b ? (b.set(e), b) : e.slice();
        };
        a.PictureRecorder.prototype.beginRecording = function (b, e) {
          b = O(b);
          return this._beginRecording(b, !!e);
        };
        a.Surface.prototype.getCanvas = function () {
          var b = this._getCanvas();
          b.Cb = this.Cb;
          return b;
        };
        a.Surface.prototype.makeImageSnapshot = function (b) {
          b = t(b, "HEAP32", Ta);
          return this._makeImageSnapshot(b);
        };
        a.Surface.prototype.makeSurface = function (b) {
          b = this._makeSurface(b);
          b.Cb = this.Cb;
          return b;
        };
        a.Surface.prototype.Hc = function (b, e) {
          this.Xb || (this.Xb = this.getCanvas());
          return requestAnimationFrame(
            function () {
              b(this.Xb);
              this.flush(e);
            }.bind(this)
          );
        };
        a.Surface.prototype.requestAnimationFrame || (a.Surface.prototype.requestAnimationFrame = a.Surface.prototype.Hc);
        a.Surface.prototype.Dc = function (b, e) {
          this.Xb || (this.Xb = this.getCanvas());
          requestAnimationFrame(
            function () {
              b(this.Xb);
              this.flush(e);
              this.dispose();
            }.bind(this)
          );
        };
        a.Surface.prototype.drawOnce || (a.Surface.prototype.drawOnce = a.Surface.prototype.Dc);
        a.PathEffect.MakeDash = function (b, e) {
          e || (e = 0);
          if (!b.length || 1 === b.length % 2) throw "Intervals array must have even length";
          var h = t(b, "HEAPF32");
          e = a.PathEffect._MakeDash(h, b.length, e);
          x(h, b);
          return e;
        };
        a.PathEffect.MakeLine2D = function (b, e) {
          e = H(e);
          return a.PathEffect._MakeLine2D(b, e);
        };
        a.PathEffect.MakePath2D = function (b, e) {
          b = H(b);
          return a.PathEffect._MakePath2D(b, e);
        };
        a.Shader.MakeColor = function (b, e) {
          e = e || null;
          b = u(b);
          return a.Shader._MakeColor(b, e);
        };
        a.Shader.Blend = a.Shader.MakeBlend;
        a.Shader.Color = a.Shader.MakeColor;
        a.Shader.MakeLinearGradient = function (b, e, h, m, r, A, G, M) {
          M = M || null;
          var L = I(h),
            T = t(m, "HEAPF32");
          G = G || 0;
          A = H(A);
          var S = na.toTypedArray();
          S.set(b);
          S.set(e, 2);
          b = a.Shader._MakeLinearGradient(W, L.tb, L.colorType, T, L.count, r, G, A, M);
          x(L.tb, h);
          m && x(T, m);
          return b;
        };
        a.Shader.MakeRadialGradient = function (b, e, h, m, r, A, G, M) {
          M = M || null;
          var L = I(h),
            T = t(m, "HEAPF32");
          G = G || 0;
          A = H(A);
          b = a.Shader._MakeRadialGradient(b[0], b[1], e, L.tb, L.colorType, T, L.count, r, G, A, M);
          x(L.tb, h);
          m && x(T, m);
          return b;
        };
        a.Shader.MakeSweepGradient = function (b, e, h, m, r, A, G, M, L, T) {
          T = T || null;
          var S = I(h),
            n = t(m, "HEAPF32");
          G = G || 0;
          M = M || 0;
          L = L || 360;
          A = H(A);
          b = a.Shader._MakeSweepGradient(b, e, S.tb, S.colorType, n, S.count, r, M, L, G, A, T);
          x(S.tb, h);
          m && x(n, m);
          return b;
        };
        a.Shader.MakeTwoPointConicalGradient = function (b, e, h, m, r, A, G, M, L, T) {
          T = T || null;
          var S = I(r),
            n = t(A, "HEAPF32");
          L = L || 0;
          M = H(M);
          var C = na.toTypedArray();
          C.set(b);
          C.set(h, 2);
          b = a.Shader._MakeTwoPointConicalGradient(W, e, m, S.tb, S.colorType, n, S.count, G, L, M, T);
          x(S.tb, r);
          A && x(n, A);
          return b;
        };
        a.Vertices.prototype.bounds = function (b) {
          this._bounds(W);
          var e = na.toTypedArray();
          return b ? (b.set(e), b) : e.slice();
        };
        a.ib &&
          a.ib.forEach(function (b) {
            b();
          });
      };
      a.computeTonalColors = function (c) {
        var b = t(c.ambient, "HEAPF32"),
          e = t(c.spot, "HEAPF32");
        this._computeTonalColors(b, e);
        var h = { ambient: P(b), spot: P(e) };
        x(b, c.ambient);
        x(e, c.spot);
        return h;
      };
      a.LTRBRect = function (c, b, e, h) {
        return Float32Array.of(c, b, e, h);
      };
      a.XYWHRect = function (c, b, e, h) {
        return Float32Array.of(c, b, c + e, b + h);
      };
      a.LTRBiRect = function (c, b, e, h) {
        return Int32Array.of(c, b, e, h);
      };
      a.XYWHiRect = function (c, b, e, h) {
        return Int32Array.of(c, b, c + e, b + h);
      };
      a.RRectXY = function (c, b, e) {
        return Float32Array.of(c[0], c[1], c[2], c[3], b, e, b, e, b, e, b, e);
      };
      a.MakeAnimatedImageFromEncoded = function (c) {
        c = new Uint8Array(c);
        var b = a._malloc(c.byteLength);
        a.HEAPU8.set(c, b);
        return (c = a._decodeAnimatedImage(b, c.byteLength)) ? c : null;
      };
      a.MakeImageFromEncoded = function (c) {
        c = new Uint8Array(c);
        var b = a._malloc(c.byteLength);
        a.HEAPU8.set(c, b);
        return (c = a._decodeImage(b, c.byteLength)) ? c : null;
      };
      var Ua = null;
      a.MakeImageFromCanvasImageSource = function (c) {
        var b = c.width,
          e = c.height;
        Ua || (Ua = document.createElement("canvas"));
        Ua.width = b;
        Ua.height = e;
        var h = Ua.getContext("2d", { willReadFrequently: !0 });
        h.drawImage(c, 0, 0);
        c = h.getImageData(0, 0, b, e);
        return a.MakeImage(
          { width: b, height: e, alphaType: a.AlphaType.Unpremul, colorType: a.ColorType.RGBA_8888, colorSpace: a.ColorSpace.SRGB },
          c.data,
          4 * b
        );
      };
      a.MakeImage = function (c, b, e) {
        var h = a._malloc(b.length);
        a.HEAPU8.set(b, h);
        return a._MakeImage(c, h, b.length, e);
      };
      a.MakeVertices = function (c, b, e, h, m, r) {
        var A = (m && m.length) || 0,
          G = 0;
        e && e.length && (G |= 1);
        h && h.length && (G |= 2);
        void 0 === r || r || (G |= 4);
        c = new a._VerticesBuilder(c, b.length / 2, A, G);
        t(b, "HEAPF32", c.positions());
        c.texCoords() && t(e, "HEAPF32", c.texCoords());
        c.colors() && t(q(h), "HEAPU32", c.colors());
        c.indices() && t(m, "HEAPU16", c.indices());
        return c.detach();
      };
      (function (c) {
        c.ib = c.ib || [];
        c.ib.push(function () {
          c.MakeSinglePagePDF = function (b, { width: e, height: h }) {
            return c.SinglePagePDF._makeSinglePagePDF(e, h);
          };
        });
      })(z);
      a.Matrix = {};
      a.Matrix.identity = function () {
        return f(3);
      };
      a.Matrix.invert = function (c) {
        var b = c[0] * c[4] * c[8] + c[1] * c[5] * c[6] + c[2] * c[3] * c[7] - c[2] * c[4] * c[6] - c[1] * c[3] * c[8] - c[0] * c[5] * c[7];
        return b
          ? [
              (c[4] * c[8] - c[5] * c[7]) / b,
              (c[2] * c[7] - c[1] * c[8]) / b,
              (c[1] * c[5] - c[2] * c[4]) / b,
              (c[5] * c[6] - c[3] * c[8]) / b,
              (c[0] * c[8] - c[2] * c[6]) / b,
              (c[2] * c[3] - c[0] * c[5]) / b,
              (c[3] * c[7] - c[4] * c[6]) / b,
              (c[1] * c[6] - c[0] * c[7]) / b,
              (c[0] * c[4] - c[1] * c[3]) / b,
            ]
          : null;
      };
      a.Matrix.mapPoints = function (c, b) {
        for (var e = 0; e < b.length; e += 2) {
          var h = b[e],
            m = b[e + 1],
            r = c[6] * h + c[7] * m + c[8],
            A = c[3] * h + c[4] * m + c[5];
          b[e] = (c[0] * h + c[1] * m + c[2]) / r;
          b[e + 1] = A / r;
        }
        return b;
      };
      a.Matrix.multiply = function () {
        return Sa(3, arguments);
      };
      a.Matrix.rotated = function (c, b, e) {
        b = b || 0;
        e = e || 0;
        var h = Math.sin(c);
        c = Math.cos(c);
        return [c, -h, ha(h, e, 1 - c, b), h, c, ha(-h, b, 1 - c, e), 0, 0, 1];
      };
      a.Matrix.scaled = function (c, b, e, h) {
        e = e || 0;
        h = h || 0;
        var m = d([c, b], f(3), 3, 0, 1);
        return d([e - c * e, h - b * h], m, 3, 2, 0);
      };
      a.Matrix.skewed = function (c, b, e, h) {
        e = e || 0;
        h = h || 0;
        var m = d([c, b], f(3), 3, 1, -1);
        return d([-c * e, -b * h], m, 3, 2, 0);
      };
      a.Matrix.translated = function (c, b) {
        return d(arguments, f(3), 3, 2, 0);
      };
      a.Vector = {};
      a.Vector.dot = function (c, b) {
        return c
          .map(function (e, h) {
            return e * b[h];
          })
          .reduce(function (e, h) {
            return e + h;
          });
      };
      a.Vector.lengthSquared = function (c) {
        return a.Vector.dot(c, c);
      };
      a.Vector.length = function (c) {
        return Math.sqrt(a.Vector.lengthSquared(c));
      };
      a.Vector.mulScalar = function (c, b) {
        return c.map(function (e) {
          return e * b;
        });
      };
      a.Vector.add = function (c, b) {
        return c.map(function (e, h) {
          return e + b[h];
        });
      };
      a.Vector.sub = function (c, b) {
        return c.map(function (e, h) {
          return e - b[h];
        });
      };
      a.Vector.dist = function (c, b) {
        return a.Vector.length(a.Vector.sub(c, b));
      };
      a.Vector.normalize = function (c) {
        return a.Vector.mulScalar(c, 1 / a.Vector.length(c));
      };
      a.Vector.cross = function (c, b) {
        return [c[1] * b[2] - c[2] * b[1], c[2] * b[0] - c[0] * b[2], c[0] * b[1] - c[1] * b[0]];
      };
      a.M44 = {};
      a.M44.identity = function () {
        return f(4);
      };
      a.M44.translated = function (c) {
        return d(c, f(4), 4, 3, 0);
      };
      a.M44.scaled = function (c) {
        return d(c, f(4), 4, 0, 1);
      };
      a.M44.rotated = function (c, b) {
        return a.M44.rotatedUnitSinCos(a.Vector.normalize(c), Math.sin(b), Math.cos(b));
      };
      a.M44.rotatedUnitSinCos = function (c, b, e) {
        var h = c[0],
          m = c[1];
        c = c[2];
        var r = 1 - e;
        return [
          r * h * h + e,
          r * h * m - b * c,
          r * h * c + b * m,
          0,
          r * h * m + b * c,
          r * m * m + e,
          r * m * c - b * h,
          0,
          r * h * c - b * m,
          r * m * c + b * h,
          r * c * c + e,
          0,
          0,
          0,
          0,
          1,
        ];
      };
      a.M44.lookat = function (c, b, e) {
        b = a.Vector.normalize(a.Vector.sub(b, c));
        e = a.Vector.normalize(e);
        e = a.Vector.normalize(a.Vector.cross(b, e));
        var h = a.M44.identity();
        d(e, h, 4, 0, 0);
        d(a.Vector.cross(e, b), h, 4, 1, 0);
        d(a.Vector.mulScalar(b, -1), h, 4, 2, 0);
        d(c, h, 4, 3, 0);
        c = a.M44.invert(h);
        return null === c ? a.M44.identity() : c;
      };
      a.M44.perspective = function (c, b, e) {
        var h = 1 / (b - c);
        e /= 2;
        e = Math.cos(e) / Math.sin(e);
        return [e, 0, 0, 0, 0, e, 0, 0, 0, 0, (b + c) * h, 2 * b * c * h, 0, 0, -1, 1];
      };
      a.M44.rc = function (c, b, e) {
        return c[4 * b + e];
      };
      a.M44.multiply = function () {
        return Sa(4, arguments);
      };
      a.M44.invert = function (c) {
        var b = c[0],
          e = c[4],
          h = c[8],
          m = c[12],
          r = c[1],
          A = c[5],
          G = c[9],
          M = c[13],
          L = c[2],
          T = c[6],
          S = c[10],
          n = c[14],
          C = c[3],
          Q = c[7],
          X = c[11];
        c = c[15];
        var ea = b * A - e * r,
          pa = b * G - h * r,
          qa = b * M - m * r,
          la = e * G - h * A,
          E = e * M - m * A,
          g = h * M - m * G,
          l = L * Q - T * C,
          v = L * X - S * C,
          B = L * c - n * C,
          D = T * X - S * Q,
          F = T * c - n * Q,
          J = S * c - n * X,
          Z = ea * J - pa * F + qa * D + la * B - E * v + g * l,
          aa = 1 / Z;
        if (0 === Z || Infinity === aa) return null;
        ea *= aa;
        pa *= aa;
        qa *= aa;
        la *= aa;
        E *= aa;
        g *= aa;
        l *= aa;
        v *= aa;
        B *= aa;
        D *= aa;
        F *= aa;
        J *= aa;
        b = [
          A * J - G * F + M * D,
          G * B - r * J - M * v,
          r * F - A * B + M * l,
          A * v - r * D - G * l,
          h * F - e * J - m * D,
          b * J - h * B + m * v,
          e * B - b * F - m * l,
          b * D - e * v + h * l,
          Q * g - X * E + c * la,
          X * qa - C * g - c * pa,
          C * E - Q * qa + c * ea,
          Q * pa - C * la - X * ea,
          S * E - T * g - n * la,
          L * g - S * qa + n * pa,
          T * qa - L * E - n * ea,
          L * la - T * pa + S * ea,
        ];
        return b.every(function (ya) {
          return !isNaN(ya) && Infinity !== ya && -Infinity !== ya;
        })
          ? b
          : null;
      };
      a.M44.transpose = function (c) {
        return [c[0], c[4], c[8], c[12], c[1], c[5], c[9], c[13], c[2], c[6], c[10], c[14], c[3], c[7], c[11], c[15]];
      };
      a.M44.mustInvert = function (c) {
        c = a.M44.invert(c);
        if (null === c) throw "Matrix not invertible";
        return c;
      };
      a.M44.setupCamera = function (c, b, e) {
        var h = a.M44.lookat(e.eye, e.coa, e.up);
        e = a.M44.perspective(e.near, e.far, e.angle);
        b = [(c[2] - c[0]) / 2, (c[3] - c[1]) / 2, b];
        c = a.M44.multiply(a.M44.translated([(c[0] + c[2]) / 2, (c[1] + c[3]) / 2, 0]), a.M44.scaled(b));
        return a.M44.multiply(c, e, h, a.M44.mustInvert(c));
      };
      a.ColorMatrix = {};
      a.ColorMatrix.identity = function () {
        var c = new Float32Array(20);
        c[0] = 1;
        c[6] = 1;
        c[12] = 1;
        c[18] = 1;
        return c;
      };
      a.ColorMatrix.scaled = function (c, b, e, h) {
        var m = new Float32Array(20);
        m[0] = c;
        m[6] = b;
        m[12] = e;
        m[18] = h;
        return m;
      };
      var Oc = [
        [6, 7, 11, 12],
        [0, 10, 2, 12],
        [0, 1, 5, 6],
      ];
      a.ColorMatrix.rotated = function (c, b, e) {
        var h = a.ColorMatrix.identity();
        c = Oc[c];
        h[c[0]] = e;
        h[c[1]] = b;
        h[c[2]] = -b;
        h[c[3]] = e;
        return h;
      };
      a.ColorMatrix.postTranslate = function (c, b, e, h, m) {
        c[4] += b;
        c[9] += e;
        c[14] += h;
        c[19] += m;
        return c;
      };
      a.ColorMatrix.concat = function (c, b) {
        for (var e = new Float32Array(20), h = 0, m = 0; 20 > m; m += 5) {
          for (var r = 0; 4 > r; r++) e[h++] = c[m] * b[r] + c[m + 1] * b[r + 5] + c[m + 2] * b[r + 10] + c[m + 3] * b[r + 15];
          e[h++] = c[m] * b[4] + c[m + 1] * b[9] + c[m + 2] * b[14] + c[m + 3] * b[19] + c[m + 4];
        }
        return e;
      };
      (function (c) {
        c.ib = c.ib || [];
        c.ib.push(function () {
          function b(n) {
            n && (n.dir = 0 === n.dir ? c.TextDirection.RTL : c.TextDirection.LTR);
            return n;
          }
          function e(n) {
            if (!n || !n.length) return [];
            for (var C = [], Q = 0; Q < n.length; Q += 5) {
              var X = c.LTRBRect(n[Q], n[Q + 1], n[Q + 2], n[Q + 3]),
                ea = c.TextDirection.LTR;
              0 === n[Q + 4] && (ea = c.TextDirection.RTL);
              C.push({ rect: X, dir: ea });
            }
            c._free(n.byteOffset);
            return C;
          }
          function h(n) {
            n = n || {};
            void 0 === n.weight && (n.weight = c.FontWeight.Normal);
            n.width = n.width || c.FontWidth.Normal;
            n.slant = n.slant || c.FontSlant.Upright;
            return n;
          }
          function m(n) {
            if (!n || !n.length) return R;
            for (var C = [], Q = 0; Q < n.length; Q++) {
              var X = r(n[Q]);
              C.push(X);
            }
            return t(C, "HEAPU32");
          }
          function r(n) {
            if (M[n]) return M[n];
            var C = da(n) + 1,
              Q = c._malloc(C);
            fa(n, ia, Q, C);
            return (M[n] = Q);
          }
          function A(n) {
            n._colorPtr = u(n.color);
            n._foregroundColorPtr = R;
            n._backgroundColorPtr = R;
            n._decorationColorPtr = R;
            n.foregroundColor && (n._foregroundColorPtr = u(n.foregroundColor, L));
            n.backgroundColor && (n._backgroundColorPtr = u(n.backgroundColor, T));
            n.decorationColor && (n._decorationColorPtr = u(n.decorationColor, S));
            Array.isArray(n.fontFamilies) && n.fontFamilies.length
              ? ((n._fontFamiliesPtr = m(n.fontFamilies)), (n._fontFamiliesLen = n.fontFamilies.length))
              : ((n._fontFamiliesPtr = R), (n._fontFamiliesLen = 0));
            if (n.locale) {
              var C = n.locale;
              n._localePtr = r(C);
              n._localeLen = da(C) + 1;
            } else (n._localePtr = R), (n._localeLen = 0);
            if (Array.isArray(n.shadows) && n.shadows.length) {
              C = n.shadows;
              var Q = C.map(function (E) {
                  return E.color || c.BLACK;
                }),
                X = C.map(function (E) {
                  return E.blurRadius || 0;
                });
              n._shadowLen = C.length;
              for (var ea = c._malloc(8 * C.length), pa = ea / 4, qa = 0; qa < C.length; qa++) {
                var la = C[qa].offset || [0, 0];
                c.HEAPF32[pa] = la[0];
                c.HEAPF32[pa + 1] = la[1];
                pa += 2;
              }
              n._shadowColorsPtr = I(Q).tb;
              n._shadowOffsetsPtr = ea;
              n._shadowBlurRadiiPtr = t(X, "HEAPF32");
            } else (n._shadowLen = 0), (n._shadowColorsPtr = R), (n._shadowOffsetsPtr = R), (n._shadowBlurRadiiPtr = R);
            Array.isArray(n.fontFeatures) && n.fontFeatures.length
              ? ((C = n.fontFeatures),
                (Q = C.map(function (E) {
                  return E.name;
                })),
                (X = C.map(function (E) {
                  return E.value;
                })),
                (n._fontFeatureLen = C.length),
                (n._fontFeatureNamesPtr = m(Q)),
                (n._fontFeatureValuesPtr = t(X, "HEAPU32")))
              : ((n._fontFeatureLen = 0), (n._fontFeatureNamesPtr = R), (n._fontFeatureValuesPtr = R));
            Array.isArray(n.fontVariations) && n.fontVariations.length
              ? ((C = n.fontVariations),
                (Q = C.map(function (E) {
                  return E.axis;
                })),
                (X = C.map(function (E) {
                  return E.value;
                })),
                (n._fontVariationLen = C.length),
                (n._fontVariationAxesPtr = m(Q)),
                (n._fontVariationValuesPtr = t(X, "HEAPF32")))
              : ((n._fontVariationLen = 0), (n._fontVariationAxesPtr = R), (n._fontVariationValuesPtr = R));
          }
          function G(n) {
            c._free(n._fontFamiliesPtr);
            c._free(n._shadowColorsPtr);
            c._free(n._shadowOffsetsPtr);
            c._free(n._shadowBlurRadiiPtr);
            c._free(n._fontFeatureNamesPtr);
            c._free(n._fontFeatureValuesPtr);
            c._free(n._fontVariationAxesPtr);
            c._free(n._fontVariationValuesPtr);
          }
          c.Paragraph.prototype.getRectsForRange = function (n, C, Q, X) {
            n = this._getRectsForRange(n, C, Q, X);
            return e(n);
          };
          c.Paragraph.prototype.getRectsForPlaceholders = function () {
            var n = this._getRectsForPlaceholders();
            return e(n);
          };
          c.Paragraph.prototype.getGlyphInfoAt = function (n) {
            return b(this._getGlyphInfoAt(n));
          };
          c.Paragraph.prototype.getClosestGlyphInfoAtCoordinate = function (n, C) {
            return b(this._getClosestGlyphInfoAtCoordinate(n, C));
          };
          c.TypefaceFontProvider.prototype.registerFont = function (n, C) {
            n = c.Typeface.MakeFreeTypeFaceFromData(n);
            if (!n) return null;
            C = r(C);
            this._registerFont(n, C);
          };
          c.ParagraphStyle = function (n) {
            n.disableHinting = n.disableHinting || !1;
            if (n.ellipsis) {
              var C = n.ellipsis;
              n._ellipsisPtr = r(C);
              n._ellipsisLen = da(C) + 1;
            } else (n._ellipsisPtr = R), (n._ellipsisLen = 0);
            null == n.heightMultiplier && (n.heightMultiplier = -1);
            n.maxLines = n.maxLines || 0;
            n.replaceTabCharacters = n.replaceTabCharacters || !1;
            C = (C = n.strutStyle) || {};
            C.strutEnabled = C.strutEnabled || !1;
            C.strutEnabled && Array.isArray(C.fontFamilies) && C.fontFamilies.length
              ? ((C._fontFamiliesPtr = m(C.fontFamilies)), (C._fontFamiliesLen = C.fontFamilies.length))
              : ((C._fontFamiliesPtr = R), (C._fontFamiliesLen = 0));
            C.fontStyle = h(C.fontStyle);
            null == C.fontSize && (C.fontSize = -1);
            null == C.heightMultiplier && (C.heightMultiplier = -1);
            C.halfLeading = C.halfLeading || !1;
            C.leading = C.leading || 0;
            C.forceStrutHeight = C.forceStrutHeight || !1;
            n.strutStyle = C;
            n.textAlign = n.textAlign || c.TextAlign.Start;
            n.textDirection = n.textDirection || c.TextDirection.LTR;
            n.textHeightBehavior = n.textHeightBehavior || c.TextHeightBehavior.All;
            n.textStyle = c.TextStyle(n.textStyle);
            n.applyRoundingHack = !1 !== n.applyRoundingHack;
            return n;
          };
          c.TextStyle = function (n) {
            n.color || (n.color = c.BLACK);
            n.decoration = n.decoration || 0;
            n.decorationThickness = n.decorationThickness || 0;
            n.decorationStyle = n.decorationStyle || c.DecorationStyle.Solid;
            n.textBaseline = n.textBaseline || c.TextBaseline.Alphabetic;
            null == n.fontSize && (n.fontSize = -1);
            n.letterSpacing = n.letterSpacing || 0;
            n.wordSpacing = n.wordSpacing || 0;
            null == n.heightMultiplier && (n.heightMultiplier = -1);
            n.halfLeading = n.halfLeading || !1;
            n.fontStyle = h(n.fontStyle);
            return n;
          };
          var M = {},
            L = c._malloc(16),
            T = c._malloc(16),
            S = c._malloc(16);
          c.ParagraphBuilder.Make = function (n, C) {
            A(n.textStyle);
            C = c.ParagraphBuilder._Make(n, C);
            G(n.textStyle);
            return C;
          };
          c.ParagraphBuilder.MakeFromFontProvider = function (n, C) {
            A(n.textStyle);
            C = c.ParagraphBuilder._MakeFromFontProvider(n, C);
            G(n.textStyle);
            return C;
          };
          c.ParagraphBuilder.MakeFromFontCollection = function (n, C) {
            A(n.textStyle);
            C = c.ParagraphBuilder._MakeFromFontCollection(n, C);
            G(n.textStyle);
            return C;
          };
          c.ParagraphBuilder.ShapeText = function (n, C, Q) {
            let X = 0;
            for (const ea of C) X += ea.length;
            if (X !== n.length) throw "Accumulated block lengths must equal text.length";
            return c.ParagraphBuilder._ShapeText(n, C, Q);
          };
          c.ParagraphBuilder.prototype.pushStyle = function (n) {
            A(n);
            this._pushStyle(n);
            G(n);
          };
          c.ParagraphBuilder.prototype.pushPaintStyle = function (n, C, Q) {
            A(n);
            this._pushPaintStyle(n, C, Q);
            G(n);
          };
          c.ParagraphBuilder.prototype.addPlaceholder = function (n, C, Q, X, ea) {
            Q = Q || c.PlaceholderAlignment.Baseline;
            X = X || c.TextBaseline.Alphabetic;
            this._addPlaceholder(n || 0, C || 0, Q, X, ea || 0);
          };
          c.ParagraphBuilder.prototype.setWordsUtf8 = function (n) {
            var C = t(n, "HEAPU32");
            this._setWordsUtf8(C, (n && n.length) || 0);
            x(C, n);
          };
          c.ParagraphBuilder.prototype.setWordsUtf16 = function (n) {
            var C = t(n, "HEAPU32");
            this._setWordsUtf16(C, (n && n.length) || 0);
            x(C, n);
          };
          c.ParagraphBuilder.prototype.setGraphemeBreaksUtf8 = function (n) {
            var C = t(n, "HEAPU32");
            this._setGraphemeBreaksUtf8(C, (n && n.length) || 0);
            x(C, n);
          };
          c.ParagraphBuilder.prototype.setGraphemeBreaksUtf16 = function (n) {
            var C = t(n, "HEAPU32");
            this._setGraphemeBreaksUtf16(C, (n && n.length) || 0);
            x(C, n);
          };
          c.ParagraphBuilder.prototype.setLineBreaksUtf8 = function (n) {
            var C = t(n, "HEAPU32");
            this._setLineBreaksUtf8(C, (n && n.length) || 0);
            x(C, n);
          };
          c.ParagraphBuilder.prototype.setLineBreaksUtf16 = function (n) {
            var C = t(n, "HEAPU32");
            this._setLineBreaksUtf16(C, (n && n.length) || 0);
            x(C, n);
          };
        });
      })(z);
      a.MakeManagedAnimation = function (c, b, e, h, m) {
        if (!a._MakeManagedAnimation) throw "Not compiled with MakeManagedAnimation";
        e || (e = "");
        if (!b) return a._MakeManagedAnimation(c, 0, R, R, R, e, h, m);
        for (var r = [], A = [], G = [], M = Object.keys(b || {}), L = 0; L < M.length; L++) {
          var T = M[L],
            S = new Uint8Array(b[T]),
            n = a._malloc(S.byteLength);
          a.HEAPU8.set(S, n);
          A.push(n);
          G.push(S.byteLength);
          S = da(T) + 1;
          n = a._malloc(S);
          fa(T, ia, n, S);
          r.push(n);
        }
        b = t(r, "HEAPU32");
        A = t(A, "HEAPU32");
        G = t(G, "HEAPU32");
        c = a._MakeManagedAnimation(c, M.length, b, A, G, e, h, m);
        a._free(b);
        a._free(A);
        a._free(G);
        return c;
      };
      a.wd = function (c) {
        c.text = c.text || "";
        c.textSize = c.textSize || 0;
        c.minTextSize = c.minTextSize || 0;
        c.maxTextSize = c.maxTextSize || Number.MAX_VALUE;
        c.strokeWidth = c.strokeWidth || 0;
        c.lineHeight = c.lineHeight || 0;
        c.lineShift = c.lineShift || 0;
        c.ascent = c.ascent || 0;
        c.maxLines = c.maxLines || 0;
        c.horizAlign = c.horizAlign || a.TextAlign.Left;
        c.vertAlign = c.vertAlign || a.xd.Top;
        c.strokeJoin = c.strokeJoin || a.StrokeJoin.Miter;
        c.direction = c.direction || a.TextDirection.LTR;
        c.linebreak = c.linebreak || a.LineBreakType.HardLineBreak;
        c.resize = c.resize || a.vd.None;
        c.fillColor || (c.fillColor = a.TRANSPARENT);
        c.strokeColor || (c.strokeColor = a.TRANSPARENT);
        c.boundingBox || (c.boundingBox = [0, 0, 0, 0]);
        return c;
      };
      (function (c) {
        c.ib = c.ib || [];
        c.ib.push(function () {
          c.Animation.prototype.render = function (b, e) {
            O(e, W);
            this._render(b, W);
          };
          c.Animation.prototype.size = function (b) {
            this._size(W);
            var e = na.toTypedArray();
            return b ? ((b[0] = e[0]), (b[1] = e[1]), b) : e.slice(0, 2);
          };
          c.ManagedAnimation &&
            ((c.ManagedAnimation.prototype.render = function (b, e) {
              O(e, W);
              this._render(b, W);
            }),
            (c.ManagedAnimation.prototype.seek = function (b, e) {
              this._seek(b, W);
              b = na.toTypedArray();
              return e ? (e.set(b), e) : b.slice();
            }),
            (c.ManagedAnimation.prototype.seekFrame = function (b, e) {
              this._seekFrame(b, W);
              b = na.toTypedArray();
              return e ? (e.set(b), e) : b.slice();
            }),
            (c.ManagedAnimation.prototype.setColor = function (b, e) {
              e = u(e);
              return this._setColor(b, e);
            }),
            (c.ManagedAnimation.prototype.setColorSlot = function (b, e) {
              e = u(e);
              return this._setColorSlot(b, e);
            }),
            (c.ManagedAnimation.prototype.getColorSlot = function (b) {
              this._getColorSlot(b, xa);
              b = P(xa);
              return -1 == b[0] ? null : b;
            }),
            (c.ManagedAnimation.prototype.setVec2Slot = function (b, e) {
              t(e, "HEAPF32", La);
              return this._setVec2Slot(b, La);
            }),
            (c.ManagedAnimation.prototype.getVec2Slot = function (b) {
              this._getVec2Slot(b, La);
              b = Cb.toTypedArray();
              return -1 === b[2] ? null : b.slice(0, 2);
            }),
            (c.ManagedAnimation.prototype.setTextSlot = function (b, e) {
              var h = u(e.fillColor, xa),
                m = u(e.strokeColor, W),
                r = O(e.boundingBox, Da);
              e._fillColorPtr = h;
              e._strokeColorPtr = m;
              e._boundingBoxPtr = r;
              return this._setTextSlot(b, e);
            }),
            (c.ManagedAnimation.prototype.setTransform = function (b, e, h, m, r, A, G) {
              e = t([e[0], e[1], h[0], h[1], m[0], m[1], r, A, G], "HEAPF32", Ca);
              return this._setTransform(b, e);
            }),
            (c.ManagedAnimation.prototype.size = function (b) {
              this._size(W);
              var e = na.toTypedArray();
              return b ? ((b[0] = e[0]), (b[1] = e[1]), b) : e.slice(0, 2);
            }));
        });
      })(z);
      a.ib = a.ib || [];
      a.ib.push(function () {
        a.Path.prototype.op = function (c, b) {
          return this._op(c, b) ? this : null;
        };
        a.Path.prototype.simplify = function () {
          return this._simplify() ? this : null;
        };
      });
      a.ib = a.ib || [];
      a.ib.push(function () {
        a.Canvas.prototype.drawText = function (c, b, e, h, m) {
          var r = da(c),
            A = a._malloc(r + 1);
          fa(c, ia, A, r + 1);
          this._drawSimpleText(A, r, b, e, m, h);
          a._free(A);
        };
        a.Canvas.prototype.drawGlyphs = function (c, b, e, h, m, r) {
          if (!(2 * c.length <= b.length)) throw "Not enough positions for the array of gyphs";
          const A = t(c, "HEAPU16"),
            G = t(b, "HEAPF32");
          this._drawGlyphs(c.length, A, G, e, h, m, r);
          x(G, b);
          x(A, c);
        };
        a.Font.prototype.getGlyphBounds = function (c, b, e) {
          var h = t(c, "HEAPU16"),
            m = a._malloc(16 * c.length);
          this._getGlyphWidthBounds(h, c.length, R, m, b || null);
          b = new Float32Array(a.HEAPU8.buffer, m, 4 * c.length);
          x(h, c);
          if (e) return e.set(b), a._free(m), e;
          c = Float32Array.from(b);
          a._free(m);
          return c;
        };
        a.Font.prototype.getGlyphIDs = function (c, b, e) {
          b || (b = c.length);
          var h = da(c) + 1,
            m = a._malloc(h);
          fa(c, ia, m, h);
          c = a._malloc(2 * b);
          b = this._getGlyphIDs(m, h - 1, b, c);
          a._free(m);
          if (0 > b) return a._free(c), null;
          m = new Uint16Array(a.HEAPU8.buffer, c, b);
          if (e) return e.set(m), a._free(c), e;
          e = Uint16Array.from(m);
          a._free(c);
          return e;
        };
        a.Font.prototype.getGlyphIntercepts = function (c, b, e, h) {
          var m = t(c, "HEAPU16"),
            r = t(b, "HEAPF32");
          return this._getGlyphIntercepts(m, c.length, !(c && c._ck), r, b.length, !(b && b._ck), e, h);
        };
        a.Font.prototype.getGlyphWidths = function (c, b, e) {
          var h = t(c, "HEAPU16"),
            m = a._malloc(4 * c.length);
          this._getGlyphWidthBounds(h, c.length, m, R, b || null);
          b = new Float32Array(a.HEAPU8.buffer, m, c.length);
          x(h, c);
          if (e) return e.set(b), a._free(m), e;
          c = Float32Array.from(b);
          a._free(m);
          return c;
        };
        a.FontMgr.FromData = function () {
          if (!arguments.length) return null;
          var c = arguments;
          1 === c.length && Array.isArray(c[0]) && (c = arguments[0]);
          if (!c.length) return null;
          for (var b = [], e = [], h = 0; h < c.length; h++) {
            var m = new Uint8Array(c[h]),
              r = t(m, "HEAPU8");
            b.push(r);
            e.push(m.byteLength);
          }
          b = t(b, "HEAPU32");
          e = t(e, "HEAPU32");
          c = a.FontMgr._fromData(b, e, c.length);
          a._free(b);
          a._free(e);
          return c;
        };
        a.Typeface.MakeFreeTypeFaceFromData = function (c) {
          c = new Uint8Array(c);
          var b = t(c, "HEAPU8");
          return (c = a.Typeface._MakeFreeTypeFaceFromData(b, c.byteLength)) ? c : null;
        };
        a.Typeface.prototype.getGlyphIDs = function (c, b, e) {
          b || (b = c.length);
          var h = da(c) + 1,
            m = a._malloc(h);
          fa(c, ia, m, h);
          c = a._malloc(2 * b);
          b = this._getGlyphIDs(m, h - 1, b, c);
          a._free(m);
          if (0 > b) return a._free(c), null;
          m = new Uint16Array(a.HEAPU8.buffer, c, b);
          if (e) return e.set(m), a._free(c), e;
          e = Uint16Array.from(m);
          a._free(c);
          return e;
        };
        a.TextBlob.MakeOnPath = function (c, b, e, h) {
          if (c && c.length && b && b.countPoints()) {
            if (1 === b.countPoints()) return this.MakeFromText(c, e);
            h || (h = 0);
            var m = e.getGlyphIDs(c);
            m = e.getGlyphWidths(m);
            var r = [];
            b = new a.ContourMeasureIter(b, !1, 1);
            for (var A = b.next(), G = new Float32Array(4), M = 0; M < c.length && A; M++) {
              var L = m[M];
              h += L / 2;
              if (h > A.length()) {
                A.delete();
                A = b.next();
                if (!A) {
                  c = c.substring(0, M);
                  break;
                }
                h = L / 2;
              }
              A.getPosTan(h, G);
              var T = G[2],
                S = G[3];
              r.push(T, S, G[0] - (L / 2) * T, G[1] - (L / 2) * S);
              h += L / 2;
            }
            c = this.MakeFromRSXform(c, r, e);
            A && A.delete();
            b.delete();
            return c;
          }
        };
        a.TextBlob.MakeFromRSXform = function (c, b, e) {
          var h = da(c) + 1,
            m = a._malloc(h);
          fa(c, ia, m, h);
          c = t(b, "HEAPF32");
          e = a.TextBlob._MakeFromRSXform(m, h - 1, c, e);
          a._free(m);
          return e ? e : null;
        };
        a.TextBlob.MakeFromRSXformGlyphs = function (c, b, e) {
          var h = t(c, "HEAPU16");
          b = t(b, "HEAPF32");
          e = a.TextBlob._MakeFromRSXformGlyphs(h, 2 * c.length, b, e);
          x(h, c);
          return e ? e : null;
        };
        a.TextBlob.MakeFromGlyphs = function (c, b) {
          var e = t(c, "HEAPU16");
          b = a.TextBlob._MakeFromGlyphs(e, 2 * c.length, b);
          x(e, c);
          return b ? b : null;
        };
        a.TextBlob.MakeFromText = function (c, b) {
          var e = da(c) + 1,
            h = a._malloc(e);
          fa(c, ia, h, e);
          c = a.TextBlob._MakeFromText(h, e - 1, b);
          a._free(h);
          return c ? c : null;
        };
        a.MallocGlyphIDs = function (c) {
          return a.Malloc(Uint16Array, c);
        };
      });
      a.ib = a.ib || [];
      a.ib.push(function () {
        a.MakePicture = function (c) {
          c = new Uint8Array(c);
          var b = a._malloc(c.byteLength);
          a.HEAPU8.set(c, b);
          return (c = a._MakePicture(b, c.byteLength)) ? c : null;
        };
      });
      a.ib = a.ib || [];
      a.ib.push(function () {
        a.RuntimeEffect.Make = function (c, b) {
          return a.RuntimeEffect._Make(c, {
            onError:
              b ||
              function (e) {
                console.log("RuntimeEffect error", e);
              },
          });
        };
        a.RuntimeEffect.MakeForBlender = function (c, b) {
          return a.RuntimeEffect._MakeForBlender(c, {
            onError:
              b ||
              function (e) {
                console.log("RuntimeEffect error", e);
              },
          });
        };
        a.RuntimeEffect.prototype.makeShader = function (c, b) {
          var e = !c._ck,
            h = t(c, "HEAPF32");
          b = H(b);
          return this._makeShader(h, 4 * c.length, e, b);
        };
        a.RuntimeEffect.prototype.makeShaderWithChildren = function (c, b, e) {
          var h = !c._ck,
            m = t(c, "HEAPF32");
          e = H(e);
          for (var r = [], A = 0; A < b.length; A++) r.push(b[A].bb.kb);
          b = t(r, "HEAPU32");
          return this._makeShaderWithChildren(m, 4 * c.length, h, b, r.length, e);
        };
        a.RuntimeEffect.prototype.makeBlender = function (c) {
          var b = !c._ck,
            e = t(c, "HEAPF32");
          return this._makeBlender(e, 4 * c.length, b);
        };
      });
      (function () {
        function c(E) {
          for (var g = 0; g < E.length; g++) if (void 0 !== E[g] && !Number.isFinite(E[g])) return !1;
          return !0;
        }
        function b(E) {
          var g = a.getColorComponents(E);
          E = g[0];
          var l = g[1],
            v = g[2];
          g = g[3];
          if (1 === g)
            return (
              (E = E.toString(16).toLowerCase()),
              (l = l.toString(16).toLowerCase()),
              (v = v.toString(16).toLowerCase()),
              (E = 1 === E.length ? "0" + E : E),
              (l = 1 === l.length ? "0" + l : l),
              (v = 1 === v.length ? "0" + v : v),
              "#" + E + l + v
            );
          g = 0 === g || 1 === g ? g : g.toFixed(8);
          return "rgba(" + E + ", " + l + ", " + v + ", " + g + ")";
        }
        function e(E) {
          return a.parseColorString(E, pa);
        }
        function h(E) {
          E = qa.exec(E);
          if (!E) return null;
          var g = parseFloat(E[4]),
            l = 16;
          switch (E[5]) {
            case "em":
            case "rem":
              l = 16 * g;
              break;
            case "pt":
              l = (4 * g) / 3;
              break;
            case "px":
              l = g;
              break;
            case "pc":
              l = 16 * g;
              break;
            case "in":
              l = 96 * g;
              break;
            case "cm":
              l = (96 * g) / 2.54;
              break;
            case "mm":
              l = (96 / 25.4) * g;
              break;
            case "q":
              l = (96 / 25.4 / 4) * g;
              break;
            case "%":
              l = (16 / 75) * g;
          }
          return { style: E[1], variant: E[2], weight: E[3], sizePx: l, family: E[6].trim() };
        }
        function m(E) {
          this.cb = E;
          this.fb = new a.Paint();
          this.fb.setAntiAlias(!0);
          this.fb.setStrokeMiter(10);
          this.fb.setStrokeCap(a.StrokeCap.Butt);
          this.fb.setStrokeJoin(a.StrokeJoin.Miter);
          this.ec = "10px monospace";
          this.Eb = new a.Font(null, 10);
          this.Eb.setSubpixel(!0);
          this.sb = this.xb = a.BLACK;
          this.Nb = 0;
          this.Zb = a.TRANSPARENT;
          this.Pb = this.Ob = 0;
          this.$b = this.zb = 1;
          this.Yb = 0;
          this.Mb = [];
          this.eb = a.BlendMode.SrcOver;
          this.fb.setStrokeWidth(this.$b);
          this.fb.setBlendMode(this.eb);
          this.hb = new a.Path();
          this.jb = a.Matrix.identity();
          this.uc = [];
          this.Tb = [];
          this.Db = function () {
            this.hb.delete();
            this.fb.delete();
            this.Eb.delete();
            this.Tb.forEach(function (g) {
              g.Db();
            });
          };
          Object.defineProperty(this, "currentTransform", {
            enumerable: !0,
            get: function () {
              return { a: this.jb[0], c: this.jb[1], e: this.jb[2], b: this.jb[3], d: this.jb[4], f: this.jb[5] };
            },
            set: function (g) {
              g.a && this.setTransform(g.a, g.b, g.c, g.d, g.e, g.f);
            },
          });
          Object.defineProperty(this, "fillStyle", {
            enumerable: !0,
            get: function () {
              return k(this.sb) ? b(this.sb) : this.sb;
            },
            set: function (g) {
              "string" === typeof g ? (this.sb = e(g)) : g.Lb && (this.sb = g);
            },
          });
          Object.defineProperty(this, "font", {
            enumerable: !0,
            get: function () {
              return this.ec;
            },
            set: function (g) {
              var l = h(g),
                v = l.family;
              l.typeface = la[v] ? la[v][(l.style || "normal") + "|" + (l.variant || "normal") + "|" + (l.weight || "normal")] || la[v]["*"] : null;
              l && (this.Eb.setSize(l.sizePx), this.Eb.setTypeface(l.typeface), (this.ec = g));
            },
          });
          Object.defineProperty(this, "globalAlpha", {
            enumerable: !0,
            get: function () {
              return this.zb;
            },
            set: function (g) {
              !isFinite(g) || 0 > g || 1 < g || (this.zb = g);
            },
          });
          Object.defineProperty(this, "globalCompositeOperation", {
            enumerable: !0,
            get: function () {
              switch (this.eb) {
                case a.BlendMode.SrcOver:
                  return "source-over";
                case a.BlendMode.DstOver:
                  return "destination-over";
                case a.BlendMode.Src:
                  return "copy";
                case a.BlendMode.Dst:
                  return "destination";
                case a.BlendMode.Clear:
                  return "clear";
                case a.BlendMode.SrcIn:
                  return "source-in";
                case a.BlendMode.DstIn:
                  return "destination-in";
                case a.BlendMode.SrcOut:
                  return "source-out";
                case a.BlendMode.DstOut:
                  return "destination-out";
                case a.BlendMode.SrcATop:
                  return "source-atop";
                case a.BlendMode.DstATop:
                  return "destination-atop";
                case a.BlendMode.Xor:
                  return "xor";
                case a.BlendMode.Plus:
                  return "lighter";
                case a.BlendMode.Multiply:
                  return "multiply";
                case a.BlendMode.Screen:
                  return "screen";
                case a.BlendMode.Overlay:
                  return "overlay";
                case a.BlendMode.Darken:
                  return "darken";
                case a.BlendMode.Lighten:
                  return "lighten";
                case a.BlendMode.ColorDodge:
                  return "color-dodge";
                case a.BlendMode.ColorBurn:
                  return "color-burn";
                case a.BlendMode.HardLight:
                  return "hard-light";
                case a.BlendMode.SoftLight:
                  return "soft-light";
                case a.BlendMode.Difference:
                  return "difference";
                case a.BlendMode.Exclusion:
                  return "exclusion";
                case a.BlendMode.Hue:
                  return "hue";
                case a.BlendMode.Saturation:
                  return "saturation";
                case a.BlendMode.Color:
                  return "color";
                case a.BlendMode.Luminosity:
                  return "luminosity";
              }
            },
            set: function (g) {
              switch (g) {
                case "source-over":
                  this.eb = a.BlendMode.SrcOver;
                  break;
                case "destination-over":
                  this.eb = a.BlendMode.DstOver;
                  break;
                case "copy":
                  this.eb = a.BlendMode.Src;
                  break;
                case "destination":
                  this.eb = a.BlendMode.Dst;
                  break;
                case "clear":
                  this.eb = a.BlendMode.Clear;
                  break;
                case "source-in":
                  this.eb = a.BlendMode.SrcIn;
                  break;
                case "destination-in":
                  this.eb = a.BlendMode.DstIn;
                  break;
                case "source-out":
                  this.eb = a.BlendMode.SrcOut;
                  break;
                case "destination-out":
                  this.eb = a.BlendMode.DstOut;
                  break;
                case "source-atop":
                  this.eb = a.BlendMode.SrcATop;
                  break;
                case "destination-atop":
                  this.eb = a.BlendMode.DstATop;
                  break;
                case "xor":
                  this.eb = a.BlendMode.Xor;
                  break;
                case "lighter":
                  this.eb = a.BlendMode.Plus;
                  break;
                case "plus-lighter":
                  this.eb = a.BlendMode.Plus;
                  break;
                case "plus-darker":
                  throw "plus-darker is not supported";
                case "multiply":
                  this.eb = a.BlendMode.Multiply;
                  break;
                case "screen":
                  this.eb = a.BlendMode.Screen;
                  break;
                case "overlay":
                  this.eb = a.BlendMode.Overlay;
                  break;
                case "darken":
                  this.eb = a.BlendMode.Darken;
                  break;
                case "lighten":
                  this.eb = a.BlendMode.Lighten;
                  break;
                case "color-dodge":
                  this.eb = a.BlendMode.ColorDodge;
                  break;
                case "color-burn":
                  this.eb = a.BlendMode.ColorBurn;
                  break;
                case "hard-light":
                  this.eb = a.BlendMode.HardLight;
                  break;
                case "soft-light":
                  this.eb = a.BlendMode.SoftLight;
                  break;
                case "difference":
                  this.eb = a.BlendMode.Difference;
                  break;
                case "exclusion":
                  this.eb = a.BlendMode.Exclusion;
                  break;
                case "hue":
                  this.eb = a.BlendMode.Hue;
                  break;
                case "saturation":
                  this.eb = a.BlendMode.Saturation;
                  break;
                case "color":
                  this.eb = a.BlendMode.Color;
                  break;
                case "luminosity":
                  this.eb = a.BlendMode.Luminosity;
                  break;
                default:
                  return;
              }
              this.fb.setBlendMode(this.eb);
            },
          });
          Object.defineProperty(this, "imageSmoothingEnabled", {
            enumerable: !0,
            get: function () {
              return !0;
            },
            set: function () {},
          });
          Object.defineProperty(this, "imageSmoothingQuality", {
            enumerable: !0,
            get: function () {
              return "high";
            },
            set: function () {},
          });
          Object.defineProperty(this, "lineCap", {
            enumerable: !0,
            get: function () {
              switch (this.fb.getStrokeCap()) {
                case a.StrokeCap.Butt:
                  return "butt";
                case a.StrokeCap.Round:
                  return "round";
                case a.StrokeCap.Square:
                  return "square";
              }
            },
            set: function (g) {
              switch (g) {
                case "butt":
                  this.fb.setStrokeCap(a.StrokeCap.Butt);
                  break;
                case "round":
                  this.fb.setStrokeCap(a.StrokeCap.Round);
                  break;
                case "square":
                  this.fb.setStrokeCap(a.StrokeCap.Square);
              }
            },
          });
          Object.defineProperty(this, "lineDashOffset", {
            enumerable: !0,
            get: function () {
              return this.Yb;
            },
            set: function (g) {
              isFinite(g) && (this.Yb = g);
            },
          });
          Object.defineProperty(this, "lineJoin", {
            enumerable: !0,
            get: function () {
              switch (this.fb.getStrokeJoin()) {
                case a.StrokeJoin.Miter:
                  return "miter";
                case a.StrokeJoin.Round:
                  return "round";
                case a.StrokeJoin.Bevel:
                  return "bevel";
              }
            },
            set: function (g) {
              switch (g) {
                case "miter":
                  this.fb.setStrokeJoin(a.StrokeJoin.Miter);
                  break;
                case "round":
                  this.fb.setStrokeJoin(a.StrokeJoin.Round);
                  break;
                case "bevel":
                  this.fb.setStrokeJoin(a.StrokeJoin.Bevel);
              }
            },
          });
          Object.defineProperty(this, "lineWidth", {
            enumerable: !0,
            get: function () {
              return this.fb.getStrokeWidth();
            },
            set: function (g) {
              0 >= g || !g || ((this.$b = g), this.fb.setStrokeWidth(g));
            },
          });
          Object.defineProperty(this, "miterLimit", {
            enumerable: !0,
            get: function () {
              return this.fb.getStrokeMiter();
            },
            set: function (g) {
              0 >= g || !g || this.fb.setStrokeMiter(g);
            },
          });
          Object.defineProperty(this, "shadowBlur", {
            enumerable: !0,
            get: function () {
              return this.Nb;
            },
            set: function (g) {
              0 > g || !isFinite(g) || (this.Nb = g);
            },
          });
          Object.defineProperty(this, "shadowColor", {
            enumerable: !0,
            get: function () {
              return b(this.Zb);
            },
            set: function (g) {
              this.Zb = e(g);
            },
          });
          Object.defineProperty(this, "shadowOffsetX", {
            enumerable: !0,
            get: function () {
              return this.Ob;
            },
            set: function (g) {
              isFinite(g) && (this.Ob = g);
            },
          });
          Object.defineProperty(this, "shadowOffsetY", {
            enumerable: !0,
            get: function () {
              return this.Pb;
            },
            set: function (g) {
              isFinite(g) && (this.Pb = g);
            },
          });
          Object.defineProperty(this, "strokeStyle", {
            enumerable: !0,
            get: function () {
              return b(this.xb);
            },
            set: function (g) {
              "string" === typeof g ? (this.xb = e(g)) : g.Lb && (this.xb = g);
            },
          });
          this.arc = function (g, l, v, B, D, F) {
            n(this.hb, g, l, v, v, 0, B, D, F);
          };
          this.arcTo = function (g, l, v, B, D) {
            L(this.hb, g, l, v, B, D);
          };
          this.beginPath = function () {
            this.hb.delete();
            this.hb = new a.Path();
          };
          this.bezierCurveTo = function (g, l, v, B, D, F) {
            var J = this.hb;
            c([g, l, v, B, D, F]) && (J.isEmpty() && J.moveTo(g, l), J.cubicTo(g, l, v, B, D, F));
          };
          this.clearRect = function (g, l, v, B) {
            this.fb.setStyle(a.PaintStyle.Fill);
            this.fb.setBlendMode(a.BlendMode.Clear);
            this.cb.drawRect(a.XYWHRect(g, l, v, B), this.fb);
            this.fb.setBlendMode(this.eb);
          };
          this.clip = function (g, l) {
            "string" === typeof g ? ((l = g), (g = this.hb)) : g && g.lc && (g = g.lb);
            g || (g = this.hb);
            g = g.copy();
            l && "evenodd" === l.toLowerCase() ? g.setFillType(a.FillType.EvenOdd) : g.setFillType(a.FillType.Winding);
            this.cb.clipPath(g, a.ClipOp.Intersect, !0);
            g.delete();
          };
          this.closePath = function () {
            T(this.hb);
          };
          this.createImageData = function () {
            if (1 === arguments.length) {
              var g = arguments[0];
              return new G(new Uint8ClampedArray(4 * g.width * g.height), g.width, g.height);
            }
            if (2 === arguments.length) {
              g = arguments[0];
              var l = arguments[1];
              return new G(new Uint8ClampedArray(4 * g * l), g, l);
            }
            throw "createImageData expects 1 or 2 arguments, got " + arguments.length;
          };
          this.createLinearGradient = function (g, l, v, B) {
            if (c(arguments)) {
              var D = new M(g, l, v, B);
              this.Tb.push(D);
              return D;
            }
          };
          this.createPattern = function (g, l) {
            g = new X(g, l);
            this.Tb.push(g);
            return g;
          };
          this.createRadialGradient = function (g, l, v, B, D, F) {
            if (c(arguments)) {
              var J = new ea(g, l, v, B, D, F);
              this.Tb.push(J);
              return J;
            }
          };
          this.drawImage = function (g) {
            g instanceof A && (g = g.Ac());
            var l = this.dc();
            if (3 === arguments.length || 5 === arguments.length)
              var v = a.XYWHRect(arguments[1], arguments[2], arguments[3] || g.width(), arguments[4] || g.height()),
                B = a.XYWHRect(0, 0, g.width(), g.height());
            else if (9 === arguments.length)
              (v = a.XYWHRect(arguments[5], arguments[6], arguments[7], arguments[8])),
                (B = a.XYWHRect(arguments[1], arguments[2], arguments[3], arguments[4]));
            else throw "invalid number of args for drawImage, need 3, 5, or 9; got " + arguments.length;
            this.cb.drawImageRect(g, B, v, l, !1);
            l.dispose();
          };
          this.ellipse = function (g, l, v, B, D, F, J, Z) {
            n(this.hb, g, l, v, B, D, F, J, Z);
          };
          this.dc = function () {
            var g = this.fb.copy();
            g.setStyle(a.PaintStyle.Fill);
            if (k(this.sb)) {
              var l = a.multiplyByAlpha(this.sb, this.zb);
              g.setColor(l);
            } else (l = this.sb.Lb(this.jb)), g.setColor(a.Color(0, 0, 0, this.zb)), g.setShader(l);
            g.dispose = function () {
              this.delete();
            };
            return g;
          };
          this.fill = function (g, l) {
            "string" === typeof g ? ((l = g), (g = this.hb)) : g && g.lc && (g = g.lb);
            if ("evenodd" === l) this.hb.setFillType(a.FillType.EvenOdd);
            else {
              if ("nonzero" !== l && l) throw "invalid fill rule";
              this.hb.setFillType(a.FillType.Winding);
            }
            g || (g = this.hb);
            l = this.dc();
            var v = this.Qb(l);
            v && (this.cb.save(), this.Jb(), this.cb.drawPath(g, v), this.cb.restore(), v.dispose());
            this.cb.drawPath(g, l);
            l.dispose();
          };
          this.fillRect = function (g, l, v, B) {
            var D = this.dc(),
              F = this.Qb(D);
            F && (this.cb.save(), this.Jb(), this.cb.drawRect(a.XYWHRect(g, l, v, B), F), this.cb.restore(), F.dispose());
            this.cb.drawRect(a.XYWHRect(g, l, v, B), D);
            D.dispose();
          };
          this.fillText = function (g, l, v) {
            var B = this.dc();
            g = a.TextBlob.MakeFromText(g, this.Eb);
            var D = this.Qb(B);
            D && (this.cb.save(), this.Jb(), this.cb.drawTextBlob(g, l, v, D), this.cb.restore(), D.dispose());
            this.cb.drawTextBlob(g, l, v, B);
            g.delete();
            B.dispose();
          };
          this.getImageData = function (g, l, v, B) {
            return (g = this.cb.readPixels(g, l, {
              width: v,
              height: B,
              colorType: a.ColorType.RGBA_8888,
              alphaType: a.AlphaType.Unpremul,
              colorSpace: a.ColorSpace.SRGB,
            }))
              ? new G(new Uint8ClampedArray(g.buffer), v, B)
              : null;
          };
          this.getLineDash = function () {
            return this.Mb.slice();
          };
          this.vc = function (g) {
            var l = a.Matrix.invert(this.jb);
            a.Matrix.mapPoints(l, g);
            return g;
          };
          this.isPointInPath = function (g, l, v) {
            var B = arguments;
            if (3 === B.length) var D = this.hb;
            else if (4 === B.length) (D = B[0]), (g = B[1]), (l = B[2]), (v = B[3]);
            else throw "invalid arg count, need 3 or 4, got " + B.length;
            if (!isFinite(g) || !isFinite(l)) return !1;
            v = v || "nonzero";
            if ("nonzero" !== v && "evenodd" !== v) return !1;
            B = this.vc([g, l]);
            g = B[0];
            l = B[1];
            D.setFillType("nonzero" === v ? a.FillType.Winding : a.FillType.EvenOdd);
            return D.contains(g, l);
          };
          this.isPointInStroke = function (g, l) {
            var v = arguments;
            if (2 === v.length) var B = this.hb;
            else if (3 === v.length) (B = v[0]), (g = v[1]), (l = v[2]);
            else throw "invalid arg count, need 2 or 3, got " + v.length;
            if (!isFinite(g) || !isFinite(l)) return !1;
            v = this.vc([g, l]);
            g = v[0];
            l = v[1];
            B = B.copy();
            B.setFillType(a.FillType.Winding);
            B.stroke({ width: this.lineWidth, miter_limit: this.miterLimit, cap: this.fb.getStrokeCap(), join: this.fb.getStrokeJoin(), precision: 0.3 });
            v = B.contains(g, l);
            B.delete();
            return v;
          };
          this.lineTo = function (g, l) {
            C(this.hb, g, l);
          };
          this.measureText = function (g) {
            g = this.Eb.getGlyphIDs(g);
            g = this.Eb.getGlyphWidths(g);
            let l = 0;
            for (const v of g) l += v;
            return { width: l };
          };
          this.moveTo = function (g, l) {
            var v = this.hb;
            c([g, l]) && v.moveTo(g, l);
          };
          this.putImageData = function (g, l, v, B, D, F, J) {
            if (c([l, v, B, D, F, J]))
              if (void 0 === B) this.cb.writePixels(g.data, g.width, g.height, l, v);
              else if (
                ((B = B || 0),
                (D = D || 0),
                (F = F || g.width),
                (J = J || g.height),
                0 > F && ((B += F), (F = Math.abs(F))),
                0 > J && ((D += J), (J = Math.abs(J))),
                0 > B && ((F += B), (B = 0)),
                0 > D && ((J += D), (D = 0)),
                !(0 >= F || 0 >= J))
              ) {
                g = a.MakeImage(
                  { width: g.width, height: g.height, alphaType: a.AlphaType.Unpremul, colorType: a.ColorType.RGBA_8888, colorSpace: a.ColorSpace.SRGB },
                  g.data,
                  4 * g.width
                );
                var Z = a.XYWHRect(B, D, F, J);
                l = a.XYWHRect(l + B, v + D, F, J);
                v = a.Matrix.invert(this.jb);
                this.cb.save();
                this.cb.concat(v);
                this.cb.drawImageRect(g, Z, l, null, !1);
                this.cb.restore();
                g.delete();
              }
          };
          this.quadraticCurveTo = function (g, l, v, B) {
            var D = this.hb;
            c([g, l, v, B]) && (D.isEmpty() && D.moveTo(g, l), D.quadTo(g, l, v, B));
          };
          this.rect = function (g, l, v, B) {
            var D = this.hb;
            g = a.XYWHRect(g, l, v, B);
            c(g) && D.addRect(g);
          };
          this.resetTransform = function () {
            this.hb.transform(this.jb);
            var g = a.Matrix.invert(this.jb);
            this.cb.concat(g);
            this.jb = this.cb.getTotalMatrix();
          };
          this.restore = function () {
            var g = this.uc.pop();
            if (g) {
              var l = a.Matrix.multiply(this.jb, a.Matrix.invert(g.Lc));
              this.hb.transform(l);
              this.fb.delete();
              this.fb = g.ad;
              this.Mb = g.Zc;
              this.$b = g.qd;
              this.xb = g.pd;
              this.sb = g.fs;
              this.Ob = g.nd;
              this.Pb = g.od;
              this.Nb = g.ed;
              this.Zb = g.md;
              this.zb = g.ga;
              this.eb = g.Rc;
              this.Yb = g.$c;
              this.ec = g.Qc;
              this.cb.restore();
              this.jb = this.cb.getTotalMatrix();
            }
          };
          this.rotate = function (g) {
            if (isFinite(g)) {
              var l = a.Matrix.rotated(-g);
              this.hb.transform(l);
              this.cb.rotate((g / Math.PI) * 180, 0, 0);
              this.jb = this.cb.getTotalMatrix();
            }
          };
          this.save = function () {
            if (this.sb.Kb) {
              var g = this.sb.Kb();
              this.Tb.push(g);
            } else g = this.sb;
            if (this.xb.Kb) {
              var l = this.xb.Kb();
              this.Tb.push(l);
            } else l = this.xb;
            this.uc.push({
              Lc: this.jb.slice(),
              Zc: this.Mb.slice(),
              qd: this.$b,
              pd: l,
              fs: g,
              nd: this.Ob,
              od: this.Pb,
              ed: this.Nb,
              md: this.Zb,
              ga: this.zb,
              $c: this.Yb,
              Rc: this.eb,
              ad: this.fb.copy(),
              Qc: this.ec,
            });
            this.cb.save();
          };
          this.scale = function (g, l) {
            if (c(arguments)) {
              var v = a.Matrix.scaled(1 / g, 1 / l);
              this.hb.transform(v);
              this.cb.scale(g, l);
              this.jb = this.cb.getTotalMatrix();
            }
          };
          this.setLineDash = function (g) {
            for (var l = 0; l < g.length; l++) if (!isFinite(g[l]) || 0 > g[l]) return;
            1 === g.length % 2 && Array.prototype.push.apply(g, g);
            this.Mb = g;
          };
          this.setTransform = function (g, l, v, B, D, F) {
            c(arguments) && (this.resetTransform(), this.transform(g, l, v, B, D, F));
          };
          this.Jb = function () {
            var g = a.Matrix.invert(this.jb);
            this.cb.concat(g);
            this.cb.concat(a.Matrix.translated(this.Ob, this.Pb));
            this.cb.concat(this.jb);
          };
          this.Qb = function (g) {
            var l = a.multiplyByAlpha(this.Zb, this.zb);
            if (!a.getColorComponents(l)[3] || !(this.Nb || this.Pb || this.Ob)) return null;
            g = g.copy();
            g.setColor(l);
            var v = a.MaskFilter.MakeBlur(a.BlurStyle.Normal, this.Nb / 2, !1);
            g.setMaskFilter(v);
            g.dispose = function () {
              v.delete();
              this.delete();
            };
            return g;
          };
          this.nc = function () {
            var g = this.fb.copy();
            g.setStyle(a.PaintStyle.Stroke);
            if (k(this.xb)) {
              var l = a.multiplyByAlpha(this.xb, this.zb);
              g.setColor(l);
            } else (l = this.xb.Lb(this.jb)), g.setColor(a.Color(0, 0, 0, this.zb)), g.setShader(l);
            g.setStrokeWidth(this.$b);
            if (this.Mb.length) {
              var v = a.PathEffect.MakeDash(this.Mb, this.Yb);
              g.setPathEffect(v);
            }
            g.dispose = function () {
              v && v.delete();
              this.delete();
            };
            return g;
          };
          this.stroke = function (g) {
            g = g ? g.lb : this.hb;
            var l = this.nc(),
              v = this.Qb(l);
            v && (this.cb.save(), this.Jb(), this.cb.drawPath(g, v), this.cb.restore(), v.dispose());
            this.cb.drawPath(g, l);
            l.dispose();
          };
          this.strokeRect = function (g, l, v, B) {
            var D = this.nc(),
              F = this.Qb(D);
            F && (this.cb.save(), this.Jb(), this.cb.drawRect(a.XYWHRect(g, l, v, B), F), this.cb.restore(), F.dispose());
            this.cb.drawRect(a.XYWHRect(g, l, v, B), D);
            D.dispose();
          };
          this.strokeText = function (g, l, v) {
            var B = this.nc();
            g = a.TextBlob.MakeFromText(g, this.Eb);
            var D = this.Qb(B);
            D && (this.cb.save(), this.Jb(), this.cb.drawTextBlob(g, l, v, D), this.cb.restore(), D.dispose());
            this.cb.drawTextBlob(g, l, v, B);
            g.delete();
            B.dispose();
          };
          this.translate = function (g, l) {
            if (c(arguments)) {
              var v = a.Matrix.translated(-g, -l);
              this.hb.transform(v);
              this.cb.translate(g, l);
              this.jb = this.cb.getTotalMatrix();
            }
          };
          this.transform = function (g, l, v, B, D, F) {
            g = [g, v, D, l, B, F, 0, 0, 1];
            l = a.Matrix.invert(g);
            this.hb.transform(l);
            this.cb.concat(g);
            this.jb = this.cb.getTotalMatrix();
          };
          this.addHitRegion = function () {};
          this.clearHitRegions = function () {};
          this.drawFocusIfNeeded = function () {};
          this.removeHitRegion = function () {};
          this.scrollPathIntoView = function () {};
          Object.defineProperty(this, "canvas", { value: null, writable: !1 });
        }
        function r(E) {
          this.oc = E;
          this.Cb = new m(E.getCanvas());
          this.fc = [];
          this.decodeImage = function (g) {
            g = a.MakeImageFromEncoded(g);
            if (!g) throw "Invalid input";
            this.fc.push(g);
            return new A(g);
          };
          this.loadFont = function (g, l) {
            g = a.Typeface.MakeFreeTypeFaceFromData(g);
            if (!g) return null;
            this.fc.push(g);
            var v = (l.style || "normal") + "|" + (l.variant || "normal") + "|" + (l.weight || "normal");
            l = l.family;
            la[l] || (la[l] = { "*": g });
            la[l][v] = g;
          };
          this.makePath2D = function (g) {
            g = new Q(g);
            this.fc.push(g.lb);
            return g;
          };
          this.getContext = function (g) {
            return "2d" === g ? this.Cb : null;
          };
          this.toDataURL = function (g, l) {
            this.oc.flush();
            var v = this.oc.makeImageSnapshot();
            if (v) {
              g = g || "image/png";
              var B = a.ImageFormat.PNG;
              "image/jpeg" === g && (B = a.ImageFormat.JPEG);
              if ((l = v.encodeToBytes(B, l || 0.92))) {
                v.delete();
                g = "data:" + g + ";base64,";
                if ("undefined" !== typeof Buffer) l = Buffer.from(l).toString("base64");
                else {
                  v = 0;
                  B = l.length;
                  for (var D = "", F; v < B; ) (F = l.slice(v, Math.min(v + 32768, B))), (D += String.fromCharCode.apply(null, F)), (v += 32768);
                  l = btoa(D);
                }
                return g + l;
              }
            }
          };
          this.dispose = function () {
            this.Cb.Db();
            this.fc.forEach(function (g) {
              g.delete();
            });
            this.oc.dispose();
          };
        }
        function A(E) {
          this.width = E.width();
          this.height = E.height();
          this.naturalWidth = this.width;
          this.naturalHeight = this.height;
          this.Ac = function () {
            return E;
          };
        }
        function G(E, g, l) {
          if (!g || 0 === l) throw "invalid dimensions, width and height must be non-zero";
          if (E.length % 4) throw "arr must be a multiple of 4";
          l = l || E.length / (4 * g);
          Object.defineProperty(this, "data", { value: E, writable: !1 });
          Object.defineProperty(this, "height", { value: l, writable: !1 });
          Object.defineProperty(this, "width", { value: g, writable: !1 });
        }
        function M(E, g, l, v) {
          this.nb = null;
          this.ub = [];
          this.pb = [];
          this.addColorStop = function (B, D) {
            if (0 > B || 1 < B || !isFinite(B)) throw "offset must be between 0 and 1 inclusively";
            D = e(D);
            var F = this.pb.indexOf(B);
            if (-1 !== F) this.ub[F] = D;
            else {
              for (F = 0; F < this.pb.length && !(this.pb[F] > B); F++);
              this.pb.splice(F, 0, B);
              this.ub.splice(F, 0, D);
            }
          };
          this.Kb = function () {
            var B = new M(E, g, l, v);
            B.ub = this.ub.slice();
            B.pb = this.pb.slice();
            return B;
          };
          this.Db = function () {
            this.nb && (this.nb.delete(), (this.nb = null));
          };
          this.Lb = function (B) {
            var D = [E, g, l, v];
            a.Matrix.mapPoints(B, D);
            B = D[0];
            var F = D[1],
              J = D[2];
            D = D[3];
            this.Db();
            return (this.nb = a.Shader.MakeLinearGradient([B, F], [J, D], this.ub, this.pb, a.TileMode.Clamp));
          };
        }
        function L(E, g, l, v, B, D) {
          if (c([g, l, v, B, D])) {
            if (0 > D) throw "radii cannot be negative";
            E.isEmpty() && E.moveTo(g, l);
            E.arcToTangent(g, l, v, B, D);
          }
        }
        function T(E) {
          if (!E.isEmpty()) {
            var g = E.getBounds();
            (g[3] - g[1] || g[2] - g[0]) && E.close();
          }
        }
        function S(E, g, l, v, B, D, F) {
          F = ((F - D) / Math.PI) * 180;
          D = (D / Math.PI) * 180;
          g = a.LTRBRect(g - v, l - B, g + v, l + B);
          1e-5 > Math.abs(Math.abs(F) - 360) ? ((l = F / 2), E.arcToOval(g, D, l, !1), E.arcToOval(g, D + l, l, !1)) : E.arcToOval(g, D, F, !1);
        }
        function n(E, g, l, v, B, D, F, J, Z) {
          if (c([g, l, v, B, D, F, J])) {
            if (0 > v || 0 > B) throw "radii cannot be negative";
            var aa = 2 * Math.PI,
              ya = F % aa;
            0 > ya && (ya += aa);
            var Ma = ya - F;
            F = ya;
            J += Ma;
            !Z && J - F >= aa
              ? (J = F + aa)
              : Z && F - J >= aa
              ? (J = F - aa)
              : !Z && F > J
              ? (J = F + (aa - ((F - J) % aa)))
              : Z && F < J && (J = F - (aa - ((J - F) % aa)));
            D
              ? ((Z = a.Matrix.rotated(D, g, l)), (D = a.Matrix.rotated(-D, g, l)), E.transform(D), S(E, g, l, v, B, F, J), E.transform(Z))
              : S(E, g, l, v, B, F, J);
          }
        }
        function C(E, g, l) {
          c([g, l]) && (E.isEmpty() && E.moveTo(g, l), E.lineTo(g, l));
        }
        function Q(E) {
          this.lb = null;
          this.lb = "string" === typeof E ? a.Path.MakeFromSVGString(E) : E && E.lc ? E.lb.copy() : new a.Path();
          this.lc = function () {
            return this.lb;
          };
          this.addPath = function (g, l) {
            l || (l = { a: 1, c: 0, e: 0, b: 0, d: 1, f: 0 });
            this.lb.addPath(g.lb, [l.a, l.c, l.e, l.b, l.d, l.f]);
          };
          this.arc = function (g, l, v, B, D, F) {
            n(this.lb, g, l, v, v, 0, B, D, F);
          };
          this.arcTo = function (g, l, v, B, D) {
            L(this.lb, g, l, v, B, D);
          };
          this.bezierCurveTo = function (g, l, v, B, D, F) {
            var J = this.lb;
            c([g, l, v, B, D, F]) && (J.isEmpty() && J.moveTo(g, l), J.cubicTo(g, l, v, B, D, F));
          };
          this.closePath = function () {
            T(this.lb);
          };
          this.ellipse = function (g, l, v, B, D, F, J, Z) {
            n(this.lb, g, l, v, B, D, F, J, Z);
          };
          this.lineTo = function (g, l) {
            C(this.lb, g, l);
          };
          this.moveTo = function (g, l) {
            var v = this.lb;
            c([g, l]) && v.moveTo(g, l);
          };
          this.quadraticCurveTo = function (g, l, v, B) {
            var D = this.lb;
            c([g, l, v, B]) && (D.isEmpty() && D.moveTo(g, l), D.quadTo(g, l, v, B));
          };
          this.rect = function (g, l, v, B) {
            var D = this.lb;
            g = a.XYWHRect(g, l, v, B);
            c(g) && D.addRect(g);
          };
        }
        function X(E, g) {
          this.nb = null;
          E instanceof A && (E = E.Ac());
          this.Fc = E;
          this._transform = a.Matrix.identity();
          "" === g && (g = "repeat");
          switch (g) {
            case "repeat-x":
              this.Rb = a.TileMode.Repeat;
              this.Sb = a.TileMode.Decal;
              break;
            case "repeat-y":
              this.Rb = a.TileMode.Decal;
              this.Sb = a.TileMode.Repeat;
              break;
            case "repeat":
              this.Sb = this.Rb = a.TileMode.Repeat;
              break;
            case "no-repeat":
              this.Sb = this.Rb = a.TileMode.Decal;
              break;
            default:
              throw "invalid repetition mode " + g;
          }
          this.setTransform = function (l) {
            l = [l.a, l.c, l.e, l.b, l.d, l.f, 0, 0, 1];
            c(l) && (this._transform = l);
          };
          this.Kb = function () {
            var l = new X();
            l.Rb = this.Rb;
            l.Sb = this.Sb;
            return l;
          };
          this.Db = function () {
            this.nb && (this.nb.delete(), (this.nb = null));
          };
          this.Lb = function () {
            this.Db();
            return (this.nb = this.Fc.makeShaderCubic(this.Rb, this.Sb, 1 / 3, 1 / 3, this._transform));
          };
        }
        function ea(E, g, l, v, B, D) {
          this.nb = null;
          this.ub = [];
          this.pb = [];
          this.addColorStop = function (F, J) {
            if (0 > F || 1 < F || !isFinite(F)) throw "offset must be between 0 and 1 inclusively";
            J = e(J);
            var Z = this.pb.indexOf(F);
            if (-1 !== Z) this.ub[Z] = J;
            else {
              for (Z = 0; Z < this.pb.length && !(this.pb[Z] > F); Z++);
              this.pb.splice(Z, 0, F);
              this.ub.splice(Z, 0, J);
            }
          };
          this.Kb = function () {
            var F = new ea(E, g, l, v, B, D);
            F.ub = this.ub.slice();
            F.pb = this.pb.slice();
            return F;
          };
          this.Db = function () {
            this.nb && (this.nb.delete(), (this.nb = null));
          };
          this.Lb = function (F) {
            var J = [E, g, v, B];
            a.Matrix.mapPoints(F, J);
            var Z = J[0],
              aa = J[1],
              ya = J[2];
            J = J[3];
            var Ma = (Math.abs(F[0]) + Math.abs(F[4])) / 2;
            F = l * Ma;
            Ma *= D;
            this.Db();
            return (this.nb = a.Shader.MakeTwoPointConicalGradient([Z, aa], F, [ya, J], Ma, this.ub, this.pb, a.TileMode.Clamp));
          };
        }
        a._testing = {};
        var pa = {
          aliceblue: Float32Array.of(0.941, 0.973, 1, 1),
          antiquewhite: Float32Array.of(0.98, 0.922, 0.843, 1),
          aqua: Float32Array.of(0, 1, 1, 1),
          aquamarine: Float32Array.of(0.498, 1, 0.831, 1),
          azure: Float32Array.of(0.941, 1, 1, 1),
          beige: Float32Array.of(0.961, 0.961, 0.863, 1),
          bisque: Float32Array.of(1, 0.894, 0.769, 1),
          black: Float32Array.of(0, 0, 0, 1),
          blanchedalmond: Float32Array.of(1, 0.922, 0.804, 1),
          blue: Float32Array.of(0, 0, 1, 1),
          blueviolet: Float32Array.of(0.541, 0.169, 0.886, 1),
          brown: Float32Array.of(0.647, 0.165, 0.165, 1),
          burlywood: Float32Array.of(0.871, 0.722, 0.529, 1),
          cadetblue: Float32Array.of(0.373, 0.62, 0.627, 1),
          chartreuse: Float32Array.of(0.498, 1, 0, 1),
          chocolate: Float32Array.of(0.824, 0.412, 0.118, 1),
          coral: Float32Array.of(1, 0.498, 0.314, 1),
          cornflowerblue: Float32Array.of(0.392, 0.584, 0.929, 1),
          cornsilk: Float32Array.of(1, 0.973, 0.863, 1),
          crimson: Float32Array.of(0.863, 0.078, 0.235, 1),
          cyan: Float32Array.of(0, 1, 1, 1),
          darkblue: Float32Array.of(0, 0, 0.545, 1),
          darkcyan: Float32Array.of(0, 0.545, 0.545, 1),
          darkgoldenrod: Float32Array.of(0.722, 0.525, 0.043, 1),
          darkgray: Float32Array.of(0.663, 0.663, 0.663, 1),
          darkgreen: Float32Array.of(0, 0.392, 0, 1),
          darkgrey: Float32Array.of(0.663, 0.663, 0.663, 1),
          darkkhaki: Float32Array.of(0.741, 0.718, 0.42, 1),
          darkmagenta: Float32Array.of(0.545, 0, 0.545, 1),
          darkolivegreen: Float32Array.of(0.333, 0.42, 0.184, 1),
          darkorange: Float32Array.of(1, 0.549, 0, 1),
          darkorchid: Float32Array.of(0.6, 0.196, 0.8, 1),
          darkred: Float32Array.of(0.545, 0, 0, 1),
          darksalmon: Float32Array.of(0.914, 0.588, 0.478, 1),
          darkseagreen: Float32Array.of(0.561, 0.737, 0.561, 1),
          darkslateblue: Float32Array.of(0.282, 0.239, 0.545, 1),
          darkslategray: Float32Array.of(0.184, 0.31, 0.31, 1),
          darkslategrey: Float32Array.of(0.184, 0.31, 0.31, 1),
          darkturquoise: Float32Array.of(0, 0.808, 0.82, 1),
          darkviolet: Float32Array.of(0.58, 0, 0.827, 1),
          deeppink: Float32Array.of(1, 0.078, 0.576, 1),
          deepskyblue: Float32Array.of(0, 0.749, 1, 1),
          dimgray: Float32Array.of(0.412, 0.412, 0.412, 1),
          dimgrey: Float32Array.of(0.412, 0.412, 0.412, 1),
          dodgerblue: Float32Array.of(0.118, 0.565, 1, 1),
          firebrick: Float32Array.of(0.698, 0.133, 0.133, 1),
          floralwhite: Float32Array.of(1, 0.98, 0.941, 1),
          forestgreen: Float32Array.of(0.133, 0.545, 0.133, 1),
          fuchsia: Float32Array.of(1, 0, 1, 1),
          gainsboro: Float32Array.of(0.863, 0.863, 0.863, 1),
          ghostwhite: Float32Array.of(0.973, 0.973, 1, 1),
          gold: Float32Array.of(1, 0.843, 0, 1),
          goldenrod: Float32Array.of(0.855, 0.647, 0.125, 1),
          gray: Float32Array.of(0.502, 0.502, 0.502, 1),
          green: Float32Array.of(0, 0.502, 0, 1),
          greenyellow: Float32Array.of(0.678, 1, 0.184, 1),
          grey: Float32Array.of(0.502, 0.502, 0.502, 1),
          honeydew: Float32Array.of(0.941, 1, 0.941, 1),
          hotpink: Float32Array.of(1, 0.412, 0.706, 1),
          indianred: Float32Array.of(0.804, 0.361, 0.361, 1),
          indigo: Float32Array.of(0.294, 0, 0.51, 1),
          ivory: Float32Array.of(1, 1, 0.941, 1),
          khaki: Float32Array.of(0.941, 0.902, 0.549, 1),
          lavender: Float32Array.of(0.902, 0.902, 0.98, 1),
          lavenderblush: Float32Array.of(1, 0.941, 0.961, 1),
          lawngreen: Float32Array.of(0.486, 0.988, 0, 1),
          lemonchiffon: Float32Array.of(1, 0.98, 0.804, 1),
          lightblue: Float32Array.of(0.678, 0.847, 0.902, 1),
          lightcoral: Float32Array.of(0.941, 0.502, 0.502, 1),
          lightcyan: Float32Array.of(0.878, 1, 1, 1),
          lightgoldenrodyellow: Float32Array.of(0.98, 0.98, 0.824, 1),
          lightgray: Float32Array.of(0.827, 0.827, 0.827, 1),
          lightgreen: Float32Array.of(0.565, 0.933, 0.565, 1),
          lightgrey: Float32Array.of(0.827, 0.827, 0.827, 1),
          lightpink: Float32Array.of(1, 0.714, 0.757, 1),
          lightsalmon: Float32Array.of(1, 0.627, 0.478, 1),
          lightseagreen: Float32Array.of(0.125, 0.698, 0.667, 1),
          lightskyblue: Float32Array.of(0.529, 0.808, 0.98, 1),
          lightslategray: Float32Array.of(0.467, 0.533, 0.6, 1),
          lightslategrey: Float32Array.of(0.467, 0.533, 0.6, 1),
          lightsteelblue: Float32Array.of(0.69, 0.769, 0.871, 1),
          lightyellow: Float32Array.of(1, 1, 0.878, 1),
          lime: Float32Array.of(0, 1, 0, 1),
          limegreen: Float32Array.of(0.196, 0.804, 0.196, 1),
          linen: Float32Array.of(0.98, 0.941, 0.902, 1),
          magenta: Float32Array.of(1, 0, 1, 1),
          maroon: Float32Array.of(0.502, 0, 0, 1),
          mediumaquamarine: Float32Array.of(0.4, 0.804, 0.667, 1),
          mediumblue: Float32Array.of(0, 0, 0.804, 1),
          mediumorchid: Float32Array.of(0.729, 0.333, 0.827, 1),
          mediumpurple: Float32Array.of(0.576, 0.439, 0.859, 1),
          mediumseagreen: Float32Array.of(0.235, 0.702, 0.443, 1),
          mediumslateblue: Float32Array.of(0.482, 0.408, 0.933, 1),
          mediumspringgreen: Float32Array.of(0, 0.98, 0.604, 1),
          mediumturquoise: Float32Array.of(0.282, 0.82, 0.8, 1),
          mediumvioletred: Float32Array.of(0.78, 0.082, 0.522, 1),
          midnightblue: Float32Array.of(0.098, 0.098, 0.439, 1),
          mintcream: Float32Array.of(0.961, 1, 0.98, 1),
          mistyrose: Float32Array.of(1, 0.894, 0.882, 1),
          moccasin: Float32Array.of(1, 0.894, 0.71, 1),
          navajowhite: Float32Array.of(1, 0.871, 0.678, 1),
          navy: Float32Array.of(0, 0, 0.502, 1),
          oldlace: Float32Array.of(0.992, 0.961, 0.902, 1),
          olive: Float32Array.of(0.502, 0.502, 0, 1),
          olivedrab: Float32Array.of(0.42, 0.557, 0.137, 1),
          orange: Float32Array.of(1, 0.647, 0, 1),
          orangered: Float32Array.of(1, 0.271, 0, 1),
          orchid: Float32Array.of(0.855, 0.439, 0.839, 1),
          palegoldenrod: Float32Array.of(0.933, 0.91, 0.667, 1),
          palegreen: Float32Array.of(0.596, 0.984, 0.596, 1),
          paleturquoise: Float32Array.of(0.686, 0.933, 0.933, 1),
          palevioletred: Float32Array.of(0.859, 0.439, 0.576, 1),
          papayawhip: Float32Array.of(1, 0.937, 0.835, 1),
          peachpuff: Float32Array.of(1, 0.855, 0.725, 1),
          peru: Float32Array.of(0.804, 0.522, 0.247, 1),
          pink: Float32Array.of(1, 0.753, 0.796, 1),
          plum: Float32Array.of(0.867, 0.627, 0.867, 1),
          powderblue: Float32Array.of(0.69, 0.878, 0.902, 1),
          purple: Float32Array.of(0.502, 0, 0.502, 1),
          rebeccapurple: Float32Array.of(0.4, 0.2, 0.6, 1),
          red: Float32Array.of(1, 0, 0, 1),
          rosybrown: Float32Array.of(0.737, 0.561, 0.561, 1),
          royalblue: Float32Array.of(0.255, 0.412, 0.882, 1),
          saddlebrown: Float32Array.of(0.545, 0.271, 0.075, 1),
          salmon: Float32Array.of(0.98, 0.502, 0.447, 1),
          sandybrown: Float32Array.of(0.957, 0.643, 0.376, 1),
          seagreen: Float32Array.of(0.18, 0.545, 0.341, 1),
          seashell: Float32Array.of(1, 0.961, 0.933, 1),
          sienna: Float32Array.of(0.627, 0.322, 0.176, 1),
          silver: Float32Array.of(0.753, 0.753, 0.753, 1),
          skyblue: Float32Array.of(0.529, 0.808, 0.922, 1),
          slateblue: Float32Array.of(0.416, 0.353, 0.804, 1),
          slategray: Float32Array.of(0.439, 0.502, 0.565, 1),
          slategrey: Float32Array.of(0.439, 0.502, 0.565, 1),
          snow: Float32Array.of(1, 0.98, 0.98, 1),
          springgreen: Float32Array.of(0, 1, 0.498, 1),
          steelblue: Float32Array.of(0.275, 0.51, 0.706, 1),
          tan: Float32Array.of(0.824, 0.706, 0.549, 1),
          teal: Float32Array.of(0, 0.502, 0.502, 1),
          thistle: Float32Array.of(0.847, 0.749, 0.847, 1),
          tomato: Float32Array.of(1, 0.388, 0.278, 1),
          transparent: Float32Array.of(0, 0, 0, 0),
          turquoise: Float32Array.of(0.251, 0.878, 0.816, 1),
          violet: Float32Array.of(0.933, 0.51, 0.933, 1),
          wheat: Float32Array.of(0.961, 0.871, 0.702, 1),
          white: Float32Array.of(1, 1, 1, 1),
          whitesmoke: Float32Array.of(0.961, 0.961, 0.961, 1),
          yellow: Float32Array.of(1, 1, 0, 1),
          yellowgreen: Float32Array.of(0.604, 0.804, 0.196, 1),
        };
        a._testing.parseColor = e;
        a._testing.colorToString = b;
        var qa = RegExp(
            "(italic|oblique|normal|)\\s*(small-caps|normal|)\\s*(bold|bolder|lighter|[1-9]00|normal|)\\s*([\\d\\.]+)(px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q)(.+)"
          ),
          la = { "Noto Mono": { "*": null }, monospace: { "*": null } };
        a._testing.parseFontString = h;
        a.MakeCanvas = function (E, g) {
          return (E = a.MakeSurface(E, g)) ? new r(E) : null;
        };
        a.ImageData = function () {
          if (2 === arguments.length) {
            var E = arguments[0],
              g = arguments[1];
            return new G(new Uint8ClampedArray(4 * E * g), E, g);
          }
          if (3 === arguments.length) {
            var l = arguments[0];
            if (l.prototype.constructor !== Uint8ClampedArray) throw "bytes must be given as a Uint8ClampedArray";
            E = arguments[1];
            g = arguments[2];
            if (l % 4) throw "bytes must be given in a multiple of 4";
            if (l % E) throw "bytes must divide evenly by width";
            if (g && g !== l / (4 * E)) throw "invalid height given";
            return new G(l, E, l / (4 * E));
          }
          throw "invalid number of arguments - takes 2 or 3, saw " + arguments.length;
        };
      })();
    })(z);
    var ja = Object.assign({}, z),
      ka = "./this.program",
      ma = (a, d) => {
        throw d;
      },
      ra = "object" == typeof window,
      sa = "function" == typeof importScripts,
      ta = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node,
      ua = "",
      va,
      wa,
      za;
    if (ta) {
      var fs = require("fs"),
        Aa = require("path");
      ua = sa ? Aa.dirname(ua) + "/" : __dirname + "/";
      va = (a, d) => {
        a = a.startsWith("file://") ? new URL(a) : Aa.normalize(a);
        return fs.readFileSync(a, d ? void 0 : "utf8");
      };
      za = (a) => {
        a = va(a, !0);
        a.buffer || (a = new Uint8Array(a));
        return a;
      };
      wa = (a, d, f, k = !0) => {
        a = a.startsWith("file://") ? new URL(a) : Aa.normalize(a);
        fs.readFile(a, k ? void 0 : "utf8", (p, q) => {
          p ? f(p) : d(k ? q.buffer : q);
        });
      };
      !z.thisProgram && 1 < process.argv.length && (ka = process.argv[1].replace(/\\/g, "/"));
      process.argv.slice(2);
      ma = (a, d) => {
        process.exitCode = a;
        throw d;
      };
      z.inspect = () => "[Emscripten Module object]";
    } else if (ra || sa)
      sa ? (ua = self.location.href) : "undefined" != typeof document && document.currentScript && (ua = document.currentScript.src),
        _scriptDir && (ua = _scriptDir),
        0 !== ua.indexOf("blob:") ? (ua = ua.substr(0, ua.replace(/[?#].*/, "").lastIndexOf("/") + 1)) : (ua = ""),
        (va = (a) => {
          var d = new XMLHttpRequest();
          d.open("GET", a, !1);
          d.send(null);
          return d.responseText;
        }),
        sa &&
          (za = (a) => {
            var d = new XMLHttpRequest();
            d.open("GET", a, !1);
            d.responseType = "arraybuffer";
            d.send(null);
            return new Uint8Array(d.response);
          }),
        (wa = (a, d, f) => {
          var k = new XMLHttpRequest();
          k.open("GET", a, !0);
          k.responseType = "arraybuffer";
          k.onload = () => {
            200 == k.status || (0 == k.status && k.response) ? d(k.response) : f();
          };
          k.onerror = f;
          k.send(null);
        });
    var Ba = z.print || console.log.bind(console),
      Ea = z.printErr || console.error.bind(console);
    Object.assign(z, ja);
    ja = null;
    z.thisProgram && (ka = z.thisProgram);
    z.quit && (ma = z.quit);
    var Fa;
    z.wasmBinary && (Fa = z.wasmBinary);
    var noExitRuntime = z.noExitRuntime || !0;
    "object" != typeof WebAssembly && Ga("no native wasm support detected");
    var Ha,
      U,
      Ia = !1,
      Ja,
      ia,
      Na,
      Oa,
      V,
      Pa,
      Qa,
      Va;
    function Wa() {
      var a = Ha.buffer;
      z.HEAP8 = Ja = new Int8Array(a);
      z.HEAP16 = Na = new Int16Array(a);
      z.HEAP32 = V = new Int32Array(a);
      z.HEAPU8 = ia = new Uint8Array(a);
      z.HEAPU16 = Oa = new Uint16Array(a);
      z.HEAPU32 = Pa = new Uint32Array(a);
      z.HEAPF32 = Qa = new Float32Array(a);
      z.HEAPF64 = Va = new Float64Array(a);
    }
    var Xa,
      Ya = [],
      Za = [],
      $a = [];
    function ab() {
      var a = z.preRun.shift();
      Ya.unshift(a);
    }
    var bb = 0,
      cb = null,
      db = null;
    function Ga(a) {
      if (z.onAbort) z.onAbort(a);
      a = "Aborted(" + a + ")";
      Ea(a);
      Ia = !0;
      a = new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
      ca(a);
      throw a;
    }
    function eb(a) {
      return a.startsWith("data:application/octet-stream;base64,");
    }
    var fb;
    fb = "canvaskit.wasm";
    if (!eb(fb)) {
      var hb = fb;
      fb = z.locateFile ? z.locateFile(hb, ua) : ua + hb;
    }
    function ib(a) {
      if (a == fb && Fa) return new Uint8Array(Fa);
      if (za) return za(a);
      throw "both async and sync fetching of the wasm failed";
    }
    function jb(a) {
      if (!Fa && (ra || sa)) {
        if ("function" == typeof fetch && !a.startsWith("file://"))
          return fetch(a, { credentials: "same-origin" })
            .then((d) => {
              if (!d.ok) throw "failed to load wasm binary file at '" + a + "'";
              return d.arrayBuffer();
            })
            .catch(() => ib(a));
        if (wa)
          return new Promise((d, f) => {
            wa(a, (k) => d(new Uint8Array(k)), f);
          });
      }
      return Promise.resolve().then(() => ib(a));
    }
    function kb(a, d, f) {
      return jb(a)
        .then((k) => WebAssembly.instantiate(k, d))
        .then((k) => k)
        .then(f, (k) => {
          Ea("failed to asynchronously prepare wasm: " + k);
          Ga(k);
        });
    }
    function lb(a, d) {
      var f = fb;
      return Fa || "function" != typeof WebAssembly.instantiateStreaming || eb(f) || f.startsWith("file://") || ta || "function" != typeof fetch
        ? kb(f, a, d)
        : fetch(f, { credentials: "same-origin" }).then((k) =>
            WebAssembly.instantiateStreaming(k, a).then(d, function (p) {
              Ea("wasm streaming compile failed: " + p);
              Ea("falling back to ArrayBuffer instantiation");
              return kb(f, a, d);
            })
          );
    }
    function mb(a) {
      this.name = "ExitStatus";
      this.message = `Program terminated with exit(${a})`;
      this.status = a;
    }
    var nb = (a) => {
        for (; 0 < a.length; ) a.shift()(z);
      },
      ob = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0,
      pb = (a, d, f) => {
        var k = d + f;
        for (f = d; a[f] && !(f >= k); ) ++f;
        if (16 < f - d && a.buffer && ob) return ob.decode(a.subarray(d, f));
        for (k = ""; d < f; ) {
          var p = a[d++];
          if (p & 128) {
            var q = a[d++] & 63;
            if (192 == (p & 224)) k += String.fromCharCode(((p & 31) << 6) | q);
            else {
              var y = a[d++] & 63;
              p = 224 == (p & 240) ? ((p & 15) << 12) | (q << 6) | y : ((p & 7) << 18) | (q << 12) | (y << 6) | (a[d++] & 63);
              65536 > p ? (k += String.fromCharCode(p)) : ((p -= 65536), (k += String.fromCharCode(55296 | (p >> 10), 56320 | (p & 1023))));
            }
          } else k += String.fromCharCode(p);
        }
        return k;
      },
      qb = {};
    function rb(a) {
      for (; a.length; ) {
        var d = a.pop();
        a.pop()(d);
      }
    }
    function sb(a) {
      return this.fromWireType(V[a >> 2]);
    }
    var tb = {},
      ub = {},
      vb = {},
      wb = void 0;
    function xb(a) {
      throw new wb(a);
    }
    function Eb(a, d, f) {
      function k(w) {
        w = f(w);
        w.length !== a.length && xb("Mismatched type converter count");
        for (var x = 0; x < a.length; ++x) Fb(a[x], w[x]);
      }
      a.forEach(function (w) {
        vb[w] = d;
      });
      var p = Array(d.length),
        q = [],
        y = 0;
      d.forEach((w, x) => {
        ub.hasOwnProperty(w)
          ? (p[x] = ub[w])
          : (q.push(w),
            tb.hasOwnProperty(w) || (tb[w] = []),
            tb[w].push(() => {
              p[x] = ub[w];
              ++y;
              y === q.length && k(p);
            }));
      });
      0 === q.length && k(p);
    }
    function Gb(a) {
      switch (a) {
        case 1:
          return 0;
        case 2:
          return 1;
        case 4:
          return 2;
        case 8:
          return 3;
        default:
          throw new TypeError(`Unknown type size: ${a}`);
      }
    }
    var Hb = void 0;
    function Ib(a) {
      for (var d = ""; ia[a]; ) d += Hb[ia[a++]];
      return d;
    }
    var Jb = void 0;
    function Y(a) {
      throw new Jb(a);
    }
    function Kb(a, d, f = {}) {
      var k = d.name;
      a || Y(`type "${k}" must have a positive integer typeid pointer`);
      if (ub.hasOwnProperty(a)) {
        if (f.Xc) return;
        Y(`Cannot register type '${k}' twice`);
      }
      ub[a] = d;
      delete vb[a];
      tb.hasOwnProperty(a) && ((d = tb[a]), delete tb[a], d.forEach((p) => p()));
    }
    function Fb(a, d, f = {}) {
      if (!("argPackAdvance" in d)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
      Kb(a, d, f);
    }
    function Lb(a) {
      Y(a.bb.mb.gb.name + " instance already deleted");
    }
    var Mb = !1;
    function Nb() {}
    function Ob(a) {
      --a.count.value;
      0 === a.count.value && (a.rb ? a.wb.Bb(a.rb) : a.mb.gb.Bb(a.kb));
    }
    function Pb(a, d, f) {
      if (d === f) return a;
      if (void 0 === f.qb) return null;
      a = Pb(a, d, f.qb);
      return null === a ? null : f.Nc(a);
    }
    var Qb = {},
      Rb = [];
    function Sb() {
      for (; Rb.length; ) {
        var a = Rb.pop();
        a.bb.Vb = !1;
        a["delete"]();
      }
    }
    var Tb = void 0,
      Ub = {};
    function Vb(a, d) {
      for (void 0 === d && Y("ptr should not be undefined"); a.qb; ) (d = a.bc(d)), (a = a.qb);
      return Ub[d];
    }
    function Wb(a, d) {
      (d.mb && d.kb) || xb("makeClassHandle requires ptr and ptrType");
      !!d.wb !== !!d.rb && xb("Both smartPtrType and smartPtr must be specified");
      d.count = { value: 1 };
      return Xb(Object.create(a, { bb: { value: d } }));
    }
    function Xb(a) {
      if ("undefined" === typeof FinalizationRegistry) return (Xb = (d) => d), a;
      Mb = new FinalizationRegistry((d) => {
        Ob(d.bb);
      });
      Xb = (d) => {
        var f = d.bb;
        f.rb && Mb.register(d, { bb: f }, d);
        return d;
      };
      Nb = (d) => {
        Mb.unregister(d);
      };
      return Xb(a);
    }
    function Yb() {}
    function dc(a) {
      if (void 0 === a) return "_unknown";
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var d = a.charCodeAt(0);
      return 48 <= d && 57 >= d ? `_${a}` : a;
    }
    function ec(a, d) {
      a = dc(a);
      return {
        [a]: function () {
          return d.apply(this, arguments);
        },
      }[a];
    }
    function fc(a, d, f) {
      if (void 0 === a[d].ob) {
        var k = a[d];
        a[d] = function () {
          a[d].ob.hasOwnProperty(arguments.length) ||
            Y(`Function '${f}' called with an invalid number of arguments (${arguments.length}) - expects one of (${a[d].ob})!`);
          return a[d].ob[arguments.length].apply(this, arguments);
        };
        a[d].ob = [];
        a[d].ob[k.Ub] = k;
      }
    }
    function gc(a, d, f) {
      z.hasOwnProperty(a)
        ? ((void 0 === f || (void 0 !== z[a].ob && void 0 !== z[a].ob[f])) && Y(`Cannot register public name '${a}' twice`),
          fc(z, a, a),
          z.hasOwnProperty(f) && Y(`Cannot register multiple overloads of a function with the same number of arguments (${f})!`),
          (z[a].ob[f] = d))
        : ((z[a] = d), void 0 !== f && (z[a].yd = f));
    }
    function hc(a, d, f, k, p, q, y, w) {
      this.name = a;
      this.constructor = d;
      this.Wb = f;
      this.Bb = k;
      this.qb = p;
      this.Sc = q;
      this.bc = y;
      this.Nc = w;
      this.cd = [];
    }
    function ic(a, d, f) {
      for (; d !== f; ) d.bc || Y(`Expected null or instance of ${f.name}, got an instance of ${d.name}`), (a = d.bc(a)), (d = d.qb);
      return a;
    }
    function jc(a, d) {
      if (null === d) return this.qc && Y(`null is not a valid ${this.name}`), 0;
      d.bb || Y(`Cannot pass "${kc(d)}" as a ${this.name}`);
      d.bb.kb || Y(`Cannot pass deleted object as a pointer of type ${this.name}`);
      return ic(d.bb.kb, d.bb.mb.gb, this.gb);
    }
    function lc(a, d) {
      if (null === d) {
        this.qc && Y(`null is not a valid ${this.name}`);
        if (this.ic) {
          var f = this.sc();
          null !== a && a.push(this.Bb, f);
          return f;
        }
        return 0;
      }
      d.bb || Y(`Cannot pass "${kc(d)}" as a ${this.name}`);
      d.bb.kb || Y(`Cannot pass deleted object as a pointer of type ${this.name}`);
      !this.hc && d.bb.mb.hc && Y(`Cannot convert argument of type ${d.bb.wb ? d.bb.wb.name : d.bb.mb.name} to parameter type ${this.name}`);
      f = ic(d.bb.kb, d.bb.mb.gb, this.gb);
      if (this.ic)
        switch ((void 0 === d.bb.rb && Y("Passing raw pointer to smart pointer is illegal"), this.ld)) {
          case 0:
            d.bb.wb === this ? (f = d.bb.rb) : Y(`Cannot convert argument of type ${d.bb.wb ? d.bb.wb.name : d.bb.mb.name} to parameter type ${this.name}`);
            break;
          case 1:
            f = d.bb.rb;
            break;
          case 2:
            if (d.bb.wb === this) f = d.bb.rb;
            else {
              var k = d.clone();
              f = this.dd(
                f,
                mc(function () {
                  k["delete"]();
                })
              );
              null !== a && a.push(this.Bb, f);
            }
            break;
          default:
            Y("Unsupporting sharing policy");
        }
      return f;
    }
    function nc(a, d) {
      if (null === d) return this.qc && Y(`null is not a valid ${this.name}`), 0;
      d.bb || Y(`Cannot pass "${kc(d)}" as a ${this.name}`);
      d.bb.kb || Y(`Cannot pass deleted object as a pointer of type ${this.name}`);
      d.bb.mb.hc && Y(`Cannot convert argument of type ${d.bb.mb.name} to parameter type ${this.name}`);
      return ic(d.bb.kb, d.bb.mb.gb, this.gb);
    }
    function oc(a, d, f, k, p, q, y, w, x, t, I) {
      this.name = a;
      this.gb = d;
      this.qc = f;
      this.hc = k;
      this.ic = p;
      this.bd = q;
      this.ld = y;
      this.Bc = w;
      this.sc = x;
      this.dd = t;
      this.Bb = I;
      p || void 0 !== d.qb ? (this.toWireType = lc) : ((this.toWireType = k ? jc : nc), (this.vb = null));
    }
    function pc(a, d, f) {
      z.hasOwnProperty(a) || xb("Replacing nonexistant public symbol");
      void 0 !== z[a].ob && void 0 !== f ? (z[a].ob[f] = d) : ((z[a] = d), (z[a].Ub = f));
    }
    var qc = (a, d) => {
      var f = [];
      return function () {
        f.length = 0;
        Object.assign(f, arguments);
        if (a.includes("j")) {
          var k = z["dynCall_" + a];
          k = f && f.length ? k.apply(null, [d].concat(f)) : k.call(null, d);
        } else k = Xa.get(d).apply(null, f);
        return k;
      };
    };
    function rc(a, d) {
      a = Ib(a);
      var f = a.includes("j") ? qc(a, d) : Xa.get(d);
      "function" != typeof f && Y(`unknown function pointer with signature ${a}: ${d}`);
      return f;
    }
    var sc = void 0;
    function tc(a) {
      a = uc(a);
      var d = Ib(a);
      vc(a);
      return d;
    }
    function wc(a, d) {
      function f(q) {
        p[q] || ub[q] || (vb[q] ? vb[q].forEach(f) : (k.push(q), (p[q] = !0)));
      }
      var k = [],
        p = {};
      d.forEach(f);
      throw new sc(`${a}: ` + k.map(tc).join([", "]));
    }
    function xc(a, d, f, k, p) {
      var q = d.length;
      2 > q && Y("argTypes array size mismatch! Must at least get return value and 'this' types!");
      var y = null !== d[1] && null !== f,
        w = !1;
      for (f = 1; f < d.length; ++f)
        if (null !== d[f] && void 0 === d[f].vb) {
          w = !0;
          break;
        }
      var x = "void" !== d[0].name,
        t = q - 2,
        I = Array(t),
        H = [],
        N = [];
      return function () {
        arguments.length !== t && Y(`function ${a} called with ${arguments.length} arguments, expected ${t} args!`);
        N.length = 0;
        H.length = y ? 2 : 1;
        H[0] = p;
        if (y) {
          var u = d[1].toWireType(N, this);
          H[1] = u;
        }
        for (var K = 0; K < t; ++K) (I[K] = d[K + 2].toWireType(N, arguments[K])), H.push(I[K]);
        K = k.apply(null, H);
        if (w) rb(N);
        else
          for (var P = y ? 1 : 2; P < d.length; P++) {
            var O = 1 === P ? u : I[P - 2];
            null !== d[P].vb && d[P].vb(O);
          }
        u = x ? d[0].fromWireType(K) : void 0;
        return u;
      };
    }
    function yc(a, d) {
      for (var f = [], k = 0; k < a; k++) f.push(Pa[(d + 4 * k) >> 2]);
      return f;
    }
    function zc() {
      this.Ab = [void 0];
      this.zc = [];
    }
    var Ac = new zc();
    function Bc(a) {
      a >= Ac.wc && 0 === --Ac.get(a).Cc && Ac.Oc(a);
    }
    var Cc = (a) => {
        a || Y("Cannot use deleted val. handle = " + a);
        return Ac.get(a).value;
      },
      mc = (a) => {
        switch (a) {
          case void 0:
            return 1;
          case null:
            return 2;
          case !0:
            return 3;
          case !1:
            return 4;
          default:
            return Ac.Jc({ Cc: 1, value: a });
        }
      };
    function Dc(a, d, f) {
      switch (d) {
        case 0:
          return function (k) {
            return this.fromWireType((f ? Ja : ia)[k]);
          };
        case 1:
          return function (k) {
            return this.fromWireType((f ? Na : Oa)[k >> 1]);
          };
        case 2:
          return function (k) {
            return this.fromWireType((f ? V : Pa)[k >> 2]);
          };
        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }
    function Ec(a, d) {
      var f = ub[a];
      void 0 === f && Y(d + " has unknown type " + tc(a));
      return f;
    }
    function kc(a) {
      if (null === a) return "null";
      var d = typeof a;
      return "object" === d || "array" === d || "function" === d ? a.toString() : "" + a;
    }
    function Fc(a, d) {
      switch (d) {
        case 2:
          return function (f) {
            return this.fromWireType(Qa[f >> 2]);
          };
        case 3:
          return function (f) {
            return this.fromWireType(Va[f >> 3]);
          };
        default:
          throw new TypeError("Unknown float type: " + a);
      }
    }
    function Gc(a, d, f) {
      switch (d) {
        case 0:
          return f
            ? function (k) {
                return Ja[k];
              }
            : function (k) {
                return ia[k];
              };
        case 1:
          return f
            ? function (k) {
                return Na[k >> 1];
              }
            : function (k) {
                return Oa[k >> 1];
              };
        case 2:
          return f
            ? function (k) {
                return V[k >> 2];
              }
            : function (k) {
                return Pa[k >> 2];
              };
        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }
    var fa = (a, d, f, k) => {
        if (0 < k) {
          k = f + k - 1;
          for (var p = 0; p < a.length; ++p) {
            var q = a.charCodeAt(p);
            if (55296 <= q && 57343 >= q) {
              var y = a.charCodeAt(++p);
              q = (65536 + ((q & 1023) << 10)) | (y & 1023);
            }
            if (127 >= q) {
              if (f >= k) break;
              d[f++] = q;
            } else {
              if (2047 >= q) {
                if (f + 1 >= k) break;
                d[f++] = 192 | (q >> 6);
              } else {
                if (65535 >= q) {
                  if (f + 2 >= k) break;
                  d[f++] = 224 | (q >> 12);
                } else {
                  if (f + 3 >= k) break;
                  d[f++] = 240 | (q >> 18);
                  d[f++] = 128 | ((q >> 12) & 63);
                }
                d[f++] = 128 | ((q >> 6) & 63);
              }
              d[f++] = 128 | (q & 63);
            }
          }
          d[f] = 0;
        }
      },
      da = (a) => {
        for (var d = 0, f = 0; f < a.length; ++f) {
          var k = a.charCodeAt(f);
          127 >= k ? d++ : 2047 >= k ? (d += 2) : 55296 <= k && 57343 >= k ? ((d += 4), ++f) : (d += 3);
        }
        return d;
      },
      Hc = "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0,
      Ic = (a, d) => {
        var f = a >> 1;
        for (var k = f + d / 2; !(f >= k) && Oa[f]; ) ++f;
        f <<= 1;
        if (32 < f - a && Hc) return Hc.decode(ia.subarray(a, f));
        f = "";
        for (k = 0; !(k >= d / 2); ++k) {
          var p = Na[(a + 2 * k) >> 1];
          if (0 == p) break;
          f += String.fromCharCode(p);
        }
        return f;
      },
      Jc = (a, d, f) => {
        void 0 === f && (f = 2147483647);
        if (2 > f) return 0;
        f -= 2;
        var k = d;
        f = f < 2 * a.length ? f / 2 : a.length;
        for (var p = 0; p < f; ++p) (Na[d >> 1] = a.charCodeAt(p)), (d += 2);
        Na[d >> 1] = 0;
        return d - k;
      },
      Kc = (a) => 2 * a.length,
      Lc = (a, d) => {
        for (var f = 0, k = ""; !(f >= d / 4); ) {
          var p = V[(a + 4 * f) >> 2];
          if (0 == p) break;
          ++f;
          65536 <= p ? ((p -= 65536), (k += String.fromCharCode(55296 | (p >> 10), 56320 | (p & 1023)))) : (k += String.fromCharCode(p));
        }
        return k;
      },
      Mc = (a, d, f) => {
        void 0 === f && (f = 2147483647);
        if (4 > f) return 0;
        var k = d;
        f = k + f - 4;
        for (var p = 0; p < a.length; ++p) {
          var q = a.charCodeAt(p);
          if (55296 <= q && 57343 >= q) {
            var y = a.charCodeAt(++p);
            q = (65536 + ((q & 1023) << 10)) | (y & 1023);
          }
          V[d >> 2] = q;
          d += 4;
          if (d + 4 > f) break;
        }
        V[d >> 2] = 0;
        return d - k;
      },
      Pc = (a) => {
        for (var d = 0, f = 0; f < a.length; ++f) {
          var k = a.charCodeAt(f);
          55296 <= k && 57343 >= k && ++f;
          d += 4;
        }
        return d;
      },
      Qc = {};
    function Rc(a) {
      var d = Qc[a];
      return void 0 === d ? Ib(a) : d;
    }
    var Sc = [];
    function Tc() {
      function a(d) {
        d.$$$embind_global$$$ = d;
        var f = "object" == typeof $$$embind_global$$$ && d.$$$embind_global$$$ == d;
        f || delete d.$$$embind_global$$$;
        return f;
      }
      if ("object" == typeof globalThis) return globalThis;
      if ("object" == typeof $$$embind_global$$$) return $$$embind_global$$$;
      "object" == typeof global && a(global) ? ($$$embind_global$$$ = global) : "object" == typeof self && a(self) && ($$$embind_global$$$ = self);
      if ("object" == typeof $$$embind_global$$$) return $$$embind_global$$$;
      throw Error("unable to get global object.");
    }
    function Uc(a) {
      var d = Sc.length;
      Sc.push(a);
      return d;
    }
    function Vc(a, d) {
      for (var f = Array(a), k = 0; k < a; ++k) f[k] = Ec(Pa[(d + 4 * k) >> 2], "parameter " + k);
      return f;
    }
    var Wc = [];
    function Xc(a) {
      var d = Array(a + 1);
      return function (f, k, p) {
        d[0] = f;
        for (var q = 0; q < a; ++q) {
          var y = Ec(Pa[(k + 4 * q) >> 2], "parameter " + q);
          d[q + 1] = y.readValueFromPointer(p);
          p += y.argPackAdvance;
        }
        f = new (f.bind.apply(f, d))();
        return mc(f);
      };
    }
    var Yc = {},
      $c = (a) => {
        var d = da(a) + 1,
          f = Zc(d);
        f && fa(a, ia, f, d);
        return f;
      },
      ad = {},
      cd = () => {
        if (!bd) {
          var a = {
              USER: "web_user",
              LOGNAME: "web_user",
              PATH: "/",
              PWD: "/",
              HOME: "/home/web_user",
              LANG: (("object" == typeof navigator && navigator.languages && navigator.languages[0]) || "C").replace("-", "_") + ".UTF-8",
              _: ka || "./this.program",
            },
            d;
          for (d in ad) void 0 === ad[d] ? delete a[d] : (a[d] = ad[d]);
          var f = [];
          for (d in a) f.push(`${d}=${a[d]}`);
          bd = f;
        }
        return bd;
      },
      bd,
      dd = [null, [], []],
      ed = (a) => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400),
      fd = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      gd = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function hd(a) {
      var d = Array(da(a) + 1);
      fa(a, d, 0, d.length);
      return d;
    }
    var jd = (a, d, f, k) => {
      function p(u, K, P) {
        for (u = "number" == typeof u ? u.toString() : u || ""; u.length < K; ) u = P[0] + u;
        return u;
      }
      function q(u, K) {
        return p(u, K, "0");
      }
      function y(u, K) {
        function P(oa) {
          return 0 > oa ? -1 : 0 < oa ? 1 : 0;
        }
        var O;
        0 === (O = P(u.getFullYear() - K.getFullYear())) && 0 === (O = P(u.getMonth() - K.getMonth())) && (O = P(u.getDate() - K.getDate()));
        return O;
      }
      function w(u) {
        switch (u.getDay()) {
          case 0:
            return new Date(u.getFullYear() - 1, 11, 29);
          case 1:
            return u;
          case 2:
            return new Date(u.getFullYear(), 0, 3);
          case 3:
            return new Date(u.getFullYear(), 0, 2);
          case 4:
            return new Date(u.getFullYear(), 0, 1);
          case 5:
            return new Date(u.getFullYear() - 1, 11, 31);
          case 6:
            return new Date(u.getFullYear() - 1, 11, 30);
        }
      }
      function x(u) {
        var K = u.Gb;
        for (u = new Date(new Date(u.Hb + 1900, 0, 1).getTime()); 0 < K; ) {
          var P = u.getMonth(),
            O = (ed(u.getFullYear()) ? fd : gd)[P];
          if (K > O - u.getDate()) (K -= O - u.getDate() + 1), u.setDate(1), 11 > P ? u.setMonth(P + 1) : (u.setMonth(0), u.setFullYear(u.getFullYear() + 1));
          else {
            u.setDate(u.getDate() + K);
            break;
          }
        }
        P = new Date(u.getFullYear() + 1, 0, 4);
        K = w(new Date(u.getFullYear(), 0, 4));
        P = w(P);
        return 0 >= y(K, u) ? (0 >= y(P, u) ? u.getFullYear() + 1 : u.getFullYear()) : u.getFullYear() - 1;
      }
      var t = V[(k + 40) >> 2];
      k = {
        td: V[k >> 2],
        sd: V[(k + 4) >> 2],
        jc: V[(k + 8) >> 2],
        tc: V[(k + 12) >> 2],
        kc: V[(k + 16) >> 2],
        Hb: V[(k + 20) >> 2],
        yb: V[(k + 24) >> 2],
        Gb: V[(k + 28) >> 2],
        zd: V[(k + 32) >> 2],
        rd: V[(k + 36) >> 2],
        ud: t ? (t ? pb(ia, t) : "") : "",
      };
      f = f ? pb(ia, f) : "";
      t = {
        "%c": "%a %b %d %H:%M:%S %Y",
        "%D": "%m/%d/%y",
        "%F": "%Y-%m-%d",
        "%h": "%b",
        "%r": "%I:%M:%S %p",
        "%R": "%H:%M",
        "%T": "%H:%M:%S",
        "%x": "%m/%d/%y",
        "%X": "%H:%M:%S",
        "%Ec": "%c",
        "%EC": "%C",
        "%Ex": "%m/%d/%y",
        "%EX": "%H:%M:%S",
        "%Ey": "%y",
        "%EY": "%Y",
        "%Od": "%d",
        "%Oe": "%e",
        "%OH": "%H",
        "%OI": "%I",
        "%Om": "%m",
        "%OM": "%M",
        "%OS": "%S",
        "%Ou": "%u",
        "%OU": "%U",
        "%OV": "%V",
        "%Ow": "%w",
        "%OW": "%W",
        "%Oy": "%y",
      };
      for (var I in t) f = f.replace(new RegExp(I, "g"), t[I]);
      var H = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
        N = "January February March April May June July August September October November December".split(" ");
      t = {
        "%a": (u) => H[u.yb].substring(0, 3),
        "%A": (u) => H[u.yb],
        "%b": (u) => N[u.kc].substring(0, 3),
        "%B": (u) => N[u.kc],
        "%C": (u) => q(((u.Hb + 1900) / 100) | 0, 2),
        "%d": (u) => q(u.tc, 2),
        "%e": (u) => p(u.tc, 2, " "),
        "%g": (u) => x(u).toString().substring(2),
        "%G": (u) => x(u),
        "%H": (u) => q(u.jc, 2),
        "%I": (u) => {
          u = u.jc;
          0 == u ? (u = 12) : 12 < u && (u -= 12);
          return q(u, 2);
        },
        "%j": (u) => {
          for (var K = 0, P = 0; P <= u.kc - 1; K += (ed(u.Hb + 1900) ? fd : gd)[P++]);
          return q(u.tc + K, 3);
        },
        "%m": (u) => q(u.kc + 1, 2),
        "%M": (u) => q(u.sd, 2),
        "%n": () => "\n",
        "%p": (u) => (0 <= u.jc && 12 > u.jc ? "AM" : "PM"),
        "%S": (u) => q(u.td, 2),
        "%t": () => "\t",
        "%u": (u) => u.yb || 7,
        "%U": (u) => q(Math.floor((u.Gb + 7 - u.yb) / 7), 2),
        "%V": (u) => {
          var K = Math.floor((u.Gb + 7 - ((u.yb + 6) % 7)) / 7);
          2 >= (u.yb + 371 - u.Gb - 2) % 7 && K++;
          if (K) 53 == K && ((P = (u.yb + 371 - u.Gb) % 7), 4 == P || (3 == P && ed(u.Hb)) || (K = 1));
          else {
            K = 52;
            var P = (u.yb + 7 - u.Gb - 1) % 7;
            (4 == P || (5 == P && ed((u.Hb % 400) - 1))) && K++;
          }
          return q(K, 2);
        },
        "%w": (u) => u.yb,
        "%W": (u) => q(Math.floor((u.Gb + 7 - ((u.yb + 6) % 7)) / 7), 2),
        "%y": (u) => (u.Hb + 1900).toString().substring(2),
        "%Y": (u) => u.Hb + 1900,
        "%z": (u) => {
          u = u.rd;
          var K = 0 <= u;
          u = Math.abs(u) / 60;
          return (K ? "+" : "-") + String("0000" + ((u / 60) * 100 + (u % 60))).slice(-4);
        },
        "%Z": (u) => u.ud,
        "%%": () => "%",
      };
      f = f.replace(/%%/g, "\x00\x00");
      for (I in t) f.includes(I) && (f = f.replace(new RegExp(I, "g"), t[I](k)));
      f = f.replace(/\0\0/g, "%");
      I = hd(f);
      if (I.length > d) return 0;
      Ja.set(I, a);
      return I.length - 1;
    };
    wb = z.InternalError = class extends Error {
      constructor(a) {
        super(a);
        this.name = "InternalError";
      }
    };
    for (var kd = Array(256), ld = 0; 256 > ld; ++ld) kd[ld] = String.fromCharCode(ld);
    Hb = kd;
    Jb = z.BindingError = class extends Error {
      constructor(a) {
        super(a);
        this.name = "BindingError";
      }
    };
    Yb.prototype.isAliasOf = function (a) {
      if (!(this instanceof Yb && a instanceof Yb)) return !1;
      var d = this.bb.mb.gb,
        f = this.bb.kb,
        k = a.bb.mb.gb;
      for (a = a.bb.kb; d.qb; ) (f = d.bc(f)), (d = d.qb);
      for (; k.qb; ) (a = k.bc(a)), (k = k.qb);
      return d === k && f === a;
    };
    Yb.prototype.clone = function () {
      this.bb.kb || Lb(this);
      if (this.bb.ac) return (this.bb.count.value += 1), this;
      var a = Xb,
        d = Object,
        f = d.create,
        k = Object.getPrototypeOf(this),
        p = this.bb;
      a = a(f.call(d, k, { bb: { value: { count: p.count, Vb: p.Vb, ac: p.ac, kb: p.kb, mb: p.mb, rb: p.rb, wb: p.wb } } }));
      a.bb.count.value += 1;
      a.bb.Vb = !1;
      return a;
    };
    Yb.prototype["delete"] = function () {
      this.bb.kb || Lb(this);
      this.bb.Vb && !this.bb.ac && Y("Object already scheduled for deletion");
      Nb(this);
      Ob(this.bb);
      this.bb.ac || ((this.bb.rb = void 0), (this.bb.kb = void 0));
    };
    Yb.prototype.isDeleted = function () {
      return !this.bb.kb;
    };
    Yb.prototype.deleteLater = function () {
      this.bb.kb || Lb(this);
      this.bb.Vb && !this.bb.ac && Y("Object already scheduled for deletion");
      Rb.push(this);
      1 === Rb.length && Tb && Tb(Sb);
      this.bb.Vb = !0;
      return this;
    };
    z.getInheritedInstanceCount = function () {
      return Object.keys(Ub).length;
    };
    z.getLiveInheritedInstances = function () {
      var a = [],
        d;
      for (d in Ub) Ub.hasOwnProperty(d) && a.push(Ub[d]);
      return a;
    };
    z.flushPendingDeletes = Sb;
    z.setDelayFunction = function (a) {
      Tb = a;
      Rb.length && Tb && Tb(Sb);
    };
    oc.prototype.Tc = function (a) {
      this.Bc && (a = this.Bc(a));
      return a;
    };
    oc.prototype.xc = function (a) {
      this.Bb && this.Bb(a);
    };
    oc.prototype.argPackAdvance = 8;
    oc.prototype.readValueFromPointer = sb;
    oc.prototype.deleteObject = function (a) {
      if (null !== a) a["delete"]();
    };
    oc.prototype.fromWireType = function (a) {
      function d() {
        return this.ic ? Wb(this.gb.Wb, { mb: this.bd, kb: f, wb: this, rb: a }) : Wb(this.gb.Wb, { mb: this, kb: a });
      }
      var f = this.Tc(a);
      if (!f) return this.xc(a), null;
      var k = Vb(this.gb, f);
      if (void 0 !== k) {
        if (0 === k.bb.count.value) return (k.bb.kb = f), (k.bb.rb = a), k.clone();
        k = k.clone();
        this.xc(a);
        return k;
      }
      k = this.gb.Sc(f);
      k = Qb[k];
      if (!k) return d.call(this);
      k = this.hc ? k.Kc : k.pointerType;
      var p = Pb(f, this.gb, k.gb);
      return null === p ? d.call(this) : this.ic ? Wb(k.gb.Wb, { mb: k, kb: p, wb: this, rb: a }) : Wb(k.gb.Wb, { mb: k, kb: p });
    };
    sc = z.UnboundTypeError = (function (a, d) {
      var f = ec(d, function (k) {
        this.name = d;
        this.message = k;
        k = Error(k).stack;
        void 0 !== k && (this.stack = this.toString() + "\n" + k.replace(/^Error(:[^\n]*)?\n/, ""));
      });
      f.prototype = Object.create(a.prototype);
      f.prototype.constructor = f;
      f.prototype.toString = function () {
        return void 0 === this.message ? this.name : `${this.name}: ${this.message}`;
      };
      return f;
    })(Error, "UnboundTypeError");
    Object.assign(zc.prototype, {
      get(a) {
        return this.Ab[a];
      },
      has(a) {
        return void 0 !== this.Ab[a];
      },
      Jc(a) {
        var d = this.zc.pop() || this.Ab.length;
        this.Ab[d] = a;
        return d;
      },
      Oc(a) {
        this.Ab[a] = void 0;
        this.zc.push(a);
      },
    });
    Ac.Ab.push({ value: void 0 }, { value: null }, { value: !0 }, { value: !1 });
    Ac.wc = Ac.Ab.length;
    z.count_emval_handles = function () {
      for (var a = 0, d = Ac.wc; d < Ac.Ab.length; ++d) void 0 !== Ac.Ab[d] && ++a;
      return a;
    };
    var Cd = {
      Q: function () {
        return 0;
      },
      ja: () => {},
      la: function () {
        return 0;
      },
      ga: () => {},
      ha: () => {},
      R: function () {},
      ia: () => {},
      E: function (a) {
        var d = qb[a];
        delete qb[a];
        var f = d.sc,
          k = d.Bb,
          p = d.yc,
          q = p.map((y) => y.Wc).concat(p.map((y) => y.jd));
        Eb([a], q, (y) => {
          var w = {};
          p.forEach((x, t) => {
            var I = y[t],
              H = x.Uc,
              N = x.Vc,
              u = y[t + p.length],
              K = x.hd,
              P = x.kd;
            w[x.Pc] = {
              read: (O) => I.fromWireType(H(N, O)),
              write: (O, oa) => {
                var ha = [];
                K(P, O, u.toWireType(ha, oa));
                rb(ha);
              },
            };
          });
          return [
            {
              name: d.name,
              fromWireType: function (x) {
                var t = {},
                  I;
                for (I in w) t[I] = w[I].read(x);
                k(x);
                return t;
              },
              toWireType: function (x, t) {
                for (var I in w) if (!(I in t)) throw new TypeError(`Missing field: "${I}"`);
                var H = f();
                for (I in w) w[I].write(H, t[I]);
                null !== x && x.push(k, H);
                return H;
              },
              argPackAdvance: 8,
              readValueFromPointer: sb,
              vb: k,
            },
          ];
        });
      },
      $: function () {},
      qa: function (a, d, f, k, p) {
        var q = Gb(f);
        d = Ib(d);
        Fb(a, {
          name: d,
          fromWireType: function (y) {
            return !!y;
          },
          toWireType: function (y, w) {
            return w ? k : p;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (y) {
            if (1 === f) var w = Ja;
            else if (2 === f) w = Na;
            else if (4 === f) w = V;
            else throw new TypeError("Unknown boolean type size: " + d);
            return this.fromWireType(w[y >> q]);
          },
          vb: null,
        });
      },
      p: function (a, d, f, k, p, q, y, w, x, t, I, H, N) {
        I = Ib(I);
        q = rc(p, q);
        w && (w = rc(y, w));
        t && (t = rc(x, t));
        N = rc(H, N);
        var u = dc(I);
        gc(u, function () {
          wc(`Cannot construct ${I} due to unbound types`, [k]);
        });
        Eb([a, d, f], k ? [k] : [], function (K) {
          K = K[0];
          if (k) {
            var P = K.gb;
            var O = P.Wb;
          } else O = Yb.prototype;
          K = ec(u, function () {
            if (Object.getPrototypeOf(this) !== oa) throw new Jb("Use 'new' to construct " + I);
            if (void 0 === ha.Fb) throw new Jb(I + " has no accessible constructor");
            var Sa = ha.Fb[arguments.length];
            if (void 0 === Sa)
              throw new Jb(
                `Tried to invoke ctor of ${I} with invalid number of parameters (${arguments.length}) - expected (${Object.keys(
                  ha.Fb
                ).toString()}) parameters instead!`
              );
            return Sa.apply(this, arguments);
          });
          var oa = Object.create(O, { constructor: { value: K } });
          K.prototype = oa;
          var ha = new hc(I, K, oa, N, P, q, w, t);
          ha.qb && (void 0 === ha.qb.cc && (ha.qb.cc = []), ha.qb.cc.push(ha));
          P = new oc(I, ha, !0, !1, !1);
          O = new oc(I + "*", ha, !1, !1, !1);
          var Ra = new oc(I + " const*", ha, !1, !0, !1);
          Qb[a] = { pointerType: O, Kc: Ra };
          pc(u, K);
          return [P, O, Ra];
        });
      },
      i: function (a, d, f, k, p, q, y) {
        var w = yc(f, k);
        d = Ib(d);
        q = rc(p, q);
        Eb([], [a], function (x) {
          function t() {
            wc(`Cannot call ${I} due to unbound types`, w);
          }
          x = x[0];
          var I = `${x.name}.${d}`;
          d.startsWith("@@") && (d = Symbol[d.substring(2)]);
          var H = x.gb.constructor;
          void 0 === H[d] ? ((t.Ub = f - 1), (H[d] = t)) : (fc(H, d, I), (H[d].ob[f - 1] = t));
          Eb([], w, function (N) {
            N = [N[0], null].concat(N.slice(1));
            N = xc(I, N, null, q, y);
            void 0 === H[d].ob ? ((N.Ub = f - 1), (H[d] = N)) : (H[d].ob[f - 1] = N);
            if (x.gb.cc) for (const u of x.gb.cc) u.constructor.hasOwnProperty(d) || (u.constructor[d] = N);
            return [];
          });
          return [];
        });
      },
      G: function (a, d, f, k, p, q) {
        var y = yc(d, f);
        p = rc(k, p);
        Eb([], [a], function (w) {
          w = w[0];
          var x = `constructor ${w.name}`;
          void 0 === w.gb.Fb && (w.gb.Fb = []);
          if (void 0 !== w.gb.Fb[d - 1])
            throw new Jb(
              `Cannot register multiple constructors with identical number of parameters (${d - 1}) for class '${
                w.name
              }'! Overload resolution is currently only performed using the parameter count, not actual type info!`
            );
          w.gb.Fb[d - 1] = () => {
            wc(`Cannot construct ${w.name} due to unbound types`, y);
          };
          Eb([], y, function (t) {
            t.splice(1, 0, null);
            w.gb.Fb[d - 1] = xc(x, t, null, p, q);
            return [];
          });
          return [];
        });
      },
      b: function (a, d, f, k, p, q, y, w) {
        var x = yc(f, k);
        d = Ib(d);
        q = rc(p, q);
        Eb([], [a], function (t) {
          function I() {
            wc(`Cannot call ${H} due to unbound types`, x);
          }
          t = t[0];
          var H = `${t.name}.${d}`;
          d.startsWith("@@") && (d = Symbol[d.substring(2)]);
          w && t.gb.cd.push(d);
          var N = t.gb.Wb,
            u = N[d];
          void 0 === u || (void 0 === u.ob && u.className !== t.name && u.Ub === f - 2)
            ? ((I.Ub = f - 2), (I.className = t.name), (N[d] = I))
            : (fc(N, d, H), (N[d].ob[f - 2] = I));
          Eb([], x, function (K) {
            K = xc(H, K, t, q, y);
            void 0 === N[d].ob ? ((K.Ub = f - 2), (N[d] = K)) : (N[d].ob[f - 2] = K);
            return [];
          });
          return [];
        });
      },
      w: function (a, d, f) {
        a = Ib(a);
        Eb([], [d], function (k) {
          k = k[0];
          z[a] = k.fromWireType(f);
          return [];
        });
      },
      pa: function (a, d) {
        d = Ib(d);
        Fb(a, {
          name: d,
          fromWireType: function (f) {
            var k = Cc(f);
            Bc(f);
            return k;
          },
          toWireType: function (f, k) {
            return mc(k);
          },
          argPackAdvance: 8,
          readValueFromPointer: sb,
          vb: null,
        });
      },
      n: function (a, d, f, k) {
        function p() {}
        f = Gb(f);
        d = Ib(d);
        p.values = {};
        Fb(a, {
          name: d,
          constructor: p,
          fromWireType: function (q) {
            return this.constructor.values[q];
          },
          toWireType: function (q, y) {
            return y.value;
          },
          argPackAdvance: 8,
          readValueFromPointer: Dc(d, f, k),
          vb: null,
        });
        gc(d, p);
      },
      d: function (a, d, f) {
        var k = Ec(a, "enum");
        d = Ib(d);
        a = k.constructor;
        k = Object.create(k.constructor.prototype, { value: { value: f }, constructor: { value: ec(`${k.name}_${d}`, function () {}) } });
        a.values[f] = k;
        a[d] = k;
      },
      T: function (a, d, f) {
        f = Gb(f);
        d = Ib(d);
        Fb(a, {
          name: d,
          fromWireType: function (k) {
            return k;
          },
          toWireType: function (k, p) {
            return p;
          },
          argPackAdvance: 8,
          readValueFromPointer: Fc(d, f),
          vb: null,
        });
      },
      H: function (a, d, f, k, p, q) {
        var y = yc(d, f);
        a = Ib(a);
        p = rc(k, p);
        gc(
          a,
          function () {
            wc(`Cannot call ${a} due to unbound types`, y);
          },
          d - 1
        );
        Eb([], y, function (w) {
          w = [w[0], null].concat(w.slice(1));
          pc(a, xc(a, w, null, p, q), d - 1);
          return [];
        });
      },
      I: function (a, d, f, k, p) {
        d = Ib(d);
        -1 === p && (p = 4294967295);
        p = Gb(f);
        var q = (w) => w;
        if (0 === k) {
          var y = 32 - 8 * f;
          q = (w) => (w << y) >>> y;
        }
        f = d.includes("unsigned")
          ? function (w, x) {
              return x >>> 0;
            }
          : function (w, x) {
              return x;
            };
        Fb(a, { name: d, fromWireType: q, toWireType: f, argPackAdvance: 8, readValueFromPointer: Gc(d, p, 0 !== k), vb: null });
      },
      v: function (a, d, f) {
        function k(q) {
          q >>= 2;
          var y = Pa;
          return new p(y.buffer, y[q + 1], y[q]);
        }
        var p = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][d];
        f = Ib(f);
        Fb(a, { name: f, fromWireType: k, argPackAdvance: 8, readValueFromPointer: k }, { Xc: !0 });
      },
      t: function (a, d, f, k, p, q, y, w, x, t, I, H) {
        f = Ib(f);
        q = rc(p, q);
        w = rc(y, w);
        t = rc(x, t);
        H = rc(I, H);
        Eb([a], [d], function (N) {
          N = N[0];
          return [new oc(f, N.gb, !1, !1, !0, N, k, q, w, t, H)];
        });
      },
      S: function (a, d) {
        d = Ib(d);
        var f = "std::string" === d;
        Fb(a, {
          name: d,
          fromWireType: function (k) {
            var p = Pa[k >> 2],
              q = k + 4;
            if (f)
              for (var y = q, w = 0; w <= p; ++w) {
                var x = q + w;
                if (w == p || 0 == ia[x]) {
                  y = y ? pb(ia, y, x - y) : "";
                  if (void 0 === t) var t = y;
                  else (t += String.fromCharCode(0)), (t += y);
                  y = x + 1;
                }
              }
            else {
              t = Array(p);
              for (w = 0; w < p; ++w) t[w] = String.fromCharCode(ia[q + w]);
              t = t.join("");
            }
            vc(k);
            return t;
          },
          toWireType: function (k, p) {
            p instanceof ArrayBuffer && (p = new Uint8Array(p));
            var q = "string" == typeof p;
            q || p instanceof Uint8Array || p instanceof Uint8ClampedArray || p instanceof Int8Array || Y("Cannot pass non-string to std::string");
            var y = f && q ? da(p) : p.length;
            var w = Zc(4 + y + 1),
              x = w + 4;
            Pa[w >> 2] = y;
            if (f && q) fa(p, ia, x, y + 1);
            else if (q)
              for (q = 0; q < y; ++q) {
                var t = p.charCodeAt(q);
                255 < t && (vc(x), Y("String has UTF-16 code units that do not fit in 8 bits"));
                ia[x + q] = t;
              }
            else for (q = 0; q < y; ++q) ia[x + q] = p[q];
            null !== k && k.push(vc, w);
            return w;
          },
          argPackAdvance: 8,
          readValueFromPointer: sb,
          vb: function (k) {
            vc(k);
          },
        });
      },
      N: function (a, d, f) {
        f = Ib(f);
        if (2 === d) {
          var k = Ic;
          var p = Jc;
          var q = Kc;
          var y = () => Oa;
          var w = 1;
        } else 4 === d && ((k = Lc), (p = Mc), (q = Pc), (y = () => Pa), (w = 2));
        Fb(a, {
          name: f,
          fromWireType: function (x) {
            for (var t = Pa[x >> 2], I = y(), H, N = x + 4, u = 0; u <= t; ++u) {
              var K = x + 4 + u * d;
              if (u == t || 0 == I[K >> w]) (N = k(N, K - N)), void 0 === H ? (H = N) : ((H += String.fromCharCode(0)), (H += N)), (N = K + d);
            }
            vc(x);
            return H;
          },
          toWireType: function (x, t) {
            "string" != typeof t && Y(`Cannot pass non-string to C++ string type ${f}`);
            var I = q(t),
              H = Zc(4 + I + d);
            Pa[H >> 2] = I >> w;
            p(t, H + 4, I + d);
            null !== x && x.push(vc, H);
            return H;
          },
          argPackAdvance: 8,
          readValueFromPointer: sb,
          vb: function (x) {
            vc(x);
          },
        });
      },
      F: function (a, d, f, k, p, q) {
        qb[a] = { name: Ib(d), sc: rc(f, k), Bb: rc(p, q), yc: [] };
      },
      f: function (a, d, f, k, p, q, y, w, x, t) {
        qb[a].yc.push({ Pc: Ib(d), Wc: f, Uc: rc(k, p), Vc: q, jd: y, hd: rc(w, x), kd: t });
      },
      ra: function (a, d) {
        d = Ib(d);
        Fb(a, { Yc: !0, name: d, argPackAdvance: 0, fromWireType: function () {}, toWireType: function () {} });
      },
      na: () => !0,
      ba: () => {
        throw Infinity;
      },
      B: function (a, d, f) {
        a = Cc(a);
        d = Ec(d, "emval::as");
        var k = [],
          p = mc(k);
        Pa[f >> 2] = p;
        return d.toWireType(k, a);
      },
      L: function (a, d, f, k, p) {
        a = Sc[a];
        d = Cc(d);
        f = Rc(f);
        var q = [];
        Pa[k >> 2] = mc(q);
        return a(d, f, q, p);
      },
      u: function (a, d, f, k) {
        a = Sc[a];
        d = Cc(d);
        f = Rc(f);
        a(d, f, null, k);
      },
      c: Bc,
      K: function (a) {
        if (0 === a) return mc(Tc());
        a = Rc(a);
        return mc(Tc()[a]);
      },
      r: function (a, d) {
        var f = Vc(a, d),
          k = f[0];
        d =
          k.name +
          "_$" +
          f
            .slice(1)
            .map(function (y) {
              return y.name;
            })
            .join("_") +
          "$";
        var p = Wc[d];
        if (void 0 !== p) return p;
        var q = Array(a - 1);
        p = Uc((y, w, x, t) => {
          for (var I = 0, H = 0; H < a - 1; ++H) (q[H] = f[H + 1].readValueFromPointer(t + I)), (I += f[H + 1].argPackAdvance);
          y = y[w].apply(y, q);
          for (H = 0; H < a - 1; ++H) f[H + 1].Mc && f[H + 1].Mc(q[H]);
          if (!k.Yc) return k.toWireType(x, y);
        });
        return (Wc[d] = p);
      },
      A: function (a, d) {
        a = Cc(a);
        d = Cc(d);
        return mc(a[d]);
      },
      o: function (a) {
        4 < a && (Ac.get(a).Cc += 1);
      },
      O: function (a, d, f, k) {
        a = Cc(a);
        var p = Yc[d];
        p || ((p = Xc(d)), (Yc[d] = p));
        return p(a, f, k);
      },
      D: function () {
        return mc([]);
      },
      e: function (a) {
        return mc(Rc(a));
      },
      y: function () {
        return mc({});
      },
      ya: function (a) {
        a = Cc(a);
        return !a;
      },
      z: function (a) {
        var d = Cc(a);
        rb(d);
        Bc(a);
      },
      g: function (a, d, f) {
        a = Cc(a);
        d = Cc(d);
        f = Cc(f);
        a[d] = f;
      },
      h: function (a, d) {
        a = Ec(a, "_emval_take_value");
        a = a.readValueFromPointer(d);
        return mc(a);
      },
      Z: function (a, d, f) {
        a = new Date(1e3 * ((d + 2097152) >>> 0 < 4194305 - !!a ? (a >>> 0) + 4294967296 * d : NaN));
        V[f >> 2] = a.getUTCSeconds();
        V[(f + 4) >> 2] = a.getUTCMinutes();
        V[(f + 8) >> 2] = a.getUTCHours();
        V[(f + 12) >> 2] = a.getUTCDate();
        V[(f + 16) >> 2] = a.getUTCMonth();
        V[(f + 20) >> 2] = a.getUTCFullYear() - 1900;
        V[(f + 24) >> 2] = a.getUTCDay();
        V[(f + 28) >> 2] = ((a.getTime() - Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) / 864e5) | 0;
      },
      X: function () {
        return -52;
      },
      Y: function () {},
      da: (a, d, f) => {
        function k(x) {
          return (x = x.toTimeString().match(/\(([A-Za-z ]+)\)$/)) ? x[1] : "GMT";
        }
        var p = new Date().getFullYear(),
          q = new Date(p, 0, 1),
          y = new Date(p, 6, 1);
        p = q.getTimezoneOffset();
        var w = y.getTimezoneOffset();
        Pa[a >> 2] = 60 * Math.max(p, w);
        V[d >> 2] = Number(p != w);
        a = k(q);
        d = k(y);
        a = $c(a);
        d = $c(d);
        w < p ? ((Pa[f >> 2] = a), (Pa[(f + 4) >> 2] = d)) : ((Pa[f >> 2] = d), (Pa[(f + 4) >> 2] = a));
      },
      a: () => {
        Ga("");
      },
      oa: function () {
        return Date.now();
      },
      ma: () => performance.now(),
      ca: (a) => {
        var d = ia.length;
        a >>>= 0;
        if (2147483648 < a) return !1;
        for (var f = 1; 4 >= f; f *= 2) {
          var k = d * (1 + 0.2 / f);
          k = Math.min(k, a + 100663296);
          var p = Math;
          k = Math.max(a, k);
          a: {
            p = (p.min.call(p, 2147483648, k + ((65536 - (k % 65536)) % 65536)) - Ha.buffer.byteLength + 65535) >>> 16;
            try {
              Ha.grow(p);
              Wa();
              var q = 1;
              break a;
            } catch (y) {}
            q = void 0;
          }
          if (q) return !0;
        }
        return !1;
      },
      ea: (a, d) => {
        var f = 0;
        cd().forEach(function (k, p) {
          var q = d + f;
          p = Pa[(a + 4 * p) >> 2] = q;
          for (q = 0; q < k.length; ++q) Ja[p++ >> 0] = k.charCodeAt(q);
          Ja[p >> 0] = 0;
          f += k.length + 1;
        });
        return 0;
      },
      fa: (a, d) => {
        var f = cd();
        Pa[a >> 2] = f.length;
        var k = 0;
        f.forEach(function (p) {
          k += p.length + 1;
        });
        Pa[d >> 2] = k;
        return 0;
      },
      sa: (a) => {
        if (!noExitRuntime) {
          if (z.onExit) z.onExit(a);
          Ia = !0;
        }
        ma(a, new mb(a));
      },
      M: () => 52,
      W: function () {
        return 52;
      },
      ka: () => 52,
      _: function () {
        return 70;
      },
      P: (a, d, f, k) => {
        for (var p = 0, q = 0; q < f; q++) {
          var y = Pa[d >> 2],
            w = Pa[(d + 4) >> 2];
          d += 8;
          for (var x = 0; x < w; x++) {
            var t = ia[y + x],
              I = dd[a];
            0 === t || 10 === t ? ((1 === a ? Ba : Ea)(pb(I, 0)), (I.length = 0)) : I.push(t);
          }
          p += w;
        }
        Pa[k >> 2] = p;
        return 0;
      },
      j: md,
      l: nd,
      k: od,
      C: pd,
      ua: qd,
      V: rd,
      U: sd,
      J: td,
      m: ud,
      x: vd,
      q: wd,
      xa: xd,
      s: yd,
      ta: zd,
      va: Ad,
      wa: Bd,
      aa: (a, d, f, k) => jd(a, d, f, k),
    };
    (function () {
      function a(f) {
        U = f = f.exports;
        Ha = U.za;
        Wa();
        Xa = U.Ca;
        Za.unshift(U.Aa);
        bb--;
        z.monitorRunDependencies && z.monitorRunDependencies(bb);
        if (0 == bb && (null !== cb && (clearInterval(cb), (cb = null)), db)) {
          var k = db;
          db = null;
          k();
        }
        return f;
      }
      var d = { a: Cd };
      bb++;
      z.monitorRunDependencies && z.monitorRunDependencies(bb);
      if (z.instantiateWasm)
        try {
          return z.instantiateWasm(d, a);
        } catch (f) {
          Ea("Module.instantiateWasm callback failed with error: " + f), ca(f);
        }
      lb(d, function (f) {
        a(f.instance);
      }).catch(ca);
      return {};
    })();
    var Zc = (z._malloc = (a) => (Zc = z._malloc = U.Ba)(a)),
      vc = (z._free = (a) => (vc = z._free = U.Da)(a)),
      uc = (a) => (uc = U.Ea)(a);
    z.__embind_initialize_bindings = () => (z.__embind_initialize_bindings = U.Fa)();
    var Dd = (a, d) => (Dd = U.Ga)(a, d),
      Ed = () => (Ed = U.Ha)(),
      Fd = (a) => (Fd = U.Ia)(a);
    z.dynCall_viji = (a, d, f, k, p) => (z.dynCall_viji = U.Ja)(a, d, f, k, p);
    z.dynCall_vijiii = (a, d, f, k, p, q, y) => (z.dynCall_vijiii = U.Ka)(a, d, f, k, p, q, y);
    z.dynCall_viiiiij = (a, d, f, k, p, q, y, w) => (z.dynCall_viiiiij = U.La)(a, d, f, k, p, q, y, w);
    z.dynCall_jiiiijiiiii = (a, d, f, k, p, q, y, w, x, t, I, H) => (z.dynCall_jiiiijiiiii = U.Ma)(a, d, f, k, p, q, y, w, x, t, I, H);
    z.dynCall_viiij = (a, d, f, k, p, q) => (z.dynCall_viiij = U.Na)(a, d, f, k, p, q);
    z.dynCall_jiiiii = (a, d, f, k, p, q) => (z.dynCall_jiiiii = U.Oa)(a, d, f, k, p, q);
    z.dynCall_jiiiiii = (a, d, f, k, p, q, y) => (z.dynCall_jiiiiii = U.Pa)(a, d, f, k, p, q, y);
    z.dynCall_jiiiiji = (a, d, f, k, p, q, y, w) => (z.dynCall_jiiiiji = U.Qa)(a, d, f, k, p, q, y, w);
    z.dynCall_ji = (a, d) => (z.dynCall_ji = U.Ra)(a, d);
    z.dynCall_iijj = (a, d, f, k, p, q) => (z.dynCall_iijj = U.Sa)(a, d, f, k, p, q);
    z.dynCall_iiiji = (a, d, f, k, p, q) => (z.dynCall_iiiji = U.Ta)(a, d, f, k, p, q);
    z.dynCall_iiji = (a, d, f, k, p) => (z.dynCall_iiji = U.Ua)(a, d, f, k, p);
    z.dynCall_iijjiii = (a, d, f, k, p, q, y, w, x) => (z.dynCall_iijjiii = U.Va)(a, d, f, k, p, q, y, w, x);
    z.dynCall_iij = (a, d, f, k) => (z.dynCall_iij = U.Wa)(a, d, f, k);
    z.dynCall_vijjjii = (a, d, f, k, p, q, y, w, x, t) => (z.dynCall_vijjjii = U.Xa)(a, d, f, k, p, q, y, w, x, t);
    z.dynCall_jiji = (a, d, f, k, p) => (z.dynCall_jiji = U.Ya)(a, d, f, k, p);
    z.dynCall_viijii = (a, d, f, k, p, q, y) => (z.dynCall_viijii = U.Za)(a, d, f, k, p, q, y);
    z.dynCall_iiiiij = (a, d, f, k, p, q, y) => (z.dynCall_iiiiij = U._a)(a, d, f, k, p, q, y);
    z.dynCall_iiiiijj = (a, d, f, k, p, q, y, w, x) => (z.dynCall_iiiiijj = U.$a)(a, d, f, k, p, q, y, w, x);
    z.dynCall_iiiiiijj = (a, d, f, k, p, q, y, w, x, t) => (z.dynCall_iiiiiijj = U.ab)(a, d, f, k, p, q, y, w, x, t);
    function nd(a, d, f) {
      var k = Ed();
      try {
        return Xa.get(a)(d, f);
      } catch (p) {
        Fd(k);
        if (p !== p + 0) throw p;
        Dd(1, 0);
      }
    }
    function yd(a, d, f, k, p) {
      var q = Ed();
      try {
        Xa.get(a)(d, f, k, p);
      } catch (y) {
        Fd(q);
        if (y !== y + 0) throw y;
        Dd(1, 0);
      }
    }
    function pd(a, d, f, k, p) {
      var q = Ed();
      try {
        return Xa.get(a)(d, f, k, p);
      } catch (y) {
        Fd(q);
        if (y !== y + 0) throw y;
        Dd(1, 0);
      }
    }
    function od(a, d, f, k) {
      var p = Ed();
      try {
        return Xa.get(a)(d, f, k);
      } catch (q) {
        Fd(p);
        if (q !== q + 0) throw q;
        Dd(1, 0);
      }
    }
    function md(a, d) {
      var f = Ed();
      try {
        return Xa.get(a)(d);
      } catch (k) {
        Fd(f);
        if (k !== k + 0) throw k;
        Dd(1, 0);
      }
    }
    function ud(a, d) {
      var f = Ed();
      try {
        Xa.get(a)(d);
      } catch (k) {
        Fd(f);
        if (k !== k + 0) throw k;
        Dd(1, 0);
      }
    }
    function wd(a, d, f, k) {
      var p = Ed();
      try {
        Xa.get(a)(d, f, k);
      } catch (q) {
        Fd(p);
        if (q !== q + 0) throw q;
        Dd(1, 0);
      }
    }
    function vd(a, d, f) {
      var k = Ed();
      try {
        Xa.get(a)(d, f);
      } catch (p) {
        Fd(k);
        if (p !== p + 0) throw p;
        Dd(1, 0);
      }
    }
    function td(a) {
      var d = Ed();
      try {
        Xa.get(a)();
      } catch (f) {
        Fd(d);
        if (f !== f + 0) throw f;
        Dd(1, 0);
      }
    }
    function xd(a, d, f, k, p) {
      var q = Ed();
      try {
        Xa.get(a)(d, f, k, p);
      } catch (y) {
        Fd(q);
        if (y !== y + 0) throw y;
        Dd(1, 0);
      }
    }
    function Bd(a, d, f, k, p, q, y, w, x, t) {
      var I = Ed();
      try {
        Xa.get(a)(d, f, k, p, q, y, w, x, t);
      } catch (H) {
        Fd(I);
        if (H !== H + 0) throw H;
        Dd(1, 0);
      }
    }
    function Ad(a, d, f, k, p, q, y) {
      var w = Ed();
      try {
        Xa.get(a)(d, f, k, p, q, y);
      } catch (x) {
        Fd(w);
        if (x !== x + 0) throw x;
        Dd(1, 0);
      }
    }
    function qd(a, d, f, k, p, q) {
      var y = Ed();
      try {
        return Xa.get(a)(d, f, k, p, q);
      } catch (w) {
        Fd(y);
        if (w !== w + 0) throw w;
        Dd(1, 0);
      }
    }
    function rd(a, d, f, k, p, q, y) {
      var w = Ed();
      try {
        return Xa.get(a)(d, f, k, p, q, y);
      } catch (x) {
        Fd(w);
        if (x !== x + 0) throw x;
        Dd(1, 0);
      }
    }
    function zd(a, d, f, k, p, q) {
      var y = Ed();
      try {
        Xa.get(a)(d, f, k, p, q);
      } catch (w) {
        Fd(y);
        if (w !== w + 0) throw w;
        Dd(1, 0);
      }
    }
    function sd(a, d, f, k, p, q, y, w, x, t) {
      var I = Ed();
      try {
        return Xa.get(a)(d, f, k, p, q, y, w, x, t);
      } catch (H) {
        Fd(I);
        if (H !== H + 0) throw H;
        Dd(1, 0);
      }
    }
    var Gd;
    db = function Hd() {
      Gd || Id();
      Gd || (db = Hd);
    };
    function Id() {
      function a() {
        if (!Gd && ((Gd = !0), (z.calledRun = !0), !Ia)) {
          nb(Za);
          ba(z);
          if (z.onRuntimeInitialized) z.onRuntimeInitialized();
          if (z.postRun)
            for ("function" == typeof z.postRun && (z.postRun = [z.postRun]); z.postRun.length; ) {
              var d = z.postRun.shift();
              $a.unshift(d);
            }
          nb($a);
        }
      }
      if (!(0 < bb)) {
        if (z.preRun) for ("function" == typeof z.preRun && (z.preRun = [z.preRun]); z.preRun.length; ) ab();
        nb(Ya);
        0 < bb ||
          (z.setStatus
            ? (z.setStatus("Running..."),
              setTimeout(function () {
                setTimeout(function () {
                  z.setStatus("");
                }, 1);
                a();
              }, 1))
            : a());
      }
    }
    if (z.preInit) for ("function" == typeof z.preInit && (z.preInit = [z.preInit]); 0 < z.preInit.length; ) z.preInit.pop()();
    Id();

    return moduleArg.ready;
  };
})();
if (typeof exports === "object" && typeof module === "object") module.exports = CanvasKitInit;
else if (typeof define === "function" && define["amd"]) define([], () => CanvasKitInit);
