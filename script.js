const header = document.querySelector('.site-header');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const form = document.querySelector('#contactForm');
const formMessage = document.querySelector('#formMessage');

const syncHeaderState = () => {
  if (!header) {
    return;
  }

  header.classList.toggle('scrolled', window.scrollY > 24);
};

window.addEventListener('scroll', syncHeaderState, { passive: true });
syncHeaderState();

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (window.AOS) {
  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
  });
}

document.querySelectorAll('.feature-card, .pricing-card, .process-step, .stat-card').forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const bounds = card.getBoundingClientRect();
    const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -5;
    const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 5;
    card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

if (form && formMessage) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    formMessage.textContent = 'Thanks. Your inquiry has been queued for a product specialist.';
    form.reset();
  });
}