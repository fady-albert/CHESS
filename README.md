# Chess Game

A chess game I built with HTML, CSS, and JavaScript.

The goal of the project was to make a playable chess game in the browser without using a chess library. The game handles the board, pieces, turns, legal moves, and the main chess rules using JavaScript.

## What it has

* 8×8 chess board
* Two-player local gameplay
* Turn management
* Legal move checking
* Piece capturing
* Check detection
* Checkmate detection
* Stalemate detection
* Kingside castling
* Queenside castling
* Pawn promotion
* Move indicators
* Check highlighting
* Game-over screen
* Light/dark theme
* Theme saved with Local Storage
* Sound effects

## Pieces

The game supports movement for all six chess pieces:

* Pawn
* Rook
* Knight
* Bishop
* Queen
* King

Moves are checked in JavaScript before they are played, including situations where moving a piece would leave the player's king in check.

## Sounds

The game has audio effects for different events, such as:

* Moving a piece
* Capturing a piece
* Check
* Winning the game

The sounds are stored in the `assets/audio` folder.

## Project structure

```text
CHESS/
│
├── index.html
├── style.css
├── script.js
│
├── assets/
│   ├── audio/
│   │   ├── move.mp3
│   │   ├── check.mp3
│   │   └── victory.mp3
│   │
│   └── images/
│       ├── white/
│       │   ├── king.png
│       │   ├── queen.png
│       │   ├── rook.png
│       │   ├── bishop.png
│       │   ├── knight.png
│       │   └── pawn.png
│       │
│       └── black/
│           ├── king.png
│           ├── queen.png
│           ├── rook.png
│           ├── bishop.png
│           ├── knight.png
│           └── pawn.png
│
└── README.md
```

## Running it

There is nothing to install.

Clone the repository:

```bash
git clone https://github.com/fady-albert/CHESS.git
```

Then open `index.html` in a browser.

## How to play

1. Click one of your pieces.
2. The available moves will be shown.
3. Click a valid square to move the piece.
4. Players take turns.
5. If a pawn reaches the opposite side, choose a promotion piece.
6. The game ends when there is checkmate or stalemate.

## Dark mode

The theme can be changed using the theme button.

The selected theme is saved in Local Storage, so it stays after refreshing the page.

## Rules currently implemented

| Rule               | Status      |
| ------------------ | ----------- |
| Pawn movement      | Implemented |
| Rook movement      | Implemented |
| Knight movement    | Implemented |
| Bishop movement    | Implemented |
| Queen movement     | Implemented |
| King movement      | Implemented |
| Capturing          | Implemented |
| Check              | Implemented |
| Checkmate          | Implemented |
| Stalemate          | Implemented |
| Kingside castling  | Implemented |
| Queenside castling | Implemented |
| Pawn promotion     | Implemented |

## What I might add later

Some things I may add to the project:

* En passant
* Move history
* Undo and redo
* Chess timer
* Board rotation
* Multiplayer
* AI opponent
* PGN support
* FEN support
* Move notation

## Built with

* HTML
* CSS
* JavaScript

No chess framework or external chess engine is used.

## Author

Fady Albert

Built as a browser-based JavaScript project.
