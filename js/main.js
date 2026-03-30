/**
 * Main — Scroll reveals, lightbox, smooth scroll, form handling.
 */

(function () {
  'use strict';

  // =============================================
  // Scroll Entry Animations
  // =============================================

  function initRevealAnimations() {
    var elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      elements.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = parseInt(el.getAttribute('data-delay'), 10) || 0;
          if (delay > 0) {
            setTimeout(function () { el.classList.add('is-visible'); }, delay);
          } else {
            el.classList.add('is-visible');
          }
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function (el) { observer.observe(el); });
  }

  // =============================================
  // Image Lightbox — click to zoom, click outside to close
  // =============================================

  function initLightbox() {
    // Create the lightbox overlay once
    var overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.setAttribute('aria-hidden', 'true');

    var lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox__img';
    overlay.appendChild(lightboxImg);

    document.body.appendChild(overlay);

    // Clicking the overlay background closes it
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        closeLightbox();
      }
    });
	lightboxImg.addEventListener('click', function () {
	  closeLightbox();
	});

    // Escape key closes it
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
        closeLightbox();
      }
    });

    function closeLightbox() {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // Attach click handlers to all feature images and the hero mockup
    var zoomableImages = document.querySelectorAll('.feature__img, .hero__img');
    zoomableImages.forEach(function (img) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function () {
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
        overlay.classList.add('is-open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  // =============================================
  // Email Form — Formspree
  // =============================================

  function initEmailForm() {
    var form = document.getElementById('access-form');
    var input = document.getElementById('email-input');
    var submitBtn = document.getElementById('form-submit');
    var statusEl = document.getElementById('form-status');

    if (!form || !input || !submitBtn || !statusEl) return;

    if (sessionStorage.getItem('jls-form-submitted') === 'true') {
      showSuccess(form, statusEl);
      return;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var email = input.value.trim();
      if (!isValidEmail(email)) {
        statusEl.className = 'email-form__status email-form__status--error';
        statusEl.textContent = 'Please enter a valid email address.';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.querySelector('span').textContent = 'Sending\u2026';
      statusEl.textContent = '';

      fetch('https://formspree.io/f/xvzvaqll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: email })
      })
        .then(function (response) {
          if (response.ok) {
            sessionStorage.setItem('jls-form-submitted', 'true');
            showSuccess(form, statusEl);
          } else {
            throw new Error('Form submission failed');
          }
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.querySelector('span').textContent = 'Request Test Access';
          statusEl.className = 'email-form__status email-form__status--error';
          statusEl.innerHTML = 'Something went wrong. Try again, or email us directly at <a href="mailto:dilan.dobardzic.jls@gmail.com">dilan.dobardzic.jls@gmail.com</a>';
        });
    });
  }

  function showSuccess(form, statusEl) {
    var row = form.querySelector('.email-form__row');
    var helper = form.querySelector('.email-form__helper');
    if (row) row.style.display = 'none';
    if (helper) helper.style.display = 'none';
    statusEl.className = 'email-form__status email-form__status--success';
    statusEl.textContent = "Thanks! We'll add you to the tester list within 24 hours.";
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // =============================================
  // Smooth Scroll
  // =============================================

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // =============================================
  // Init
  // =============================================

  function init() {
    initRevealAnimations();
    initLightbox();
    initEmailForm();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
