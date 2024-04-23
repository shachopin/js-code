import { name } from "https://ojet-starter-copy-dom.glitch.me/mygoldmine/utils/decorators.js";
import {name as anotherName } from './goldmine/utils/decorators.js';
import { name as anotherName2 } from "https://dawei-dai-codes.glitch.me/goldmine/utils/decorators.js";
import { deepMapKeys } from "https://dawei-dai-codes.glitch.me/goldmine/utils/mapKeys.js";

/*
  This is your site JavaScript code - you can add interactivity!
*/

// Print a message in the browser's dev tools console each time the page loads
// Use your menus or right-click / control-click and choose "Inspect" > "Console"
console.log("Hello 🌎");

/* 
Make the "Click me!" button move when the visitor clicks it:
- First add the button to the page by following the steps in the TODO 🚧
*/
const btn = document.querySelector("button"); // Get the button from the page
if (btn) { // Detect clicks on the button
  btn.onclick = function () {
    // The 'dipped' class in style.css changes the appearance on click
    btn.classList.toggle("dipped");
  };
}


// ----- GLITCH STARTER PROJECT HELPER CODE -----

// Open file when the link in the preview is clicked
let goto = (file, line) => {
  window.parent.postMessage(
    { type: "glitch/go-to-line", payload: { filePath: file, line: line } }, "*"
  );
};
// Get the file opening button from its class name
const filer = document.querySelectorAll(".fileopener");
filer.forEach((f) => {
  f.onclick = () => { goto(f.dataset.file, f.dataset.line); };
});

//////////////////////////////////////////////test your code below///////////////////////////
// console.log(name)
// console.log(anotherName)
// console.log(anotherName2)
const obj = {
  foo: '1',
  nested: {
    child: {
      withArray: [
        {
          grandChild: ['hello']
        }
      ]
    }
  }
};
console.log(deepMapKeys(obj, key => key.toUpperCase()));