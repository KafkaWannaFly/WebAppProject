import { Bill } from "./Models/bill.js";
import { Item } from "./Models/item.js";

function numberWithCommas(x: number) {
	return x.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function setCommaForPrice(price: Element) {
	// let price = document.querySelector(".price");
	// console.log(price);
	price.innerHTML = numberWithCommas(parseInt(price.innerHTML));
}

function setIncrementButton(
	amount: HTMLInputElement,
	increaseBtn: HTMLParagraphElement,
	decreaseBtn: HTMLParagraphElement
) {
	increaseBtn.onclick = () => {
		amount.value = (parseInt(amount.value) + 1).toString();
	};

	decreaseBtn.onclick = () => {
		let value = parseInt(amount.value) - 1;
		if (value < 0) {
			return;
		}
		amount.value = value.toString();
	};
}

function toggleSelectedOption(optionDiv: HTMLElement) {
	let options = document.querySelectorAll(".option");
	options.forEach((e) => {
		let div = e as HTMLElement;
		if (div === optionDiv) {
			div.style.color = "white";
			div.style.backgroundColor = "#f26101"; // Orage
		} else {
			div.style.color = "#f26101"; // Orage
			div.style.backgroundColor = "white";
		}
	});
}

function getItemFromHTML(div: HTMLElement) {
	let item = new Item();
	item.id = div.id;
	item.name = div.querySelector(".item-name").innerHTML;

	// We use comma seperation for price like this: 999,999,999
	// Need get rid of them
	let priceStr = div.querySelector(".price").innerHTML;
	priceStr = priceStr.replace(/[, ]+/g, "").trim();

	item.price = parseInt(priceStr);
	item.description = div.querySelector(".description-text").innerHTML;

	let options = div.querySelectorAll(".option");
	item.imagePaths = [];
	options.forEach((e) => {
		let opt = e as HTMLElement;
		item.imagePaths.push(opt.innerHTML);
	});

	let imgs = div.querySelectorAll(
		".item-image"
	) as NodeListOf<HTMLImageElement>;
	for (let i = 0; i < imgs.length; i++) {
		let img = imgs[i];
		item.imagePaths[i] = img.src;
	}

	// We don't have this data in item-detail page
	item.imageThumbnail = item.imagePaths[0];

	return item;
}

// Add item into a Bill object in sessionStorage "currentBill"
function onAddToCartClicked() {
	let amountDiv = document.querySelector(".amount") as HTMLInputElement;
	if (parseInt(amountDiv.value) <= 0) {
		return;
	}

	let bill = JSON.parse(sessionStorage.getItem("currentBill")) as Bill;

	let item = getItemFromHTML(document.querySelector(".item-container"));
	let billItem = {
		item: item,
		amount: parseInt(amountDiv.value),
	};

	if (bill !== null) {
		let existedItem = bill.billItems.find((value, index) => {
			if (value.item.id === item.id) {
				return true;
			}
			return false;
		});
		if (existedItem !== undefined) {
			existedItem.amount++;
		} else {
			bill.billItems.push(billItem);
		}

		bill.totalPrice += item.price * billItem.amount;
	} else {
		bill = new Bill();
		bill.totalPrice = item.price * billItem.amount;
		bill.billItems = [billItem];
	}

	sessionStorage.setItem("currentBill", JSON.stringify(bill));
	console.log(bill);
}

let body = document.querySelector("body");

body.onload = () => {
	setCommaForPrice(document.querySelector(".price"));
	setIncrementButton(
		document.querySelector(".amount"),
		document.querySelector(".increase-one"),
		document.querySelector(".decrease-one")
	);

	let options = document.querySelectorAll(".option");
	options.forEach((e) => {
		let opt = e as HTMLParagraphElement;
		opt.onclick = () => toggleSelectedOption(opt);
	});

	let addToCart = document.querySelector(".add-to-cart") as HTMLButtonElement;
	addToCart.addEventListener("click", () => onAddToCartClicked());
};

// Not work on browser!
export { setCommaForPrice, setIncrementButton, toggleSelectedOption };
// module.exports = { setCommaForPrice, setIncrementButton, toggleSelectedOption };
