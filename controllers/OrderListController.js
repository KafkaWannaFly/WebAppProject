const fs = require("fs");
const { getBillAsync } = require("./BillsControllers");

var controller = {};

controller.getOrderList = async (user) => {
  let listOrderID = user.purchasedItems;
  let listOrder = [];

  for (let i = 0; i < listOrderID.length; i++) {
    let order = await getBillAsync(listOrderID[i]);
    listOrder.push(order);
  }

  return new Promise((resolve) => {
    resolve(listOrder);
  });
};

module.exports = controller;
