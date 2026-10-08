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
function openRoom(n){ modalImage.src=`images/${n}호.png`; modalImage.alt=`${n}호 회의실 상세 안내`; modalTitle.textContent=`${n}호 회의실`; roomModal.classList.add('open'); roomModal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open'); }
function closeRoom(){ roomModal.classList.remove('open'); roomModal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); modalImage.src=''; }
document.querySelectorAll('.room-card').forEach(card=>{card.addEventListener('click',()=>openRoom(card.dataset.room));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ') {e.preventDefault();openRoom(card.dataset.room)}})});
roomModal.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeRoom));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeRoom();});
