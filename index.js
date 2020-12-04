// import * as express from "express";
var path = require("path");
const express = require("express");
const fs = require("fs");
const app = express();
const hbs = require("express-handlebars");
const port = process.env.PORT || 3000;

app.use("/pages", express.static(path.join(__dirname, "./pages")));
app.use("/resources", express.static(path.join(__dirname, "./resources")));

// Set up for HandleBars
app.engine(
	"hbs",
	hbs({
		extname: "hbs",
		defaultLayout: "default-layout",
		layoutsDir: __dirname + "/Views/Layouts/",
		partialsDir: __dirname + "/Views/Partials/",
	})
);

app.set("view engine", "hbs");

app.get("/", (req, res) => {
	fs.readFile("index.htm", (err, data) => {
		res.statusCode = 200;
		res.setHeader("content-type", "text/html");
		res.send(data);
	});
});

app.get("/index.htm", (req, res) => {
	fs.readFile("index.htm", (err, data) => {
		res.statusCode = 200;
		res.setHeader("content-type", "text/html");
		res.send(data);
	});
});

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
