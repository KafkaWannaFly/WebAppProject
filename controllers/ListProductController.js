const fs = require("fs");

let products = JSON.parse(
  fs.readFileSync("./data/products.json", {
    encoding: "utf8",
  })
);

var controller = {};

controller.getProduct = (category) => {
  let listProductOfCategory = products[category];

  return new Promise((resolve) => {
    resolve(listProductOfCategory);
  });
};

module.exports = controller;
