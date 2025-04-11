import Ship from "./main";
import GameBoard from "./game";
import Player from "./player";
import { beforeEach, skip } from "node:test";
    const board = new GameBoard(10);
    let ship;
    ship= new Ship(3);
    let ship1= new Ship(4)
    let ship2 = new Ship(5);
    beforeEach(()=>{
        ship= new Ship(3);
        console.log(new Ship(3));
        
    })
    test('create a ship with correct length',()=> {
        expect(ship.length).toBe(3);
        expect(ship.hitTimes).toBe(0)
    })
    test('hit() increases the count', ()=> {
        ship.hit();
        expect(ship.hitTimes).toBe(1);
    })
    test('isSunk returns true it hitTimes>= length', ()=>{
        ship.hit()
        ship.hit()
        ship.hit()
        expect(ship.isSunk()).toBe(true);
    })
    // test game board class
   
    //test1: initialization
    test('board should initailize with 10 by 10 grid', ()=>{
        expect(board.board.length).toBe(10);
    })
    test('placeShip horizontally', ()=>{
        expect(board.placeShip(ship1,2,3)).toBe(true)
        expect(board.board[2][4]).not.toBeNull()
    })
    test('placeship vertical', ()=> {
        expect(board.placeShip(ship2, 5,5, true))
        expect(board.board[6][5]).not.toBeNull()
    })
    beforeEach(()=>{
        board.placeShip(ship1,2,3)
    })
    test('receiveAttack', ()=>{
        let board = new GameBoard(10)
        ship1 = new Ship(3);

        board.placeShip(ship1,2,3)
        expect(board.receiveAttack(2,3)).toBe(true);
        expect(board.board[2][3]).toBe('hit');
    })

    
    test("player can attack opponent", ()=>{
        const mockShip = {
            length: 1,
            hitTimes:0,
            hit: jest.fn(function(){
                this.hitTimes++;
            }),
            isSunk: jest.fn(function(){
                return this.hitTimes>=this.length
            }),
            
        };
    
        let board = new GameBoard(10)
        const player1= new Player('sammy');
        const player2 = new Player('cpu');
        player2.board.placeShip(mockShip, 0, 0)
        const result = player1.attack(player2, 0,0);
        expect(result).toBe(true); // attack
        expect(mockShip.hit).toHaveBeenCalledTimes(1)
    })

