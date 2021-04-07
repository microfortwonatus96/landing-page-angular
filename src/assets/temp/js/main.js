!(function ($) {
  "use strict";

  console.log("masuk")

  // Init AOS
  function aos_init() {
    console.log("masuk aos")
    AOS.init({
      duration: 1000,
      once: true,
    });
  }
  $(window).on("load", function () {
    aos_init();
  });
})(jQuery);
