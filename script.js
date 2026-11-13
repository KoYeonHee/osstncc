document.querySelector('.menu-btn').addEventListener('click',()=> {
  const nav=document.querySelector('.nav');
  nav.classList.toggle('open');
});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{
  document.querySelector('.nav').classList.remove('open');
}));

const roomModal=document.getElementById('roomModal');
const modalImage=document.getElementById('modalImage');
const modalTitle=document.getElementById('modalTitle');
function openRoom(n){ modalImage.src=`images/${n}호.webp`; modalImage.alt=`${n}호 회의실 상세 안내`; modalTitle.textContent=`${n}호 회의실`; roomModal.classList.add('open'); roomModal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open'); }
function closeRoom(){ roomModal.classList.remove('open'); roomModal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); modalImage.src=''; }
document.querySelectorAll('.room-card').forEach(card=>{card.addEventListener('click',()=>openRoom(card.dataset.room));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ') {e.preventDefault();openRoom(card.dataset.room)}})});
roomModal.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeRoom));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeRoom();});


// 메인 비주얼: 5초 간격 페이드 전환
(() => {
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const dots = Array.from(document.querySelectorAll('.hero-dot'));
  const hero = document.querySelector('.hero');
  if (slides.length < 2 || !hero) return;

  let current = 0;
  let timer = null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
      dot.setAttribute('aria-pressed', i === current ? 'true' : 'false');
    });
  }
  function stopAuto() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }
  function startAuto() {
    stopAuto();
    if (!reducedMotion) timer = window.setInterval(() => showSlide(current + 1), 5000);
  }

  dots.forEach(dot => dot.addEventListener('click', () => {
    showSlide(Number(dot.dataset.slide || 0));
    startAuto();
  }));
  hero.querySelector('.hero-prev')?.addEventListener('click', () => {
    showSlide(current - 1); startAuto();
  });
  hero.querySelector('.hero-next')?.addEventListener('click', () => {
    showSlide(current + 1); startAuto();
  });
  hero.addEventListener('mouseenter', stopAuto);
  hero.addEventListener('mouseleave', startAuto);
  hero.addEventListener('focusin', stopAuto);
  hero.addEventListener('focusout', startAuto);
  showSlide(0);
  startAuto();
})();
