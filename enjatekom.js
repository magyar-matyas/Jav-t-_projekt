var jatekos = document.getElementById("jatekos");
var jatekPalya = document.getElementById("jatekPalya");
var pontszam = 0;
var jatekVege = false;

function kepGeneral(type) {
    var zoldsegek = document.createElement("div");
    zoldsegek.classList.add("item");
    zoldsegek.classList.add(type);

    var random = Math.floor(Math.random() * (jatekPalya.clientHeight - 50));
    zoldsegek.style.top = random + "px";
    zoldsegek.style.left = jatekPalya.clientWidth + "px";

    jatekPalya.appendChild(zoldsegek);

    return zoldsegek;
}

function mozgatas() {
    var ember = document.querySelectorAll(".item");

    ember.forEach(function (item) {
        var balPozicio = parseInt(item.style.left);
        item.style.left = balPozicio - 5 + "px";

        if (
            balPozicio < jatekos.offsetLeft + jatekos.offsetWidth &&
            balPozicio + item.offsetWidth > jatekos.offsetLeft &&
            item.offsetTop < jatekos.offsetTop + jatekos.offsetHeight &&
            item.offsetHeight + item.offsetTop > jatekos.offsetTop
        ) {
            if (item.classList.contains("repa")) {
                pontszam++;
                item.remove();
                ujPontszam();
            } else if (item.classList.contains("salata")) {
                vegetErtJatek();
            }
        }

        if (balPozicio < 0) {
            item.remove();
        }
    });

    if (!jatekVege) {
        requestAnimationFrame(mozgatas);
    }
}

function ujPontszam() {
    document.getElementById("pontszam").innerText = "Pontszám: " + pontszam;
}

function vegetErtJatek() {
    jatekVege = true;
    alert("A játéknak vége! Maximális pontszámod: " + pontszam);
    ujJatek();
}

function ujJatek() {
    jatekVege = false;
    pontszam = 0;
    ujPontszam();
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" && jatekos.offsetTop > 0) {
        jatekos.style.top = jatekos.offsetTop - 10 + "px";
    } else if (event.key === "ArrowDown" && jatekos.offsetTop < jatekPalya.clientHeight - jatekos.offsetHeight) {
        jatekos.style.top = jatekos.offsetTop + 10 + "px";
    }
});

setInterval(function () {
    kepGeneral("repa");
}, 1500);

setInterval(function () {
    kepGeneral("salata");
}, 1000);

mozgatas();