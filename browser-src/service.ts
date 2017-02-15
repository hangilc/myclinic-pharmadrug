import { request, arrayConverter, convertToNumber } from "./request";
import { IyakuhinMaster, jsonToIyakuhinMaster } from "./model/iyakuhin-master";
import { PharmaDrug, jsonToPharmaDrug } from "./model/pharma-drug";

let numberArrayConverter = arrayConverter<number>(convertToNumber);
let iyakuhinMasterArrayConverter = arrayConverter<IyakuhinMaster>(jsonToIyakuhinMaster);

export async function searchIyakuhincodes(text: string): Promise<number[]> {
	return request<number[]>("/service?_q=search_most_recent_iyakuhin_master", {text: text}, "GET", numberArrayConverter);
}

export async function searchIyakuhinMaster(text: string): Promise<IyakuhinMaster[]> {
	let iyakuhincodes = await searchIyakuhincodes(text);
	return batchGetMostRecentIyakuhinMaster(iyakuhincodes);
}

export async function batchGetMostRecentIyakuhinMaster(iyakuhincodes: number[]): Promise<IyakuhinMaster[]> {
	return request<IyakuhinMaster[]>("/service?_q=batch_get_most_recent_iyakuhin_master", {iyakuhincodes: iyakuhincodes}, "POST", iyakuhinMasterArrayConverter);
}

export async function getMostRecentIyakuhinMaster(iyakuhincode: number): Promise<IyakuhinMaster>{
	let masters = await batchGetMostRecentIyakuhinMaster([iyakuhincode]);
	return masters[0];
}

export async function enterPharmaDrug(pharmaDrug: PharmaDrug): Promise<number>{
	return request<number>("/service?_q=enter_pharma_drug", {
		iyakuhincode: pharmaDrug.iyakuhincode,
		description: pharmaDrug.description,
		sideeffect: pharmaDrug.sideEffect
	}, "POST", convertToNumber);
}

export async function getPharmaDrug(iyakuhincode: number): Promise<PharmaDrug> {
	return request<PharmaDrug>("/service?_q=get_pharma_drug", {iyakuhincode: iyakuhincode}, "GET", jsonToPharmaDrug);
}

