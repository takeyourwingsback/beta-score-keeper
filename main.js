const P1 = {
    score: 0,
    name: 'Player #1',
    isWinner: false,

    btn: document.querySelector('#player1_btn'),
    displayName: document.querySelector('#player1_name'),
    displayScore: document.querySelector('#player1_score'),
    input: document.querySelector('#player1_input')
}

const P2 = {
    score: 0,
    name: 'Player #2',
    isWinner: false,

    btn: document.querySelector('#player2_btn'),
    displayName: document.querySelector('#player2_name'),
    displayScore: document.querySelector('#player2_score'),
    input: document.querySelector('#player2_input')
}

let maxScore = 5;

const winnerHeadline = document.querySelector('.winner-headline');
const displayWinner = document.querySelector('#display-winner');
const restartBtn = document.querySelector('#restart_btn');
const saveBtn = document.querySelector('#save_btn');
const maxScoreInput = document.querySelector('#maxscore_input');

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

saveBtn.addEventListener('click', () => {
    if (!P1.score && !P2.score) {
        if (P1.input.value && P2.input.value) {
            if (P1.input.value.length <= 22 && P2.input.value.length <= 22) {
                P1.name = P1.input.value;
                P2.name = P2.input.value;
                P1.displayName.textContent = P1.name;
                P2.displayName.textContent = P2.name;
            } else {
                alert('The names cannot contain more than 22 characters')
            }
        }
        if (maxScoreInput.value > 0) {
            maxScore = Number(maxScoreInput.value);
        } else {
            alert('You cannot play until zero!')
        }
        const dropdown = document.querySelector('[data-dropdown]');
        const icon = document.querySelector('.settings-icon');
        dropdown.classList.remove('active');
        icon.classList.remove('rotate-icon');
    } else {
        P1.input.value = '';
        P2.input.value = '';
        maxScoreInput.value = maxScore;
        alert('Finish & restart the game before!');
    }
})

document.addEventListener('click', e => {
    const isDropdownBtn = e.target.matches('[data-dropdown-btn]');
    if (!isDropdownBtn && e.target.closest('[data-dropdown]') != null) return;
    
    let activeDropdown = null;
    let icon = document.querySelector('.settings-icon');
    if (isDropdownBtn) {
        activeDropdown = e.target.closest('[data-dropdown]');
        activeDropdown.classList.toggle('active');
        icon.classList.toggle('rotate-icon');
    }

    document.querySelectorAll('[data-dropdown].active').forEach(dropdown => {
        if (dropdown === activeDropdown) return;
        dropdown.classList.remove('active');
        icon.classList.remove('rotate-icon');
    })
})