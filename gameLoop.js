import Player from "./player.js";
import Dom from "./dom.js";

const Game = (()=> {
    let player, computer;
    let currentPlayer='player';
    const init=() => {
        player= new Player('player');
        computer=new Player('computer');

        //pre-place ships for now
        player.board.placeShip(0,0,3,'horizontal');
        computer.board.placeShip(1,1,3, 'horizontal')
        // render boards
        Dom.renderBoard(player.board, document.querySelector('#player-board'), false);
        Dom.renderBoard(computer.board, document.querySelector('#computer-board'), true);
        Dom.bindEnemyBoard(handlePlayerMove); // set up click events
    };
    const handlePlayerMove = (x, y)=>{
        if(currentPlayer !== 'player') return 
        const result = computer.board.receiveAttack(x, y);
        if(!result) return;
        Dom.renderBoard(computer.board, document.querySelector('#computer-board'), true);
        if(computer.board.allShipsSunk()) {
            alert('you win!');
            return;
        }
        currentPlayer='computer';
        setTimeout(handleComputerMove, 500);
    };

    const handleComputerMove = ()=> {
        let x, y;

        do{
            x = Math.floor(Math.random()*10);
            y=Math.floor(Math.random()*10);

        } while(!player.board.receiveAttack(x, y));
        Dom.renderBoard(player.board, document.querySelector('#player-board'), false);
        if(player.board.allShipsSunk()){
            alert('Computer wins!');
            return;
        }
        currentPlayer = 'player';
    };
    return {init }
}) ();
export default Game;