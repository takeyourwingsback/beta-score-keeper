const P1 = {
    score: 0,
    name: 'Player #1',
    isWinner: false,

    btn: document.querySelector('#player1_btn'),
    displayName: document.querySelector('#player1_name'),
    displayScore: document.querySelector('#player1_score'),
}

const P2 = {
    score: 0,
    name: 'Player #2',
    isWinner: false,

    btn: document.querySelector('#player2_btn'),
    displayName: document.querySelector('#player2_name'),
    displayScore: document.querySelector('#player2_score'),
}

let maxScore = 7;

const winnerHeadline = document.querySelector('.winner-headline');
const displayWinner = document.querySelector('#display-winner');
const restartBtn = document.querySelector('#restart_btn');

for (let p of [P1, P2]) {
    p.displayName.textContent = p.name;

    p.btn.addEventListener('click', () => {
        if (P1.score < maxScore && P2.score < maxScore) {
            p.score += 1;
            p.displayScore.textContent = p.score;
            if (p.score === maxScore) {
                p.isWinner = true;
                winnerHeadline.classList.toggle('hide-winner');
                restartBtn.classList.toggle('hide-restart');
                displayWinner.textContent = p.name;

                if (P1.isWinner) {
                    P1.displayName.classList.toggle('winner');
                    P2.displayName.classList.toggle('loser');
                } else {
                    P2.displayName.classList.toggle('winner');
                    P1.displayName.classList.toggle('loser');
                }
                P1.btn.classList.toggle('disable-btn');
                P2.btn.classList.toggle('disable-btn');
            }
        }
    })
}

restartBtn.addEventListener('click', () => {
    for (let p of [P1, P2]) {
        p.score = 0;
        p.isWinner = false;
        p.displayScore.textContent = p.score;
        p.displayName.classList.remove('winner', 'loser');
        p.btn.classList.remove('disable-btn');
    }

    winnerHeadline.classList.toggle('hide-winner');
    restartBtn.classList.toggle('hide-restart');
})