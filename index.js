// import * as express from "express";
var path = require("path");
const express = require("express");
const fs = require("fs");
const app = express();
const hbs = require("express-handlebars");
const port = process.env.PORT || 3000;

// app.use("/", express.static(path.join(__dirname, "../Views")));
app.use("/pages", express.static(path.join(__dirname, "./pages")));
app.use("/resources", express.static(path.join(__dirname, "/resources")));

// Set up for HandleBars
app.engine(
  "hbs",
  hbs({
    extname: "hbs",
    defaultLayout: "default-layout",
    layoutsDir: __dirname + "/views/layouts/",
    partialsDir: __dirname + "/views/partials/",
  })
);

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

//Load Data Here
//Xử lý đồng bộ ở đây
const data = require("./resources/data");

app.get("/", (req, res) => {
  let indexController = require("./controller/indexController");
  indexController.getTopProduct(data).then((data) => {
    res.locals.data = data;
    res.render("index", { layout: "index-layout" });
  });
});

app.get("/index.htm", (req, res) => {
  res.render("index", { layout: "index-layout" });
});

app.get("/login.htm", (req, res) => {
  res.render("login", { layout: "login-layout" });
});

app.get("/sign-up.htm", (req, res) => {
  res.render("sign-up", { layout: "sign-up-layout" });
});

app.get("/forgot-pwd.htm", (req, res) => {
  res.render("forgot-pwd", { layout: "forgot-pwd-layout" });
});

app.get("/infor.htm", (req, res) => {
  res.render("infor", { layout: "infor-layout" });
});

app.get("/order-list.htm", (req, res) => {
  res.render("order-list", { layout: "order-list-layout" });
});

app.get("/list-product-template.htm", (req, res) => {
  res.render("list-product-template", {
    layout: "list-product-template-layout",
  });
});

app.get("/item-detail.html", (req, res) => {
  res.render("item-detail", { layout: "item-detail-layout", Item: item });
});

app.get("/pages/item-detail.html", (req, res) => {
  res.render("item-detail", { layout: "item-detail-layout", Item: item });
});

app.get("/pages/shopping-cart.html", (req, res) => {});

app.get("/pages/:pageName", (req, res) => {
  // console.log(`Page name: ${req.params["pageName"]}`);
  let htmlPath = "./pages/" + req.params["pageName"];

  if (!fs.existsSync(htmlPath)) {
    // console.log(`${req.params["pageName"]} not exist`);
  }

  try {
    fs.readFile(htmlPath, (err, data) => {
      res.statusCode = 200;
      res.setHeader("content-type", "text/html");
      res.send(data);
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`App is listening on https://usg-clothes.herokuapp.com:${port}`);
});
