var controller = {};

controller.getTopProduct = (products) => {
  var productsArray = [];

  for (category in products)
    productsArray = productsArray.concat(products[category]);

  //Sort Top Sellers
  productsArray.sort((a, b) => {
    return b.sales - a.sales;
  });

  let topProduct = [];

  for (let i = 0; i < 3; i++) {
    let row = [];
    for (let j = 0; j < 4; j++) {
      row.push(productsArray[i * 4 + j]);
    }
    topProduct.push(row);
  }

  // return topProduct;
  return new Promise((resolve) => {
    resolve(topProduct);
  });
};

module.exports = controller;
