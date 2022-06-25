const grid = document.querySelector('.grid');
const gridSize = 25;
let currentIndexArr = [Math.pow(gridSize, 2) - Math.floor(gridSize * 1.5) - 1];
let interval = 1;
let snakeIntervalId;

for(let i = 0; i < Math.pow(gridSize, 2); i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
}

const squares = document.querySelectorAll('.grid div');

squares[currentIndexArr[0]].classList.add('snake');

// Draw food randomly on the grid
function drawFood() {
    const emptySquares = document.querySelectorAll('.grid div:not(.snake)');
    const randomNum = Math.floor(Math.random() * emptySquares.length);
    emptySquares[randomNum].classList.add('food');
}

drawFood();

// Check for Food
function checkForFood() {
    const snakeHeadElement = squares[currentIndexArr[currentIndexArr.length - 1]];
    if(snakeHeadElement.classList.contains('food')) {
        snakeHeadElement.classList.remove('food');
        currentIndexArr.push(currentIndexArr[currentIndexArr.length - 1] + interval);
        addSnakeHead();
        drawFood();
    }
}

// Check For Snake Tangle
function checkForTangle() {
    if(squares[currentIndexArr[currentIndexArr.length - 1] + interval].classList.contains('snake')) {
        alert('Game Over');
        clearInterval(snakeIntervalId);
    }
}

// Add Snake Head
function addSnakeHead() {
    squares[currentIndexArr[currentIndexArr.length - 1]].classList.add('snake');
}

// Change Snake Direction
function changeSnakeDirection(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if(interval !== 1) {
                interval = -1;
            }
            break;
        case 'ArrowRight':
            if(interval !== -1) {
                interval = 1;
            }
            break;
        case 'ArrowUp':
            if(interval !== gridSize) {
                interval = gridSize * -1;
            }
            break;
        case 'ArrowDown':
            if(interval !== gridSize * -1) {
                interval = gridSize;
            }
            break;
    }
}

document.addEventListener('keydown', changeSnakeDirection);

// Move Snake
function moveSnake() {
    checkForTangle();

    // Remove Snake Tail
    squares[currentIndexArr[0]].classList.remove('snake');

    let res = [];

    for(let i = 0; i < currentIndexArr.length; i++) {
        if(i === currentIndexArr.length - 1) {
            res[i] = currentIndexArr[i] + interval;
        } else {
            res[i] = currentIndexArr[i + 1];
        }
    }
    currentIndexArr = res;

    addSnakeHead();

    checkForFood();
}

snakeIntervalId = setInterval(moveSnake, 100);