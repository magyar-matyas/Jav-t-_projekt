let bg_speed = 3;
let gravity = 0.5;
let nits = document.querySelector('.nits');
let nits_props = nits.getBoundingClientRect();
let background = document.querySelector('.background').getBoundingClientRect();
let message = document.querySelector('.message');
let score_value = document.querySelector('.score_value');
let score_title = document.querySelector('.score_title');
let highscore_value = document.querySelector('.highscore_value'); 
let highscore_title = document.querySelector('.highscore_title');
let game_state = 'Start'; 

score_title.innerHTML = 'Score : ';
score_value.innerHTML = '0';
highscore_value.innerHTML = localStorage.getItem('HighScore');
highscore_title.innerHTML = 'HighScore : ';
 
document.addEventListener('keydown', (event) => {
    if (event.keyCode == 13 && game_state != 'Play') {
        document.querySelectorAll('.barrier') .forEach((event) => {
            event.remove();
        });
        nits.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        play();
    } 
}); 
function play() {
function move() {
	if (game_state != 'Play') return;
	let barrier = document.querySelectorAll('.barrier');
	barrier.forEach((element) => {
	let barrier_props = element.getBoundingClientRect();
	nits_props = nits.getBoundingClientRect();
	if (barrier_props.right <= 0){
		element.remove();
	}
    else {
		if (nits_props.left < barrier_props.left +
        barrier_props.width &&
        nits_props.left +
        nits_props.width > barrier_props.left &&
        nits_props.top < barrier_props.top +
        barrier_props.height &&
        nits_props.top +
        nits_props.height > barrier_props.top) {
            game_state = 'End';
            message.innerHTML = 'Press Enter To Restart';
            return;
		}
        else {
            if (barrier_props.right < nits_props.left &&
                barrier_props.right +
                bg_speed >= nits_props.left &&
                element.increase_score == '1'){
                    score_value.innerHTML++;
                    if (score_value.innerHTML > highscore_value.innerHTML){
                        highscore_value.innerHTML = score_value.innerHTML;
                        localStorage.setItem('HighScore', score_value.innerHTML);
                    }
                }
            element.style.left = barrier_props.left - bg_speed + 'px';
		}
	}
	});
	requestAnimationFrame(move); 
} requestAnimationFrame(move); 

let nits_dy = 0;
function apply_gravity() {
	if (game_state != 'Play') return;
	nits_dy = nits_dy + gravity;
	document.addEventListener('keydown', (event) => {
	if (event.keyCode == 32) {
		nits_dy = -7.6;
        nits.src = "img/nits.png"
        setTimeout(() => {
            nits.src = "img/nits2.png";
        }, 150)
	}
	});

	if (nits_props.top <= 0 || nits_props.bottom >= background.bottom) {
        game_state = 'End';
        message.innerHTML = 'Press Enter To Restart';
        return;
	}
	nits.style.top = nits_props.top + nits_dy + 'px';
	nits_props = nits.getBoundingClientRect();
	requestAnimationFrame(apply_gravity);
} 
requestAnimationFrame(apply_gravity);

let barrier_seperation = 0;
let barrier_gap = 25;
function create_barrier() {
	if (game_state != 'Play') return;
	if (barrier_seperation > 150) {
        barrier_seperation = 0
        let barrier_posi = Math.floor(Math.random() * 43) + 8;
        let barrier_inv = document.createElement('div');
        barrier_inv.className = 'barrier';
        barrier_inv.style.top = barrier_posi - 70 + 'vh';
        barrier_inv.style.left = '100vw';
        document.body.appendChild(barrier_inv);
        let barrier = document.createElement('div');
        barrier.className = 'barrier';
        barrier.style.top = barrier_posi + barrier_gap + 'vh';
        barrier.style.left = '100vw';
        barrier.increase_score = '1';
        document.body.appendChild(barrier);
	}
    barrier_seperation++; 
	requestAnimationFrame(create_barrier);
}
requestAnimationFrame(create_barrier);
}