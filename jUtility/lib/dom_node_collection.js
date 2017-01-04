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
