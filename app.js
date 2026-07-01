/*------------------------ Cached Element References ------------------------*/
const squareElements = document.querySelectorAll(".sqr")
const messageElement = document.querySelector("#message")

const resetElement = document.querySelector("#reset")

const sqrE = document.querySelectorAll(".sqr")

/*-------------------------------- Constants --------------------------------*/
const board = ['','','',
               '','','',
               '','','']
/*---------------------------- Variables (state) ----------------------------*/
let turn = "X" //switch between X & O
let winner = false
let tie = false

/* ['0','1','2',
    '3','4','5',
    '6','7','8'] */

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let squareIndex = null

/*-------------------------------- Functions --------------------------------*/
function render(){
    console.log("New Game")

    updateBoard()
    updateMessage()
}

function init(){
    console.log("Init Games")

    updateBoard()

    board.fill('')
    turn = 'X'
    winner = false
    tie = false

    render()

}

function handelClick(event){

    if (event.target.className === "sqr"){
        squareIndex = event.target.id //optain sqr index

        if (board[squareIndex] == 'X' || board[squareIndex] == 'O'){
            return
        }
        else if (winner){
            console.log(turn + " wins")
            return
        }

        placePiece(squareIndex)
        checkForWinner()
        checkForTie()
        switchPlayerTurn()
        updateMessage()
    }
    else {
        return
    }
}

function placePiece(index){
    board[index] = turn
    console.log(index + " " + board[index])
    updateBoard()
}

function updateBoard(){
    // loop through the board var
    board.forEach( 
        (cell, index) => {
            squareElements[index].textContent = cell //if a cell have X it will be drawn on the board
        }
    )
}

function updateMessage(){
    if (!winner && !tie){
        messageElement.textContent = "It's " + turn + " turn"
    }
    else if (!winner && tie){
        messageElement.textContent = "It's a Tie"
    }
    else {
        messageElement.textContent = "Congratulations " + turn + " Won"
    }
}

function checkForWinner() {
    let A;
    let B;
    let C;
    winningCombos.forEach((combo) => {
        A = board[combo[0]]
        B = board[combo[1]]
        C = board[combo[2]]

        if (A !== '' && A === B && B === C) {
            winner = true
        }
    })
}

function checkForTie(){
    if (winner){
        return
    }  

    if(!board.includes('')){
        tie = true
    }

}

function switchPlayerTurn(){
    if(winner){
        return
    }
    else if (!winner){
        if (turn === 'X'){
            turn = 'O'
            console.log("it's " + turn + " turn")
        }
        else if (turn === 'O'){
            turn = 'X'
            console.log("it's " + turn + " turn")
        }
    }
}

init()

/*----------------------------- Event Listeners -----------------------------*/
for (let sqr of sqrE){
    sqr.addEventListener('click', handelClick)
}

resetElement.addEventListener('click', init)

