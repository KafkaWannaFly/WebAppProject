import { Item } from "./Models/item";

// let Item = require("./Models/item");
let ITEM = new Item();
ITEM = {
	id: "id",
	name: "Saber’s Excalibur that Won 2 Holly Grail Wars",
	category: {
		categoryName: "Main Category",
		// fileName: "fileName",
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

function setupNavigatePath(item: Item) {
	try {
		let tittle = document.querySelector("head title") as HTMLTitleElement;
		tittle.innerHTML = item.name;

		let navigatePath = document.getElementById("navigatePath");
		navigatePath.innerHTML = "";

		let home = document.createElement("a");
		home.innerHTML = "Home Page";
		home.href = "../index.htm";

		let mainCategory = document.createElement("a");
		mainCategory.innerHTML = item.category.categoryName;
		mainCategory.href = "#";

		// let subCategory = document.createElement("a");
		// subCategory.innerHTML = item.category.detailName;
		// subCategory.href = "#";

		let pageName = document.createElement("a");
		pageName.innerHTML = item.name;

		navigatePath.appendChild(home);
		navigatePath.appendChild(document.createTextNode(" > "));

		navigatePath.appendChild(mainCategory);
		navigatePath.appendChild(document.createTextNode(" > "));

		// navigatePath.appendChild(subCategory);
		// navigatePath.appendChild(document.createTextNode(" > "));

		navigatePath.appendChild(pageName);
	} catch (error) {
		console.log(error);
	}
}

function setUpCarousel(item: Item) {
	try {
		let carouselOrderList = document.getElementById(
			"carouselOrderList"
		) as HTMLOListElement;
		carouselOrderList.innerHTML = "";

		let carouselInner = document.getElementById("carouselInner");
		carouselInner.innerHTML = "";

		let carouselListItemModel = document.querySelector(
			".carouselListItemModel"
		) as HTMLLIElement;

		let carouselImageDivModel = document.querySelector(
			".carouselImageDivModel"
		);

		console.log(`Number of image: ${item.imagePath.length}`);
		for (let i = 0; i < item.imagePath.length; i++) {
			let li = document.importNode(
				carouselListItemModel,
				true
			) as HTMLLIElement;
			li.setAttribute("data-slide-to", i.toString());
			console.log(`Copy of li:\n${li}`);
			carouselOrderList.appendChild(li);

			let imgDiv = document.importNode(carouselImageDivModel, true);
			let img = imgDiv.querySelector("img");
			console.log(`Item image path ${i}: ${item.imagePath[i]}`);
			img.src = item.imagePath[i];
			carouselInner.appendChild(imgDiv);

			// Make first element active by default
			if (i == 0) {
				imgDiv.className += " active";
				li.className += " active";
			}
		}
	} catch (error) {
		console.log(error);
	}
}

function numberWithCommas(x: number) {
	return x.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function setUpDetailContent(item: Item) {
	try {
		let itemName = document.querySelector(".itemName");
		itemName.innerHTML = item.name;

		let newPriceTag = document.querySelector(".newPriceTag");
		newPriceTag.innerHTML = numberWithCommas(item.price).toString() + "đ";

		let oldPriceTag = document.querySelector(".oldPriceTag");
		oldPriceTag.innerHTML = numberWithCommas(item.price * 1.2) + "đ";

		let optionsDiv = document.querySelector(".optionsDiv");
		for (let i = 0; i < item.options.length; i++) {
			let option = document.importNode(
				document.querySelector(".itemOptionModel"),
				true
			);
			option.innerHTML = item.options[i];

			optionsDiv.appendChild(option);
		}

		let descriptionText = document.querySelector(".descriptionText");
		descriptionText.innerHTML = item.description;
	} catch (error) {
		console.log(error);
	}
}

function readItemDetail(item: Item): void {
	try {
		// Set navigatePath for the page
		setupNavigatePath(item);

		// Set images for carousel
		setUpCarousel(item);

		//Set content
		setUpDetailContent(item);
	} catch (error) {
		console.log(error);
	}
}

const loadSampleData = () => {
	readItemDetail(ITEM);
};

let body = document.querySelector("body");
body.onload = () => loadSampleData();
// body.addEventListener("load", () => loadSampleData());
