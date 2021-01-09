import express from "express";
const router = express.Router();
router.get("/", (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        res.redirect("/login");
    }
}, (req, res) => {
    // console.log(`User: ${JSON.stringify(req.user, null, 4)}`);
    res.render("information", { layout: "information-layout", user: req.user });
});
module.exports = router;
