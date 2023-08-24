/*================================================
*
* Template name : Gura
* Version       : 2.0
* Author        : FlaTheme
* Author URL    : http://themeforest.net/user/flatheme
*
* Table of Contents :
* 1.  Page Preloader
* 2.  Scroll Spy
* 3.  Scroll Animations
* 4.  Lightbox
* 5.  Sliders
* 6.  Masonry
* 7.  Google Maps
* 8.  Contact Form
*
================================================*/
"use strict";

var $body = $("body");

/*===============================================
  1. Page Preloader
===============================================*/
$(window).on("load", function () {
  $body.addClass("loaded");
});

if ($body.attr("data-preloader") === "light") {
  $body.append($("<div class='preloader'><div><svg class='loader-circular' viewBox='25 25 50 50'><circle class='loader-path' cx='50' cy='50' r='20'/></svg></div></div>"));
}
if ($body.attr("data-preloader") === "dark") {
  $body.append($("<div class='preloader dark'><div><svg class='loader-circular' viewBox='25 25 50 50'><circle class='loader-path' cx='50' cy='50' r='20'/></svg></div></div>"));
}
if ($body.attr("data-theme") === "dark") {
  $body.addClass("theme-dark");
}


/*===============================================
  2. Scroll Spy
===============================================*/
var scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: '.icon-menu'
})


/*===============================================
  3. Scroll Animations
===============================================*/
sal({
  duration: 500
});


/*===============================================
  4. Lightbox
===============================================*/
//
// Lightbox - Image //
//
var $lightboxImage = $(".lightbox-image-link, .lightbox-image-box");

$lightboxImage.each(function () {
  var $this = $(this);
  $this.magnificPopup({
    type: 'image',
    fixedContentPos: false,
    removalDelay: 200,
    closeOnContentClick: true, 
    image: {
      titleSrc: 'data-image-title'
    }
  });
});


/*===============================================
  5. Sliders
===============================================*/
$(".owl-carousel").each( function() {
  var $carousel = $(this);

  var $defaults = {
    rewind: true,
    navText: ["<i class='bi bi-arrow-left-short'></i>","<i class='bi bi-arrow-right-short'></i>"],
    autoHeight: true, 
    autoplayTimeout: 4000, 
    autoplaySpeed: 400, 
    autoplayHoverPause: true, 
    navSpeed: 300, 
    dotsSpeed: 300
  }

  var $options = {
    items: $carousel.data("owl-items"),
    margin: $carousel.data("owl-margin"),
    loop: $carousel.data("owl-loop"),
    center: $carousel.data("owl-center"),
    nav: $carousel.data("owl-nav"),
    rewind: $carousel.data("owl-rewind"),
    dots: $carousel.data("owl-dots"),
    autoplay: $carousel.data("owl-autoplay")
  }

  var $responsive = {
    responsive: {
      0 : {
        items: $carousel.data("owl-xs")
      },
      576 : {
        items: $carousel.data("owl-sm")
      },
      768 : {
        items: $carousel.data("owl-md")
      },
      992 : {
        items: $carousel.data("owl-lg")
      },
      1200 : {
        items: $carousel.data("owl-xl")
      }
    }
  }

  if ($carousel.hasClass("portfolio-slider")) {
    var $portfolioCarousel = {
      items:1,
      URLhashListener:true,
      startPosition: 'URLHash'
    }
  }

  $carousel.owlCarousel( $.extend( $defaults, $options, $responsive, $portfolioCarousel) );

  var customPrev = $("#customPrev");
  var customNext = $("#customNext");

  customNext.on("click", function(){
    $carousel.trigger("next.owl.carousel", [300]);
  });
  customPrev.on("click", function(){
    $carousel.trigger("prev.owl.carousel", [300]);
  });
});


/*===============================================
  6. Masonry
===============================================*/
var $masonryGrid = $(".masonry").imagesLoaded( function() {
  $masonryGrid.masonry({
    itemSelector: '.masonry-item'
  });
});


/*===============================================
  7. Google Maps
===============================================*/
var mapCanvas = $(".gmap");

if (mapCanvas.length) {
  var m,divId,initLatitude, initLongitude, map;

  for (var i = 0; i < mapCanvas.length; i++) {
    m = mapCanvas[i];

    initLatitude = m.dataset["latitude"];
    initLongitude = m.dataset["longitude"];
    divId = "#"+ m["id"];

    map = new GMaps({
      el: divId,
      lat: initLatitude,
      lng: initLongitude,
      zoom: 16,
      scrollwheel: false,
      styles: [
          /* style your map at https://snazzymaps.com/editor and paste JSON here */
      ]
    });

    map.addMarker({
      lat : initLatitude,
      lng : initLongitude
    });
  }
}


/*===============================================
  8. Contact Form
===============================================*/
$("#contactform").on("submit", function(e) {
  var name = $("#name").val();
  var email = $("#email").val();
  var subject = $("#subject").val();
  var message = $("#message").val();

  if (name === "") {
    $("#name").addClass("error-color");
  }
  if (email === "") {
    $("#email").addClass("error-color");
  }
  if (subject === "") {
    $("#subject").addClass("error-color");
  }
  if (message === "") {
    $("#message").addClass("error-color");
  }

  else {
    $.ajax({
      url:"assets/php/contact-form.php",
      data:$(this).serialize(),
      type:"POST",
      success:function(data){
        $("#success").addClass("show-result"); //=== Show Success Message==
        $("#contactform").each(function(){
          this.reset();
        });
      },
      error:function(data){
        $("#error").addClass("show-result"); //===Show Error Message====
      }
    });
    var forms = $("#contactform input, #contactform textarea");
    forms.removeClass("error-color");
  }

  e.preventDefault();
});