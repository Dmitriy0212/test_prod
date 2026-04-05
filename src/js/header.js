const header = document.querySelector('.header-section');
const burgerBtn = document.querySelector('.burger-btn');
const closeBtn = document.querySelector('.close-btn'); // мобільне меню
const closeBtnHeader = document.querySelector('.close-btn-header'); // планшет
const overlay = document.querySelector('.overlay');
const mobileMenu = document.querySelector('.mobile-menu');
const menuLinks = document.querySelectorAll('.mobile-nav a');


function openMenu() {
  mobileMenu.classList.add('active');
  overlay.classList.add('active');
  header.classList.add('menu-open');
  document.body.classList.add('no-scroll');
}


function closeMenu() {
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
  header.classList.remove('menu-open');
  document.body.classList.remove('no-scroll');
}


burgerBtn.addEventListener('click', openMenu);


if (closeBtn) closeBtn.addEventListener('click', closeMenu);
if (closeBtnHeader) closeBtnHeader.addEventListener('click', closeMenu);


if (overlay) overlay.addEventListener('click', closeMenu);


menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});