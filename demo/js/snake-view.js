const Board = require('./board.js');
const $l = require('./../../jUtility/lib/main.js');

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

  render(){
    this.updateClasses(this.board.snake.segments, "snake");
    this.updateClasses([this.board.apple.position], "apple");
  }

  updateClasses(coordinates, className){
    $l(`.${className}`).removeClass(className);
    coordinates.forEach((coordinate) => {
      const flatCoordinate = ((coordinate.x * 20) + coordinate.y);
      if(this.$li){
        this.$li.eq(flatCoordinate).addClass(className);
      }
    });
  }

  drawBoard(){
    let html = "";
    for(let i = 0; i < 20; i += 1){
      html += "<ul>";
      for(let j = 0; j < 20; j += 1){
        html += "<li></li>";
      }
      html += "</ul>";
    }
    this.$el.html(html);
    this.$li = $l("li");
  }

  step(){
    const rootEl = $l('.snake');
    if(this.board.snake.segments.length > 0){
      this.board.snake.move();
      this.render();
    } else {
      window.clearInterval(this.intervalId);
      new View(rootEl);
    }
  }
}

View.MOVES = {
  38: "N",
  39: "E",
  40: "S",
  37: "W"
};

module.exports = View;
