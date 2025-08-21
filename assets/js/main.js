// ======= Sticky
window.onscroll = function () {
  const ud_header = document.querySelector(".ud-header");
  const sticky = ud_header.offsetTop;
  const logo = document.querySelector(".navbar-brand img");

  if (window.pageYOffset > sticky) {
    ud_header.style.backgroundColor = "";
    ud_header.classList.add("sticky");
  } else {
    ud_header.classList.remove("sticky");
    ud_header.classList.remove("navbar-light");
  }

  if (ud_header.classList.contains("sticky")) {
    logo.src = "assets/images/superfillads-logo-secondary.png";
  } else {
    logo.src = "assets/images/superfillads-logo-main.png";
  }
};

let navbarToggler = document.querySelector(".navbar-toggler");
const navbarCollapse = document.querySelector(".navbar-collapse");

document.querySelectorAll(".ud-menu-scroll").forEach((e) =>
  e.addEventListener("click", () => {
    navbarToggler.classList.remove("active");
    navbarCollapse.classList.remove("show");
  })
);
navbarToggler.addEventListener("click", function () {
  navbarToggler.classList.toggle("active");
  navbarCollapse.classList.toggle("show");
});

const submenuButton = document.querySelectorAll(".nav-item-has-children");
submenuButton.forEach((elem) => {
  elem.querySelector("a").addEventListener("click", () => {
    elem.querySelector(".ud-submenu").classList.toggle("show");
  });
});

// Scroll To Top Button with Progress Indicator
document.addEventListener("DOMContentLoaded", function () {
  var progressPath = document.querySelector(".progress-wrap path");

  if (!progressPath) {
    console.warn("⚠️ .progress-wrap path not found!");
    return;
  }

  var pathLength = progressPath.getTotalLength();

  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";

  var updateProgress = function () {
    var scroll = jQuery(window).scrollTop();
    var height = jQuery(document).height() - jQuery(window).height();
    var progress = pathLength - (scroll * pathLength) / height;
    progressPath.style.strokeDashoffset = progress;
  };

  updateProgress();
  jQuery(window).on("scroll", updateProgress);

  var offset = 50;
  var duration = 550;

  jQuery(window).on("scroll", function () {
    if (jQuery(this).scrollTop() > offset) {
      jQuery(".progress-wrap").addClass("active-progress");
    } else {
      jQuery(".progress-wrap").removeClass("active-progress");
    }
  });

  jQuery(".progress-wrap").on("click", function (event) {
    event.preventDefault();
    jQuery("html, body").animate({ scrollTop: 0 }, duration);
    return false;
  });
});


// Scrollable Tags Declaration
(function () {
  const track = document.getElementById("brand-track");
  const scroller = document.getElementById("brand-loop");
  const clone = track.cloneNode(true);
  while (clone.firstChild) track.appendChild(clone.firstChild);
  const children = Array.from(track.children);
  const half = Math.floor(children.length / 2);
  let setWidth = 0;
  for (let i = 0; i < half; i++) {
    const el = children[i];
    const style = getComputedStyle(el);
    const marginLeft = parseFloat(style.marginLeft) || 0;
    const marginRight = parseFloat(style.marginRight) || 0;
    setWidth += el.offsetWidth + marginLeft + marginRight;
  }

  const styles = getComputedStyle(document.documentElement);
  const direction =
    styles.getPropertyValue("--scroll-direction").trim() || "left";

  const base = parseFloat(styles.getPropertyValue("--base-speed")) || 120;
  const pixelsPerSecond = Math.max(40, base);
  const durationSec = setWidth / pixelsPerSecond;
  const distance = direction === "right" ? setWidth : -setWidth;
  const kfName = "scroll_" + Math.random().toString(36).slice(2);

  const styleEl = document.createElement("style");
  styleEl.textContent = `
      @keyframes ${kfName} {
        from { transform: translateX(0); }
        to   { transform: translateX(${distance}px); }
      }
      #brand-track {
        animation-name: ${kfName};
        animation-duration: ${durationSec}s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
    `;
  document.head.appendChild(styleEl);

  let rAF;
  window.addEventListener(
    "resize",
    () => {
      cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        location.reload();
      });
    },
    { passive: true }
  );
})();

// ===== wow js
new WOW().init();
