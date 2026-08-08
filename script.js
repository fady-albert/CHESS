// import data
const modeBtn = document.getElementById('mode');
const modeBtnTxt = document.querySelector('.mode span');
const board = document.getElementById('board');
const body = document.body;

// js data
const mode = localStorage.getItem('mode');
let turn = 'w';
let selected = null;

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

const pieces = {
    // white
    wk: "./assets/images/white/king.png",
    wq: "./assets/images/white/queen.png",
    wr: "./assets/images/white/rook.png",
    wb: "./assets/images/white/bishop.png",
    wn: "./assets/images/white/knight.png",
    wp: "./assets/images/white/pawn.png",

    // black
    bk: "./assets/images/black/king.png",
    bq: "./assets/images/black/queen.png",
    br: "./assets/images/black/rook.png",
    bb: "./assets/images/black/bishop.png",
    bn: "./assets/images/black/knight.png",
    bp: "./assets/images/black/pawn.png"
};

const elements = [
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
];

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

            const place = elements[row][col];

            if(place) {
                const images = document.createElement('img');

                images.src = pieces[place];

                images.classList.add('piece');

                square.appendChild(images);
            }

            board.appendChild(square);
        }
    }
}

boardMake()