import { Bill } from "./Models/bill.js";
import { Item } from "./Models/item.js";
function numberWithCommas(x) {
    return x.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function setCommaForPrice(price) {
    // let price = document.querySelector(".price");
    // console.log(price);
    price.innerHTML = numberWithCommas(parseInt(price.innerHTML));
}
function setIncrementButton(amount, increaseBtn, decreaseBtn) {
    increaseBtn.addEventListener("click", () => {
        amount.value = (parseInt(amount.value) + 1).toString();
    });
    decreaseBtn.addEventListener("click", () => {
        let value = parseInt(amount.value) - 1;
        if (value < 0) {
            value = 0;
        }
        amount.value = value.toString();
    });
}
function toggleSelectedOption(optionDiv) {
    let options = document.querySelectorAll(".option");
    options.forEach((e) => {
        let div = e;
        if (div === optionDiv) {
            div.style.color = "white";
            div.style.backgroundColor = "#f26101"; // Orage
        }
        else {
            div.style.color = "#f26101"; // Orage
            div.style.backgroundColor = "white";
        }
    });
}
// 10,000,000 đ → 10000000
function priceToNumber(priceStr) {
    priceStr = priceStr.replace(/[, ]+/g, "").trim();
    return parseInt(priceStr);
}
function getItemFromHTML(div) {
    let item = new Item();
    item.id = div.id;
    item.name = div.querySelector(".item-name").innerHTML;
    // We use comma seperation for price like this: 999,999,999
    // Need get rid of them
    let priceStr = div.querySelector(".new-price").innerHTML;
    item.price = priceToNumber(priceStr);
    item.description = div.querySelector(".description-text").innerHTML;
    let options = div.querySelectorAll(".option");
    item.imagePaths = [];
    options.forEach((e) => {
        let opt = e;
        item.imagePaths.push(opt.innerHTML);
    });
    let imgs = div.querySelectorAll(".item-image");
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
    let amountDiv = document.querySelector(".amount");
    if (parseInt(amountDiv.value) <= 0) {
        return;
    }
    let bill = JSON.parse(sessionStorage.getItem("currentBill"));
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
        }
        else {
            bill.billItems.push(billItem);
        }
        bill.totalPrice += item.price * billItem.amount;
    }
    else {
        bill = new Bill();
        bill.totalPrice = item.price * billItem.amount;
        bill.billItems = [billItem];
    }
    sessionStorage.setItem("currentBill", JSON.stringify(bill));
    console.log(bill);
}
//function show write Rate
function clickWriteRateHandler() {
    let form = document.getElementById("form-write-rate");
    if (form.style.display == "none")
        form.style.display = "block";
    else
        form.style.display = "none";
}
function setPriceSecsion() {
    let newPrice = document.getElementById("new-price");
    let oldPrice = document.getElementById("old-price");
    let salePercent = document.getElementById("sale-percent");
    if (parseFloat(newPrice.innerHTML) >= parseFloat(oldPrice.innerHTML)) {
        oldPrice.innerHTML = "";
        salePercent.innerHTML = "";
    }
    else {
        salePercent.innerHTML =
            ((parseFloat(newPrice.innerHTML) / parseFloat(oldPrice.innerHTML) - 1) *
                100)
                .toFixed(0)
                .toString() + "%";
    }
}
let body = document.querySelector("body");
body.onload = () => {
    setCommaForPrice(document.querySelector("#new-price"));
    setCommaForPrice(document.querySelector("#old-price"));
    setPriceSecsion();
    setIncrementButton(document.querySelector(".amount"), document.querySelector(".increase-one"), document.querySelector(".decrease-one"));
    let options = document.querySelectorAll(".option");
    options.forEach((e) => {
        let opt = e;
        opt.onclick = () => toggleSelectedOption(opt);
    });
    let addToCart = document.querySelector(".add-to-cart");
    addToCart.addEventListener("click", () => onAddToCartClicked());
    let writeRateBtn = document.querySelector(".btn-write-rate");
    writeRateBtn.addEventListener("click", () => clickWriteRateHandler());
};
// Not work on browser!
export { setCommaForPrice, setIncrementButton, toggleSelectedOption, priceToNumber, };
// module.exports = { setCommaForPrice, setIncrementButton, toggleSelectedOption };
