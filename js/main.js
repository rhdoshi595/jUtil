const View = require('./snake-view.js');
const Game = require('./snake.js');
const $l = require('./../jUtility/lib/main.js');

$l(() => {
  const rootEl = $l('.snake');
  new View(rootEl);
});
