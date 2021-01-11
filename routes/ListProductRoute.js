const express = require("express");
const router = express.Router();

var controller = require("../controllers/ListProductController");

router.get("/", (req, res) => {
  let category = req.query["category"];

  controller.getProduct(category).then((data) => {
    res.render("list-product", {
      layout: "list-product-layout",
      ListProduct: data,
    });
  });
});

router.get("/sales", (req, res) => {
  controller.getSalesProduct().then((data) => {
    // Have no idea why we have to go back 1 level but it do the job
    for (let i = 0; i < data.length; i++) {
      data[i].imageThumbnail = "../" + data[i].imageThumbnail;
    }

    res.render("list-product", {
      layout: "list-product-layout",
      ListProduct: data,
    });
  });
});

router.get("/search", (req, res) => {
  let searchKey = req.query["search"].toString();

  controller.searchProduct(searchKey).then((data) => {
    // Have no idea why we have to go back 1 level but it do the job
    for (let i = 0; i < data.length; i++) {
      data[i].imageThumbnail = "../" + data[i].imageThumbnail;
    }

    res.render("list-product", {
      layout: "list-product-layout",
      ListProduct: data,
    });
  });
});

module.exports = router;
