export default class Ship {
    constructor(length) {
        if(length<=0) throw new Error('ship length must be positive number');
        this.length=length;
        this.hitTimes=0;
        this.sunk=0;
    }
    hit(){
        this.hitTimes++;
    }
    isSunk(){
    return this.hitTimes>=this.length
    }
}

