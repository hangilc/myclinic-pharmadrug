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
	var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	};
	const typed_dom_1 = __webpack_require__(1);
	var EditorMenu;
	(function (EditorMenu) {
	    class Controller {
	        constructor(layout) {
	            this.currentChoice = null;
	            this.layout = layout;
	            this.callbacks = {
	                onChoice: (choice) => { },
	                onSameChoice: (choice) => { }
	            };
	            layout.newLink.addEventListener("click", event => {
	                this.handleClick("new");
	            });
	            layout.editLink.addEventListener("click", event => {
	                this.handleClick("edit");
	            });
	        }
	        handleClick(choice) {
	            return __awaiter(this, void 0, void 0, function* () {
	                if (this.currentChoice === choice) {
	                    this.callbacks.onSameChoice(choice);
	                }
	                else {
	                    this.currentChoice = choice;
	                    this.callbacks.onChoice(choice);
	                }
	            });
	        }
	    }
	    EditorMenu.Controller = Controller;
	    function populate(parent) {
	        let newLink = typed_dom_1.h.a({}, ["新規"]);
	        let editLink = typed_dom_1.h.a({}, ["編集"]);
	        typed_dom_1.appendToElement(parent, [
	            newLink, " | ", editLink
	        ]);
	        let layout = {
	            newLink: newLink,
	            editLink: editLink
	        };
	        return new Controller(layout);
	    }
	    EditorMenu.populate = populate;
	})(EditorMenu || (EditorMenu = {}));
	var SearchPharmaDrug;
	(function (SearchPharmaDrug) {
	    class Controller {
	        constructor(layout) {
	            this.layout = layout;
	            this.callbacks = {
	                onCancel: () => { }
	            };
	            this.bindExecButton();
	            this.bindCancelButton();
	        }
	        focus() {
	            this.layout.input.focus();
	        }
	        bindExecButton() {
	            let button = this.layout.execButton;
	            button.addEventListener("click", event => {
	                let text = this.layout.input.value.trim();
	                console.log(text);
	            });
	        }
	        bindCancelButton() {
	            this.layout.cancelButton.addEventListener("click", event => {
	                this.callbacks.onCancel();
	            });
	        }
	    }
	    SearchPharmaDrug.Controller = Controller;
	    function populate(parent) {
	        let input = typed_dom_1.h.input({}, []);
	        let execButton = typed_dom_1.h.button({ type: "submit" }, ["検索実行"]);
	        let searchResult = typed_dom_1.h.select({ class: "pharmadrug-search-result" }, []);
	        let selectButton = typed_dom_1.h.button({}, ["選択"]);
	        let cancelButton = typed_dom_1.h.button({}, ["キャンセル"]);
	        let form = typed_dom_1.h.form({}, [
	            input, " ",
	            execButton,
	            typed_dom_1.h.div({}, [searchResult]),
	            typed_dom_1.h.div({}, [selectButton, " ", cancelButton])
	        ]);
	        typed_dom_1.appendToElement(parent, [form]);
	        let layout = {
	            input,
	            execButton,
	            searchResult,
	            selectButton,
	            cancelButton
	        };
	        return new Controller(layout);
	    }
	    SearchPharmaDrug.populate = populate;
	})(SearchPharmaDrug || (SearchPharmaDrug = {}));
	var NewForm;
	(function (NewForm) {
	    class Controller {
	        constructor(layout) {
	            this.layout = layout;
	            this.hideSearch();
	            this.bindSearchButton();
	            this.layout.search.callbacks.onCancel = () => {
	                this.hideSearch();
	            };
	        }
	        appendTo(parent) {
	            parent.appendChild(this.layout.form);
	        }
	        hideSearch() {
	            this.layout.searchWrapper.style.display = "none";
	        }
	        showSearch() {
	            this.layout.searchWrapper.style.display = "";
	            this.layout.search.focus();
	        }
	        bindSearchButton() {
	            let button = this.layout.searchButton;
	            button.addEventListener("click", event => {
	                let wrapper = this.layout.searchWrapper;
	                if (wrapper.style.display === "none") {
	                    this.showSearch();
	                }
	                else {
	                    this.hideSearch();
	                }
	            });
	        }
	    }
	    NewForm.Controller = Controller;
	    function populate(parent) {
	        let name = typed_dom_1.h.div({}, []);
	        let searchButton = typed_dom_1.h.button({}, ["検索"]);
	        let searchWrapper = typed_dom_1.h.div({}, []);
	        let desc = typed_dom_1.h.textarea({ class: "description" }, []);
	        let side = typed_dom_1.h.textarea({ class: "sideeffect" }, []);
	        let enter = typed_dom_1.h.button({}, ["入力"]);
	        let cancel = typed_dom_1.h.button({}, ["キャンセル"]);
	        let form = typed_dom_1.h.form({}, [
	            typed_dom_1.h.table({ class: "editor" }, [
	                typed_dom_1.h.colgroup({}, [
	                    typed_dom_1.h.col({ class: "label" }, [])
	                ]),
	                typed_dom_1.h.colgroup({}, [
	                    typed_dom_1.h.col({ class: "input" }, [])
	                ]),
	                typed_dom_1.h.tr({}, [
	                    typed_dom_1.h.td({}, ["薬剤名"]),
	                    typed_dom_1.h.td({}, [
	                        typed_dom_1.h.div({}, [name, " ", searchButton]),
	                        searchWrapper
	                    ])
	                ]),
	                typed_dom_1.h.tr({}, [
	                    typed_dom_1.h.td({}, ["説明"]),
	                    typed_dom_1.h.td({}, [desc])
	                ]),
	                typed_dom_1.h.tr({}, [
	                    typed_dom_1.h.td({}, ["副作用："]),
	                    typed_dom_1.h.td({}, [side])
	                ])
	            ]),
	            typed_dom_1.h.div({}, [
	                enter, " ",
	                cancel
	            ])
	        ]);
	        let layout = {
	            form: form,
	            name: name,
	            description: desc,
	            sideeffect: side,
	            enter: enter,
	            cancel: cancel,
	            searchButton: searchButton,
	            searchWrapper: searchWrapper,
	            search: SearchPharmaDrug.populate(searchWrapper)
	        };
	        typed_dom_1.appendToElement(parent, [form]);
	        return new Controller(layout);
	    }
	    NewForm.populate = populate;
	})(NewForm || (NewForm = {}));
	var EditorWorkarea;
	(function (EditorWorkarea) {
	    class Controller {
	        constructor(layout) {
	            this.layout = layout;
	            this.callbacks = {};
	        }
	        switchTo(choice) {
	            return __awaiter(this, void 0, void 0, function* () {
	                switch (choice) {
	                    case null:
	                        this.layout.wrapper.innerHTML = "";
	                        break;
	                    case "new": return this.switchToNew();
	                    case "edit": return this.switchToEdit();
	                }
	            });
	        }
	        switchToNew() {
	            let wrapper = this.layout.wrapper;
	            wrapper.innerHTML = "";
	            let form = NewForm.populate(wrapper);
	            form.appendTo(wrapper);
	        }
	        switchToEdit() {
	            let wrapper = this.layout.wrapper;
	            wrapper.innerHTML = "";
	            typed_dom_1.appendToElement(wrapper, ["EDIT"]);
	        }
	    }
	    EditorWorkarea.Controller = Controller;
	    function populate(parent) {
	        let layout = {
	            wrapper: parent
	        };
	        return new Controller(layout);
	    }
	    EditorWorkarea.populate = populate;
	})(EditorWorkarea || (EditorWorkarea = {}));
	var LeftPane;
	(function (LeftPane) {
	    class Layout {
	    }
	    LeftPane.Layout = Layout;
	    class Callbacks {
	    }
	    LeftPane.Callbacks = Callbacks;
	    class Controller {
	        constructor(layout) {
	            this.layout = layout;
	            this.callbacks = {};
	            this.layout.menu.callbacks.onChoice = (choice) => {
	                this.layout.workarea.switchTo(choice);
	            };
	        }
	    }
	    LeftPane.Controller = Controller;
	    function populate(parent) {
	        let menu = typed_dom_1.h.div({}, []);
	        let workarea = typed_dom_1.h.div({}, []);
	        typed_dom_1.appendToElement(parent, [
	            menu,
	            workarea
	        ]);
	        let layout = {
	            menu: EditorMenu.populate(menu),
	            workarea: EditorWorkarea.populate(workarea)
	        };
	        return new Controller(layout);
	    }
	    LeftPane.populate = populate;
	})(LeftPane || (LeftPane = {}));
	var RightPane;
	(function (RightPane) {
	    class Controller {
	    }
	    RightPane.Controller = Controller;
	    function populate(parent) {
	        return new Controller();
	    }
	    RightPane.populate = populate;
	})(RightPane || (RightPane = {}));
	var MainPane;
	(function (MainPane) {
	    class Controller {
	        constructor(layout) {
	            this.layout = layout;
	            this.callbacks = {};
	        }
	    }
	    MainPane.Controller = Controller;
	    function populate(parent) {
	        let leftElement = typed_dom_1.h.div({ style: "border: 1px solid black; width: 400px" }, []);
	        let rightElement = typed_dom_1.h.div({ style: "border: 1px solid black; width: 400px" }, []);
	        let table = typed_dom_1.h.table({}, [
	            typed_dom_1.h.tbody({}, [
	                typed_dom_1.h.tr({}, [
	                    typed_dom_1.h.td({}, [leftElement]),
	                    typed_dom_1.h.td({}, [rightElement])
	                ])
	            ])
	        ]);
	        typed_dom_1.appendToElement(parent, [
	            typed_dom_1.h.h1({}, ["薬剤情報編集"]),
	            table
	        ]);
	        let layout = {
	            leftPane: LeftPane.populate(leftElement),
	            rightPane: RightPane.populate(rightElement)
	        };
	        return new Controller(layout);
	    }
	    MainPane.populate = populate;
	})(MainPane || (MainPane = {}));
	let mainElement = document.getElementById("main");
	if (mainElement !== null) {
	    let main = MainPane.populate(mainElement);
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
	    h.colgroup = makeCreator("colgroup");
	    h.col = makeCreator("col");
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