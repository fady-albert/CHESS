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
let mate = false;
let promotionSquare = null;

let whiteKingMoved = false;
let blackKingMoved = false;

let whiteRookLeftMoved = false;
let whiteRookRightMoved = false;
let blackRookLeftMoved = false;
let blackRookRightMoved = false;

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

    if(piece[0] !==  turn) return;

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

    if(mate) return;

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
    ];

    for(let [dr, dc] of direction) {

        const newRow = row + dr;
        const newCol = col + dc;

        if(
            newRow >= 0 &&
            newRow < 8 &&
            newCol >= 0 &&
            newCol < 8
        ) {
            const target = elements[newRow][newCol];

            if(!target || target[0] !== color) {
                move.push([newRow, newCol]);
            }
        }
    }

    // Castling
    if(!isCheck(color)) {

        // White
        if(
            color === 'w' &&
            row === 7 &&
            col === 4 &&
            !whiteKingMoved
        ) {

            // King side O-O
            if(
                !whiteRookRightMoved &&
                elements[7][5] === null &&
                elements[7][6] === null &&
                elements[7][7] === 'wr'
            ) {
                if(
                    !isSquareAttacked(7, 5, 'b') &&
                    !isSquareAttacked(7, 6, 'b')
                ) {
                    move.push([7, 6]);
                }
            }

            // Queen side O-O-O
            if(
                !whiteRookLeftMoved &&
                elements[7][1] === null &&
                elements[7][2] === null &&
                elements[7][3] === null &&
                elements[7][0] === 'wr'
            ) {
                if(
                    !isSquareAttacked(7, 3, 'b') &&
                    !isSquareAttacked(7, 2, 'b')
                ) {
                    move.push([7, 2]);
                }
            }
        }

        // Black
        if(
            color === 'b' &&
            row === 0 &&
            col === 4 &&
            !blackKingMoved
        ) {

            // King side O-O
            if(
                !blackRookRightMoved &&
                elements[0][5] === null &&
                elements[0][6] === null &&
                elements[0][7] === 'br'
            ) {
                if(
                    !isSquareAttacked(0, 5, 'w') &&
                    !isSquareAttacked(0, 6, 'w')
                ) {
                    move.push([0, 6]);
                }
            }

            // Queen side O-O-O
            if(
                !blackRookLeftMoved &&
                elements[0][1] === null &&
                elements[0][2] === null &&
                elements[0][3] === null &&
                elements[0][0] === 'br'
            ) {
                if(
                    !isSquareAttacked(0, 3, 'w') &&
                    !isSquareAttacked(0, 2, 'w')
                ) {
                    move.push([0, 2]);
                }
            }
        }
    }

    return move;
}

// show circle in movement place
function showMove(moves) {
    
    hideMove()

    const piece = elements[selected.row][selected.col];
    const color = piece[0];

    for(const [row, col] of moves) {
        const virtual = elements[row][col];

        elements[row][col] = piece;
        elements[selected.row][selected.col] = null;

        const safe = !isCheck(color);

        elements[selected.row][selected.col] = piece;
        elements[row][col] = virtual;

        if(safe) {
            const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
       
            if(square) {
                const place = document.createElement('div');
                place.classList.add('place');

                square.appendChild(place);
            }
        }
    }
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

    const virtual = elements[row][col];

    elements[row][col] = piece;
    elements[oldRow][oldCol] = null;

    const color = piece[0];

    // Check if the move is legal
    if(isCheck(color)) {
        elements[oldRow][oldCol] = piece;
        elements[row][col] = virtual;

        return;
    }

    // Castling
    if(piece[1] === 'k' && Math.abs(col - oldCol) === 2) {

        // King side
        if(col === 6) {
            elements[row][5] = elements[row][7];
            elements[row][7] = null;
        }

        // Queen side
        if(col === 2) {
            elements[row][3] = elements[row][0];
            elements[row][0] = null;
        }
    }

    selected = null;
    selectedMoves = [];
    hideMove();

    // Update castling flags
    if(piece === 'wk') {
        whiteKingMoved = true;
    }

    if(piece === 'bk') {
        blackKingMoved = true;
    }

    if(piece === 'wr' && oldRow === 7 && oldCol === 0) {
        whiteRookLeftMoved = true;
    }

    if(piece === 'wr' && oldRow === 7 && oldCol === 7) {
        whiteRookRightMoved = true;
    }

    if(piece === 'br' && oldRow === 0 && oldCol === 0) {
        blackRookLeftMoved = true;
    }

    if(piece === 'br' && oldRow === 0 && oldCol === 7) {
        blackRookRightMoved = true;
    }

    turn = turn === 'w' ? 'b' : 'w';

    if(piece[1] === 'p' && (row === 0 || row === 7)) {
        promotionSquare = {
            row: row,
            col: col
        };

        showPromotion(color);
    }

    board.innerHTML = '';
    boardMake();

    // Check / Checkmate
    if(isCheck(turn)) {
        showCheck(turn);

        if(!hasMoves(turn)) {
            mate = true;

            const winner = turn === 'w' ? 'Black' : 'White';

            showGameOver(
                'Checkmate!',
                `${winner} wins!`
            );
        }

    // Stalemate
    } else if(isStalemate(turn)) {
        mate = true;

        showGameOver(
            'Draw!',
            'Stalemate'
        );
    }
}

// check
function check(color) {
    for(let row = 0; row < 8; row++) {
        for(let col = 0; col < 8; col++) {
            let piece = elements[row][col]

            if(piece && piece[0] === color && piece[1] === 'k') {
                return [row, col]
            }
        }
    }
}

function isCheck(color) {
    const kingAct = check(color);

    if(!kingAct) return false;

    const [kr, kc] = kingAct;

    const enemy = color === 'w' ? 'b' : 'w';

    return isSquareAttacked(kr, kc, enemy);
}

function isSquareAttacked(row, col, byColor) {

    // Pawn
    const pawnRow = byColor === 'w' ? row + 1 : row - 1;

    for(const dc of [-1, 1]) {

        const pawnCol = col + dc;

        if(
            pawnRow >= 0 &&
            pawnRow < 8 &&
            pawnCol >= 0 &&
            pawnCol < 8
        ) {
            if(elements[pawnRow][pawnCol] === byColor + 'p') {
                return true;
            }
        }
    }

    // Knight
    const knightDirections = [
        [-2, -1],
        [-2, 1],
        [-1, -2],
        [-1, 2],
        [1, -2],
        [1, 2],
        [2, -1],
        [2, 1]
    ];

    for(const [dr, dc] of knightDirections) {

        const r = row + dr;
        const c = col + dc;

        if(
            r >= 0 &&
            r < 8 &&
            c >= 0 &&
            c < 8
        ) {
            if(elements[r][c] === byColor + 'n') {
                return true;
            }
        }
    }

    // King
    for(let dr = -1; dr <= 1; dr++) {
        for(let dc = -1; dc <= 1; dc++) {

            if(dr === 0 && dc === 0) continue;

            const r = row + dr;
            const c = col + dc;

            if(
                r >= 0 &&
                r < 8 &&
                c >= 0 &&
                c < 8
            ) {
                if(elements[r][c] === byColor + 'k') {
                    return true;
                }
            }
        }
    }

    // Rook / Queen
    const straight = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ];

    for(const [dr, dc] of straight) {

        let r = row + dr;
        let c = col + dc;

        while(
            r >= 0 &&
            r < 8 &&
            c >= 0 &&
            c < 8
        ) {

            const piece = elements[r][c];

            if(piece) {

                if(
                    piece[0] === byColor &&
                    (piece[1] === 'r' || piece[1] === 'q')
                ) {
                    return true;
                }

                break;
            }

            r += dr;
            c += dc;
        }
    }

    // Bishop / Queen
    const diagonal = [
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1]
    ];

    for(const [dr, dc] of diagonal) {

        let r = row + dr;
        let c = col + dc;

        while(
            r >= 0 &&
            r < 8 &&
            c >= 0 &&
            c < 8
        ) {

            const piece = elements[r][c];

            if(piece) {

                if(
                    piece[0] === byColor &&
                    (piece[1] === 'b' || piece[1] === 'q')
                ) {
                    return true;
                }

                break;
            }

            r += dr;
            c += dc;
        }
    }

    return false;
}

function showCheck(color) {
    const king = check(color);

    if(!king) return;

    const [row, col] = king;

    const square = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

    if(square) {
        square.classList.add('king-check')
    }
}

// checkMate
function hasMoves(color) {
    for(let row = 0; row < 8; row++) {
        for(let col = 0; col < 8; col++) {
            const piece = elements[row][col];

            if(!piece) continue;
            if(piece[0] !== color) continue;

            const moves = getMove(row, col);

            for(const [newRow, newCol] of moves) {

                // Don't allow capturing the enemy king
                if(elements[newRow][newCol]?.[1] === 'k') {
                    continue;
                }

                const virtual = elements[newRow][newCol];

                elements[newRow][newCol] = piece;
                elements[row][col] = null;

                const safe = !isCheck(color);

                elements[row][col] = piece;
                elements[newRow][newCol] = virtual;

                if(safe) {
                    return true;
                }
            }
        }
    }

    return false;
}

// stalemate
function isStalemate(color) {
    return !isCheck(color) && !hasMoves(color);
}

// pawn promotion
function promotion(type, color) {
    const row = promotionSquare.row;
    const col = promotionSquare.col;

    elements[row][col] = color + type;

    document.querySelector('.pro').classList.remove('show');

    promotionSquare = null;

    board.innerHTML = ``;
    boardMake();
}

function showPromotion(color) {
    const pro = document.querySelector('.pro');
    const buttons = document.querySelectorAll('.proCon button');

    buttons.forEach(button => {
        const type = button.dataset.piece;

        const img = document.createElement('img');
        img.src = pieces[color + type];

        button.innerHTML = ``;
        button.appendChild(img);

        button.onclick = () => {
            promotion(type, color);
        }
    })

    pro.classList.add('show');
}

function showGameOver(title, text) {

    const gameOver = document.querySelector('.gameOver');
    const gameOverTitle = document.getElementById('gameOverTitle');
    const gameOverText = document.getElementById('gameOverText');

    gameOverTitle.textContent = title;
    gameOverText.textContent = text;

    gameOver.classList.add('show');
}

boardMake()