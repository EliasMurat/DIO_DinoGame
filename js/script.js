const dino = document.querySelector('.dino');
const backgound = document.querySelector('.background');

let isJumping = false;
let position = 10;
let score = 0;

function jumpBtn() {
    if (!isJumping) {
        jump();
    }
}

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
        if (position >= 180) {
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
    let cactusPosition = screen.width - 64;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    backgound.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -64) {
            clearInterval(leftInterval);
            backgound.removeChild(cactus);
            score++;
            document.querySelector('.pontuacao').innerHTML = "SCORE: " + score;
        } else if (cactusPosition >= 10 && cactusPosition <= 64 && position < 64) {
            clearInterval(leftInterval);
            var codHtml = '<div class="gamebox"><h1>Fim de jogo!</h1><br><p>Parabéns sua pontuação foi: ' + score + '</p><input type="button" class="btn" onClick="resetGame()" value="VOLTAR AO MENU"></div>';
            document.body.innerHTML = codHtml;
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);
    setTimeout(createCactus, randomTime);
}

function tutorialGame() {
    var codHtml = '<div class="gamebox"><h2>Tutorial</h2><br><p>-Aperte espaço para pular.</p><p>-Se estiver no modo mobile aperte o botão no canto direito inferior.</p><input type="button" class="btn" onClick="resetGame()" value="VOLTA AO MENU"></div>';
    document.body.innerHTML = codHtml;
}

function aboutGame() {
    var codHtml = '<div class="gamebox about"><h2>Sobre</h2><br><p>Projeto desenvolvido no bootcamp "GFT START_UNI 2021 #1", realizado pela DIO com parceria com a GFT, objetivo do projeto foi recriar o jogo do dinossauro do Google quando estamos sem internet.</p><a target="_blank" href="https://github.com/EliasMurat"><input type="button" class="btn" value="GITHUB"></a><a target="_blank" href="https://www.linkedin.com/in/elias-murat-41ba691a8/"><input type="button" class="btn" value="LINKEDIN"></a><input type="button" class="btn" onClick="resetGame()" value="VOLTA AO MENU"></div>';
    document.body.innerHTML = codHtml;
}

function resetGame() {
    document.location.reload();
}

function startGame() {
    document.querySelector('.start').style.display = 'none';
    document.querySelector('.btnJump').style.display = 'block';
    createCactus();
}

document.addEventListener('keydown', handleKeyUp);