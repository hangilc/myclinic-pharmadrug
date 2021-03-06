import { h, appendToElement } from "./typed-dom";
import * as service from "./service";
import { PharmaDrugEx } from "./service";
import { IyakuhinMaster } from "./model/iyakuhin-master";

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
				this.switchTo("new", true);
			});
			layout.editLink.addEventListener("click", event => {
				this.switchTo("edit", true);
			});
		}

		switchTo(choice: MenuChoice, triggerCallback: boolean): void {
			if( this.currentChoice === choice ){
				if( triggerCallback ){
					this.callbacks.onSameChoice(choice);
				}
			} else {
				this.currentChoice = choice;
				if( triggerCallback ){
					this.callbacks.onChoice(choice);
				}
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

namespace SearchIyakuhinMaster {
	export interface Layout {
		input: HTMLInputElement;
		execButton: HTMLElement;
		searchResult: HTMLSelectElement;
		selectButton: HTMLElement;
		cancelButton: HTMLElement;
	}

	export interface Callbacks {
		onSelect: (master: IyakuhinMaster) => void;
		onCancel: () => void;
	}

	export class Controller {
		private layout: Layout;
		callbacks: Callbacks;

		constructor(layout: Layout){
			this.layout = layout;
			this.callbacks = {
				onSelect: _ => {},
				onCancel: () => {}
			};
			this.bindExecButton();
			this.bindSelectButton();
			this.bindCancelButton();
		}

		focus(): void {
			this.layout.input.focus();
		}

		private bindExecButton(): void {
			let button = this.layout.execButton;
			button.addEventListener("click", async event => {
				let text = this.layout.input.value.trim();
				let masters = await service.searchIyakuhinMaster(text);
				let select = this.layout.searchResult;
				select.innerHTML = "";
				masters.forEach(m => {
					let opt = h.option({value: m.iyakuhincode}, [m.name]);
					select.appendChild(opt);
				})
			})
		}

		private bindSelectButton(): void {
			let button = this.layout.selectButton;
			button.addEventListener("click", async event => {
				let select = this.layout.searchResult;
				let opt = select.querySelector("option:checked");
				if( opt !== null ){
					let value = +(<HTMLOptionElement>opt).value;
					let master = await service.getMostRecentIyakuhinMaster(value);
					this.callbacks.onSelect(master);
				}
			})
		}

		private bindCancelButton(): void {
			this.layout.cancelButton.addEventListener("click", event => {
				this.callbacks.onCancel();
			})
		}
	}

	export function populate(parent: HTMLElement): Controller {
		let input = h.input({}, []);
		let execButton = h.button({type: "submit"}, ["検索実行"]);
		let searchResult = h.select({class:"pharmadrug-search-result", size: 10}, []);
		let selectButton = h.button({}, ["選択"]);
		let cancelButton = h.button({}, ["キャンセル"]);
		let form = h.form({}, [
			input, " ",
			execButton,
			h.div({}, [searchResult]),
			h.div({}, [selectButton, " ", cancelButton])
		]);
		appendToElement(parent, [form]);
		let layout = {
			input,
			execButton,
			searchResult,
			selectButton,
			cancelButton
		}
		return new Controller(layout);
	}
}

namespace SearchPharmaDrug {
	export interface Layout {
		input: HTMLInputElement;
		execButton: HTMLElement;
		searchResult: HTMLSelectElement;
		selectButton: HTMLElement;
		cancelButton: HTMLElement;
	}

	export interface Callbacks {
		onSelect: (drug: PharmaDrugEx) => void;
		onCancel: () => void;
	}

	export class Controller {
		private layout: Layout;
		callbacks: Callbacks;

		constructor(layout: Layout){
			this.layout = layout;
			this.callbacks = {
				onSelect: _ => {},
				onCancel: () => {}
			};
			this.bindExecButton();
			this.bindSelectButton();
			this.bindCancelButton();
		}

		focus(): void {
			this.layout.input.focus();
		}

		private bindExecButton(): void {
			let button = this.layout.execButton;
			button.addEventListener("click", async event => {
				let text = this.layout.input.value.trim();
				let drugs = await service.searchPharmaDrug(text);
				let select = this.layout.searchResult;
				select.innerHTML = "";
				drugs.forEach(d => {
					let opt = h.option({value: d.drug.iyakuhincode}, [d.master.name]);
					select.appendChild(opt);
				})
			})
		}

		private bindSelectButton(): void {
			let button = this.layout.selectButton;
			button.addEventListener("click", async event => {
				let select = this.layout.searchResult;
				let opt = select.querySelector("option:checked");
				if( opt !== null ){
					let value = +(<HTMLOptionElement>opt).value;
					let drug = await service.getPharmaDrugEx(value);
					this.callbacks.onSelect(drug);
				}
			})
		}

		private bindCancelButton(): void {
			this.layout.cancelButton.addEventListener("click", event => {
				this.callbacks.onCancel();
			})
		}
	}

	export function populate(parent: HTMLElement): Controller {
		let input = h.input({}, []);
		let execButton = h.button({type: "submit"}, ["検索実行"]);
		let searchResult = h.select({class:"pharmadrug-search-result", size: 10}, []);
		let selectButton = h.button({}, ["選択"]);
		let cancelButton = h.button({}, ["キャンセル"]);
		let form = h.form({}, [
			input, " ",
			execButton,
			h.div({}, [searchResult]),
			h.div({}, [selectButton, " ", cancelButton])
		]);
		appendToElement(parent, [form]);
		let layout = {
			input,
			execButton,
			searchResult,
			selectButton,
			cancelButton
		}
		return new Controller(layout);
	}
}

namespace NewForm {
	export interface Layout {
		form: HTMLElement;
		name: HTMLElement;
		description: HTMLTextAreaElement;
		sideeffect: HTMLTextAreaElement;
		enter: HTMLElement;
		cancel: HTMLElement;
		searchButton: HTMLElement;
		searchWrapper: HTMLElement;
		search: SearchIyakuhinMaster.Controller;
	}

	export interface Callbacks {
		onEnter: (iyakuhincode: number) => void;
		onCancel: () => void;
	}

	export class Controller {
		private layout: Layout;
		private iyakuhincode: number | null = null;
		callbacks: Callbacks;

		constructor(layout: Layout){
			this.layout = layout;
			this.callbacks = {
				onEnter: _ => {},
				onCancel: () => {}
			}
			this.hideSearch();
			this.bindSearchButton();
			this.bindEnterButton();
			this.bindCancelButton();
			this.layout.search.callbacks.onSelect = (master: IyakuhinMaster) => {
				this.iyakuhincode = master.iyakuhincode;
				this.layout.name.innerHTML = "";
				this.hideSearch();
				appendToElement(this.layout.name, [master.name]);
			};
			this.layout.search.callbacks.onCancel = () => {
				this.hideSearch();
			};
		}

		appendTo(parent: HTMLElement): void {
			parent.appendChild(this.layout.form);
		}

		private hideSearch(): void {
			this.layout.searchWrapper.style.display = "none";
		}

		private showSearch(): void {
			this.layout.searchWrapper.style.display = "";
			this.layout.search.focus();
		}

		private bindSearchButton(): void {
			let button = this.layout.searchButton;
			button.addEventListener("click", event => {
				let wrapper = this.layout.searchWrapper;
				if( wrapper.style.display === "none" ){
					this.showSearch();
				} else {
					this.hideSearch();
				}
			})
		}

		private bindEnterButton(): void {
			let button = this.layout.enter;
			button.addEventListener("click", async event => {
				let iyakuhincode = this.iyakuhincode;
				if( iyakuhincode === null ){
					alert("薬剤名が指定されていません。");
					return;
				} else {
					if( !(iyakuhincode > 0) ){
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
					await service.enterPharmaDrug(drug);
					{
						let newDrug = await service.getPharmaDrug(iyakuhincode);
						let master = await service.getMostRecentIyakuhinMaster(iyakuhincode);
						let msg = "薬剤情報が入力されました。\n" +
							"薬剤名：" + master.name + "\n" +
							"説明：" + newDrug.description + "\n" +
							"副作用：" + newDrug.sideEffect ;
						alert(msg);
						this.callbacks.onEnter(iyakuhincode);
					}
				}
			});
		}

		private bindCancelButton(): void {
			let button = this.layout.cancel;
			button.addEventListener("click", event => {
				this.callbacks.onCancel();
			})
		}

	}

	export function populate(parent: HTMLElement): Controller {
		let name = h.span({}, []);
		let searchButton = h.button({}, ["検索"]);
		let searchWrapper = h.div({}, []);
		let desc = h.textarea({class:"description"}, []);
		let side = h.textarea({class:"sideeffect"}, []);
		let enter = h.button({}, ["入力"]);
		let cancel = h.button({}, ["キャンセル"]);
		let form = h.form({}, [
			h.table({class:"editor"}, [
				h.colgroup({}, [
					h.col({class:"label"}, [])
				]),
				h.colgroup({}, [
					h.col({class:"input"}, [])
				]),
				h.tr({}, [
					h.td({}, ["薬剤名"]),
					h.td({}, [
						h.div({}, [name, " ", searchButton]), 
						searchWrapper
					])
				]),
				h.tr({}, [
					h.td({}, ["説明"]),
					h.td({}, [desc])
				]),
				h.tr({}, [
					h.td({}, ["副作用："]),
					h.td({}, [side])
				])
			]),
			h.div({}, [
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
			search: SearchIyakuhinMaster.populate(searchWrapper)
		}
		appendToElement(parent, [form]);
		return new Controller(layout);
	}

}

namespace EditForm {
	export interface Layout {
		form: HTMLElement;
		name: HTMLElement;
		description: HTMLTextAreaElement;
		sideeffect: HTMLTextAreaElement;
		enter: HTMLElement;
		cancel: HTMLElement;
		deleteLink: HTMLElement;
		searchButton: HTMLElement;
		searchWrapper: HTMLElement;
		search: SearchPharmaDrug.Controller;
	}

	export interface Callbacks {
		onUpdate: (iyakuhincode: number) => void;
		onDelete: (iyakuhincode: number) => void;
		onCancel: () => void;
	}

	export class Controller {
		private layout: Layout;
		private iyakuhincode: number | null = null;
		callbacks: Callbacks;

		constructor(layout: Layout){
			this.layout = layout;
			this.callbacks = {
				onUpdate: _ => {},
				onCancel: () => {}
			}
			this.hideSearch();
			this.bindSearchButton();
			this.bindEnterButton();
			this.bindCancelButton();
			this.bindDeleteLink();
			this.layout.search.callbacks.onSelect = (drug: PharmaDrugEx) => {
				this.iyakuhincode = drug.drug.iyakuhincode;
				this.layout.description.value = drug.drug.description;
				this.layout.sideeffect.value = drug.drug.sideEffect;
				this.layout.name.innerHTML = "";
				this.hideSearch();
				appendToElement(this.layout.name, [drug.master.name]);
			};
			this.layout.search.callbacks.onCancel = () => {
				this.hideSearch();
			};
		}

		appendTo(parent: HTMLElement): void {
			parent.appendChild(this.layout.form);
		}

		private hideSearch(): void {
			this.layout.searchWrapper.style.display = "none";
		}

		private showSearch(): void {
			this.layout.searchWrapper.style.display = "";
			this.layout.search.focus();
		}

		private bindSearchButton(): void {
			let button = this.layout.searchButton;
			button.addEventListener("click", event => {
				let wrapper = this.layout.searchWrapper;
				if( wrapper.style.display === "none" ){
					this.showSearch();
				} else {
					this.hideSearch();
				}
			})
		}

		private bindEnterButton(): void {
			let button = this.layout.enter;
			button.addEventListener("click", async event => {
				let iyakuhincode = this.iyakuhincode;
				if( iyakuhincode === null ){
					alert("薬剤名が指定されていません。");
					return;
				} else {
					if( !(iyakuhincode > 0) ){
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
					await service.updatePharmaDrug(drug);
					{
						let newDrug = await service.getPharmaDrug(iyakuhincode);
						let master = await service.getMostRecentIyakuhinMaster(iyakuhincode);
						let msg = "薬剤情報が変更されました。\n" +
							"薬剤名：" + master.name + "\n" +
							"説明：" + newDrug.description + "\n" +
							"副作用：" + newDrug.sideEffect ;
						alert(msg);
						this.callbacks.onUpdate(iyakuhincode);
					}
				}
			});
		}

		private bindCancelButton(): void {
			let button = this.layout.cancel;
			button.addEventListener("click", event => {
				this.callbacks.onCancel();
			})
		}

		private bindDeleteLink(): void {
			let link = this.layout.deleteLink;
			link.addEventListener("click", async event => {
				let iyakuhincode = this.iyakuhincode;
				if( iyakuhincode === null ){
					alert("薬剤名が設定されていません。");
					return;
				}
				if( !(iyakuhincode > 0) ){
					alert("薬剤名が不適切です。");
					return;
				}
				let master = await service.getMostRecentIyakuhinMaster(iyakuhincode);
				if( confirm(master.name + "の薬剤情報を削除していいですか？") ){
					await service.deletePharmaDrug(iyakuhincode);
					alert(master.name + "の薬剤情報を削除しました。");
					this.callbacks.onDelete(iyakuhincode);
				}
			});
		}

	}

	export function populate(parent: HTMLElement): Controller {
		let name = h.span({}, []);
		let searchButton = h.button({}, ["検索"]);
		let searchWrapper = h.div({}, []);
		let desc = h.textarea({class:"description"}, []);
		let side = h.textarea({class:"sideeffect"}, []);
		let enter = h.button({}, ["変更実行"]);
		let deleteLink = h.a({}, ["削除"]);
		let cancel = h.button({}, ["キャンセル"]);
		let form = h.form({}, [
			h.table({class:"editor"}, [
				h.colgroup({}, [
					h.col({class:"label"}, [])
				]),
				h.colgroup({}, [
					h.col({class:"input"}, [])
				]),
				h.tr({}, [
					h.td({}, ["薬剤名"]),
					h.td({}, [
						h.div({}, [name, " ", searchButton]), 
						searchWrapper
					])
				]),
				h.tr({}, [
					h.td({}, ["説明"]),
					h.td({}, [desc])
				]),
				h.tr({}, [
					h.td({}, ["副作用："]),
					h.td({}, [side])
				])
			]),
			h.div({}, [
				enter, " ",
				cancel, " ",
				deleteLink
			])
		]);

		let layout = {
			form: form,
			name: name,
			description: desc,
			sideeffect: side,
			enter: enter,
			cancel: cancel,
			deleteLink: deleteLink,
			searchButton: searchButton,
			searchWrapper: searchWrapper,
			search: SearchPharmaDrug.populate(searchWrapper)
		}
		appendToElement(parent, [form]);
		return new Controller(layout);
	}

}

namespace EditorWorkarea {
	export interface Layout {
		wrapper: HTMLElement
	}

	export interface Callbacks {
		onEnter: (iyakuhincode: number) => void;
		onUpdate: (iyakuhincode: number) => void;
		onDelete: (iyakuhincode: number) => void;
		onCancel: () => void;
	}

	export class Controller {
		private layout: Layout;
		callbacks: Callbacks;

		constructor(layout: Layout){
			this.layout = layout;
			this.callbacks = {
				onEnter: (_) => {},
				onUpdate: (_) => {},
				onDelete: (_) => {},
				onCancel: () => {}
			};
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
			let form: NewForm.Controller = NewForm.populate(wrapper);
			form.callbacks.onEnter = (iyakuhincode: number) => {
				wrapper.innerHTML = "";
				this.callbacks.onEnter(iyakuhincode);
			};
			form.callbacks.onCancel = () => {
				wrapper.innerHTML = "";
				this.callbacks.onCancel();
			};
			form.appendTo(wrapper);
		}

		private switchToEdit(){
			let wrapper = this.layout.wrapper;
			wrapper.innerHTML = "";
			let form: EditForm.Controller = EditForm.populate(wrapper);
			form.callbacks.onUpdate = (iyakuhincode: number) => {
				wrapper.innerHTML = "";
				this.callbacks.onUpdate(iyakuhincode);
			};
			form.callbacks.onDelete = (iyakuhincode: number) => {
				wrapper.innerHTML = "";
				this.callbacks.onDelete(iyakuhincode);
			};
			form.callbacks.onCancel = () => {
				wrapper.innerHTML = "";
				this.callbacks.onCancel();
			};
			form.appendTo(wrapper);
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
		menu: EditorMenu.Controller;
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
			};
			this.layout.workarea.callbacks.onEnter = (iyakuhincode: number) => {
				this.layout.menu.switchTo(null, true);
				this.layout.menu.switchTo("new", true);
			};
			this.layout.workarea.callbacks.onUpdate = (iyakuhincode: number) => {
				this.layout.menu.switchTo(null, true);
				this.layout.menu.switchTo("edit", true);
			};
			this.layout.workarea.callbacks.onDelete = (iyakuhincode: number) => {
				this.layout.menu.switchTo(null, true);
				this.layout.menu.switchTo("edit", true);
			};
			this.layout.workarea.callbacks.onCancel = () => {
				this.layout.menu.switchTo(null, false);
			};
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
