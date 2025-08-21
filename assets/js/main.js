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

  // === logo change
  if (ud_header.classList.contains("sticky")) {
    logo.src = "assets/images/superfillads-logo-secondary.svg";
  } else {
    logo.src = "assets/images/superfillads-logo-main.svg";
  }
};

//===== close navbar-collapse when a  clicked
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

// ===== submenu
const submenuButton = document.querySelectorAll(".nav-item-has-children");
submenuButton.forEach((elem) => {
  elem.querySelector("a").addEventListener("click", () => {
    elem.querySelector(".ud-submenu").classList.toggle("show");
  });
});


// Scroll-to-Top Button with Progress Indicator
document.addEventListener("DOMContentLoaded", function () {
  var progressPath = document.querySelector(".progress-wrap path");

  if (!progressPath) {
    console.warn("⚠️ .progress-wrap path not found!");
    return;
  }

  var pathLength = progressPath.getTotalLength();

  // Reset styles
  progressPath.style.transition = progressPath.style.WebkitTransition = "none";
  progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition =
    "stroke-dashoffset 10ms linear";

  // Update progress on scroll
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

  // Toggle active-progress class
  jQuery(window).on("scroll", function () {
    if (jQuery(this).scrollTop() > offset) {
      jQuery(".progress-wrap").addClass("active-progress");
    } else {
      jQuery(".progress-wrap").removeClass("active-progress");
    }
  });

  // Scroll to top
  jQuery(".progress-wrap").on("click", function (event) {
    event.preventDefault();
    jQuery("html, body").animate({ scrollTop: 0 }, duration);
    return false;
  });
});



// Sign In & SignUp Modal PopUp
jQuery(document).ready(function ($) {
  var $form_modal = $(".cd-user-modal"),
    $form_login = $form_modal.find("#cd-login"),
    $form_signup = $form_modal.find("#cd-signup"),
    $form_forgot_password = $form_modal.find("#cd-reset-password"),
    $form_modal_tab = $(".cd-switcher"),
    $tab_login = $form_modal_tab.children("li").eq(0).children("a"),
    $tab_signup = $form_modal_tab.children("li").eq(1).children("a"),
    $forgot_password_link = $form_login.find(".cd-form-bottom-message a"),
    $back_to_login_link = $form_forgot_password.find(
      ".cd-form-bottom-message a"
    ),
    $main_nav = $(".fire-modal");

  $main_nav.on("click", function (event) {
    if ($(event.target).is($main_nav)) {
      $(this).children("ul").toggleClass("is-visible");
    } else {
      $main_nav.children("ul").removeClass("is-visible");
      $form_modal.addClass("is-visible");
      $(event.target).is(".cd-signup") ? signup_selected() : login_selected();
    }
  });

  $(".cd-user-modal").on("click", function (event) {
    if (
      $(event.target).is($form_modal) ||
      $(event.target).is(".cd-close-form")
    ) {
      $form_modal.removeClass("is-visible");
    }
  });
  $(document).keyup(function (event) {
    if (event.which == "27") {
      $form_modal.removeClass("is-visible");
    }
  });

  $form_modal_tab.on("click", function (event) {
    event.preventDefault();
    $(event.target).is($tab_login) ? login_selected() : signup_selected();
  });

  $(".hide-password").on("click", function () {
    var $this = $(this),
      $password_field = $this.prev("input");

    "password" == $password_field.attr("type")
      ? $password_field.attr("type", "text")
      : $password_field.attr("type", "password");
    "Hide" == $this.text() ? $this.text("Show") : $this.text("Hide");
    $password_field.putCursorAtEnd();
  });

  $forgot_password_link.on("click", function (event) {
    event.preventDefault();
    forgot_password_selected();
  });

  $back_to_login_link.on("click", function (event) {
    event.preventDefault();
    login_selected();
  });

  function login_selected() {
    $form_login.addClass("is-selected");
    $form_signup.removeClass("is-selected");
    $form_forgot_password.removeClass("is-selected");
    $tab_login.addClass("selected");
    $tab_signup.removeClass("selected");
  }

  function signup_selected() {
    $form_login.removeClass("is-selected");
    $form_signup.addClass("is-selected");
    $form_forgot_password.removeClass("is-selected");
    $tab_login.removeClass("selected");
    $tab_signup.addClass("selected");
  }

  function forgot_password_selected() {
    $form_login.removeClass("is-selected");
    $form_signup.removeClass("is-selected");
    $form_forgot_password.addClass("is-selected");
  }

  $form_login.find('input[type="submit"]').on("click", function (event) {
    event.preventDefault();
    $form_login
      .find('input[type="email"]')
      .toggleClass("has-error")
      .next("span")
      .toggleClass("is-visible");
  });
  $form_signup.find('input[type="submit"]').on("click", function (event) {
    event.preventDefault();
    $form_signup
      .find('input[type="email"]')
      .toggleClass("has-error")
      .next("span")
      .toggleClass("is-visible");
  });   
});

jQuery.fn.putCursorAtEnd = function () {
  return this.each(function () {
    if (this.setSelectionRange) {
      var len = $(this).val().length * 2;
      this.setSelectionRange(len, len);
    } else {
      $(this).val($(this).val());
    }
  });
};


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
