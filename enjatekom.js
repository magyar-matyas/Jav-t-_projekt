document.addEventListener('DOMContentLoaded', () => {
    const nits = document.querySelector('.nits');
    const grid = document.querySelector('.grid');
    const alert = document.querySelector('#alert');

    let position = 0;
    let gravity = 0.9;
    let isJumping = false;
    let isGameOver = false;
    let score = 0;

    function JatekosMozgatas(event){
        if(event.keyCode == 37){ //bal
            jatekosPozicio -= 200;
            if(jatekosPozicio >= 0){
                jatekos.style.left = jatekosPozicio + 'px';
                console.log(jatekosPozicio)
            }
            else jatekosPozicio += 200;
        }
        if(event.keyCode == 39){ //jobb
            jatekosPozicio += 200;
            if(jatekosPozicio < 600){
                jatekos.style.left = jatekosPozicio + 'px';
                console.log(jatekosPozicio)
            }
            else jatekosPozicio -= 200;
        }
    }

    function control(event){
        if(event.keyCode == 32){ //a szóköz kódja a 32
            if(!isJumping){
                isJumping = true;
                jump();
            }
        }
    }

    function generateSalata(){
        let randomTime = (Math.random()*2000)+500;
        let salataPosition = 1500;
        let salata = document.createElement('div');

        if(!isGameOver){
            salata.classList.add('salata');
            salata.style.left=salataPosition + 'px';
            grid.appendChild(salata);
        }
        let timer = setInterval(() => {
            if(salataPosition > 0 && salataPosition < 60 && position < 60){
                clearInterval(timer);
                alert.innerHTML  = 'Game Over! Score: ' + score;
                isGameOver = true;
                while(grid.firstChild){
                    grid.removeChild(grid.lastChild);
                }
            }
            if(salataPosition == 0){
                score++;
                alert.innerHTML = score;
            }
            salataPosition -= 10;
            salata.style.left = salataPosition + 'px';
        }, 30)

        if(!isGameOver){
            setTimeout(generateSalata, randomTime);
        }
    }

    document.addEventListener('keyup', control);
    generateSalata();

})