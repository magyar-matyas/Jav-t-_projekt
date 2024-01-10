const jatekter = document.querySelector("#jatekkocka");
const layover = document.querySelector("#layover");
const layover2 = document.querySelector("#layover2");

const ctx = jatekter.getContext("2d");
const bg = jatekter.getContext("2d");
const target = layover.getContext("2d");
const block = layover2.getContext("2d");
const block2 = layover2.getContext("2d");
const block3 = layover2.getContext("2d");
const block4 = layover2.getContext("2d");

let pontszam = document.querySelector("#pontszam");
let visszalink = document.querySelector("#visszagomb");

let x = 5;
let y = 5;
let wide = 10;
let tall = 15;
let tx = 150;
let ty = 150;
let vxb = 0;
let vxj = 0;
let vy = 0;
let pont = 0;

addEventListener("keydown", function(e){
    if(e.code == "KeyD") vxj=10;
    if(e.code == "KeyA") vxb=-10;
    if(e.code == "KeyW") vy=-10;
    if(e.code == "KeyS") vy=10;
    console.log(e.code)
});

addEventListener("keyup", function(e){
    if(e.code == "KeyD") vxj=0;
    if(e.code == "KeyA") vxb=0;
    if(e.code == "KeyW") vy=0;
    if(e.code == "KeyS") vy=0;
})

function update(){
    ctx.clearRect(0,0,jatekter.width, jatekter.height)

    x+=vxb;
    x+=vxj;
    y+=vy;

    ctx.fillRect(x,y,wide,tall);
    ctx.lineJoin="bevel"
    block.fillRect(150,200,30,200)
    block2.fillRect(400,150,30,200)
    block3.fillRect(65,65,200,30)
    block4.fillRect(240,400,200,30)

    if(x<1) x=489;
    if(x>489) x=1;
    if(y<1) y=485;
    if(y>485) y=1;

    if(x+10>=tx && x+10<=(tx+50) && y+20<(ty+70) && y+20>=ty || x>=tx && x<=(tx+50) && y<(ty+70) && y>=ty){
        pont++; 
        targetupdate()
    }

    if(x+10>=150 && x+10<=190 && y+20<395 && y+20>=200 || x>=130 && x<=180 && y<395 && y>=190) {
        if(x+10>135) x=138
    }

    if(x+10>=55 && x+10<=255 && y+20<75 && y+20>=45 || x>=65 && x<=255 && y<95 && y>=55) {
        if(y+20>60) y=38
    }

    if(x+10>=400 && x+10<=430 && y+20<350 && y+20>=150 || x>=400 && x<=430 && y<350 && y>=135) {
        if(x+10>400) x=432 
    }

    if(x+10>=240 && x+10<=440 && y+20<430 && y+20>=400 || x>=250 && x<=440 && y<450 && y>=410) {
    if(y<430) y=438
    }

    pontszam.innerHTML="Pontszámod: "+pont

    requestAnimationFrame(update);
}

function targetupdate(){
    target.clearRect(tx,ty,layover.width,layover.height)
    target.fillStyle="green"

    tx= Math.floor(Math.random()*jatekter.width);
    ty= Math.floor(Math.random()*(jatekter.height-70));

    if(tx>5&&tx+50<480&&ty>5&&ty-70<400) target.fillRect(tx,ty,50,70);
}

if(tx>0&&ty>0) setInterval(targetupdate,800)
setTimeout(function(){visszalink.click()}, 180000)


update()
   