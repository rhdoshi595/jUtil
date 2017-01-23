# jUtility

[Snake Demo][link]
[link]: https://rhdoshi595.github.io/Snake-with-jUtility/

## Background

jUtility is a fast and small JavaScript library inspired by jQuery. jUtility simplifies HTML document traversal, DOM manipulation, event handling, and AJAX requests in JavaScript.

# Guidelines

## Installation

To use jUtility, start by downloading `./jUtility` and include it in your project directory. Then, include the following script tag in the `head` section of your HTML document:

``` javascript
  <script src="./jUtility/jUtility.js" charset="utf-8"></script>
```

You can also include the following line at the top of every file that uses jUtility.

``` javascript
  const $l = require('./../jUtility/jUtility.js');
```

## Examples

With jUtility, you can perform some basic DOM manipulation functions:

You can select specific HTML elements or selectors:

``` javascript
$l('li')
// select all li elements

$l('.biography')
// select elements with 'biography' class
```

You can also change the innerHTML of the selected elements:

``` javascript
$l('p').html('pizza')
// select p elements and change innerHTML to 'pizza'
```

You can attach event handlers...

``` javascript
$l('.button').on('click', () => {
  console.log('Yay you clicked the button');
})
// clicking anything with a button will print the above message to the console.
```

You can also perform an AJAX request...

``` javascript
// will fetch weather information
$l.ajax({
  method: "GET",
  url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bcb83c4b54aee8418983c2aff3073b3b",
  success(data) {
    console.log("Here is the weather in London")
    console.log(data);
  },
  error() {
    console.error("Sorry there was a problem in your request.");
  }
})
```

### `DOMNodeCollection.prototype` Methods

#### `html`
* This method gets the `innerHTML` contents of the first element in the set of matched elements or will use the string passed in to set the `innerHTML` of each node in the collection.
* Takes a string as an optional argument

#### `empty`
* Removes all child nodes of the set of matched elements.

#### `append`
* Takes a a string, an HTML element, or a jUtility wrapped node collection
* Appends the `outerHTML` of the given argument to the `innerHTML` of each element in the node collection

#### `attr(attributeName)`
* Given just an attribute parameter, it returns the first element in the node collection that matches the attribute

#### `attr(attributeName, value)`
* Takes an attribute parameter along with an optional value parameter (attribute, value)
* Given both an attribute and value parameter, it sets the matched attribute to the value parameter for each node in the collection

#### `addClass`
* Takes multiple classes as arguments and adds each to the list of classes of each node in the node collection

#### `removeClass`
* Takes multiple classes as arguments and removes each from the class list of each node in the node collection

#### `children`
* Returns collection of all children of each node

#### `parent`
* Returns collection of all parent nodes

#### `find`
* Takes a selector as an argument and returns all descendants of each node in the set of matched nodes.

#### `remove`
* Removes all instances of each node from the DOM

#### `on`
* Takes an event and callback as arguments and adds an eventListener for each element in the collection
* Activates callback action when triggered  

#### `off`
* Takes an event as an argument and removes all eventListeners for each element in the collection
