"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBill = void 0;
const fs_1 = __importDefault(require("fs"));
let bills = JSON.parse(fs_1.default.readFileSync("./resources/data/bills.json", {
    encoding: "utf-8",
}));
function getBill(id) {
    for (let i = 0; i < bills.length; i++) {
        if (bills[i].id === id) {
            return bills[i];
        }
    }
    return undefined;
}
exports.getBill = getBill;
