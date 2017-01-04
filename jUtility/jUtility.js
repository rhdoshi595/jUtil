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

	const DomNodeCollection = __webpack_require__(1);
	
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
	
	  // optionsObj.method = optionsObj.method.toUpperCase();
	  // if (optionsObj.method === "GET"){
	  //   optionsObj.url += "?" + queryString(optionsObj.data);
	  // }
	
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
/* 1 */
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
//# sourceMappingURL=jUtility.js.map