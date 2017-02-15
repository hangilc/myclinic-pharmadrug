"use strict";
class PharmaDrug {
}
exports.PharmaDrug = PharmaDrug;
function jsonToPharmaDrug(src) {
    let result = new PharmaDrug();
    result.iyakuhincode = src.iyakuhincode;
    result.description = src.description;
    result.sideEffect = src.sideeffect;
    return result;
}
exports.jsonToPharmaDrug = jsonToPharmaDrug;
