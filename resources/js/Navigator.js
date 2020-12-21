// export {};
// const fs = require("fs");
function setUpNavigationToDetailPage() {
    let path = window.location.pathname;
    let pageName = path.split("/").pop().split(".")[0];
    console.log(`Current page: ${pageName}`);
    let itemProducts = document.querySelectorAll(".item-product");
    console.log(`Found ${itemProducts.length} item-product`);
    let detailUrl = "./item-detail.html";
    if (pageName === "index") {
        detailUrl = "./pages/item-detail.html";
    }
    // if (!fs.existsSync(detailUrl)) {
    // 	detailUrl = "./pages/item-detail.html";
    // }
    console.log(detailUrl);
    for (let i = 0; i < itemProducts.length; i++) {
        let pictureAnchor = itemProducts[i].querySelector(".item-product > a");
        // pictureAnchor.href = detailUrl;
        let textAnchor = itemProducts[i].querySelector(".name");
        // textAnchor.href = detailUrl;
    }
    // This patr should be on loop above but index.htm not format like so :<
}
let body = document.querySelector("body");
body.onload = () => setUpNavigationToDetailPage();
export {};
