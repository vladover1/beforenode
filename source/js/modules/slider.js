import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

Swiper.use(Navigation);

const initSlider = (sliderElement) => {
  const sliderBodyElement = sliderElement.querySelector('.slider__body');

  const sliderOptions = {
    breakpoints: {
      768: {
        slidesPerView: 2,
        slidesPerGroup: 2
      }
    },
    grabCursor: true,
    loop: true,
    navigation: {
      nextEl: sliderElement.querySelector('.slider__control--next'),
      prevEl: sliderElement.querySelector('.slider__control--prev'),
    },
    slideClass: 'slider__item',
    slideVisibleClass: 'slider__item--visible',
    spaceBetween: 30,
    wrapperClass: 'slider__list',
    watchSlidesProgress: true
  };

  return new Swiper(sliderBodyElement, sliderOptions);
};

export const initSliders = () => {
  document.querySelectorAll('.slider').forEach(initSlider);
};
