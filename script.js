// import data
const modeBtn = document.getElementById('mode');
const modeBtnTxt = document.querySelector('.mode span');
const board = document.getElementById('board');
const body = document.body;

// js data
const mode = localStorage.getItem('mode');
let turn = 'w';
let selected = null;
let selectedMoves = [];

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

            square.addEventListener('click', () => {

                const row = Number(square.dataset.row);
                const col = Number(square.dataset.col);

                if(selected) {
                    const canMove = selectedMoves.some(([moveRow, moveCol]) => moveRow === row && moveCol === col);

                    if(canMove) {
                        movePiece(row, col);
                        return;
                    }
                }

                selectPiece(square)
            })

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

// game functions

// to select any piece
function selectPiece(square) {

    hideMove()
    
    const row = Number(square.dataset.row);
    const col = Number(square.dataset.col);

    const piece = elements[row][col];

    if(!piece) return;

    selected = {
        row: row,
        col: col,
        piece: piece
    }

    selectedMoves = getMove(row, col)

    showMove(selectedMoves)

    console.log(selectedMoves);
    
}

// to choose the way of movement
function getMove(row, col) {
    const piece = elements[row][col];

    if(!piece) return;

    const color = piece[0];
    const type = piece[1];

    if(type === 'p') {
        return getPawnMove(row, col, color);
    }
    else if(type === 'b') {
        return getBishopMove(row, col, color);
    }
    else if(type === 'r') {
        return getRookMove(row, col, color);
    }
    else if(type === 'n') {
        return getKnightMove(row, col, color);
    }
    else if(type === 'q') {
        return getQueenMove(row, col, color);
    }
    else if(type === 'k') {
        return getKingMove(row, col, color);
    }

    return [];
}

// pawn movement
function getPawnMove(row, col, color) {
    const move = [];

    const direction = color === 'w' ? -1 : 1;

    const newRow = row + direction;

    if(newRow >= 0 && newRow < 8 && elements[newRow][col] === null) {
        move.push([newRow, col]);
    }

    const doubleRow = row + direction * 2;

    const startRow = color === 'w' ? 6 : 1;

    if(row === startRow && elements[newRow][col] === null && elements[doubleRow][col] === null) {
        move.push([doubleRow, col]);
    }

    for(let offset of [-1, 1]) {
        const newCol = col + offset;

        if(newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            const target = elements[newRow][newCol];

            if(target !== null && target[0] !== color) {
                move.push([newRow, newCol]);
            }
        }
    }

    return move;
}

// bishop movement
function getBishopMove(row, col, color) {
    const move = [];

    const direction = [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1]
    ];

    for(let [dr, dc] of direction) {

        let newRow = row + dr;
        let newCol = col + dc;

        while(newRow >= 0 &&
              newRow < 8 &&
              newCol >= 0 &&
              newCol < 8) {
            const target = elements[newRow][newCol];

            if(!target) {
                move.push([newRow, newCol])
            } else {
                if(target[0] !== color) {
                    move.push([newRow, newCol])
                }

                break;
            }

            newRow += dr;
            newCol += dc;
        }
    }

    return move;
}

// rook movement
function getRookMove(row, col, color) {
    const move = [];

    const direction = [
        [-1, 0],
        [1, 0],
        [0, 1], 
        [0, -1]
    ]

    for(let [dr, dc] of direction) {

        let newRow = row + dr;
        let newCol = col + dc;

        while(newRow >= 0 &&
              newRow < 8 &&
              newCol >= 0 &&
              newCol < 8) {
            const target = elements[newRow][newCol];

            if(!target) {
                move.push([newRow, newCol]);
            } else {
                if(target[0] !== color) {
                    move.push([newRow, newCol]);
                }

                break;
            }

            newRow += dr;
            newCol += dc;
        }
    }

    return move;
}

// knight movement
function getKnightMove(row, col, color) {
    const move = [];

    const direction = [
        [-2, -1],
        [-2, 1],
        [-1, -2], 
        [-1, 2],
        [1, -2],
        [1, 2],
        [2, -1],
        [2, 1],
    ]

    for(let [dr, dc] of direction) {

        const newRow = row + dr;
        const newCol = col + dc;

        if(newRow >= 0 &&
           newRow < 8 &&
           newCol >= 0 &&
           newCol < 8) {
            const target = elements[newRow][newCol];

            if(!target || target[0] !== color) {
                move.push([newRow, newCol]);
            }
        }
    }

    return move;
}

// queen movement
function getQueenMove(row, col, color) {
    const move = [];

    const direction = [
        // bishop movement
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],

        // rook movement
        [-1, 0],
        [1, 0],
        [0, 1], 
        [0, -1]
    ]

    for(let [dr, dc] of direction) {

        let newRow = row + dr;
        let newCol = col + dc;

        while(newRow >= 0 &&
              newRow < 8 &&
              newCol >= 0 &&
              newCol < 8) {
            const target = elements[newRow][newCol];

            if(!target) {
                move.push([newRow, newCol]);
            } else {
                if(target[0] !== color) {
                    move.push([newRow, newCol]);
                }

                break;
            }

            newRow += dr;
            newCol += dc;
        }
    }

    return move;
}

// king movement
function getKingMove(row, col, color) {
    const move = [];

    const direction = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1]
    ]

    for(let[dr, dc] of direction) {

        const newRow = row + dr;
        const newCol = col + dc;

        if(newRow >= 0 &&
           newRow < 8 &&
           newCol >= 0 &&
           newCol < 8) {
            const target = elements[newRow][newCol];

            if(!target || target[0] !== color) {
                move.push([newRow, newCol])
            }
        }
    }

    return move;
}

// show circle in movement place
function showMove(moves) {
    
    hideMove()

    moves.forEach(([row, col]) => {
        const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        
        if(!square) return;

        const place = document.createElement('div');
        place.classList.add('place');

        square.appendChild(place);
    });
} 

// remove the circle to avoid repitation
function hideMove() {
    document.querySelectorAll('.place').forEach(place => {
        place.remove();
    })
}

// move
function movePiece(row, col) {
    const oldRow = selected.row;
    const oldCol = selected.col;

    const piece = elements[oldRow][oldCol];

    elements[row][col] = piece;
    elements[oldRow][oldCol] = null;

    selected = null;
    selectedMoves = [];
    hideMove()

    board.innerHTML = '';
    boardMake();
}

boardMake()