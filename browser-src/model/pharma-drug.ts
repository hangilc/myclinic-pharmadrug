export class PharmaDrug {
	iyakuhincode: number;
	description: string;
	sideEffect: string;
}

export function jsonToPharmaDrug(src: any): PharmaDrug {
	let result = new PharmaDrug();
	result.iyakuhincode = src.iyakuhincode;
	result.description = src.description;
	result.sideEffect = src.sideeffect;
	return result;
}