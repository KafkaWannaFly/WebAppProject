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
    for (let i = 0; i < itemProducts.length; i++) {
        let pictureAnchor = itemProducts[i].querySelector(".item-product > a");
        pictureAnchor.href = detailUrl;
        let textAnchor = itemProducts[i].querySelector(".des-product > .name");
        textAnchor.href = detailUrl;
    }
}
let body = document.querySelector("body");
body.onload = () => setUpNavigationToDetailPage();
