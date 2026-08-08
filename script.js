// import data
const modeBtn = document.getElementById('mode');
const modeBtnTxt = document.querySelector('.mode span');
const board = document.getElementById('board');
const body = document.body;

// js data
const mode = localStorage.getItem('mode');

// mode
function modeFun() {
    body.classList.toggle('dark');

    setTimeout(() => {
        modeBtnTxt.textContent = modeBtnTxt.textContent === 'light_mode' ? 'dark_mode' : 'light_mode';
    }, 500);
}

modeBtn.addEventListener('click', () => {
    modeFun()
    localStorage.setItem('mode', body.classList.contains('dark') ? 'dark' : 'light');
})

if(mode === 'dark') {
    modeFun()
}

// make the board
function boardMake() {
    for(let row = 0; row < 8; row++) {
        for(let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square');

            if((row + col) % 2 === 0) {
                square.classList.add('light');
            } else {
                square.classList.add('dark');
            }

            square.dataset.row = row;
            square.dataset.col = col;

            board.appendChild(square);
        }
    }
}

boardMake()