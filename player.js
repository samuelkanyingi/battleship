import GameBoard from "./game.js";
export default class Player{
    constructor(name,isComputer) {
        this.name=name;
        this.isComputer=isComputer;
        this.board = new GameBoard();
    }
    attack(opponent, row, col){
        console.log("here is ", opponent.board.board)
        return opponent.board.receiveAttack(row, col)
    }
    randomAttack(opponent) {
        let row, col;
        do{
            row= Math.floor(Math.random()*10)
            col=Math.floor(Math.random()*10)
        } while (
            opponent.board.board[row][col] === 'hit' ||
            opponent.board.board[row][col] === 'miss'
        )
    
    return this.attack(opponent, row, col)
    }
}