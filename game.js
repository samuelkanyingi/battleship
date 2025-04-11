export default class GameBoard {
    
    constructor(){
        this.board = [];
        for(let i=0;i<10;i++){
            this.board[i]= [];
            for(let j=0;j<10;j++){
                this.board[i][j] = null;
            }
        }
        // store all ships on gameboard
        this.ships= [];
        // store coordinates of missedAttacks
        this.missedAttacks = [];
       
    }
    placeShip(ship, startRow, startCol, isVertical =false) {
        //check if cship fits on the board
        if(isVertical) {
           if( startRow+ship.length>10) return false;// ship goes of bottom edge
            else {
                if(startCol+ship.length>10) return false; // ship goes off right edge
            }

            //check if there are empty spaces
            for(let i=0;i<ship.length;i++){
                const x = isVertical ? startRow+i: startRow;
                const y = isVertical ? startCol+i: startRow;
                if(this.board[x][y] !== null) return false; // space occupied
            }
        }
        //place the ship
        for(let i=0;i<ship.length;i++){
            const x = isVertical ? startRow+i: startRow ;
            const y = isVertical ? startCol : startCol+i;
            this.board[x][y]= {
                ship: ship,
                position: i
            }
        }
        this.ships.push(ship);
        return true;
    }
    // function that receives an attack coordinatios x, y 
    receiveAttack(row,col){
        if(row<0|| row>=10 || col<0||col>=10) return false;
        const cell = this.board[row][col];
        console.log(cell);
        
        // if cell is empty miss 
        if(cell === null){
            this.missedAttacks.push({row, col});
            return false;
        }
        // if cell was already attacked
        if (cell === 'hit' || cell === 'miss') return false;

        //if there is a ship at that position
        cell.ship.hit(cell.position) // tell ship is hit
        this.board[row][col] = 'hit';
        return true
    }
    // check if al ship are sunk
    allShipsSunk(){
        for(const ship of this.ships){
            if(!ship.isSunk()){
                return false;
            }
        }
        return true;
    }
    getMissedAttack() {
        return this.missedAttacks;
    }
    getGrid() {
        return this.board;
    }
}
