const Coordinate = require('./coordinate.js');

class Snake {
  constructor(board){
    this.direction = "D";
    this.board = board;
    this.segments = [new Coordinate(10, 10)];
    this.turning = false;
    this.grow = 0;
  }

  head(){
    return this.segments.slice(-1)[0];
  }

  validMove(){
    const head = this.head();
    if(!this.board.validPosition(this.head())){
      return false;
    }
    for(let i = 1; i < this.segments.length; i += 1){
      if(this.segments[i].equals(head)){
        return false;
      }
    }
    return true;
  }

  eatApple(){
    if(this.head().equals(this.board.apple.position)){
      this.grow += 3;
      return true;
    } else {
      return false;
    }
  }

  move(){
    this.segments.unshift(this.head().plus(Snake.CARDINALS[this.direction]));
    this.turning = false;
    if(this.eatApple()){
      this.board.apple.addApple();
    }
    if(this.grow > 0){
      this.grow -= 1;
    } else {
      this.segments.pop();
    }
    if(!this.validMove()){
      this.segments = [];
    }
  }

  turn(dir){
    if((Snake.CARDINALS[this.direction].isOpposite(Snake.CARDINALS[dir])) || this.turning){
      return;
    } else {
      this.turning = true;
      this.direction = dir;
    }
  }
}

Snake.CARDINALS = {
  "U": new Coordinate(-1, 0),
  "D": new Coordinate(1, 0),
  "R": new Coordinate(0, 1),
  "L": new Coordinate(0, -1)
};

module.exports = Snake;
