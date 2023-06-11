/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../domalt/domalt.js":
/*!***************************!*\
  !*** ../domalt/domalt.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modules_markdown_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/markdown.js */ "../domalt/modules/markdown.js");


// let uidCounter = 0;
const elems = new Map();

function retrieve(elemName) {
  return elems.get(elemName);
}

function newElem(obj) {
  if (!Object.hasOwn(obj, "tag")) {
    obj.tag = "div";
  } else if (obj.tag === "text") {
    return obj.content;
  }
  const elem = document.createElement(obj.tag);

  if (Object.hasOwn(obj, "content")) {
    if (obj.allowInline) {
      const nodes = (0,_modules_markdown_js__WEBPACK_IMPORTED_MODULE_0__.traverse)(obj.content);
      nodes.forEach((n) => elem.append(newElem(n)));
    } else {
      elem.textContent = obj.content;
    }
  }

  for (let prop in obj) {
    const val = obj[prop];
    switch (prop) {
      case "id":
        elem.id = val;
        break;
      case "class":
        elem.classList.add(...val.split(" "));
        break;
      case "attributes":
        for (let attr of val) {
          if (attr[0] === "data-uid") continue;
          elem.setAttribute(attr[0], attr[1]);
        }
        break;
      case "children":
        if (!val.length) break;
        for (let node of val) {
          if (node instanceof HTMLElement) {
            elem.appendChild(node);
          } else {
            elem.appendChild(newElem(node));
          }
        }
        break;
      case "uid":
        if (val === true) {
          while (elems.has(uidCounter)) {
            uidCounter++;
          }
          elem.setAttribute("data-domalt-id", uidCounter++);
        } else if (typeof val === "number" || typeof val === "string") {
        }
        break;
      case "listeners":
        for (let listener of val) {
          elem.addEventListener(listener[0], listener[1]);
        }
        break;
      case "saveAs":
        elems.set(val, elem);
        break;
    }
  }
  return elem;
}

function newElemList(content, isOrdered = false) {
  let listElems = [];
  for (let item of content) {
    if (typeof item === "object" || item instanceof HTMLElement) {
      listElems.push(item);
    } else {
      listElems.push({ tag: "li", content: item });
    }
  }
  // if (Array.isArray(obj.children)) {
  //   obj.children.push(...)
  // }
  return newElem({
    tag: isOrdered ? "ol" : "ul",
    children: listElems
  });
}

function newElemNav(links, isOrdered = false) {
  // links are: [textContent, href]
  const navElems = [];
  for (let link of links) {
    navElems.push({
      tag: "li",
      children: [
        {
          tag: "a",
          content: link[0],
          attributes: [["href", link[1]]],
        },
      ],
    });
  }
  // for (let childNode of obj) {
  //   if (childNode instanceof HTMLElement) {
  //     children.push(childNode)
  //   } else {
  //     children.push(newElem(childNode))
  //   }
  // }
  return newElem({
    tag: "nav",
    children: [
      {
        tag: isOrdered ? "ol" : "ul",
        children: navElems,
      },
    ],
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({ newElem, newElemNav, newElemList, retrieve });


/***/ }),

/***/ "../domalt/modules/markdown.js":
/*!*************************************!*\
  !*** ../domalt/modules/markdown.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   traverse: () => (/* binding */ traverse)
/* harmony export */ });
const MARKDOWN_CHARS = ["[", "*", "_"];

function checkTags(text) {
  const current = {
    tag: "text",
    closingTag: "",
  };
  if (text[0] === text[text.length - 1] && MARKDOWN_CHARS.includes(text[0])) {
    current.closingTag = text[0] === "[" ? "]" : text[0];
    current.children = [];
    switch (current.closingTag) {
      case "]":
        current.tag = "a";
        break;
      case "_":
        current.tag = "em";
        break;
      case "*":
        current.tag = "strong";
        break;
    }
  }
  return current;
}

function checkEscape(text, i) {
  if (text[i] === "\\") {
    return [text.slice(0, i) + text.slice(i + 1, text.length), i]
  }
  return [text, i];
}

function traverse(text) {
  const arr = [];
  let currentNode = checkTags(text);
  if (currentNode.tag !== "text") {
    text = text.slice(1, -1)
  }
  let startIndex = 0;

  for (let i = 0; i < text.length; i++) {
    if (MARKDOWN_CHARS.includes(text[i])) {
      let closingTag = text[i] === "[" ? "]" : text[i];
      for (let j = i + 1; j < text.length; j++) {
        if (text[j] === closingTag) {
          if (currentNode.children) {
            currentNode.children.push(...traverse(text.slice(i, j + 1)));
            arr.push({ content: text.slice(startIndex, i), ...currentNode });
          } else {
            arr.push({ content: text.slice(startIndex, i), ...currentNode });
            arr.push(...traverse(text.slice(i, j + 1)));
          }
          startIndex = j + 1;
          i = j;
          [text, j] = checkEscape(text, j);
          break;
        }
      }
    } 
    [text, i] = checkEscape(text, i);
  }
  if (startIndex < text.length) {
    currentNode.children = []; // tacky but hey
    arr.push({ content: text.slice(startIndex, text.length), ...currentNode });
  }
  return arr;
}




/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/styles.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/styles.scss ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Inter:wght@200..800&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "html {\n  box-sizing: border-box;\n}\n\n* {\n  margin: 0;\n  padding: 0;\n}\n*::before, *::after {\n  box-sizing: inherit;\n  font-family: inherit;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\nol, ul {\n  list-style: none;\n}\n\nimg, video {\n  max-width: 100%;\n}\n\n:root {\n  --yellow: #FFE45E;\n  --white: #F9F9F9;\n  --pink: #FF6392;\n  --blue-dark: #5AA9E6;\n  --blue-light: #7FC8F8;\n  --black: #1C1D21;\n}\n\nbody {\n  font-family: \"Inter\";\n}\n\np {\n  font-weight: 200;\n}\n\nh1 {\n  font-size: 2.4rem;\n  font-weight: 800;\n}\n\nbody > #entry {\n  background-color: var(--yellow);\n  display: grid;\n  grid-template-rows: min-content min-content 1fr min-content;\n  gap: 1rem;\n  height: 100vh;\n  overflow: hidden;\n}\n\nheader {\n  margin: 0 1rem;\n  padding: 1.4rem 0 1rem 0;\n  border-bottom: 1px var(--black) solid;\n  display: grid;\n  place-items: center;\n}\n\nnav {\n  display: flex;\n  gap: 6rem;\n  justify-content: center;\n}\nnav a {\n  cursor: pointer;\n  border: 1px solid var(--black);\n  width: 4rem;\n  text-align: center;\n  padding: 0.2em 2em;\n  transition: background-color 0.12s, transform 0.1s;\n  user-select: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\nnav a:hover {\n  background-color: var(--white);\n}\nnav a:active {\n  transform: translateY(2px);\n}\n\nmain {\n  overflow-y: scroll;\n  height: 100%;\n  padding: 0 1rem;\n  display: grid;\n  place-items: center;\n}\nmain ul {\n  display: grid;\n  gap: 1rem;\n}\n\nfooter {\n  background-color: var(--black);\n  padding: 1rem;\n  color: var(--white);\n}\n\nimg {\n  max-width: 50vh;\n}\n\n.card {\n  background-color: var(--white);\n  border-radius: 2rem;\n  padding: 2rem;\n  display: grid;\n  gap: 1rem;\n  place-items: center;\n}\n.card h3::after {\n  content: \"\";\n  display: block;\n  min-height: 1px;\n  margin-top: 0.4em;\n  width: 100%;\n  background-color: var(--black);\n}", "",{"version":3,"sources":["webpack://./src/sass/globals/_reset.scss","webpack://./src/sass/styles.scss","webpack://./src/sass/globals/_theme.scss","webpack://./src/sass/pages/_root.scss","webpack://./src/sass/globals/_mixins.scss","webpack://./src/sass/components/_card.scss"],"names":[],"mappings":"AAEA;EACI,sBAAA;ACAJ;;ADGA;EACI,SAAA;EACA,UAAA;ACAJ;ADCI;EACI,mBAAA;EACA,oBAAA;ACCR;;ADKA;EACI,yBAAA;EACA,iBAAA;ACFJ;;ADKA;EACI,gBAAA;ACFJ;;ADKA;EACI,eAAA;ACFJ;;ACzBA;EACI,iBAAA;EACA,gBAAA;EACA,eAAA;EACA,oBAAA;EACA,qBAAA;EACA,gBAAA;AD4BJ;;ACrBA;EACI,oBAAA;ADwBJ;;ACrBA;EACI,gBAAA;ADwBJ;;ACrBA;EACI,iBAAA;EACA,gBAAA;ADwBJ;;AE7CA;EACE,+BAAA;EAEA,aAAA;EACA,2DAAA;EACA,SAAA;EACA,aAAA;EACA,gBAAA;AF+CF;;AE5CA;EAEE,cAAA;EACA,wBAAA;EACA,qCAAA;EACA,aAAA;EACA,mBAAA;AF8CF;;AE3CA;EACE,aAAA;EACA,SAAA;EACA,uBAAA;AF8CF;AE7CE;EACE,eAAA;EACA,8BAAA;EACA,WAAA;EACA,kBAAA;EACA,kBAAA;EACA,kDAAA;EC5BA,iBAAA;EACA,yBAAA;EACA,sBAAA;EACA,wCAAA;AH4EJ;AElDI;EACE,8BAAA;AFoDN;AElDI;EACE,0BAAA;AFoDN;;AE9CA;EACE,kBAAA;EACA,YAAA;EACA,eAAA;EACA,aAAA;EACA,mBAAA;AFiDF;AEhDE;EACE,aAAA;EACA,SAAA;AFkDJ;;AE9CA;EACE,8BAAA;EACA,aAAA;EACA,mBAAA;AFiDF;;AE9CA;EACE,eAAA;AFiDF;;AI9GA;EACE,8BAAA;EACA,mBAAA;EAEA,aAAA;EACA,aAAA;EACA,SAAA;EACA,mBAAA;AJgHF;AI/GE;EACE,WAAA;EACA,cAAA;EACA,eAAA;EACA,iBAAA;EACA,WAAA;EACA,8BAAA;AJiHJ","sourcesContent":["// global behavior\n\nhtml {\n    box-sizing: border-box;\n}\n\n* {\n    margin: 0;\n    padding: 0;\n    &::before, &::after {\n        box-sizing: inherit;\n        font-family: inherit;\n    }\n}\n\n// specific element styles\n\ntable {\n    border-collapse: collapse;\n    border-spacing: 0;\n}\n\nol, ul {\n    list-style: none;\n}\n\nimg, video {\n    max-width: 100%;\n}","@import url(\"https://fonts.googleapis.com/css2?family=Inter:wght@200..800&display=swap\");\nhtml {\n  box-sizing: border-box;\n}\n\n* {\n  margin: 0;\n  padding: 0;\n}\n*::before, *::after {\n  box-sizing: inherit;\n  font-family: inherit;\n}\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\nol, ul {\n  list-style: none;\n}\n\nimg, video {\n  max-width: 100%;\n}\n\n:root {\n  --yellow: #FFE45E;\n  --white: #F9F9F9;\n  --pink: #FF6392;\n  --blue-dark: #5AA9E6;\n  --blue-light: #7FC8F8;\n  --black: #1C1D21;\n}\n\nbody {\n  font-family: \"Inter\";\n}\n\np {\n  font-weight: 200;\n}\n\nh1 {\n  font-size: 2.4rem;\n  font-weight: 800;\n}\n\nbody > #entry {\n  background-color: var(--yellow);\n  display: grid;\n  grid-template-rows: min-content min-content 1fr min-content;\n  gap: 1rem;\n  height: 100vh;\n  overflow: hidden;\n}\n\nheader {\n  margin: 0 1rem;\n  padding: 1.4rem 0 1rem 0;\n  border-bottom: 1px var(--black) solid;\n  display: grid;\n  place-items: center;\n}\n\nnav {\n  display: flex;\n  gap: 6rem;\n  justify-content: center;\n}\nnav a {\n  cursor: pointer;\n  border: 1px solid var(--black);\n  width: 4rem;\n  text-align: center;\n  padding: 0.2em 2em;\n  transition: background-color 0.12s, transform 0.1s;\n  user-select: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\nnav a:hover {\n  background-color: var(--white);\n}\nnav a:active {\n  transform: translateY(2px);\n}\n\nmain {\n  overflow-y: scroll;\n  height: 100%;\n  padding: 0 1rem;\n  display: grid;\n  place-items: center;\n}\nmain ul {\n  display: grid;\n  gap: 1rem;\n}\n\nfooter {\n  background-color: var(--black);\n  padding: 1rem;\n  color: var(--white);\n}\n\nimg {\n  max-width: 50vh;\n}\n\n.card {\n  background-color: var(--white);\n  border-radius: 2rem;\n  padding: 2rem;\n  display: grid;\n  gap: 1rem;\n  place-items: center;\n}\n.card h3::after {\n  content: \"\";\n  display: block;\n  min-height: 1px;\n  margin-top: 0.4em;\n  width: 100%;\n  background-color: var(--black);\n}",":root {\n    --yellow: #FFE45E;\n    --white: #F9F9F9;\n    --pink: #FF6392;\n    --blue-dark: #5AA9E6;\n    --blue-light: #7FC8F8;\n    --black: #1C1D21;\n}\n\n// typography\n\n@import url('https://fonts.googleapis.com/css2?family=Inter:wght@200..800&display=swap');\n\nbody {\n    font-family: \"Inter\";\n}\n\np {\n    font-weight: 200;\n}\n\nh1 {\n    font-size: 2.4rem;\n    font-weight: 800;\n}","@use \"../globals/mixins\" as *;\n\nbody > #entry {\n  background-color: var(--yellow);\n  // padding: 0 1rem;\n  display: grid;\n  grid-template-rows: min-content min-content 1fr min-content;\n  gap: 1rem;\n  height: 100vh;\n  overflow: hidden;\n}\n\nheader {\n  // height: 4rem;\n  margin: 0 1rem;\n  padding: 1.4rem 0 1rem 0;\n  border-bottom: 1px var(--black) solid;\n  display: grid;\n  place-items: center;\n}\n\nnav {\n  display: flex;\n  gap: 6rem;\n  justify-content: center;\n  a {\n    cursor: pointer;\n    border: 1px solid var(--black);\n    width: 4rem;\n    text-align: center;\n    padding: 0.2em 2em;\n    transition: background-color 0.12s, transform 0.1s;\n    &:hover {\n      background-color: var(--white);\n    }\n    &:active {\n      transform: translateY(2px);\n    }\n    @include disable-selection;\n  }\n}\n\nmain {\n  overflow-y: scroll;\n  height: 100%;\n  padding: 0 1rem;\n  display: grid;\n  place-items: center;\n  ul {\n    display: grid;\n    gap: 1rem;\n  }\n}\n\nfooter {\n  background-color: var(--black);\n  padding: 1rem;\n  color: var(--white);\n}\n\nimg {\n  max-width: 50vh;\n}","@use \"./breakpoints\" as *;\n\n@mixin disable-selection {\n    user-select: none;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -webkit-tap-highlight-color: transparent;\n}\n\n@mixin page-grid {\n    display: grid;\n    gap: .7rem;\n    grid-template-columns: 1fr 1fr;\n    @include break-at(\"small\") {\n        gap: .8rem;\n    }\n    @include break-at(\"medium\") {\n        grid-template-columns: repeat(4, 1fr);\n    }\n    @include break-at(\"large\") {\n        grid-template-columns: 1fr repeat(3, 320px) 1fr;\n    }\n}",".card {\n  background-color: var(--white);\n  border-radius: 2rem;\n  // height: 12rem;\n  padding: 2rem;\n  display: grid;\n  gap: 1rem;\n  place-items: center;\n  h3::after {\n    content: \"\";\n    display: block;\n    min-height: 1px;\n    margin-top: 0.4em;\n    width: 100%;\n    background-color: var(--black);\n  }\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/sass/styles.scss":
/*!******************************!*\
  !*** ./src/sass/styles.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./styles.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/styles.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/modules/pages.js":
/*!******************************!*\
  !*** ./src/modules/pages.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getPage: () => (/* binding */ getPage)
/* harmony export */ });
/* harmony import */ var domalt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! domalt */ "../domalt/domalt.js");
/* harmony import */ var _recipes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recipes */ "./src/modules/recipes.js");
/* harmony import */ var _assets_tuna2_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/tuna2.png */ "./src/assets/tuna2.png");




const pages = {
  home: domalt__WEBPACK_IMPORTED_MODULE_0__["default"].newElem({
    tag: "img",
    id: "tuna-img",
    attributes: [
      ["src", _assets_tuna2_png__WEBPACK_IMPORTED_MODULE_2__],
      ["alt", "A tuna dish."],
    ],
  }),
  menu: domalt__WEBPACK_IMPORTED_MODULE_0__["default"].newElemList(_recipes__WEBPACK_IMPORTED_MODULE_1__.recipes),
  contact: domalt__WEBPACK_IMPORTED_MODULE_0__["default"].newElem({
    tag: "p",
    content: "Coming soon."
  }),
  notFound: domalt__WEBPACK_IMPORTED_MODULE_0__["default"].newElem({
    tag: "h2",
    content: "404 not found."
  })
}

const getPage = (pageName) => {
  if (pages.hasOwnProperty(pageName)) {
    return pages[pageName];
  } 
  return pages.notFound;
}



/***/ }),

/***/ "./src/modules/recipes.js":
/*!********************************!*\
  !*** ./src/modules/recipes.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   recipes: () => (/* binding */ recipes)
/* harmony export */ });
/* harmony import */ var domalt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! domalt */ "../domalt/domalt.js");


const recipeFactory = (title, desc = "A dish.") => {
  return { title, desc };
}

const newElemRecipe = (recipe) => {
  return domalt__WEBPACK_IMPORTED_MODULE_0__["default"].newElem({
    class: "card",
    children: [
      { tag: "h3", content: recipe.title },
      { tag: "p", content: recipe.desc }
    ]
  })
}

const recipes = [
  newElemRecipe(recipeFactory("Tuna pasta")),
  newElemRecipe(recipeFactory("Salmon chirashi")),
  newElemRecipe(recipeFactory("Sardine salad"))
];





/***/ }),

/***/ "./src/assets/tuna2.png":
/*!******************************!*\
  !*** ./src/assets/tuna2.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "tuna2.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_styles_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sass/styles.scss */ "./src/sass/styles.scss");
/* harmony import */ var domalt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! domalt */ "../domalt/domalt.js");
/* harmony import */ var _modules_pages_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/pages.js */ "./src/modules/pages.js");




const entryPoint = document.getElementById("entry");
const navElems = ["home", "menu", "contact", "test"].map((pageName) => {
  return {
    tag: "a",
    content: pageName,
    listeners: [
      ["click", () => switchPage(pageName)]
    ]
  }
});

entryPoint.append(
  domalt__WEBPACK_IMPORTED_MODULE_1__["default"].newElem({
    tag: "header",
    children: [
      {
        tag: "h1",
        content: "POM-PESC",
      },
    ],
  }),
  domalt__WEBPACK_IMPORTED_MODULE_1__["default"].newElem({
    tag: "nav",
    children: navElems
  }),
  domalt__WEBPACK_IMPORTED_MODULE_1__["default"].newElem({
    tag: "main",
    saveAs: "content",
  }),
  domalt__WEBPACK_IMPORTED_MODULE_1__["default"].newElem({
    tag: "footer",
    children: [
      {
        tag: "p",
        content: "Made with \u2665 by Pompy Productions. All rights reserved.",
      },
    ],
  })
);

const switchPage = (pageName) => {
  domalt__WEBPACK_IMPORTED_MODULE_1__["default"].retrieve("content").replaceChildren((0,_modules_pages_js__WEBPACK_IMPORTED_MODULE_2__.getPage)(pageName));
}

switchPage("home");

})();

/******/ })()
;
//# sourceMappingURL=main.js.map