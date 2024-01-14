const rajztabla = document.querySelector("#rajztabla");
console.log(rajztabla)

const rajzolo = rajztabla.getContext("2d");
let speed = document.querySelector("#speed").value;
console.log(speed)

let x = 5;
let y = 5;
let vxb = 0;
let vxj = 0;
let vy = 0;
let color = document.querySelector("#color").value;
let rajzszeles = document.querySelector("#rajzw").value;
let rajzmagas = document.querySelector("#rajzh").value;

addEventListener("keydown", function (e) {
  if (e.code == "KeyD") vxj = +speed;
  if (e.code == "KeyA") vxb = -speed;
  if (e.code == "KeyW") vy = -speed;
  if (e.code == "KeyS") vy = +speed;
  if (e.code == "KeyR") Clear();
  console.log(vxb,vxj,vy);
});

addEventListener("keyup", function (e) {
  if (e.code == "KeyD") vxj = 0;
  if (e.code == "KeyA") vxb = 0;
  if (e.code == "KeyW") vy = 0;
  if (e.code == "KeyS") vy = 0;
});

function rajzol() {
  x += vxb;
  x += vxj;
  y += vy;

  color = document.querySelector("#color").value;
  rajzszeles = document.querySelector("#rajzw").value;
  rajzmagas = document.querySelector("#rajzh").value;
  speed = document.querySelector("#speed").value;

  rajzolo.fillRect(x, y, rajzszeles, rajzmagas);
  rajzolo.fillStyle=color;

  if (x < -vxj) x = 310;
  if (x > 310) x = -vxj;
  if (y < -vy) y = 145;
  if (y > 144) y = -vy;

  requestAnimationFrame(rajzol);
}

function Clear(){
    rajzolo.clearRect(0, 0, rajztabla.width, rajztabla.height);
    x=5;
    y=5;
    document.querySelector("#rajzw").value=5;
    document.querySelector("#rajzh").value=5;
    document.querySelector("#speed").value=5;
    document.querySelector("#color").value="#000000"
}

rajzol()