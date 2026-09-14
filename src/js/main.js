// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// Card tilt on mouse move
const card = document.querySelector('.loyalty-card');
if (card) {
  document.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / window.innerWidth;
    const dy = (e.clientY - cy) / window.innerHeight;
    card.style.transform = `perspective(800px) rotateY(${dx * 12}deg) rotateX(${-dy * 8}deg)`;
  });
}

// Counter animation
function animateCounter(el, end, suffix) {
  let start = 0;
  const duration = 1800;
  const step = end / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, end);
    el.textContent = Math.floor(start).toLocaleString('fr') + suffix;
    if (start >= end) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const nums = e.target.querySelectorAll('.counter-num');
      animateCounter(nums[0], 12, 'K+');
      animateCounter(nums[1], 84, '%');
      nums[2].textContent = '7e';
      counterObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });

const heroCounter = document.querySelector('.hero-counter');
if (heroCounter) counterObserver.observe(heroCounter);
