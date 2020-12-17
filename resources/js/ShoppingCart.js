import {
	setCommaForPrice,
	setIncrementButton,
	toggleSelectedOption,
} from "./ItemDetail.js";

// function numberWithCommas(x) {
// 	return x.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }
// function setCommaForPrice(price) {
// 	price.innerHTML = numberWithCommas(parseInt(price.innerHTML));
// }
// function setIncrementButton(amount, increaseBtn, decreaseBtn) {
// 	increaseBtn.onclick = () => {
// 		amount.value = (parseInt(amount.value) + 1).toString();
// 	};
// 	decreaseBtn.onclick = () => {
// 		let value = parseInt(amount.value) - 1;
// 		if (value < 0) {
// 			return;
// 		}
// 		amount.value = value.toString();
// 	};
// }

function changeAmountOnCart(itemDiv) {
	for (let i = 0; i < itemDiv.length; i++) {
		setIncrementButton(
			itemDiv[i].querySelector(".amount"),
			itemDiv[i].querySelector(".increase-one"),
			itemDiv[i].querySelector(".decrease-one")
		);

		setCommaForPrice(itemDiv[i].querySelector(".price"));
	}
}

function toggleSelectedPayment(optionDiv) {
	let options = document.querySelectorAll(".option");
	options.forEach((e) => {
		let div = e;
		if (div === optionDiv) {
			div.style.color = "white";
			div.style.backgroundColor = "#f26101";
		} else {
			div.style.color = "#f26101";
			div.style.backgroundColor = "white";
		}
	});
}

let cartBody = document.querySelector("body");
cartBody.onload = () => {
	changeAmountOnCart([...document.querySelectorAll(".item-div")]);
	setCommaForPrice(document.querySelector(".total-price"));

	let options = document.querySelectorAll(".option");
	for (let i = 0; i < options.length; i++) {
		options[i].onclick = () => toggleSelectedPayment(options[i]);
	}
};
