// slider + dots
const slidesEl = document.getElementById('slides');
const slides = slidesEl ? slidesEl.children : [];
const dotsWrap = document.getElementById('dots');
let idx = 0;

function buildDots(){
  if(!dotsWrap) return;
  for(let i=0;i<slides.length;i++){
    const d = document.createElement('div');
    d.className = 'dot';
    d.dataset.i = i;
    d.onclick = () => go(i);
    dotsWrap.appendChild(d);
  }
}
function renderDots(){
  if(!dotsWrap) return;
  Array.from(dotsWrap.children).forEach((d,i)=>d.classList.toggle('active', i===idx));
}
function go(i){
  idx = i;
  if(slidesEl) slidesEl.style.transform = `translateX(-${i*100}%)`;
  renderDots();
}
function next(){
  idx = (idx + 1) % slides.length;
  go(idx);
}
if(slides.length){
  buildDots();
  renderDots();
  setInterval(next, 5000);
}

// simple hash router (internal pages)
const sections = document.querySelectorAll('section');
function showSection(id){
  sections.forEach(s => {
    if(s.id === id) s.classList.add('active');
    else s.classList.remove('active');
  });
  document.querySelectorAll('nav a').forEach(a => a.classList.toggle('active', a.dataset.target === id));
}
window.addEventListener('hashchange', () => {
  const h = location.hash.replace('#','') || 'home';
  showSection(h);
});
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', () => {
    document.querySelectorAll('nav a').forEach(x => x.classList.remove('active'));
    a.classList.add('active');
  });
});
// initial show
showSection(location.hash.replace('#','') || 'home');
