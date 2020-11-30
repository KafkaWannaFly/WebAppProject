// import * as express from "express";
var path = require("path");
const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000 || process.env.PORT;

app.use(express.static(path.join(__dirname, "./pages")));
app.use("/resources", express.static(path.join(__dirname, "./resources")));

app.get("/", (req, res) => {
	fs.readFile("index.htm", (err, data) => {
		res.statusCode = 200;
		res.setHeader("content-type", "text/html");
		res.send(data);
	});
});

app.listen(port, () => {
	console.log(
		`App is listening on ${window.location.hostname}:${window.location.port}`
	);
});
