function numberWithCommas(x) {
  return x.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function setCommaForAllPrice(element) {
  for (let i = 0; i < element.length; i++) {
    setCommaForPrice(element[i]);
  }
}

function setCommaForPrice(price) {
  // let price = document.querySelector(".price");
  // console.log(price);
  price.innerHTML = numberWithCommas(parseInt(price.innerHTML)) + "đ";
}

function priceToNumber(priceStr) {
  priceStr = priceStr.replace(/[, ]+/g, "").trim();
  return parseInt(priceStr);
}

function setPriceSecsion() {
  let newPrice = document.querySelectorAll(".price");
  let oldPrice = document.querySelectorAll(".old-price");
  let salePercent = document.querySelectorAll(".sale-percent");

  for (let i = 0; i < newPrice.length; i++) {
    if (
      parseFloat(newPrice[i].innerHTML) >= parseFloat(oldPrice[i].innerHTML)
    ) {
      oldPrice[i].innerHTML = "";
      salePercent[i].innerHTML = "";
    } else {
      salePercent[i].innerHTML =
        (
          (parseFloat(newPrice[i].innerHTML) /
            parseFloat(oldPrice[i].innerHTML) -
            1) *
          100
        )
          .toFixed(0)
          .toString() + "%";
    }
  }
}

function orderBy(criteria) {
  let itemContainer = document.querySelector(".list-product > .row");

  let listItems = document.querySelectorAll(
    ".list-product > .row > .item-product"
  );

  let filterItems = [];
  for (let i = 0; i < listItems.length; i++) filterItems.push(listItems[i]);

  if (criteria === "sales-number") {
    document.getElementsByClassName("order-by-btn")[0].innerHTML =
      "Bán chạy nhất";
    filterItems.sort((a, b) => {
      let _a = a.querySelector(".sales").innerHTML;
      let _b = b.querySelector(".sales").innerHTML;
      return _b.localeCompare(_a);
    });
  } else if (criteria === "de-price") {
    document.getElementsByClassName("order-by-btn")[0].innerHTML =
      "Giá từ thấp đến cao";
    filterItems.sort((a, b) => {
      let _a = a.querySelector(".price").innerHTML;
      let _b = b.querySelector(".price").innerHTML;
      return _a.localeCompare(_b);
    });
  } else if (criteria === "in-price") {
    document.getElementsByClassName("order-by-btn")[0].innerHTML =
      "Giá từ cao đến thấp";
    filterItems.sort((a, b) => {
      let _a = a.querySelector(".price").innerHTML;
      let _b = b.querySelector(".price").innerHTML;
      return _b.localeCompare(_a);
    });
  } else if (criteria === "sale-percent") {
    document.getElementsByClassName("order-by-btn")[0].innerHTML =
      "Giảm nhiều nhất";
    console.log(
      parseFloat(filterItems[0].querySelector(".sale-percent").innerHTML)
    );

    filterItems.sort((a, b) => {
      let _a = -parseFloat(a.querySelector(".sale-percent").innerHTML);
      let _b = -parseFloat(b.querySelector(".sale-percent").innerHTML);
      return _b - _a;
    });
  }

  itemContainer.innerHTML = "";
  for (let i = 0; i < filterItems.length; i++) {
    itemContainer.appendChild(filterItems[i]);
  }

  return false;
}

let body = document.querySelector("body");
body.onload = () => {
  setCommaForAllPrice(document.querySelectorAll(".price"));
  setCommaForAllPrice(document.querySelectorAll(".old-price"));
  setPriceSecsion();
};
