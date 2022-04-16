const PLAYER1 = 'X';
const PLAYER2 = 'O';

let round = 0;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

let playersMoves = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const board = document.querySelector('.board');
const plateList = document.querySelectorAll('.plate');
const resultEl = document.querySelector('.result');
const roundEl = document.querySelector('.round');
const playAgainButton = document.querySelector('.again');
playAgainButton.addEventListener('click', newGame);


plateList.forEach((plate, index) => {
    plate.addEventListener('click', () => {
        if(plate.textContent !== '') return;
        round++;
        checkWhoseMove(plate);

        switch(index) {
            case 0: playersMoves[0][0] = plate.textContent;
            break;
            case 1: playersMoves[0][1] = plate.textContent;
            break;
            case 2: playersMoves[0][2] = plate.textContent;
            break;
            case 3: playersMoves[1][0] = plate.textContent;
            break;
            case 4: playersMoves[1][1] = plate.textContent;
            break;
            case 5: playersMoves[1][2] = plate.textContent;
            break;
            case 6: playersMoves[2][0] = plate.textContent;
            break;
            case 7: playersMoves[2][1] = plate.textContent;
            break;
            case 8: playersMoves[2][2] = plate.textContent;
            break;
        }
        check();
    })
})


function checkWhoseMove(plate) {
    if(round % 2 === 0) {
        plate.textContent = PLAYER2;
        roundEl.textContent = `Now it's ${PLAYER2} turn!`
    } else {
        plate.textContent = PLAYER1;
        roundEl.textContent = `Now it's ${PLAYER1} turn!`
    }
}

function check() {
    const result = playersMoves.reduce((total, row) => total.concat(row));
    let winner = null;
    let moves = {
        'X': [],
        'O': []
    };
    result.forEach((plate, index) => {
        if(moves[plate]) {
            moves[plate].push(index);
        } else null;
    })
    winningCombinations.forEach(combination => {
        if(combination.every(index => moves[PLAYER1].indexOf(index) > -1)) {
            resultEl.textContent = `${PLAYER1} wins!`
            roundEl.textContent = '';
        }
        if(combination.every(index => moves[PLAYER2].indexOf(index) > -1)) {
            resultEl.textContent = `${PLAYER2} wins!`
            roundEl.textContent = '';

        }
        if(resultEl.textContent !== '') {
            board.style.opacity = '0.5';
            board.style.pointerEvents = 'none';
            playAgainButton.style.display = 'block';
        }
        checkTie(result)
    })
    console.log(winner)
}

function newGame() {
    round = 0;
    playersMoves = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    plateList.forEach(plate => plate.textContent = '')
    board.style.opacity = '1';
    resultEl.textContent = '';
    roundEl.textContent = '';
    board.style.pointerEvents = 'all';
    playAgainButton.style.display = 'none';
}

function checkTie(resultArr) {
    const checkTie = resultArr.every(plate => {
        return plate !== '';
    })
    if(checkTie === true) {
        playAgainButton.style.display = 'block';
        playAgainButton.addEventListener('click', newGame);
        resultEl.textContent = 'TIE!';
        roundEl.textContent = '';
        board.style.pointerEvents = 'none';
    }
}