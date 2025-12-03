// Get Element Node Object
const gridContainer = document.querySelector('.grid-container');
const inputValueGrid = document.querySelector('.input-grid');
const resetButton = document.querySelector('.reset-grid');
const modeButton = document.querySelector('.mode-button');

// Define State and Get total Grid number
let state = 'draw';
let grid = getTotalGridFromReload();

// Add Event Listener
gridContainer.addEventListener('mousedown', draw);
inputValueGrid.addEventListener('input', buildGridFromInput);
inputValueGrid.addEventListener('blur', (e) => {if (e.target.value === '') e.target.value = 0});
inputValueGrid.addEventListener('click', (e) => e.target.select() );
resetButton.addEventListener('click', (e) => {removeGrid(); inputValueGrid.value = 0 });
modeButton.addEventListener('click', changeMode);

// Function
function getTotalGridFromReload () {
    let num = +prompt('Enter your total grid (max 100!):');

    while (true) {
        if (!num || !isFinite(num)) {
            num = +prompt('Enter valid number for total grid (max 100!):');
        } else if (num > 100) {
            num = +prompt('Enter number for total grid less or equal than 100!:');
        } else {
            break
        }
    }

    inputValueGrid.value = num;

    return num;
}

function buildGridFromInput (e) {
    let totalGrid = +e.target.value;

    if (totalGrid === 0 || totalGrid === '') {
            gridContainer.style.backgroundColor = 'white';
            removeGrid();
        } else if (totalGrid > 100 || totalGrid < 0) {
            alert('Enter number for total grid less or equal than 100!:');
            e.target.value = grid;
            e.target.select()
        } else {
            removeGrid();
            buildGrid(totalGrid);
        }
 }

function buildGrid (e) {
    let totalGrid = e;

    const totalSquare = e * e;
    const squareSize = (100 / e) + '%';

    for (let i = 0; i <  totalSquare ; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        square.style.width = squareSize;
        square.style.height =squareSize;
        square.style.backgroundColor = 'white';
        square.style.opacity = 1;
        gridContainer.appendChild(square);
    }

    gridContainer.style.backgroundColor = '#000000'
    grid = totalGrid;
}

function removeGrid () {
    const square = gridContainer.querySelectorAll('.square');
    square.forEach(item => item.remove());
    gridContainer.style.backgroundColor = '#FFFFFF';
}

function changeMode (e) {
    if ( e.target.className.indexOf('draw') === 0 ) {
        e.currentTarget.firstElementChild.classList.add('active');
        e.currentTarget.lastElementChild.classList.remove('active');
        state = 'draw';
    } else {
        e.currentTarget.lastElementChild.classList.add('active');
        e.currentTarget.firstElementChild.classList.remove('active');
        state = 'delete';
    }
}

function draw (e) {
    e.preventDefault(); //To prevent click n drag on mousedown while drawing

    const mouseMove = function (e) {
        if( e.target.className === 'square' ) {
            ( state === 'draw' ) ? e.target.style.opacity -= 0.1 : e.target.style.opacity = 1;
        }
    }

    // Remove Listener
    const removeListener = function () {
        gridContainer.removeEventListener('mousemove', mouseMove);
        gridContainer.removeEventListener('mouseup', removeListener);
    }

    // Add Event Listener
    gridContainer.addEventListener('mousemove', mouseMove);
    gridContainer.addEventListener('mouseup', removeListener);
    
    
}

// Run The Code
buildGrid(grid);