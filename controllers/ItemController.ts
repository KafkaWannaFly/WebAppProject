import { Item } from "../resources/js/Models/item";
import fs from "fs";
import { ItemModel } from "./Models";

// let products = JSON.parse(
// 	fs.readFileSync("./data/products.json", {
// 		encoding: "utf8",
// 	})
// );

// function getItem(id: string) {
// 	for (let category in products) {
// 		let items = products[category] as Item[];
// 		for (let i = 0; i < items.length; i++) {
// 			if (items[i].id === id) {
// 				return items[i];
// 			}
// 		}
// 	}
// }

/**
 * Find item by id
 * @param id id
 * @returns Item object if found one. Else, return undefined
 */
async function getItemAsync(id: string): Promise<Item> {
	try {
		let itemDoc = await ItemModel.findOne({ id: id }).exec();
		return itemDoc.toObject() as Item;
	} catch (err) {
		console.log(`Fail to getItemAsync. ${err}`);
	}
}

async function getAllItemsAsync() {
	try {
		let itemDocs = await ItemModel.find({}).lean().exec();
		let items = itemDocs.map((val, idx) => {
			return (val as unknown) as Item;
		});

		return items;
	} catch (err) {
		console.log(`Fail to getAllItemsAsync. ${err}`);
	}
}

/**
 * Get the top highest sale items
 * @param amount amount of top items
 * @returns
 */
async function getTopSaleItemsAsync(amount: number) {
	try {
		let items = await getAllItemsAsync();

		items.sort((a, b) => {
			return b.sales - a.sales;
		});

		return items.slice(0, amount);
	} catch (err) {
		console.log(`Fail to getTopSaleItems. ${err}`);
	}
}

/**
 * Find array of items belong to a specific category
 *
 * If nothing belong to that category, return empty array which mean arr.length = 0
 * @param category Category to find
 * @returns An array if Item
 */
async function getItemsByCategoryAsync(category: string) {
	try {
		let itemDocs = await ItemModel.find({ category: category }).lean().exec();
		let items = itemDocs.map((val, idx) => {
			return (val as unknown) as Item;
		});

		return items;
	} catch (err) {
		console.log(`Fail to getItemsByCategory. ${err}`);
	}
}

export {
	getItemAsync,
	getAllItemsAsync,
	getTopSaleItemsAsync,
	getItemsByCategoryAsync,
};
