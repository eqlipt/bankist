'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Cookie message
// const header = document.querySelector('.header');
// const allSections = document.getElementsByClassName('section');

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   'We all use cookies nowadays... <button class="btn btn--close-cookie">Got it</button>';
// header.prepend(message);
// // header.append(message.cloneNode(true));
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', () => message.remove());
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Smooth scrolling
// Event delegation
const links = document.querySelector('.nav__links');
links.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabs
const tabsContainer = document.querySelector('.operations__tab-container');
const operationTabs = document.querySelectorAll('.operations__tab');
const operationContentBlocks = document.querySelectorAll(
  '.operations__content'
);
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  const targetId = clicked.dataset.tab;
  console.log(targetId);

  if (!clicked) return;

  operationTabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  operationContentBlocks.forEach(block =>
    block.classList.remove('operations__content--active')
  );
  document
    .querySelector(`.operations__content--${targetId}`)
    .classList.add('operations__content--active');
});

// Links opcaity
const nav = document.querySelector('.nav');
const linkElements = document.querySelectorAll('.nav__link');
const handleHoverLinks = function (event) {
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHoverLinks.bind(0.5));
nav.addEventListener('mouseout', handleHoverLinks.bind(1));

// Sticky navigation
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else {
    nav.classList.remove('sticky');
  }
};
const navObserverOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const navObserver = new IntersectionObserver(stickyNav, navObserverOptions);
navObserver.observe(header);

// Unhide sections on approach
const allSections = document.querySelectorAll('.section');

const unhideSections = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserverOptions = {
  root: null,
  threshold: 0.15,
};
const sectionObserver = new IntersectionObserver(
  unhideSections,
  sectionObserverOptions
);
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading
const lazyImages = document.querySelectorAll('img[data-src]');

const lazyLoad = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(lazyLoad, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

lazyImages.forEach(img => {
  imageObserver.observe(img);
});

// Slider
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const sliderBtnRight = document.querySelector('.slider__btn--right');
const sliderBtnLeft = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelector('.dots');
const lastSlide = slides.length - 1;
let slideShift = 0;

const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
const activateDot = function (slide) {
  const dots = document.querySelectorAll('.dots__dot');
  dots.forEach(d => {
    d.classList.remove('dots__dot--active');
    // d.dataset.slide == slide && d.classList.add('dots__dot--active');
  });
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const goToSlide = function (slideNumber) {
  slides.forEach((slide, slideIndex) => {
    slide.style.transform = `translateX(${(slideIndex - slideNumber) * 100}%)`;
  });
};
const nextSlide = function () {
  if (slideShift === lastSlide) {
    slideShift = 0;
  } else {
    slideShift++;
  }
  goToSlide(slideShift);
  activateDot(slideShift);
};
const prevSlide = function () {
  if (slideShift === 0) {
    slideShift = lastSlide;
  } else {
    slideShift--;
  }
  goToSlide(slideShift);
  activateDot(slideShift);
};

const init = function () {
  createDots();
  activateDot(slideShift);
  goToSlide(slideShift);
};

init();

sliderBtnRight.addEventListener('click', function () {
  nextSlide();
});
sliderBtnLeft.addEventListener('click', function () {
  prevSlide();
});
document.addEventListener('keydown', function (e) {
  e.key === 'ArrowLeft' && prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});
dotContainer.addEventListener('click', function (e) {
  slideShift = e.target.dataset.slide;
  e.target.classList.contains('dots__dot') && goToSlide(slideShift);
  activateDot(slideShift);
});
