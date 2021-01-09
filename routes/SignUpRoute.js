import express from "express";
import passport from "passport";
const router = express.Router();
router.get("/", (req, res) => {
    res.render("sign-up", {
        layout: "sign-up-layout",
    });
});
router.post("/", passport.authenticate("local-signup", {
    successRedirect: "/login",
    failureRedirect: "/sign-up",
    failureFlash: true,
}));
module.exports = router;
