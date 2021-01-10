"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItemsByCategoryAsync = exports.getTopSaleItemsAsync = exports.getAllItemsAsync = exports.getItemAsync = void 0;
const Models_1 = require("./Models");
/**
 * Find item by id
 * @param id id
 * @returns Item object if found one. Else, return undefined
 */
async function getItemAsync(id) {
    try {
        let itemDoc = await Models_1.ItemModel.findOne({ id: id }).exec();
        return itemDoc.toObject();
    }
    catch (err) {
        console.log(`Fail to getItemAsync. ${err}`);
    }
}
exports.getItemAsync = getItemAsync;
async function getAllItemsAsync() {
    try {
        let itemDocs = await Models_1.ItemModel.find({}).lean().exec();
        let items = itemDocs.map((val, idx) => {
            return val;
        });
        return items;
    }
    catch (err) {
        console.log(`Fail to getAllItemsAsync. ${err}`);
    }
}
exports.getAllItemsAsync = getAllItemsAsync;
/**
 * Get the top highest sale items
 * @param amount amount of top items
 * @returns
 */
async function getTopSaleItemsAsync(amount) {
    try {
        let items = await getAllItemsAsync();
        items.sort((a, b) => {
            return b.sales - a.sales;
        });
        return items.slice(0, amount);
    }
    catch (err) {
        console.log(`Fail to getTopSaleItems. ${err}`);
    }
}
exports.getTopSaleItemsAsync = getTopSaleItemsAsync;
/**
 * Find array of items belong to a specific category
 *
 * If nothing belong to that category, return empty array which mean arr.length = 0
 * @param category Category to find
 * @returns An array if Item
 */
async function getItemsByCategoryAsync(category) {
    try {
        let itemDocs = await Models_1.ItemModel.find({ category: category }).lean().exec();
        let items = itemDocs.map((val, idx) => {
            return val;
        });
        return items;
    }
    catch (err) {
        console.log(`Fail to getItemsByCategory. ${err}`);
    }
}
exports.getItemsByCategoryAsync = getItemsByCategoryAsync;
