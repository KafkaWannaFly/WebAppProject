import {
	setCommaForPrice,
	setIncrementButton,
	priceToNumber,
} from "./ItemDetail.js";
import { Bill, BillItem } from "./Models/bill.js";
import { User } from "./Models/user.js";

function changeAmountOnCart(itemsDiv: any[]) {
	// Update data to obj
	// let bill = JSON.parse(sessionStorage.getItem("currentBill")) as Bill;
	// let billItems: BillItem[] = bill.billItems;

	for (let i = 0; i < itemsDiv.length; i++) {
		setIncrementButton(
			itemsDiv[i].querySelector(".amount"),
			itemsDiv[i].querySelector(".increase-one"),
			itemsDiv[i].querySelector(".decrease-one")
		);

		let increaseBtn = itemsDiv[i].querySelector(
			".increase-one"
		) as HTMLDivElement;
		let decreaseBtn = itemsDiv[i].querySelector(
			".decrease-one"
		) as HTMLDivElement;

		let oldAmount = parseInt(itemsDiv[i].querySelector(".amount").value);
		let price = priceToNumber(itemsDiv[i].querySelector(".price").innerHTML);

		// billItems[i].amount = oldAmount;
		// console.log(JSON.stringify(billItems[i].amount, null, 4));

		increaseBtn.addEventListener("click", () => {
			updateTotalPrice(price);
			let amountDiv = itemsDiv[i].querySelector(".amount") as HTMLInputElement;

			let amount = parseInt(amountDiv.value);
			oldAmount = amount;

			// billItems[i].amount = amount;
		});

		decreaseBtn.addEventListener("click", () => {
			let amountDiv = itemsDiv[i].querySelector(".amount") as HTMLInputElement;
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
			// billItems[i].amount = amount;
		});

		setCommaForPrice(itemsDiv[i].querySelector(".price"));
	}

	// Save changes
	// sessionStorage.setItem("currentBill", JSON.stringify(bill));
}

function updateTotalPrice(delta: number) {
	// console.log(`delta: ${delta}`);

	let totalPriceDiv = document.querySelector(".total-price");
	let total = priceToNumber(totalPriceDiv.innerHTML);
	// console.log(`total: ${total}`);
	total += delta;

	totalPriceDiv.innerHTML = total.toString();

	// let bill = JSON.parse(sessionStorage.getItem("currentBill")) as Bill;
	// bill.totalPrice = total;
	// sessionStorage.setItem("currentBill", JSON.stringify(bill));
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

		let name = itemDiv.querySelector(".item-name");
		name.innerHTML = billItem.item.name;

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

function purchaseButtonHandler() {
	// Collect data
	let bill = JSON.parse(sessionStorage.getItem("currentBill")) as Bill;

	let chosenItemsDiv = document.querySelector(".chosen-item-div");
	let itemsDiv = chosenItemsDiv.querySelectorAll(".item-div");

	// There is an invisible item-div in the page. key = 0
	let total = 0;
	let zeroCount = 0;
	itemsDiv.forEach((itemDiv, index) => {
		if (index === 0) {
			return;
		}

		let amountDiv = itemDiv.querySelector(".amount") as HTMLInputElement;
		let amount = parseInt(amountDiv.value);
		if (amount <= 0) {
			zeroCount++;
		}

		total += amount * bill.billItems[index - 1].item.price;
		bill.billItems[index - 1].amount = amount;
	});

	bill.totalPrice = total;

	// Remove item have amount = 0
	// bill.billItems.sort((a, b) => a.amount - b.amount);
	bill.billItems = bill.billItems.filter((val, idx) => {
		if (val.amount > 0) {
			return true;
		} else {
			return false;
		}
	});

	let shippingInput = document.querySelector(
		".shipping-address"
	) as HTMLInputElement;
	bill.shippingAddress = shippingInput.value;

	let noteInput = document.querySelector(".note") as HTMLInputElement;
	bill.notes = noteInput.value;

	let phoneNum = document.querySelector(".phone-number") as HTMLInputElement;
	bill.phone = phoneNum.value;

	let payMethodInputs = document.getElementsByName(
		"method-payment"
	) as NodeListOf<HTMLInputElement>;
	payMethodInputs.forEach((option, idx) => {
		if (option.checked) {
			bill.paymentMethod = parseInt(option.value);
		}
	});

	sessionStorage.setItem("currentBill", JSON.stringify(bill));

	// Validate bill
	if (bill.billItems.length === 0) {
		alert("Your cart is empty!");
	}

	// Check if user login or not
	fetch("/infor/json").then(async (res) => {
		try {
			let user = (await res.json()) as User;
			console.log(user);

			bill.id = `${user.username}-${Date.now()}`;

			// You have already logined. POST this bill to server
			fetch("/shopping-cart", {
				method: "POST",
				body: JSON.stringify(bill),
				headers: { "Content-type": "application/json; charset=UTF-8" },
				redirect: "follow",
			}).then((res) => {
				// Reset the item for next shopping
				sessionStorage.removeItem("currentBill");
				if (res.redirected) {
					window.location.href = "/order-list";
				}
			});
		} catch (err) {
			// This mean user not login yet :))
			console.log(err);

			let lauchBtn = document.querySelector(
				".launch-modal-btn"
			) as HTMLButtonElement;
			lauchBtn.click();
		}
	});

	// console.log(`bill: ${JSON.stringify(bill, null, 4)}`);
}

// REMEMBER: There is an invisible item-div in the page
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

	let confirmBtn = document.querySelector(".confirm-btn") as HTMLButtonElement;
	confirmBtn.addEventListener("click", (ev) => purchaseButtonHandler());
};

export { toggleSelectedPayment };
