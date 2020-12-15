function numberWithCommas(x) {
    return x.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function setCommaForPrice() {
    let price = document.querySelector(".price");
    price.innerHTML = numberWithCommas(parseInt(price.innerHTML));
}
function setIncrementButton() {
    let amount = document.querySelector(".amount");
    let increaseBtn = document.querySelector(".increase-one");
    increaseBtn.onclick = () => {
        amount.value = (parseInt(amount.value) + 1).toString();
    };
    let decreaseBtn = document.querySelector(".decrease-one");
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
function toggleSelectedOption(optionDiv) {
    let options = document.querySelectorAll(".option");
    options.forEach((e) => {
        let div = e;
        if (div === optionDiv) {
            div.style.color = "white";
            div.style.backgroundColor = "#f26101";
        }
        else {
            div.style.color = "#f26101";
            div.style.backgroundColor = "white";
        }
    });
}
let body = document.querySelector("body");
body.onload = () => {
    setCommaForPrice();
    setIncrementButton();
};
