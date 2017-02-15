"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const request_1 = require("./request");
const iyakuhin_master_1 = require("./model/iyakuhin-master");
let numberArrayConverter = request_1.arrayConverter(request_1.convertToNumber);
let iyakuhinMasterArrayConverter = request_1.arrayConverter(iyakuhin_master_1.jsonToIyakuhinMaster);
function searchIyakuhincodes(text) {
    return __awaiter(this, void 0, void 0, function* () {
        return request_1.request("/service?_q=search_most_recent_iyakuhin_master", { text: text }, "GET", numberArrayConverter);
    });
}
exports.searchIyakuhincodes = searchIyakuhincodes;
function searchIyakuhinMaster(text) {
    return __awaiter(this, void 0, void 0, function* () {
        let iyakuhincodes = yield searchIyakuhincodes(text);
        return batchGetMostRecentIyakuhinMaster(iyakuhincodes);
    });
}
exports.searchIyakuhinMaster = searchIyakuhinMaster;
function batchGetMostRecentIyakuhinMaster(iyakuhincodes) {
    return __awaiter(this, void 0, void 0, function* () {
        return request_1.request("/service?_q=batch_get_most_recent_iyakuhin_master", { iyakuhincodes: iyakuhincodes }, "POST", iyakuhinMasterArrayConverter);
    });
}
exports.batchGetMostRecentIyakuhinMaster = batchGetMostRecentIyakuhinMaster;
function getMostRecentIyakuhinMaster(iyakuhincode) {
    return __awaiter(this, void 0, void 0, function* () {
        let masters = yield batchGetMostRecentIyakuhinMaster([iyakuhincode]);
        return masters[0];
    });
}
exports.getMostRecentIyakuhinMaster = getMostRecentIyakuhinMaster;