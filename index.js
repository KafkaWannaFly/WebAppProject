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

app.set("views", "./views");
app.set("view engine", "hbs");

let item = {
	id: "id",
	name: "Saber’s Excalibur that Won 2 Holly Grail Wars",
	category: {
		categoryName: "Main Category",
		fileName: "fileName",
	},
	description:
		"Excalibur (/ɛkˈskælɪbər/) is the legendary sword of King Arthur,\
                        sometimes also attributed with magical powers or\
                        associated with the rightful sovereignty of Britain. Excalibur and the Sword in the Stone (the\
                        proof of Arthur's \
                        lineage) are sometimes said to be the same weapon, but in most versions they are considered \
                        separate. Excalibur was \
                        associated with the Arthurian legend very early on. In Welsh, it is called Caledfwlch; in \
                        Cornish, Calesvol (in Modern \
                        Cornish: Kalesvolgh); in Breton, Kaledvoulc'h; and in Latin, Caliburnus.",
	imagePath: [
		"https://images4.alphacoders.com/994/thumb-350-994514.jpg",
		"https://images7.alphacoders.com/945/thumb-350-945610.png",
		"https://images6.alphacoders.com/670/thumb-350-670517.png",
	],
	options: ["Short", "Medium", "Long"],
	postedTime: new Date(2020, 20, 11),
	price: 999999999,
	stock: 20,
};

app.get("/", (req, res) => {
	res.render("index", { layout: "index-layout" });
});

app.get("/index.htm", (req, res) => {
	res.render("index", { layout: "index-layout" });
});

// app.get("/", (req, res) => {
// 	fs.readFile("index.htm", (err, data) => {
// 		res.statusCode = 200;
// 		res.setHeader("content-type", "text/html");
// 		res.send(data);
// 	});
// });

// app.get("/index.htm", (req, res) => {
// 	fs.readFile("index.htm", (err, data) => {
// 		res.statusCode = 200;
// 		res.setHeader("content-type", "text/html");
// 		res.send(data);
// 	});
// });

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

// app.get("/pages/:pageName", (req, res) => {
//   // console.log(`Page name: ${req.params["pageName"]}`);
//   let htmlPath = "./pages/" + req.params["pageName"];

//   if (!fs.existsSync(htmlPath)) {
//     // console.log(`${req.params["pageName"]} not exist`);
//   }

//   try {
//     fs.readFile(htmlPath, (err, data) => {
//       res.statusCode = 200;
//       res.setHeader("content-type", "text/html");
//       res.send(data);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// });

app.listen(port, () => {
	console.log(`App is listening on https://usg-clothes.herokuapp.com:${port}`);
});
