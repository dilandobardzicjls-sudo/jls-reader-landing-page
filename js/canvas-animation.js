/**
 * Canvas Animation Engine
 * Handles frame preloading, canvas painting, and resize for scroll-driven animations.
 * Used by scroll-triggers.js for GSAP ScrollTrigger integration.
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  /**
   * Load numbered JPEG frames sequentially into Image objects.
   * @param {string} basePath - Directory path (e.g., 'assets/frames/unclutter/')
   * @param {string} prefix - Filename prefix (e.g., 'unclutter-')
   * @param {number} count - Total frame count
   * @returns {Promise<HTMLImageElement[]>}
   */
  function loadFrames(basePath, prefix, count) {
    return new Promise(function (resolve) {
      var frames = [];
      var loaded = 0;

      for (var i = 1; i <= count; i++) {
        var img = new Image();
        var num = String(i).padStart(3, '0');
        img.src = basePath + prefix + num + '.jpg';

        img.onload = function () {
          loaded++;
          if (loaded === count) {
            resolve(frames);
          }
        };

        img.onerror = function () {
          loaded++;
          if (loaded === count) {
            resolve(frames);
          }
        };

        frames.push(img);
      }
    });
  }

  /**
   * Canvas Animator — manages a single animation zone's canvas.
   */
  function CanvasAnimator(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.frames = [];
    this.currentFrame = -1;
    this.rafId = null;
    this.targetFrame = 0;

    this._resizeHandler = this._debounce(this.resize.bind(this), 250);
    window.addEventListener('resize', this._resizeHandler);

    this.resize();
  }

  CanvasAnimator.prototype.resize = function () {
    if (!this.canvas) return;
    var container = this.canvas.closest('.canvas-frame') || this.canvas.parentElement;
    var dpr = window.devicePixelRatio || 1;
    var w = container.clientWidth;
    var h = container.clientHeight;

    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    this.ctx.scale(dpr, dpr);
    this.displayWidth = w;
    this.displayHeight = h;

    // Repaint current frame after resize
    if (this.frames.length > 0 && this.currentFrame >= 0) {
      this._drawFrame(this.currentFrame);
    }
  };

  /**
   * Set frames array after loading.
   */
  CanvasAnimator.prototype.setFrames = function (frames) {
    this.frames = frames;
    if (frames.length > 0) {
      this._drawFrame(0);
      this.currentFrame = 0;
    }
  };

  /**
   * Request painting a specific frame index. Uses rAF to avoid painting faster than display.
   */
  CanvasAnimator.prototype.requestFrame = function (index) {
    if (index === this.currentFrame) return;
    this.targetFrame = Math.max(0, Math.min(index, this.frames.length - 1));

    if (!this.rafId) {
      var self = this;
      this.rafId = requestAnimationFrame(function () {
        self.rafId = null;
        if (self.targetFrame !== self.currentFrame) {
          self._drawFrame(self.targetFrame);
          self.currentFrame = self.targetFrame;
        }
      });
    }
  };

  /**
   * Draw a frame to canvas with "cover" aspect ratio scaling.
   */
  CanvasAnimator.prototype._drawFrame = function (index) {
    var img = this.frames[index];
    if (!img || !img.naturalWidth) return;

    var ctx = this.ctx;
    var cw = this.displayWidth;
    var ch = this.displayHeight;
    var iw = img.naturalWidth;
    var ih = img.naturalHeight;

    // "Cover" scaling: fill canvas, crop overflow
    var scale = Math.max(cw / iw, ch / ih);
    var sw = cw / scale;
    var sh = ch / scale;
    var sx = (iw - sw) / 2;
    var sy = (ih - sh) / 2;

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  };

  CanvasAnimator.prototype._debounce = function (fn, delay) {
    var timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  };

  CanvasAnimator.prototype.destroy = function () {
    window.removeEventListener('resize', this._resizeHandler);
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  };

  // Expose globally for scroll-triggers.js
  window.CanvasAnimation = {
    loadFrames: loadFrames,
    CanvasAnimator: CanvasAnimator,
    shouldAnimate: !prefersReducedMotion && !isMobile
  };

})();
