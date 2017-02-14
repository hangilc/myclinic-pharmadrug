import { h, appendToElement } from "./typed-dom";

namespace EditorMenu {
	export type MenuChoice = "new" | "edit" | null;

	export interface Layout {
		newLink: HTMLElement;
		editLink: HTMLElement;
	}

	export interface Callbacks {
		onChoice: (choice: MenuChoice) => void;
		onSameChoice: (choice: MenuChoice) => void;
	}

	export class Controller {
		private layout: Layout;
		callbacks: Callbacks;
		private currentChoice: MenuChoice = null;

		constructor(layout: Layout){
			this.layout = layout;
			this.callbacks = {
				onChoice: (choice: MenuChoice) => {},
				onSameChoice: (choice: MenuChoice) => {}
			}
			layout.newLink.addEventListener("click", event => {
				this.handleClick("new");
			});
			layout.editLink.addEventListener("click", event => {
				this.handleClick("edit");
			});
			
		}

		private async handleClick(choice: MenuChoice): Promise<void>{
			if( this.currentChoice === choice ){
				this.callbacks.onSameChoice(choice);
			} else {
				this.currentChoice = choice;
				this.callbacks.onChoice(choice);
			}
		}
	}

	export function populate(parent: HTMLElement): Controller {
		let newLink = h.a({}, ["新規"]);
		let editLink = h.a({}, ["編集"]);
		appendToElement(parent, [
			newLink, " | ", editLink
		])
		let layout = {
			newLink: newLink,
			editLink: editLink
		}
		return new Controller(layout);
	}
}

namespace EditorWorkarea {
	export interface Layout {
		wrapper: HTMLElement
	}

	export interface Callbacks {

	}

	export class Controller {
		private layout: Layout;
		callbacks: Callbacks;

		constructor(layout: Layout){
			this.layout = layout;
			this.callbacks = {};
		}

		async switchTo(choice: EditorMenu.MenuChoice): Promise<void>{
			switch(choice){
				case null: this.layout.wrapper.innerHTML = ""; break;
				case "new": return this.switchToNew();
				case "edit": return this.switchToEdit();
			}
		}

		private switchToNew(){
			let wrapper = this.layout.wrapper;
			wrapper.innerHTML = "";
			appendToElement(wrapper, ["NEW"]);
		}

		private switchToEdit(){
			let wrapper = this.layout.wrapper;
			wrapper.innerHTML = "";
			appendToElement(wrapper, ["EDIT"]);
		}
	}

	export function populate(parent: HTMLElement): Controller {
		let layout = {
			wrapper: parent
		};
		return new Controller(layout);
	}
}

namespace LeftPane {
	export class Layout {
		menu: EditorMenu.Controller,
		workarea: EditorWorkarea.Controller
	}

	export class Callbacks {

	}

	export class Controller {
		private layout: Layout;
		private callbacks: Callbacks;

		constructor(layout: Layout){
			this.layout = layout;
			this.callbacks = {};
			this.layout.menu.callbacks.onChoice = (choice: EditorMenu.MenuChoice) => {
				this.layout.workarea.switchTo(choice);
			}
		}
	}

	export function populate(parent: HTMLElement): Controller {
		let menu = h.div({}, []);
		let workarea = h.div({}, []);
		appendToElement(parent, [
			menu,
			workarea
		])
		let layout = {
			menu: EditorMenu.populate(menu),
			workarea: EditorWorkarea.populate(workarea)
		}
		return new Controller(layout);
	}
}

namespace RightPane {
	export class Controller {

	}

	export function populate(parent: HTMLElement): Controller {
		return new Controller();
	}
}

namespace MainPane {

	interface Layout {
		leftPane: LeftPane.Controller;
		rightPane: RightPane.Controller;
	}

	interface Callbacks {

	}

	export class Controller {
		private layout: Layout;
		private callbacks: Callbacks;

		constructor(layout: Layout){
			this.layout = layout;
			this.callbacks = {};
		}
	}

	export function populate(parent: HTMLElement): Controller {
		let leftElement = h.div({style: "border: 1px solid black; width: 400px"}, []);
		let rightElement = h.div({style: "border: 1px solid black; width: 400px"}, []);
		let table = h.table({}, [
			h.tbody({}, [
				h.tr({}, [
					h.td({}, [leftElement]),
					h.td({}, [rightElement])
				])
			])
		]);
		appendToElement(parent, [
			h.h1({}, ["薬剤情報編集"]),
			table
		])
		let layout = {
			leftPane: LeftPane.populate(leftElement),
			rightPane: RightPane.populate(rightElement)
		}
		return new Controller(layout);
	}

}

let mainElement = document.getElementById("main");
if( mainElement !== null ){
	let main = MainPane.populate(mainElement);
}
