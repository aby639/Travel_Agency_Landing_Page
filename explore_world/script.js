// Sticky blur navbar + scroll-to-top button + progress bar
const nav = document.querySelector('.navbar');
const toTop = document.getElementById('toTop');
const progressBar = document.getElementById('progressBar');

function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 10);
  toTop.classList.toggle('show', window.scrollY > 300);

  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressBar.style.width = scrolled + '%';
}
onScroll();
window.addEventListener('scroll', onScroll);

// Reveal-on-scroll (IntersectionObserver)
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Stats counters
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.count;
    let cur = 0;
    const step = Math.max(1, Math.round(target / 100));
    const timer = setInterval(() => {
      cur += step;
      if (cur >= target) { cur = target; clearInterval(timer); }
      el.textContent = target >= 1000 ? cur.toLocaleString() : cur;
    }, 12);
    counterIO.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll('.stat').forEach(el => counterIO.observe(el));

// Scroll to top
toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Newsletter toast (UI feedback only)
const newsletter = document.getElementById('newsletter');
if (newsletter) {
  newsletter.addEventListener('submit', (e) => {
    e.preventDefault();
    const toast = document.createElement('div');
    toast.className = 'toast align-items-center text-bg-primary border-0 position-fixed bottom-0 start-50 translate-middle-x mb-4';
    toast.role = 'status';
    toast.innerHTML = '<div class="d-flex"><div class="toast-body">Subscribed! We\'ll email travel deals soon ✈️</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>';
    document.body.appendChild(toast);
    const t = new bootstrap.Toast(toast, { delay: 2500 });
    t.show();
    t._element.addEventListener('hidden.bs.toast', () => toast.remove());
    newsletter.reset();
  });
}

// Gentle hero parallax on mouse move (desktop)
const hero = document.querySelector('.hero');
hero?.addEventListener('mousemove', (e) => {
  const c = hero.getBoundingClientRect();
  const cx = (e.clientX - c.left) / c.width - 0.5;
  const cy = (e.clientY - c.top) / c.height - 0.5;
  hero.querySelectorAll('h1, .lead').forEach(el => {
    el.style.transform = `translate3d(${cx * 8}px, ${cy * 6}px, 0)`;
  });
});
hero?.addEventListener('mouseleave', () => {
  hero.querySelectorAll('h1, .lead').forEach(el => el.style.transform = '');
});

