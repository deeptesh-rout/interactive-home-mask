console.clear();
const svg = document.querySelector("#demo");
const tl = gsap.timeline({onUpdate:onUpdate});
let pt = svg.createSVGPoint();
let data = document.querySelector(".tlProgress");
let counter = document.querySelector("#counter");
const ratio = 0.5625;

gsap.set("#instructions, #dial", {xPercent: -50});
gsap.set("#progressRing", {drawSVG:0});

tl.to("#masker", {duration: 2, attr:{r:2400}, ease:"power2.in"});
tl.reversed(true);

function mouseHandler() {
  tl.reversed(!tl.reversed());
}

function getPoint(evt){
  pt.x = evt.clientX; 
  pt.y = evt.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

function mouseMove(evt) {
  let newPoint = getPoint(evt);
  gsap.set("#dot", {attr:{cx:newPoint.x, cy:newPoint.y}});
  gsap.to("#ring, #masker", 0.88, {attr:{cx:newPoint.x, cy:newPoint.y}, ease:"power2.out"});
 }

function onUpdate() {
  let prog = (tl.progress() * 100);
  gsap.set("#progressRing", {drawSVG:prog + "%"});
  counter.textContent = prog.toFixed();
}

function newSize() {
  let w = window.innerWidth ;
  let h = window.innerHeight;
  if (w > h * (16/9) ) {
    gsap.set("#demo", { attr: { width: w, height: w * ratio } });
  } else {
    gsap.set("#demo", { attr: { width: h / ratio, height: h } });
  }
  let data = svg.getBoundingClientRect();
  gsap.set("#demo", {x:w/2 - data.width/2});
  gsap.set("#demo", {y:h/2 - data.height/2});
}

window.addEventListener("mousedown", mouseHandler);
window.addEventListener("mouseup", mouseHandler);
window.addEventListener("mousemove", mouseMove);

newSize();
window.addEventListener("resize", newSize);