const DomNodeCollection = require("./dom_node_collection.js");

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
