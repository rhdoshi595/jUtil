const Snake = require('./snake.js');
const Apple = require('./apple.js');

class Board {
  constructor(){
    this.snake = new Snake(this);
    this.apple = new Apple(this);
    this.grid = Board.createGrid();
  }

  static createGrid(){
    const grid = [];
    for(let i = 0; i < 20; i += 1){
      grid.push([]);
      for(let j = 0; j < 20; j += 1){
        grid[i].push("E");
      }
    }
    return grid;
  }

  validPosition(coordinate){
    return (
      (coordinate.x >= 0) &&
      (coordinate.x < 20) &&
      (coordinate.y >= 0) &&
      (coordinate.y < 20)
    );
  }
}

module.exports = Board;
