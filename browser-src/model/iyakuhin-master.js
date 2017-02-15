"use strict";
class IyakuhinMaster {
}
exports.IyakuhinMaster = IyakuhinMaster;
function fillIyakuhinMasterFromJson(m, src) {
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
exports.fillIyakuhinMasterFromJson = fillIyakuhinMasterFromJson;
function jsonToIyakuhinMaster(src) {
    let m = new IyakuhinMaster();
    fillIyakuhinMasterFromJson(m, src);
    return m;
}
exports.jsonToIyakuhinMaster = jsonToIyakuhinMaster;
