// import * as express from "express";
var path = require("path");
const express = require("express");
const fs = require("fs");
const app = express();
const hbs = require("express-handlebars");
const port = process.env.PORT || 3000;
const morgan = require("morgan");

// app.use("/", express.static(path.join(__dirname, "../Views")));
app.use(morgan("dev"));
app.use("/pages", express.static("./pages"));
app.use("/resources", express.static("./resources"));

// Set up for HandleBars
app.engine(
	"hbs",
	hbs({
		extname: "hbs",
		defaultLayout: "default-layout",
		layoutsDir: "./views/layouts/",
		partialsDir: "./views/partials/",
	})
);

app.set("view engine", "hbs");

console.log(`dirname: ${__dirname}`);
console.log(`view dir: ${__dirname + "/views"}`);

//Load Data Here
var products = [];

fs.readFile("./data/products.json", "utf8", (err, jsonString) => {
	if (err) {
		console.log("File read failed:", err);
		return;
	}
	try {
		products = JSON.parse(jsonString);
	} catch (err) {
		console.log("Error parsing JSON string:", err);
	}
});

app.get("/", (req, res) => {
	let indexController = require("./controllers/indexController");
	indexController.getTopProduct(products).then((data) => {
		res.locals.data = data;
		res.render("home", { layout: "home-layout" });
	});
});

app.get("/index.htm", (req, res) => {
	let indexController = require("./controllers/indexController");
	indexController.getTopProduct(products).then((data) => {
		res.locals.data = data;
		res.render("home", { layout: "home-layout" });
	});
});

app.get("/login", (req, res) => {
	res.render("login-view", { layout: "login-view-layout" });
});

app.get("/sign-up", (req, res) => {
	res.render("sign-up", { layout: "sign-up-layout" });
});

app.get("/forgot-pwd", (req, res) => {
	res.render("forgot-pwd", { layout: "forgot-pwd-layout" });
});

app.get("/infor", (req, res) => {
	res.render("information", { layout: "information-layout" });
});

app.get("/order-list", (req, res) => {
	res.render("order-list", { layout: "order-list-layout" });
});

app.get("/list-product", (req, res) => {
	let category = req.query["category"];
	res.locals.data = products[category];
	res.render("list-product", {
		layout: "list-product-layout",
	});
});

const itemRouter = require("./routes/ItemDetailRoute");
app.use("/list-product/item", itemRouter);

const shoppingCartRouter = require("./routes/ShoppingCartRoute");
app.use("/shopping-cart", shoppingCartRouter);

app.listen(port, () => {
	console.log(`App is listening on https://ugs-clothes.herokuapp.com:${port}`);
});
