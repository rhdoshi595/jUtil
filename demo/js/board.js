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

  render(){
    const grid = Board.createGrid();

    this.snake.segments.forEach((coordinate) => {
      grid[coordinate.x][coordinate.y] = "S";
    });

    grid[this.apple.position.x][this.apple.position.y] = "A";
    grid.map(row => row.join("")).join("\n");
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
