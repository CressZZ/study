"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZipCodeValidator = exports.numberRegexp = void 0;
exports.numberRegexp = /^[0-9]+$/;
class ZipCodeValidator {
    isAcceptable(s) {
        throw new Error("Method not implemented.");
    }
    isAcceptables(s) {
        return s.length === 5 && exports.numberRegexp.test(s);
    }
}
exports.ZipCodeValidator = ZipCodeValidator;
