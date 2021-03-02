"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
const test1_1 = require("./test1");
const test2_1 = require("./test2");
const axios_1 = __importDefault(require("axios"));
test1_1.test1('a');
test2_1.test2('b');
function test(a) {
    console.log(a);
    return { isAcceptable: true };
}
exports.test = test;
test('s');
console.log(axios_1.default);
