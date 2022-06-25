const grid = document.querySelector('.grid');
const gridSize = 25;
let currentIndexArr = [Math.pow(gridSize, 2) - Math.floor(gridSize * 1.5) - 1];
let interval = 1;
let snakeId;

for(let i = 0; i < Math.pow(gridSize, 2); i++) {
    const square = document.createElement('div');
    grid.appendChild(square);
}

const squares = document.querySelectorAll('.grid div');

squares[currentIndexArr[0]].classList.add('snake');

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

    // Add Snake Head
    squares[currentIndexArr[currentIndexArr.length - 1]].classList.add('snake');
}

snakeId = setInterval(moveSnake, 1000);