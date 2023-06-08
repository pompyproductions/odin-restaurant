# Odin Restaurant

An assignment from The Odin Project.

## Setup

Went one extra step to really set up the webpack with dev server, sass, html plugin...

This gem of a video helped out:

[Webpack 5 Crash Course | Frontend Development Setup](https://www.youtube.com/watch?v=IZGNcSuwBZs)  
from [Traversy Media](https://www.youtube.com/@TraversyMedia)


## Approach

Since it's a hassle to create html nodes with vanilla JS methods, I ended up writing a JS module that handles the annoying parts for me. This way, I can just feed an object to my "newElem" function and have it output directly the DOM elements that I want:

```js
newElem({
    tag: "main",
    children: [{
      tag: "img",
      id: "tuna-img",
      attributes: [
        ["src", tunaImg],
        ["alt", "A tuna dish."]
      ]
    }],
    uid: true
}),
```

Since I already went through the module-making process, I'm no longer feeling inclined to make separate modules for each tabbed page, but rather a single "pages.js" module that has the necessary information for "dom.js" to do its magic.