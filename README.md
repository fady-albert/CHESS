# Chess Game

A fully functional browser-based Chess game built using HTML, CSS, and JavaScript.

This project implements the core rules of chess, including legal movement, castling, pawn promotion, check detection, checkmate detection, stalemate handling, sound effects, and a light/dark mode toggle.

---

## Features

### Gameplay
- Standard 8×8 chess board
- Complete starting chess position
- Turn-based gameplay
- Legal moves validation
- Capture mechanics

### Supported Chess Rules
- Pawn movement
- Rook movement
- Knight movement
- Bishop movement
- Queen movement
- King movement
- Check detection
- Checkmate detection
- Stalemate detection
- Kingside castling
- Queenside castling
- Pawn promotion

### User Interface
- Move indicators
- Game-over popup
- Victory screen
- Check highlighting
- Responsive board design

### Extras
- Sound effects for moves
- Sound effects for check
- Victory sounds
- Dark mode
- Theme persistence using Local Storage

---

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript

---

## Project Structure

```text
Chess-Game/
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

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/chess-game.git
```

### Open the Project

Open the following file in your browser:

```text
index.html
```

No installation or external dependencies are required.

---

## How to Play

1. Click on a piece belonging to the current player.
2. Available moves will be highlighted.
3. Select one of the highlighted squares to move.
4. Players alternate turns.
5. Use castling whenever legal.
6. Promote pawns after reaching the last rank.
7. Checkmate the opponent to win the game.

---

## Dark Mode

The game includes a built-in dark mode.

- Click the theme button in the top-right corner.
- Theme preference is automatically saved.
- The selected theme remains active after refreshing the page.

---

## Audio Effects

The game provides sounds for:

- Piece movement
- Check notifications
- Winning the game

---

## Implemented Rules

| Feature | Status |
|----------|----------|
| Piece Movement | ✅ |
| Check Detection | ✅ |
| Checkmate | ✅ |
| Stalemate | ✅ |
| Castling | ✅ |
| Pawn Promotion | ✅ |
| Sound Effects | ✅ |
| Dark Mode | ✅ |
| Turn Management | ✅ |

---

## Future Improvements

Potential features for future releases:

- En Passant support
- Move history
- Undo / Redo functionality
- Chess timer
- Board rotation
- Multiplayer mode
- AI opponent
- PGN export/import
- FEN support
- Move notation display

## Contributing

Contributions are welcome.

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

##  License

This project is licensed under the MIT License.

---

##  Author

Developed by Fady Albert.

Built with HTML, CSS, and JavaScript.
``
