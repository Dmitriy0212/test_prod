import Swiper from 'swiper/bundle';
import 'swiper/css';
import 'swiper/css/pagination';
import { getPopularProducts } from './baseUrl';
import { productmodalRender } from './productmodalrendering';

export async function initSwiper() {
  const sliderWrapper = document.querySelector('.slider__wrapper');
  if (!sliderWrapper) {
    console.error('sliderWrapper не знайдено!');
    return;
  }

  let slidesData = [];
  try {
    slidesData = await getPopularProducts();
  } catch (error) {
    console.log('Помилка', error);
  }

  if (!Array.isArray(slidesData)) slidesData = [];

  sliderWrapper.innerHTML = a(slidesData);
  const images = document.querySelectorAll('.slider__image');

  images.forEach(img => {
    const loader = img.previousElementSibling;

    if (img.complete) {
      img.classList.add('is-loaded');
      loader.classList.add('is-hidden');
    } else {
      img.addEventListener('load', () => {
        img.classList.add('is-loaded');
        loader.classList.add('is-hidden');
      });

      img.addEventListener('error', () => {
        loader.classList.add('is-hidden');
      });
    }
  });
  sliderWrapper.addEventListener('click', e => {
    const btn = e.target.closest('.furnitures-item__btn');
    if (!btn) return;
    const id = btn.dataset.id;
    productmodalRender(id);
  });
  const swiper = new Swiper('.slider', {
    pagination: {
      el: '.slider .swiper-pagination',
      clickable: true,
      dynamicMainBullets: 7,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.pagination-slider__btn--next',
      prevEl: '.pagination-slider__btn--prev',
    },

    on: {
      init() {
        clickUpdateButtons(this);
      },
      slideChange() {
        clickUpdateButtons(this);
      },
    },

    breakpoints: {
      300: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 0 },
      768: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 24 },
      1440: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 24 },
    },
  });
  const container = document.querySelector('.slider');

  container.setAttribute('tabindex', '0');

  container.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') swiper.slideNext();
    if (e.key === 'ArrowLeft') swiper.slidePrev();
  });
}

function clickUpdateButtons(swiper) {
  const prevBtn = document.querySelector('.pagination-slider__btn--prev');
  const nextBtn = document.querySelector('.pagination-slider__btn--next');
  prevBtn.disabled = swiper.isBeginning;
  nextBtn.disabled = swiper.isEnd;
}

function a(slidesData) {
  return slidesData
    .map(slide => {
      const images = Array.isArray(slide.images)
        ? slide.images
        : [slide.images];
      const colors = Array.isArray(slide.color) ? slide.color : [slide.color];
      return images
        .map((nameItem, index) => {
          return `
            
  <li class="slider__slide swiper-slide">
    
    <div class="slider__img-wrapper product-img">
      <div class="slider__loader"></div>

      <img 
        class="slider__image" 
        src="${nameItem}" 
        alt="${slide.name}"
        loading="lazy"
      >
    </div>
<h3 class="furnitures-item__title">${slide.name}</h3>
  
      
      
      <ul class="furnitures-item__color-list">
        ${colors
          .map(
            color =>
              `<li class="slider__color" style="background-color: ${color}"></li>`
          )
          .join('')}
      </ul>

      <p class="furnitures-item__price">${slide.price} грн</p>
    

    <button class="furnitures-item__btn buttonWhite" data-id="${slide._id}">
      Детальніше
    </button>
  </li>
`;
        })
        .join('');
    })
    .join('');
}
