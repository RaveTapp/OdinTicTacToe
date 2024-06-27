let Gameboard = (function(){
    let board = [];

    function addToBoard(pos, marker) {
        board[pos - 1] = marker;
        return board;
    }

    function getBoard() {
        return board;
    }

    function print (){
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

    return {
        addToBoard,
        getBoard,
        print,
    }
})();

Gameboard.addToBoard(1, "x");
Gameboard.addToBoard(2, "x");
Gameboard.addToBoard(3, "o");
//Gameboard.addToBoard(4, "x");
Gameboard.addToBoard(5, "o");
Gameboard.addToBoard(7, "x");
Gameboard.addToBoard(9, "o");

Gameboard.print();
//console.log();

function createPlayer (name) {
    return {name};
}

let John = createPlayer("John");

console.log(John);

let game = (function () {
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
    
    return {
        checkWin,
    }
})();

console.log(game.checkWin());