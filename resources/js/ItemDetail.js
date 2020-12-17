function numberWithCommas(x) {
	return x.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function setCommaForPrice(price) {
	price.innerHTML = numberWithCommas(parseInt(price.innerHTML));
}
function setIncrementButton(amount, increaseBtn, decreaseBtn) {
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
function toggleSelectedOption(optionDiv) {
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
let body = document.querySelector("body");
body.onload = () => {
	setCommaForPrice(document.querySelector(".price"));
	setIncrementButton(
		document.querySelector(".amount"),
		document.querySelector(".increase-one"),
		document.querySelector(".decrease-one")
	);
};

export { setCommaForPrice, setIncrementButton };
