"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const products = require("../data/products.json");
const categories = [];
for (let cate in products) {
    categories.push(cate);
}
let items = [];
categories.forEach((cate, idx) => {
    let cateItems = products[cate];
    items = items.concat(cateItems);
});
console.log(`${items.length} items found! Start writing`);
// console.log(`Product items: ${JSON.stringify(items, null, 4)}`);
try {
    fs_1.default.writeFileSync("./data/items.json", JSON.stringify(items, null, 4), {
        encoding: "utf-8",
    });
}
catch (err) {
    console.log(`Write to items.json error: ${err}`);
}
