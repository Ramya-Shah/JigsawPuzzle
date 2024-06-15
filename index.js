const gridSize = 3;
const totalPieces = gridSize * gridSize;
let pieces = [];
const puzzleImage = './l1.avif'; /* replace with your image URL */

function createPuzzle() {
    const container = document.getElementById('puzzle-container');

    for (let i = 0; i < totalPieces; i++) {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.id = `piece${i}`;
        piece.draggable = true;
        piece.addEventListener('dragstart', dragStart);
        piece.addEventListener('dragover', dragOver);
        piece.addEventListener('drop', drop);

        /* set background image and position for each piece */
        piece.style.backgroundImage = `url(${puzzleImage})`;
        piece.style.backgroundPosition = `${(i % gridSize) * -100}px ${(Math.floor(i / gridSize)) * -100}px`;

        container.appendChild(piece);
        pieces.push(piece);
    }

    shufflePieces();
}

function shufflePieces() {
    pieces = pieces.sort(() => Math.random() - 0.5);
    updatePuzzle();
}

function updatePuzzle() {
    const container = document.getElementById('puzzle-container');
    container.innerHTML = '';
    pieces.forEach(piece => container.appendChild(piece));
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const draggedPieceId = event.dataTransfer.getData('text/plain');
    const draggedPiece = document.getElementById(draggedPieceId);
    const droppedPiece = event.target;

    const draggedIndex = pieces.indexOf(draggedPiece);
    const droppedIndex = pieces.indexOf(droppedPiece);
    [pieces[draggedIndex], pieces[droppedIndex]] = [pieces[droppedIndex], pieces[draggedIndex]];

    updatePuzzle();

    if (checkWin()) {
        alert('Congratulations! You solved the puzzle!');
        stopTimer();
    }
}

function checkWin() {
    for (let i = 0; i < totalPieces; i++) {
        if (pieces[i].id !== `piece${i}`) {
            return false;
        }
    }
    return true;
}
function checkWin2() {
    flag = true;
    for (let i = 0; i < totalPieces; i++) {
        if (pieces[i].id !== `piece${i}`) {
            flag = false;
            break;
        }
    }
    if (flag) alert('solved');
    else {
        alert('retry');
        location.reload();
    }
}

let time = 0;
let timer = document.getElementById('timer');
let intervalId;

function startTimer() {
  time = 0;
  intervalId = setInterval(() => {
    time++;
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, 1000);
}


function stopTimer() {
  clearInterval(intervalId);
}

startTimer();
createPuzzle(); 