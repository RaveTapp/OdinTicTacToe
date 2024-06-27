let Gameboard = (function(){
    let board = [];

    function addToBoard(pos, marker) {
        board[pos - 1] = marker;
    }

    function getBoard() {
        return board;
    }

    function resetBoard() {
        board.length = 0;
    }

    function print (){
        if(board.length === 0){
            console.log("The board is empty.")
        } else {
            for(let i = 0; i < 3; i++){
                let line = "";
                for(let j = 0; j < 3; j++){
                    if(board[3*i+j] === undefined){
                        line += "  ";
                    } else {
                        line += board[3*i+j] + " ";
                    }
                    
                }
                console.log(line);
            }
        }
    }

    return {
        addToBoard,
        getBoard,
        resetBoard,
        print,
    }
})();

Gameboard.print();

function createPlayer (name) {
    return {name};
}

let John = createPlayer("John");

console.log(John);

let game = (function () {
    let turn = 1;
    let isEndOfGame = false;

    function takeTurn(next){
        if(Gameboard.getBoard()[next-1] != "X" && Gameboard.getBoard()[next-1] != "O"){
            let marker;
            if(turn % 2 != 0){
                marker = "X";
            } else {
                marker = "O";
            }
            Gameboard.addToBoard(next, marker);
            turn++;

            if(checkWin()){
                game.isEndOfGame = true;
                alert("Win"); 
            }
            if(checkTie()){
                game.isEndOfGame = true;
                alert("Tie");
            }
            return marker;
        }
    }

    function checkWin(){
        let board = Gameboard.getBoard();
        let winningPositions = [
            [1,2,3], [1,4,7], [1,5,9],
            [2,5,8], [3, 5, 7], [3,6,9],
            [4,5,6], [7,8,9]
        ];

        let current = winningPositions.map((curr) => {
            let temp = [];
            for(let i = 0; i < 3; i++){
                temp.push(board[curr[i]-1]);
            }
            return temp;
        });

        for(let i = 0; i < current.length; i++){
            if(current[i].every((value) => value === current[i][0] && value != undefined)){
                return true;
            }
        }
        return false;
    }

    function checkTie(){
        let board = Gameboard.getBoard();
        if(board.length === 9 && !checkWin() && !board.includes(undefined)){
            return true;
        }
        return false;
    }
    
    return {
        checkWin,
        checkTie,
        takeTurn,
        isEndOfGame,
    }
})();

let displayManager = (function (){
    let gameDiv = document.querySelector(".game");
    gameDiv.addEventListener("click", (event) => {
        if(!game.isEndOfGame){
            let target = event.target;
            //console.log(target);
            let pos = target.getAttribute("data-pos");
            let marker = game.takeTurn(pos);
            if(marker){
                target.textContent = marker;
            }
        }
    });

    let start = document.querySelector("#start");
    let input = document.querySelector(".input");
    start.addEventListener("click", () => {
        let btn1 = document.querySelector("#btn1");
        let btn2 = document.querySelector("#btn2");
        if (gameDiv.classList.contains("hidden")){
            gameDiv.classList.remove("hidden");
            input.classList.add("hidden");
        } else {
            Gameboard.resetBoard();
            let tiles = document.querySelectorAll(".game p");
            for(let i = 0; i < tiles.length; i++){
                tiles[i].textContent = "";
            }
            game.isEndOfGame = false;
        }
        
        
    });
})();