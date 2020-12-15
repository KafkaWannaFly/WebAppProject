function numberWithCommas(x: number) {
	return x.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function setCommaForPrice() {
	let price = document.querySelector(".price");
	// console.log(price);
	price.innerHTML = numberWithCommas(parseInt(price.innerHTML));
}

function setIncrementButton() {
	let amount = document.querySelector(".amount") as HTMLInputElement;

	let increaseBtn = document.querySelector(
		".increase-one"
	) as HTMLParagraphElement;
	increaseBtn.onclick = () => {
		amount.value = (parseInt(amount.value) + 1).toString();
	};

	let decreaseBtn = document.querySelector(
		".decrease-one"
	) as HTMLParagraphElement;
	decreaseBtn.onclick = () => {
		let value = parseInt(amount.value) - 1;
		if (value < 0) {
			return;
		}
		amount.value = value.toString();
	};

	let options = document.querySelectorAll(".option");
	console.log(options[0]);
}

// This function is called from HTML
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

let body = document.querySelector("body");

body.onload = () => {
	setCommaForPrice();
	setIncrementButton();
};
