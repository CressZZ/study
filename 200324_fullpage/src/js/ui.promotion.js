import { state } from './common/store';
// import { TimelineMax, TweenMax, CSSPlugin, Power2 } from 'gsap/all';
import Swiper from 'swiper/js/swiper.js';
import ShareExtend from './modules/ShareExtend';
import 'jquery-modal';

// TreeShaking
// [ CSSPlugin ];

(($) => {
  $(async () => {
    const { appName, userAgent } = navigator;

    Object.assign(state, {
      isMobile: $(window).width() <= 960,
      isIE: (appName === 'Netscape' && userAgent.search('Trident') !== -1) || (userAgent.indexOf('msie') !== -1),
      $window: $(window),
      $document: $(document),
      $body: $('body')
    });

    await swiper();
    share();
    modal();
    windowResize();
  });

  function swiper () {
    return new Promise((resolve) => {
      const swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 10,
        centeredSlides: true,
        breakpoints: {
          960: {
            centeredSlides: false
          }
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
        },
      });

      Object.assign(state, { swiper });

      resolve();
    });
  }

  function share () {
    new ShareExtend({
      $wrap: $('#share'),
      shareData: window._shareData,
      haveCopyUrl: true
    });

    $('.show-share-layer').on('click', function () {
      $('#share').fadeIn();
    });
    $('.layer').on('click', '.share-close, .share-dimmed', function () {
      $('#share').fadeOut();
    });
  }

  function modal () {
    $('a[data-modal]').on('click', function (event) {
      event.preventDefault();

      const $this = $(this);
      const $modal = $($this.attr('href'));
      const type = $this.data('type');
      const youtubeId = $this.data('youtube-id');

      if (type === 'youtube' && youtubeId) {
        $modal.empty().append(`<iframe class="movie" src="https://www.youtube.com/embed/${youtubeId}?vq=hd720&autoplay=1&version=3&rel=0&enablejsapi=1"></iframe>`);
      }

      $this.modal({
        closeExisting: false,
        fadeDuration: 300,
        fadeDelay: 0.5,
        blockerClass: 'modal',
        modalClass: `inner ${type}`,
        closeClass: type,
        closeText: '닫기',
      });
    });
  }

  function windowResize () {
    const { $window, swiper } = state;
    const $fullscreenVideo = $('.video.fullscreen');

    $window.on('resize', function () {
      const windowRatio = $window.width() / $window.height();
      const videoRatio = $fullscreenVideo.width() / $fullscreenVideo.height();

      (videoRatio > windowRatio) ? $fullscreenVideo.css({ width: 'auto', height: '100%' }) : $fullscreenVideo.css({ width: '100%', height: 'auto' });

      console.log(swiper);
    });
  }
})(window.jQuery);
