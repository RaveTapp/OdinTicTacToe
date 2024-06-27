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

//Gameboard.addToBoard(1, "x");
//Gameboard.addToBoard(2, "x");
//Gameboard.addToBoard(3, "o");
//Gameboard.addToBoard(4, "o");
//Gameboard.addToBoard(5, "x");
//Gameboard.addToBoard(6, "x");
//Gameboard.addToBoard(7, "x");
//Gameboard.addToBoard(8, "o");
//Gameboard.addToBoard(9, "o");

Gameboard.print();

function createPlayer (name) {
    return {name};
}

let John = createPlayer("John");

console.log(John);

let game = (function () {
    let turn = 1;

    function start(){
        while(turn < 10){
            let next = prompt("Choose next position:");
            if(Gameboard.getBoard()[next-1] != "X" && Gameboard.getBoard()[next-1] != "O"){
                if(turn % 2 != 0){
                    Gameboard.addToBoard(next, "X");
                } else {
                    Gameboard.addToBoard(next, "O");
                }
                turn++;
                Gameboard.print();
                if(checkWin()){
                    alert("Win");
                    return;
                }
                if(checkTie()){
                    alert("Tie");
                    return;
                }
            }

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
        start,
    }
})();


console.log(game.checkWin());
console.log(game.checkTie());

game.start();