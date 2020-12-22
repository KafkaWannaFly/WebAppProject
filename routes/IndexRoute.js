const express = require("express");
const router = express.Router();

var controller = require("../controllers/IndexController");

router.get("/", (req, res) => {
  controller.getTopProduct().then((data) => {
    res.render("index", { layout: "index-layout", TopProduct: data });
  });
});

router.get("/index.htm", (req, res) => {
  controller.getTopProduct().then((data) => {
    res.render("index", { layout: "index-layout", TopProduct: data });
  });
});

module.exports = router;
