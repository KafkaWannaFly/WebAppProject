import fs from "fs";

import { Item } from "../resources/js/Models/item";

const products: any[] = require("../data/products.json");

const categories = [];
for (let cate in products) {
	categories.push(cate);
}

let items: Item[] = [];

categories.forEach((cate, idx) => {
	let cateItems: Item[] = products[cate];
	items = items.concat(cateItems);
});

console.log(`${items.length} items found! Start writing`);

// console.log(`Product items: ${JSON.stringify(items, null, 4)}`);
try {
	fs.writeFileSync("./data/items.json", JSON.stringify(items, null, 4), {
		encoding: "utf-8",
	});
} catch (err) {
	console.log(`Write to items.json error: ${err}`);
}
