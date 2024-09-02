const displayController = (() => {
    const renderMessage = (message) => {
        document.querySelector("#message").innerHTML = message;
    }
    return {
        renderMessage
    }
})();

const Gameboard = (() => {
    let gameboard = ["","","","","","","","",""]

    const render = () => {
        let boardHTML = "";
        gameboard.forEach((square, index) => {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`
        })
        document.querySelector("#gameboard").innerHTML = boardHTML;
        const squares = document.querySelectorAll(".square");
            console.log(squares);
            squares.forEach((square) => {
                square.addEventListener("click", Game.handleClick);
        })
    }

    const update = (index, value) => {
        gameboard[index] = value;
        render();
    };

    const getGameboard = () => gameboard;

    return{
        render,
        update,
        getGameboard
    }

})();

const createPlayer = (name, mark) => {
    return {
        name,
        mark
    }
}

const Game = (() =>{
        let players = [];
        let currentPlayerIndex;
        let gameOver = false;

        const start = () => {
            const player1 = document.querySelector("#player1").value.trim();
            const player2 = document.querySelector("#player1").value.trim();


            if(player1 === "" || player2 === ""){
                displayController.renderMessage("Enter Names");
            }

            players = [
                createPlayer(player1, "X"),
                createPlayer(player1, "O"),
            ]

            currentPlayerIndex = 0;
            gameOver = false;
            Gameboard.render();


            const squares = document.querySelectorAll(".square");
            console.log(squares);
            squares.forEach((square) => {
                square.addEventListener("click", handleClick);
        })
        }
        const handleClick = (event) => {
            if(gameOver){
                return;
            }

            let index = parseInt(event.target.id.split("-")[1]);

            if(Gameboard.getGameboard()[index] !== "")
                return;
            Gameboard.update(index, players[currentPlayerIndex].mark);

            if(checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex].mark)) {
                gameOver = true;
                displayController.renderMessage(`${players[currentPlayerIndex].name} is the winner`);
               
            } 
            else if (checkForTie(Gameboard.getGameboard())){
                gameOver = true;
                displayController.renderMessage("Tie");
                
            }
            
            currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        }
        const restart = () => {
            gameOver = false;
            for (let i=0; i < 9; i++){
                Gameboard.update(i,"");
            }
            Gameboard.render();
            document.querySelector("#message").innerHTML = "";
        }

        return{
            start,
            restart,
            handleClick
        }
    
})();
function checkForWin(board) {
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    for (let i=0; i < winningCombinations.length; i++) {
        const [a,b,c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]){
            return true;
        }
    }
    return false;
}

function checkForTie(board) {
    return board.every(cell => cell!== "");
}

const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", () =>{
    Game.restart();
})

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () =>{
    Game.start();
})