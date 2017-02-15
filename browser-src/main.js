"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const typed_dom_1 = require("./typed-dom");
const service = require("./service");
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
                this.switchTo("new", true);
            });
            layout.editLink.addEventListener("click", event => {
                this.switchTo("edit", true);
            });
        }
        switchTo(choice, triggerCallback) {
            if (this.currentChoice === choice) {
                if (triggerCallback) {
                    this.callbacks.onSameChoice(choice);
                }
            }
            else {
                this.currentChoice = choice;
                if (triggerCallback) {
                    this.callbacks.onChoice(choice);
                }
            }
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
                onSelect: _ => { },
                onCancel: () => { }
            };
            this.bindExecButton();
            this.bindSelectButton();
            this.bindCancelButton();
        }
        focus() {
            this.layout.input.focus();
        }
        bindExecButton() {
            let button = this.layout.execButton;
            button.addEventListener("click", (event) => __awaiter(this, void 0, void 0, function* () {
                let text = this.layout.input.value.trim();
                let masters = yield service.searchIyakuhinMaster(text);
                let select = this.layout.searchResult;
                select.innerHTML = "";
                masters.forEach(m => {
                    let opt = typed_dom_1.h.option({ value: m.iyakuhincode }, [m.name]);
                    select.appendChild(opt);
                });
            }));
        }
        bindSelectButton() {
            let button = this.layout.selectButton;
            button.addEventListener("click", (event) => __awaiter(this, void 0, void 0, function* () {
                let select = this.layout.searchResult;
                let opt = select.querySelector("option:checked");
                if (opt !== null) {
                    let value = +opt.value;
                    let master = yield service.getMostRecentIyakuhinMaster(value);
                    this.callbacks.onSelect(master);
                }
            }));
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
        let searchResult = typed_dom_1.h.select({ class: "pharmadrug-search-result", size: 10 }, []);
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
            this.iyakuhincode = null;
            this.layout = layout;
            this.callbacks = {
                onEnter: _ => { },
                onCancel: () => { }
            };
            this.hideSearch();
            this.bindSearchButton();
            this.bindEnterButton();
            this.bindCancelButton();
            this.layout.search.callbacks.onSelect = (master) => {
                this.iyakuhincode = master.iyakuhincode;
                this.layout.name.innerHTML = "";
                this.hideSearch();
                typed_dom_1.appendToElement(this.layout.name, [master.name]);
            };
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
        bindEnterButton() {
            let button = this.layout.enter;
            button.addEventListener("click", (event) => __awaiter(this, void 0, void 0, function* () {
                let iyakuhincode = this.iyakuhincode;
                if (iyakuhincode === null) {
                    alert("薬剤名が指定されていません。");
                    return;
                }
                else {
                    if (!(iyakuhincode > 0)) {
                        alert("薬剤名が適切でありません。");
                        return;
                    }
                    let desc = this.layout.description.value;
                    let side = this.layout.sideeffect.value;
                    let drug = {
                        iyakuhincode,
                        description: desc,
                        sideEffect: side
                    };
                    yield service.enterPharmaDrug(drug);
                    {
                        let newDrug = yield service.getPharmaDrug(iyakuhincode);
                        let master = yield service.getMostRecentIyakuhinMaster(iyakuhincode);
                        let msg = "薬剤情報が入力されました。\n" +
                            "薬剤名：" + master.name + "\n" +
                            "説明：" + newDrug.description + "\n" +
                            "副作用：" + newDrug.sideEffect;
                        alert(msg);
                        this.callbacks.onEnter(iyakuhincode);
                    }
                }
            }));
        }
        bindCancelButton() {
            let button = this.layout.cancel;
            button.addEventListener("click", event => {
                this.callbacks.onCancel();
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
            this.callbacks = {
                onEnter: (_) => { },
                onCancel: () => { }
            };
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
            form.callbacks.onEnter = (iyakuhincode) => {
                wrapper.innerHTML = "";
                this.callbacks.onEnter(iyakuhincode);
            };
            form.callbacks.onCancel = () => {
                wrapper.innerHTML = "";
                this.callbacks.onCancel();
            };
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
            this.layout.workarea.callbacks.onEnter = (iyakuhincode) => {
                this.layout.menu.switchTo(null, true);
                this.layout.menu.switchTo("new", true);
            };
            this.layout.workarea.callbacks.onCancel = () => {
                this.layout.menu.switchTo(null, false);
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
