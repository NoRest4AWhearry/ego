/**
 * Created by Allen on 12/27/2016.
 */
/** Document Ready Functions **/
/********************************************************************/

$(document).ready(function () {
  egoMobileLoad();
  $('#ego').addClass('hidden');
  $(header).addClass('hidden');
  $('#ego').fadeIn(1000).removeClass('hidden');
  // Resive video
  scaleVideoContainer();
  initBannerVideoSize('.video-container video');

  $(window).on('resize', function() {
    scaleVideoContainer();
    scaleBannerVideoSize('.video-container video');
  });

});

/** Reusable Functions **/
/********************************************************************/

function scaleVideoContainer() {

  var height = $(window).height();
  var unitHeight = parseInt(height) + 'px';
  $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

  $(element).each(function(){
    $(this).data('height', $(this).height());
    $(this).data('width', $(this).width());
  });

  scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

  var windowWidth = $(window).width(),
    windowHeight = $(window).height(),
    videoWidth,
    videoHeight;

  console.log(windowHeight + ' x ' + windowWidth);

  $(element).each(function(){
    var videoAspectRatio = $(this).data('height')/$(this).data('width'),
      windowAspectRatio = windowHeight/windowWidth;

    if (videoAspectRatio > windowAspectRatio) {
      videoWidth = windowWidth;
      videoHeight = videoWidth * videoAspectRatio;
      $(this).css({'top' : -(videoHeight - windowHeight) / 2 + 'px', 'margin-left' : 0});
    } else {
      videoHeight = windowHeight;
      videoWidth = videoHeight / videoAspectRatio;
      $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});
    }

    $(this).width(videoWidth);

    $('.homepage-hero-module .video-container video').addClass('fadeIn animated');


  });
}



// grab navigation bar
var header = document.querySelector('nav');
// listen for scroll event
window.addEventListener('scroll', function () {
  if (window.scrollY >= 90) {
    $(header).fadeIn(1000).removeClass('hidden');
  }
  // fix navbar to top of screen when passes header position.
  //if (window.scrollY > (document.querySelector('main').offsetTop - header.clientHeight)) {
  //   header.classList.remove('navbar-default');
  //   header.classList.add('navbar-inverse');
  //    $("#ego").fadeOut();
  //} else {
  //    // header.classList.remove('navbar-fixed-top');
  //    header.classList.remove('navbar-inverse');
  //    header.classList.add('navbar-default');
  //    $("#ego").fadeIn(1500);
  //}


}, false);

// Navigation JS
var icon = document.querySelector('.icon');
icon.addEventListener('click', function () {
  var topNav = document.getElementById("myTopnav");
  var bars = document.querySelector('.navCollapse');
  if (topNav.className === "navigation") {
    topNav.className += " responsive";
  } else {
    topNav.className = "navigation";
  }
  bars.classList.toggle('change');
  if (bars.className === "navCollapse change") {
    document.getElementById("myTopnav").style.width = "176px";
    document.querySelector('header').style.marginLeft = "176px";
  } else {
    document.getElementById("myTopnav").style.width = "";
    document.querySelector('header').style.marginLeft = "";
  }
}, false);


// Background Image Slider
var imagesIndex = 0;
showImgSlides();
function showImgSlides() {
  var i;
  var images = document.getElementsByClassName("mySlides");
  for (i = 0; i < images.length; i++) {
    images[i].style.display = "none";
  }
  imagesIndex++;
  if (imagesIndex> images.length) {imagesIndex = 1;}
  images[imagesIndex-1].style.display = "block";
  setTimeout(showImgSlides, 4000); // Change image every 2 seconds
}

// image load on mobile
function egoMobileLoad() {
  var loaderImg = document.querySelector('#egomobileload');
  var image = Math.floor(Math.random() * 5 + 1);
  loaderImg.style.backgroundImage = "url(../img/egoload"+image+".jpg)";
  loaderImg.style.top = window.pageYOffset + 'px';
  loaderImg.style.left = window.pageXOffset + 'px';
  $(loaderImg).delay(2000).fadeOut(500);
  window.addEventListener('scroll', function() {
    if (loaderImg) {
      loaderImg.style.top = window.pageYOffset + 'px';
      loaderImg.style.left = window.pageXOffset + 'px';
    }
  }, false);
}

























