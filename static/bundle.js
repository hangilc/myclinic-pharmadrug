/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const typed_dom_1 = __webpack_require__(1);
	class EditorLayout {
	    constructor() {
	        this.menu = typed_dom_1.h.div({}, ["MENU"]);
	        this.frame = typed_dom_1.h.div({}, [
	            this.menu
	        ]);
	    }
	}
	class EditorPane {
	    constructor(parent) {
	        this.layout = new EditorLayout();
	        this.parent = parent;
	        parent.appendChild(this.layout.frame);
	    }
	    setup() {
	    }
	}
	class MainLayout {
	    constructor() {
	        this.leftPane = typed_dom_1.h.div({ style: "border: 1px solid black; width: 400px" }, []);
	        this.rightPane = typed_dom_1.h.div({ style: "border: 1px solid black; width: 400px" }, []);
	        let table = typed_dom_1.h.table({}, [
	            typed_dom_1.h.tbody({}, [
	                typed_dom_1.h.tr({}, [
	                    typed_dom_1.h.td({}, [this.leftPane]),
	                    typed_dom_1.h.td({}, [this.rightPane])
	                ])
	            ])
	        ]);
	        this.frame = typed_dom_1.h.div({}, [
	            typed_dom_1.h.h1({}, ["薬剤情報編集"]),
	            table
	        ]);
	    }
	}
	class MainPane {
	    constructor(parent) {
	        this.layout = new MainLayout();
	        this.parent = parent;
	        parent.appendChild(this.layout.frame);
	        this.editorPane = new EditorPane(this.layout.leftPane);
	        this.editorPane.setup();
	    }
	    setup() {
	    }
	}
	let mainElement = document.getElementById("main");
	if (mainElement !== null) {
	    let main = new MainPane(mainElement);
	    main.setup();
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	function createElement(tag, attrs, children) {
	    let e = document.createElement(tag);
	    for (let key in attrs) {
	        let val = attrs[key];
	        if (key === "style") {
	            if (typeof val === "string") {
	                e.style.cssText = val;
	            }
	            else {
	                for (let cssKey in val) {
	                    e.style[cssKey] = val[cssKey];
	                }
	            }
	        }
	        else {
	            e.setAttribute(key, val);
	        }
	    }
	    appendToElement(e, children);
	    return e;
	}
	exports.createElement = createElement;
	function createElementFn(fn, tag, attrs, children) {
	    let e = createElement(tag, attrs, children);
	    fn(e);
	    return e;
	}
	exports.createElementFn = createElementFn;
	var h;
	(function (h) {
	    function makeCreator(tag) {
	        return function (attrs, children) {
	            return createElement(tag, attrs, children);
	        };
	    }
	    h.div = makeCreator("div");
	    h.h1 = makeCreator("h1");
	    h.h2 = makeCreator("h2");
	    h.h3 = makeCreator("h3");
	    h.input = makeCreator("input");
	    h.button = makeCreator("button");
	    h.table = makeCreator("table");
	    h.tbody = makeCreator("tbody");
	    h.tr = makeCreator("tr");
	    h.td = makeCreator("td");
	    h.br = makeCreator("br");
	    h.p = makeCreator("p");
	    h.select = makeCreator("select");
	    h.option = makeCreator("option");
	    h.span = makeCreator("span");
	    h.textarea = makeCreator("textarea");
	    function form(attrs, children) {
	        if (!("onSubmit" in attrs)) {
	            attrs.onSubmit = "return false";
	        }
	        return createElement("form", attrs, children);
	    }
	    h.form = form;
	    function a(attrs, children) {
	        if (!("href" in attrs)) {
	            attrs.href = "javascript:void(0)";
	        }
	        else if (attrs.href === undefined) {
	            delete attrs.href;
	        }
	        return createElement("a", attrs, children);
	    }
	    h.a = a;
	})(h = exports.h || (exports.h = {}));
	function appendToElement(element, children) {
	    children.forEach(function (n) {
	        if (typeof n === "string") {
	            element.appendChild(document.createTextNode(n));
	        }
	        else if (n instanceof HTMLElement) {
	            element.appendChild(n);
	        }
	    });
	}
	exports.appendToElement = appendToElement;
	function removeElement(element) {
	    let parent = element.parentNode;
	    if (parent !== null) {
	        parent.removeChild(element);
	    }
	}
	exports.removeElement = removeElement;


/***/ }
/******/ ]);