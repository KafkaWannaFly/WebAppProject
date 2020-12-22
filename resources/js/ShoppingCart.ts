import {
	setCommaForPrice,
	setIncrementButton,
	priceToNumber,
} from "./ItemDetail.js";
import { Bill, BillItem } from "./Models/bill.js";

function changeAmountOnCart(itemDiv) {
	for (let i = 0; i < itemDiv.length; i++) {
		setIncrementButton(
			itemDiv[i].querySelector(".amount"),
			itemDiv[i].querySelector(".increase-one"),
			itemDiv[i].querySelector(".decrease-one")
		);

		let increaseBtn = itemDiv[i].querySelector(
			".increase-one"
		) as HTMLDivElement;
		let decreaseBtn = itemDiv[i].querySelector(
			".decrease-one"
		) as HTMLDivElement;

		let oldAmount = parseInt(itemDiv[i].querySelector(".amount").value);
		let price = priceToNumber(itemDiv[i].querySelector(".price").innerHTML);

		increaseBtn.addEventListener("click", () => {
			updateTotalPrice(price);
			let amountDiv = itemDiv[i].querySelector(".amount") as HTMLInputElement;

			let amount = parseInt(amountDiv.value);
			oldAmount = amount;
		});

		decreaseBtn.addEventListener("click", () => {
			let amountDiv = itemDiv[i].querySelector(".amount") as HTMLInputElement;
			let amount = parseInt(amountDiv.value);
			console.log(`item amount: ${amount}`);
			if (amount <= 0) {
				if (oldAmount === 1) {
					updateTotalPrice(-price);
				}
				updateTotalPrice(0);
			} else {
				updateTotalPrice(-price);
			}

			oldAmount = amount;
		});

		setCommaForPrice(itemDiv[i].querySelector(".price"));
	}
}

function updateTotalPrice(delta: number) {
	// console.log(`delta: ${delta}`);

	let totalPriceDiv = document.querySelector(".total-price");
	let total = priceToNumber(totalPriceDiv.innerHTML);
	// console.log(`total: ${total}`);
	total += delta;

	totalPriceDiv.innerHTML = total.toString();
}

function toggleSelectedPayment(optionDiv) {
	let options = document.querySelectorAll(".option");
	options.forEach((e) => {
		let div = e as HTMLElement;
		if (div === optionDiv) {
			div.style.color = "white";
			div.style.backgroundColor = "#f26101";
		} else {
			div.style.color = "#f26101";
			div.style.backgroundColor = "white";
		}
	});
}

function populateShoppingCart(bill: Bill) {
	let itemsDiv = document.querySelector(".chosen-item-div");

	let itemDivSample = document.querySelector(".item-div");
	bill.billItems.forEach((billItem) => {
		let itemDiv = document.importNode(itemDivSample, true) as HTMLDivElement;
		itemDiv.id = billItem.item.id;
		itemDiv.style.display = "";

		let img = itemDiv.querySelector(".thumbnail") as HTMLImageElement;
		img.src = billItem.item.imageThumbnail;

		let priceDiv = itemDiv.querySelector(".price");
		priceDiv.innerHTML = billItem.item.price.toString();

		let amountInput = itemDiv.querySelector(".amount") as HTMLInputElement;
		amountInput.value = billItem.amount.toString();

		itemsDiv.appendChild(itemDiv);
	});

	let totalPriceDiv = document.querySelector(".total-price");
	totalPriceDiv.innerHTML = bill.totalPrice.toString();
}

let cartBody = document.querySelector("body");
cartBody.onload = () => {
	let bill = JSON.parse(sessionStorage.getItem("currentBill")) as Bill;
	populateShoppingCart(bill);

	changeAmountOnCart([...document.querySelectorAll(".item-div")]);
	setCommaForPrice(document.querySelector(".total-price"));

	let options = document.querySelectorAll(".option");
	options.forEach((e) => {
		let op = e as HTMLElement;
		op.onclick = () => {
			toggleSelectedPayment(op);
		};
	});
};

export { toggleSelectedPayment };
