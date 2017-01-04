const Board = require('./board.js');
const $l = require('./../jUtility/lib/main.js');

class View {
  constructor($el){
    this.$el = $el;
    this.board = new Board();
    this.drawBoard();
    this.intervalId = window.setInterval((
      this.step.bind(this)
    ), 100);
    $l(window).on("keydown", this.handleKeyEvent.bind(this));
  }

  handleKeyEvent(){
    if(View.MOVES[event.keyCode]){
      this.board.snake.turn(View.MOVES[event.keyCode]);
    }
  }

  step(){
    const rootEl = $l('.snake');
    if(this.board.snake.segments.length > 0){
      this.board.snake.move();
      this.render();
    } else {
      alert("Ahhh! Try again");
      window.clearInterval(this.intervalId);
      new View(rootEl);
    }
  }
}

View.MOVES = {
  38: "U",
  39: "R",
  40: "D",
  37: "L"
};

module.exports = View;
