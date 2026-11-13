document.querySelector('.menu-btn').addEventListener('click',()=> {
  const nav=document.querySelector('.nav');
  nav.classList.toggle('open');
});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{
  document.querySelector('.nav').classList.remove('open');
}));

const roomModal=document.getElementById('roomModal');
const modalImage=document.getElementById('modalImage');
const modalImage2=document.getElementById('modalImage2');
const modalTitle=document.getElementById('modalTitle');
function openRoom(n){
  modalImage.src=`images/${n}호.webp`; modalImage.alt=`${n}호 회의실 상세 안내`;
  modalImage2.hidden = n !== '203';
  modalImage2.src = n === '203' ? 'images/203호-2.webp' : '';
  modalTitle.textContent=`${n}호 회의실`;
  roomModal.classList.add('open'); roomModal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
}
function closeRoom(){ roomModal.classList.remove('open'); roomModal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); modalImage.src=''; modalImage2.src=''; modalImage2.hidden=true; }
document.querySelectorAll('.room-card').forEach(card=>{card.addEventListener('click',()=>openRoom(card.dataset.room));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ') {e.preventDefault();openRoom(card.dataset.room)}})});

// 이용요금/회의실 구조 이미지 클릭 시 큰 화면으로 열기
function openPriceRoom(n) {
  modalImage.src=`images/price-${n}.webp`;
  modalImage.alt=`${n}호 이용요금 및 회의실 구조 안내`;
  modalTitle.textContent=`${n}호 이용요금 및 회의실 구조 안내`;
  roomModal.classList.add('open');
  roomModal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
}
document.querySelectorAll('.price-room-card').forEach(card=>{
  const open=()=>openPriceRoom(card.dataset.priceRoom);
  card.addEventListener('click',open);
  card.addEventListener('keydown',e=>{
    if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}
  });
});

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
    if (!reducedMotion) timer = window.setInterval(() => showSlide(current + 1), 3000);
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

// Floating banners can be dismissed independently; they reappear on page refresh.
document.querySelectorAll('.stn-banner-close').forEach(button=>{
  button.addEventListener('click',event=>{
    event.preventDefault();
    event.stopPropagation();
    const banner=button.closest('.stn-kakao-banner, .stn-reservation-qr');
    if(banner) banner.style.setProperty('display','none','important');
  });
});
