const mobileMenuElement = document.getElementById('mobile-menu-btn');



mobileMenuElement.addEventListener('click',mobileNav)


function mobileNav() {
  const navMenuElement = document.getElementById('mobile-menu')
  navMenuElement.classList.toggle('open');

}