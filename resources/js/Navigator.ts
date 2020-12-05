// export {};
// const fs = require("fs");

// import { existsSync } from "fs";
// const fs = require("fs");

// Navigate to ItemDetail.html when click to the link or image
function setUpNavigationToDetailPage() {
	let path = window.location.pathname;
	let pageName = path.split("/").pop().split(".")[0];
	console.log(`Current page: ${pageName}`);

	let itemProducts = document.querySelectorAll(".item-product");

	console.log(`Found ${itemProducts.length} item-product`);

	let detailUrl = "./item-detail.html";
	if (pageName === "index") {
		detailUrl = "./pages/item-detail.html";
	}

	// if (!fs.existsSync(detailUrl)) {
	// 	detailUrl = "./pages/item-detail.html";
	// }

	for (let i = 0; i < itemProducts.length; i++) {
		let pictureAnchor = itemProducts[i].querySelector(
			".item-product > a"
		) as HTMLAnchorElement;
		pictureAnchor.href = detailUrl;

		let textAnchor = itemProducts[i].querySelector(
			".des-product > .name"
		) as HTMLAnchorElement;
		textAnchor.href = detailUrl;
	}

	// This patr should be on loop above but index.htm not format like so :<
}

let body = document.querySelector("body");
body.onload = () => setUpNavigationToDetailPage();
