import { h, appendToElement } from "./typed-dom";

class EditorLayout {
	frame: HTMLElement;
	menu: HTMLElement;

	constructor(){
		this.menu = h.div({}, ["MENU"]);
		this.frame = h.div({}, [
			this.menu
		])
	}
}

class EditorPane {
	private parent: HTMLElement;
	private layout: EditorLayout = new EditorLayout();

	constructor(parent: HTMLElement){
		this.parent = parent;
		parent.appendChild(this.layout.frame);
	}

	setup(): void {

	}
}

class MainLayout {
	frame: HTMLElement;
	leftPane: HTMLElement;
	rightPane: HTMLElement;

	constructor(){
		this.leftPane = h.div({style: "border: 1px solid black; width: 400px"}, []);
		this.rightPane = h.div({style: "border: 1px solid black; width: 400px"}, []);
		let table = h.table({}, [
			h.tbody({}, [
				h.tr({}, [
					h.td({}, [this.leftPane]),
					h.td({}, [this.rightPane])
				])
			])
		]);
		this.frame = h.div({}, [
			h.h1({}, ["薬剤情報編集"]),
			table
		])
	}
}

class MainPane {
	private parent: HTMLElement;
	private layout: MainLayout = new MainLayout();
	private editorPane: EditorPane;

	constructor(parent: HTMLElement){
		this.parent = parent;
		parent.appendChild(this.layout.frame);
		this.editorPane = new EditorPane(this.layout.leftPane);
		this.editorPane.setup();
	}

	setup(): void {

	}
}

let mainElement = document.getElementById("main");
if( mainElement !== null ){
	let main = new MainPane(mainElement);
	main.setup();
}

