const fs = require("fs");
const { getItemsByCategoryAsync } = require("./ItemController");
const { getItemsSalesAsync } = require("./ItemController");
const { searchItemsAsync } = require("./ItemController");
// let products = JSON.parse(
//   fs.readFileSync("./data/products.json", {
//     encoding: "utf8",
//   })
// );

var controller = {};

controller.getProduct = async (category) => {
  let listProductOfCategory = await getItemsByCategoryAsync(category);

  return new Promise((resolve) => {
    resolve(listProductOfCategory);
  });
};

controller.getSalesProduct = async () => {
  let listSalesProduct = await getItemsSalesAsync();

  return new Promise((resolve) => {
    resolve(listSalesProduct);
  });
};

controller.searchProduct = async (key) => {
  let listProduct = await searchItemsAsync(key);

  return new Promise((resolve) => {
    resolve(listProduct);
  });
};

module.exports = controller;
