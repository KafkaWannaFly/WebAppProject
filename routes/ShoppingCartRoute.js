import express from "express";
const router = express.Router();
import * as ShoppingCartController from "../controllers/ShoppingCartController";
router.get("/", (req, res) => {
    let bill = ShoppingCartController.getBill("0");
    console.log(bill);
    res.render("shop-cart", { layout: "shop-cart-layout" });
});
module.exports = router;
