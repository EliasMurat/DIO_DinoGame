const dino = document.querySelector('.dino');
const backgound = document.querySelector('.background');

let isJumping = false;
let position = 10;
let score = 0;

console.log(score);

function handleKeyUp(event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;
    let upInterval = setInterval(() => {
        if (position >= 160) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (position <= 10) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = screen.width - 60;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    backgound.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -70) {
            clearInterval(leftInterval);
            backgound.removeChild(cactus);
            score++;
            console.log(score);
            document.querySelector('.pontuacao').innerHTML = "SCORE: " + score;
        } else if (cactusPosition >= 10 && cactusPosition <= 70 && position < 70) {
            clearInterval(leftInterval);
            var codHtml = '<div class="game-over"><h1>Fim de jogo!</h1><br><br><p>Parabéns sua pontuação foi: ' + score + '<br><input type="button" class="btn" onClick="resetGame()" value="JOGAR NOVAMENTE"></div>';
            document.body.innerHTML = codHtml;
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);
    setTimeout(createCactus, randomTime);
}

function resetGame(){
    document.location.reload(true);
}

createCactus();

document.addEventListener('keydown', handleKeyUp);