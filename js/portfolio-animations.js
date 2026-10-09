/*
 * Portfolio motion enhancements
 * Lightweight, dependency-free scroll reveals with reduced-motion support.
 */

(function () {
  "use strict";

  function initPortfolioAnimations() {
    var reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    var supportsObserver = "IntersectionObserver" in window;

    // Keep everything visible if reduced motion is enabled
    // or IntersectionObserver is not supported.
    if (reduceMotion || !supportsObserver) return;

    var revealGroups = [
      "#experience .resume-item",
      "#education .resume-item",
      "#interests .card",
      "#skills .subheading",
      "#skills .fa-ul li",
      "#awards .fa-ul li",
      "#contact .form-group",
      "#contact button[type='submit']"
    ];

    var revealElements = [];

    revealGroups.forEach(function (selector) {
      var group = Array.prototype.slice.call(
        document.querySelectorAll(selector)
      );

      group.forEach(function (element, index) {
        element.classList.add("reveal-on-scroll");

        element.style.setProperty(
          "--reveal-delay",
          (index % 3) * 85 + "ms"
        );

        revealElements.push(element);
      });
    });

    if (revealElements.length === 0) return;

    var observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -36px 0px"
      }
    );

    // Activate animations only after targets are prepared.
    // Content remains visible if JavaScript fails or is disabled.
    document.body.classList.add("motion-ready");

    revealElements.forEach(function (element) {
      observer.observe(element);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initPortfolioAnimations,
      { once: true }
    );
  } else {
    initPortfolioAnimations();
  }
})();
