/**
 * Scroll Triggers — GSAP ScrollTrigger configurations.
 * All overlay opacity is handled INSIDE the main pin's onUpdate
 * to avoid sync issues between multiple ScrollTriggers.
 */

(function () {
  'use strict';

  function init() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    var shouldAnimate = window.CanvasAnimation && window.CanvasAnimation.shouldAnimate;

    if (shouldAnimate) {
      initZone1();
      initZone2();
    }
  }

  /* =============================================
     ZONE 1: "The Unclutter" (Problem Section)
     ============================================= */
  function initZone1() {
    var zone = document.getElementById('unclutter-zone');
    if (!zone) return;

    var container = zone.querySelector('.animation-container');
    var animator = new window.CanvasAnimation.CanvasAnimator('unclutter-canvas');
    var FRAME_COUNT = 150;

    // Grab overlay elements upfront
    var overlays = [
      { el: document.getElementById('problem-text-1'), fadeIn: [0.00, 0.06], visible: [0.06, 0.20], fadeOut: [0.20, 0.25] },
      { el: document.getElementById('problem-text-2'), fadeIn: [0.25, 0.31], visible: [0.31, 0.45], fadeOut: [0.45, 0.50] },
      { el: document.getElementById('problem-text-3'), fadeIn: [0.50, 0.56], visible: [0.56, 0.70], fadeOut: [0.70, 0.75] },
      { el: document.getElementById('problem-text-4'), fadeIn: [0.75, 0.81], visible: [0.81, 0.88], fadeOut: [0.88, 0.92] }
    ];

    window.CanvasAnimation.loadFrames('assets/frames/unclutter/', 'unclutter-', FRAME_COUNT)
      .then(function (frames) {
        animator.setFrames(frames);

        ScrollTrigger.create({
          trigger: zone,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          start: 'top top',
          end: '+=300%',
          onUpdate: function (self) {
            var p = self.progress;

            // Paint the correct frame
            var frameIndex = Math.floor(p * (FRAME_COUNT - 1));
            animator.requestFrame(frameIndex);

            // Update overlay text opacity (all handled here, not in separate triggers)
            for (var i = 0; i < overlays.length; i++) {
              var cfg = overlays[i];
              if (!cfg.el) continue;

              var opacity = 0;
              if (p >= cfg.fadeIn[0] && p < cfg.fadeIn[1]) {
                opacity = (p - cfg.fadeIn[0]) / (cfg.fadeIn[1] - cfg.fadeIn[0]);
              } else if (p >= cfg.visible[0] && p < cfg.visible[1]) {
                opacity = 1;
              } else if (p >= cfg.fadeOut[0] && p < cfg.fadeOut[1]) {
                opacity = 1 - (p - cfg.fadeOut[0]) / (cfg.fadeOut[1] - cfg.fadeOut[0]);
              }
              cfg.el.style.opacity = opacity;
            }

            // Fade out entire container near the end so unpin is seamless
            if (p > 0.93) {
              container.style.opacity = Math.max(0, 1 - ((p - 0.93) / 0.07));
            } else {
              container.style.opacity = 1;
            }
          },
          onLeave: function () {
            container.style.opacity = 0;
          },
          onEnterBack: function () {
            container.style.opacity = 1;
          }
        });

        ScrollTrigger.refresh();
      });
  }

  /* =============================================
     ZONE 2: Product Showcase
     ============================================= */
  function initZone2() {
    var zone = document.getElementById('product-zone');
    if (!zone) return;

    var container = zone.querySelector('.animation-container');
    var animator = new window.CanvasAnimation.CanvasAnimator('product-canvas');
    var FRAME_COUNT = 96;

    // Grab stat overlay elements
    var stats = [
      { el: document.getElementById('stat-1'), fadeIn: 0.15 },
      { el: document.getElementById('stat-2'), fadeIn: 0.35 },
      { el: document.getElementById('stat-3'), fadeIn: 0.55 },
      { el: document.getElementById('stat-4'), fadeIn: 0.75 }
    ];

    setTimeout(function () {
      window.CanvasAnimation.loadFrames('assets/frames/product/', 'product-', FRAME_COUNT)
        .then(function (frames) {
          animator.setFrames(frames);

          ScrollTrigger.create({
            trigger: zone,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            start: 'top top',
            end: '+=250%',
            onUpdate: function (self) {
              var p = self.progress;

              // Paint frame
              var frameIndex = Math.floor(p * (FRAME_COUNT - 1));
              animator.requestFrame(frameIndex);

              // Stat overlays — fade in and stay (accumulate)
              for (var i = 0; i < stats.length; i++) {
                var cfg = stats[i];
                if (!cfg.el) continue;

                var fadeStart = cfg.fadeIn;
                var fadeEnd = fadeStart + 0.08;

                if (p < fadeStart) {
                  cfg.el.style.opacity = 0;
                } else if (p < fadeEnd) {
                  cfg.el.style.opacity = (p - fadeStart) / (fadeEnd - fadeStart);
                } else {
                  cfg.el.style.opacity = 1;
                }
              }

              // Fade out near end
              if (p > 0.93) {
                container.style.opacity = Math.max(0, 1 - ((p - 0.93) / 0.07));
              } else {
                container.style.opacity = 1;
              }
            },
            onLeave: function () {
              container.style.opacity = 0;
            },
            onEnterBack: function () {
              container.style.opacity = 1;
            }
          });

          ScrollTrigger.refresh();
        });
    }, 300);
  }

  // Initialize — wait for GSAP defer scripts
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(init, 100);
    });
  } else {
    setTimeout(init, 100);
  }

})();
