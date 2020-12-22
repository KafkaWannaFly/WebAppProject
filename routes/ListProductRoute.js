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

module.exports = router;
