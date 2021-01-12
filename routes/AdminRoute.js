const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  readFile(
    "./pages/admin/admin-dasboard.htm",
    { encoding: "utf-8" },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.type("html");
        res.send(data);
      }
    }
  );
});

router.get("/profile", (req, res) => {
  res.render("admin-profile", { layout: "admin-profile-layout" });
});

router.get("/list-product", (req, res) => {
  res.render("admin-list-product", { layout: "admin-list-product-layout" });
});

router.get("/list-bill", (req, res) => {
  res.render("admin-list-bill", { layout: "admin-list-bill-layout" });
});

router.get("/list-comment", (req, res) => {
  res.render("admin-list-comment", { layout: "admin-list-comment-layout" });
});

router.get("/list-account", (req, res) => {
  res.render("admin-list-account", { layout: "admin-list-account-layout" });
});

module.exports = router;
