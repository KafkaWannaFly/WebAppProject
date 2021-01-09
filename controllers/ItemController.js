"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItem = void 0;
const fs_1 = __importDefault(require("fs"));
let products = JSON.parse(fs_1.default.readFileSync("./data/products.json", {
    encoding: "utf8",
}));
function getItem(id) {
    for (let category in products) {
        let items = products[category];
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                return items[i];
            }
        }
    }
}
exports.getItem = getItem;
