
export class IyakuhinMaster {
	iyakuhincode: number;
	name: string;
	yomi: string;
	unit: string;
	yakka: number;
	madoku: number;
	kouhatsu: boolean;
	zaikei: number;
	validFrom: string;
	validUpto: string;
}

export function fillIyakuhinMasterFromJson(m: IyakuhinMaster, src: any): void {
	m.iyakuhincode = src.iyakuhincode;
	m.name = src.name;
	m.yomi = src.yomi;
	m.unit = src.unit;
	m.yakka = +src.yakka;
	m.madoku = +src.madoku;
	m.kouhatsu = src.kouhatsu === 0 ? false : true;
	m.zaikei = +src.zaikei;
	m.validFrom = src.valid_from;
	m.validUpto = src.valid_upto;
}

export function jsonToIyakuhinMaster(src: any): IyakuhinMaster {
	let m = new IyakuhinMaster();
	fillIyakuhinMasterFromJson(m, src);
	return m;
}

