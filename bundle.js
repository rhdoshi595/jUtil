/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const View = __webpack_require__(1);
	const Game = __webpack_require__(3);
	const $l = __webpack_require__(6);
	
	$l(() => {
	  const rootEl = $l('.snake');
	  new View(rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);
	const $l = __webpack_require__(6);
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(3);
	const Apple = __webpack_require__(5);
	
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Coordinate = __webpack_require__(4);
	
	class Snake {
	  constructor(board){
	    this.direction = "N";
	    this.board = board;
	    this.segments = [new Coordinate(10, 10)];
	    this.turning = false;
	    this.grow = 0;
	  }
	
	  head(){
	    return this.segments[0];
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
	
	  hasCoordinate([x, y]){
	    this.segments.forEach((coordinate) => {
	      if ((coordinate[0] === x) && (coordinate[1] === y)){
	        return true;
	      }
	    });
	
	    return false;
	  }
	}
	
	Snake.CARDINALS = {
	  "N": new Coordinate(-1, 0),
	  "S": new Coordinate(1, 0),
	  "E": new Coordinate(0, 1),
	  "W": new Coordinate(0, -1)
	};
	
	module.exports = Snake;


/***/ },
/* 4 */
/***/ function(module, exports) {

	class Coordinate{
	  constructor(x, y){
	    this.x = x;
	    this.y = y;
	  }
	
	  equals(coord){
	    return ((this.x === coord.x) && (this.y === coord.y));
	  }
	
	  isOpposite(coord){
	    return ((this.x === (-1 * coord.x)) && (this.y === (-1 * coord.y)));
	  }
	
	  plus(cardinal){
	    
	    return new Coordinate(this.x + cardinal.x, this.y + cardinal.y);
	  }
	}
	
	module.exports = Coordinate;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Coordinate = __webpack_require__(4);
	
	class Apple{
	  constructor(board){
	    this.board = board;
	    this.addApple();
	  }
	
	  addApple(){
	    let x = Math.floor(Math.random() * 20);
	    let y = Math.floor(Math.random() * 20);
	
	    while (this.board.snake.hasCoordinate([x,y])){
	      x = Math.floor(Math.random() * 20);
	      y = Math.floor(Math.random() * 20);
	    }
	
	    this.position = new Coordinate(x, y);
	  }
	}
	
	module.exports = Apple;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const DomNodeCollection = __webpack_require__(7);
	
	const functionQueue = [];
	let ready = false;
	document.addEventListener("DOMContentLoaded", () => {
	  ready = true;
	  functionQueue.forEach((func) => {
	    func();
	  });
	});
	
	const $l = (selector) => {
	  if(typeof selector === "function"){
	    if(ready){
	      selector();
	    } else {
	      functionQueue.push(selector);
	    }
	  } else if (selector === window){
	    return new DomNodeCollection([window]);
	  } else if(selector instanceof HTMLElement){
	    return new DomNodeCollection([selector]);
	  } else if(typeof selector === "string"){
	    const nodeList = document.querySelectorAll(selector); //nodes is a node list
	    const nodes_array = Array.from(nodeList);
	    return new DomNodeCollection(nodes_array);
	  }
	};
	
	
	
	window.$l = $l;
	
	$l.extend = (...otherObjs) => {
	  let result = {};
	  otherObjs.forEach(argObj => {
	    for(var key in argObj){
	      if(result[key] === undefined){
	        result[key] = argObj[key];
	      } else {
	        result[key] = argObj[key];
	      }
	    }
	  });
	  return result;
	};
	
	const queryString = (object) => {
	  let result = "";
	  for(var key in object){
	    if(object.hasOwnProperty(key)){
	      result += key + "=" + object[key] + "&";
	    }
	  }
	  return result.substring(0, result.length - 1);
	};
	
	$l.ajax = (optionsObj) => {
	  const apple = {
	    method: "GET",
	    url: "",
	    data: {},
	    success: () => {},
	    error: () => {},
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
	  };
	
	  optionsObj = $l.extend(apple, optionsObj);
	  const xhr = new XMLHttpRequest();
	
	  xhr.open(optionsObj.method, optionsObj.url, true);
	
	  xhr.onload = (e) => {
	    if(xhr.status === 200){
	      optionsObj.success(xhr.response);
	    } else {
	      optionsObj.error(xhr.response);
	    }
	  };
	
	  xhr.send(JSON.stringify(optionsObj.data));
	};
	
	module.exports = $l;


/***/ },
/* 7 */
/***/ function(module, exports) {

	class DomNodeCollection {
	  constructor (nodes_array){
	    this.nodes_array = nodes_array;
	  }
	
	  html(argument) {
	    if(typeof argument === "string"){
	      this.nodes_array.forEach(
	        (node) => node.innerHTML = argument
	      );
	    } else {
	      if(this.nodes_array.length > 0){
	        return this.nodes_array[0].innerHTML;
	      }
	    }
	  }
	
	  empty(){
	    this.html = ("");
	  }
	
	  append(content){
	    if(this.nodes_array.length === 0){
	      return;
	    }
	    if(typeof content === "string" && !(content instanceof DomNodeCollection)){
	      content = $l(content);
	    }
	    if(typeof content === "string"){
	      this.nodes_array.forEach(
	        (node) => node.innerHTML += content
	      );
	    } else if (content instanceof DomNodeCollection) {
	      this.nodes_array.forEach(
	        (node) => {
	          content.nodes_array.forEach(
	            child => {
	              node.appendChild(child.cloneNode(true));
	            }
	          );
	        }
	      );
	    }
	  }
	
	  attr(name, value){
	    if(typeof value === "string"){
	      this.nodes_array.forEach(node => node.setAttribute(name, value));
	    } else {
	      return this.nodes_array[0].getAttribute(name);
	    }
	  }
	
	  addClass(name){
	    this.nodes_array.forEach((node) => node.classList.add(name));
	  }
	
	  removeClass(name){
	    this.nodes_array.forEach((node) => node.classList.remove(name));
	  }
	
	  children(){
	    let childrenNodes = [];
	    this.nodes_array.forEach((node) => {
	      const singleNodeChildren = node.children;
	      childrenNodes = childrenNodes.concat(Array.from(singleNodeChildren));
	    });
	    return new DomNodeCollection(childrenNodes);
	  }
	
	  parent() {
	    let parentNodes = [];
	    this.nodes_array.forEach((node) => parentNodes.push(node.parentNode));
	    return new DomNodeCollection(parentNodes);
	  }
	
	  find(picker){
	    let found = [];
	    this.nodes_array.forEach((node) => {
	      const list = node.querySelectorAll(picker);
	      found = found.concat(Array.from(list));
	    });
	    return new DomNodeCollection(found);
	  }
	
	  remove(picker){
	    this.nodes_array.forEach((node) => node.parentNode.removeChild(node));
	  }
	
	  on(event, cb){
	    this.nodes_array.forEach((node) => {
	      node.addEventListener(event, cb);
	      const eventKey = `jutility-${event}`;
	      if (typeof node[eventKey] === "undefined"){
	        node[eventKey] = [];
	      }
	      node[eventKey].push(cb);
	    });
	  }
	
	  off(event){
	    this.nodes_array.forEach((node) => {
	      const eventKey = `jutility-${event}`;
	      if(node[eventKey]){
	        node[eventKey].forEach((cb) => {
	          node.removeEventListener(event, cb);
	        });
	      }
	      node[eventKey] = [];
	    });
	  }
	
	  text(string){
	    this.nodes_array.forEach((node) => {
	      node.textContent = string;
	    });
	    return;
	  }
	
	  eq(index){
	    return new DomNodeCollection([this.nodes_array[index]]);
	  }
	}
	
	module.exports = DomNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map