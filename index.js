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

// app.use(express.static(path.join(__dirname, "/views")));
// app.set("views", path.join(__dirname, "/views"));
app.set("./views", __dirname + "/views");
app.set("view engine", "hbs");

console.log(`dirname: ${__dirname}`);
console.log(`view dir: ${__dirname + "/views"}`);

//Load Data Here
var products = [];

fs.readFile("./resources/data/products.json", "utf8", (err, jsonString) => {
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
		res.render("index", { layout: "index-layout" });
	});
});

app.get("/index.htm", (req, res) => {
	let indexController = require("./controllers/indexController");
	indexController.getTopProduct(products).then((data) => {
		res.locals.data = data;
		res.render("index", { layout: "index-layout" });
	});
});

app.get("/login", (req, res) => {
	res.render("login", { layout: "login-layout" });
});

app.get("/sign-up", (req, res) => {
	res.render("sign-up", { layout: "sign-up-layout" });
});

app.get("/forgot-pwd", (req, res) => {
	res.render("forgot-pwd", { layout: "forgot-pwd-layout" });
});

app.get("/infor", (req, res) => {
	res.render("infor", { layout: "infor-layout" });
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

app.get("/pages/shopping-cart.html", (req, res) => {});

// app.get("/pages/:pageName", (req, res) => {
// 	// console.log(`Page name: ${req.params["pageName"]}`);
// 	let htmlPath = "./pages/" + req.params["pageName"];

// 	if (!fs.existsSync(htmlPath)) {
// 		// console.log(`${req.params["pageName"]} not exist`);
// 	}

// 	try {
// 		fs.readFile(htmlPath, (err, data) => {
// 			res.statusCode = 200;
// 			res.setHeader("content-type", "text/html");
// 			res.send(data);
// 		});
// 	} catch (error) {
// 		console.log(error);
// 	}
// });

app.listen(port, () => {
	console.log(`App is listening on https://usg-clothes.herokuapp.com:${port}`);
});
