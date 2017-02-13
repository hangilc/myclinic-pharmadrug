"use strict";
const typed_dom_1 = require("./typed-dom");
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
