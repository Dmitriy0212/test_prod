import Swiper from 'swiper/bundle';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/keyboard';
import { initRatings } from './starsrendering';
import { getFeedbacksList } from './baseUrl';

export async function initFeedbacksSwiper() {
  const sliderWrapper = document.querySelector('.slider__wrapper-reviews');
  if (!sliderWrapper) {
    console.error('sliderWrapper не найден!');
    return;
  }

  let slidesData = [];
  try {
    slidesData = await getFeedbacksList(1, 12);
  } catch (error) {
    console.log('Помилка в doStuff:', error);
  }

  if (!Array.isArray(slidesData)) slidesData = [];

  sliderWrapper.innerHTML = a(slidesData);
  const ratingsBloc = document.querySelector('.slider__wrapper-reviews');
  initRatings(ratingsBloc);
  const swiper = new Swiper('.slider-reviews-cont', {
    pagination: {
      el: '.slider-reviews-cont .swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 7,
    },
    keyboard: true,
    navigation: {
      nextEl: '.slider__btn--next',
      prevEl: '.slider__btn--prev',
    },
    on: {
      init() {
        updateButtons(this);
      },
      slideChange() {
        updateButtons(this);
      },
    },
    breakpoints: {
      300: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 0 },
      768: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 24 },
      1440: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 24 },
    },
  });
}
function updateButtons(swiper) {
  const prevBtn = document.querySelector('.slider__btn--prev');
  const nextBtn = document.querySelector('.slider__btn--next');
  prevBtn.disabled = swiper.isBeginning;
  nextBtn.disabled = swiper.isEnd;
}
function a(slidesData) {
  return slidesData
    .map(slide => {
      return `<li class="slider__slide swiper-slide">
  <div class="rating-rate" data-rating="${slide.rate}"></div>
  <p class="slider__title">${slide.descr}</p>
  <p class="slider__price">${slide.name}</p>
</li>`;
    })
    .join('');
}
