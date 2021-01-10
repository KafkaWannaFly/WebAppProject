"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Models_1 = require("../controllers/Models");
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod[PaymentMethod["cod"] = 0] = "cod";
    PaymentMethod[PaymentMethod["momo"] = 1] = "momo";
    PaymentMethod[PaymentMethod["vnpay"] = 2] = "vnpay";
    PaymentMethod[PaymentMethod["zalopay"] = 3] = "zalopay";
})(PaymentMethod || (PaymentMethod = {}));
var Status;
(function (Status) {
    Status[Status["waiting"] = 0] = "waiting";
    Status[Status["shipping"] = 1] = "shipping";
    Status[Status["complete"] = 2] = "complete";
})(Status || (Status = {}));
//#region User query
async function getUserAsync(username) {
    try {
        let userDoc = await Models_1.UserModel.findOne({ username: username }).exec();
        return userDoc.toObject();
    }
    catch (err) {
        console.warn(`Fail getUserAsync. ${err}`);
    }
}
async function getAllUsers() {
    try {
        let userDocs = await Models_1.UserModel.find({}).exec();
        let users = userDocs.map((val, idx) => {
            return val;
        });
        return users;
    }
    catch (err) {
        console.log(`Fail to getAllUsers. ${err}`);
    }
}
/**
 * True if register successfully
 *
 * False if username has already existed
 *
 * Else, return undefined
 * @param user User to be save
 * @returns
 */
async function registerUserAsync(user) {
    try {
        let existedUser = await getUserAsync(user.username);
        if (existedUser !== undefined) {
            return false;
        }
        let userModel = new Models_1.UserModel(user);
        await userModel.save();
        return true;
    }
    catch (err) {
        console.warn(`Fail registerUserAsync. ${err}`);
    }
}
async function updateUserAsync(username, newValue) {
    try {
        let updatedUserDoc = await Models_1.UserModel.findOneAndUpdate({ username: username }, newValue, { new: true, useFindAndModify: false });
        return updatedUserDoc;
    }
    catch (err) {
        console.log(`Fail to update user. ${err}`);
    }
}
async function updateUserTest() {
    let user = await getUserAsync("18127084");
    user.name = "Đinh Hoàng Dươnggggggg";
    user.address = "Mặt trăng";
    let updatedUser = await updateUserAsync(user.username, user);
    console.log(`Update user result: ${JSON.stringify(updatedUser, null, 4)}`);
}
async function registerWithLameUserObjectTest() {
    let notExistedUserName = "DarlingOnTheMoon";
    getUserAsync(notExistedUserName).then((user) => {
        registerUserAsync(user).then((success) => {
            console.log(`Register result: ${success}`);
        });
    });
}
async function registerNormallyTest() {
    let registeredUser = {
        username: "IntoTheWhiteNight",
        password: "yukiho",
        email: "kirihara@email.com",
        phone: "0905555",
        name: "Yukiho",
        userType: 0,
    };
    let isSuccess = await registerUserAsync(registeredUser);
    console.log(`Register result: ${isSuccess}`);
}
async function getAllUsersTest() {
    let users = await getAllUsers();
    console.log(`Found all ${users.length} users:${users}`);
}
// registerNormallyTest();
// getAllUsersTest();
// updateUserTest();
//#endregion
//#region Item query
/**
 * Find item by id
 * @param id id
 * @returns Item object if found one. Else, return undefined
 */
async function getItemAsync(id) {
    try {
        let itemDoc = await Models_1.ItemModel.findOne({ id: id }).exec();
        return itemDoc.toObject();
    }
    catch (err) {
        console.log(`Fail to getItemAsync. ${err}`);
    }
}
async function getAllItemsAsync() {
    try {
        let itemDocs = await Models_1.ItemModel.find({}).exec();
        let items = itemDocs.map((val, idx) => {
            return val;
        });
        return items;
    }
    catch (err) {
        console.log(`Fail to getAllItemsAsync. ${err}`);
    }
}
/**
 * Get the top highest sale items
 * @param amount amount of top items
 * @returns
 */
async function getTopSaleItemsAsync(amount) {
    try {
        let items = await getAllItemsAsync();
        items.sort((a, b) => {
            return a.sales - b.sales;
        });
        return items.slice(0, amount);
    }
    catch (err) {
        console.log(`Fail to getTopSaleItems. ${err}`);
    }
}
/**
 * Find array of items belong to a specific category
 *
 * If nothing belong to that category, return empty array which mean arr.length = 0
 * @param category Category to find
 * @returns An array if Item
 */
async function getItemsByCategory(category) {
    try {
        let itemDocs = await Models_1.ItemModel.find({ category: category }).exec();
        let items = itemDocs.map((val, idx) => {
            return val;
        });
        return items;
    }
    catch (err) {
        console.log(`Fail to getItemsByCategory. ${err}`);
    }
}
//#region ItemTest
async function getItemsByUnExistedCateTest() {
    let cate = "";
    let items = await getItemsByCategory(cate);
    console.log(`${cate} have ${items.length} items`);
}
async function getItemByExistedCategoryTest() {
    let cate = "ao-thun-ngan-tay";
    let items = await getItemsByCategory(cate);
    console.log(`${cate} have ${items.length} items`);
}
async function getAllItemsTest() {
    let items = await getAllItemsAsync();
    console.log(`getAllItems: ${JSON.stringify(items, null, 4)}`);
}
async function getExistedItemTest() {
    let id = "K0IEQUDODCQ3IjldRyPK";
    let item = await getItemAsync(id);
    console.log(`Result item: ${JSON.stringify(item, null, 4)}`);
}
async function getUnExistedItemTest() {
    let id = "Từ ấy trong tôi bừng nắng hạ";
    let item = await getItemAsync(id);
    console.log(`Result item: ${JSON.stringify(item, null, 4)}`);
}
async function getTopSaleItemsTest() {
    let top = 12;
    let items = await getTopSaleItemsAsync(top);
    console.log(`getTopSaleItems: ${JSON.stringify(items, null, 4)}`);
}
// getExistedItemTest();
// getUnExistedItemTest();
// getAllItemsTest();
// getTopSaleItemsTest();
// getItemByExistedCategoryTest();
// getItemsByUnExistedCateTest();
//#endregion ItemTest
//#endregion
//#region Bill query
async function saveBillAsync(bill) {
    try {
        let billModel = new Models_1.BillModel(bill);
        let billDoc = await billModel.save();
        return true;
    }
    catch (err) {
        console.log(`Fail to save bill. ${err}`);
        return false;
    }
}
async function getBillAsync(billId) {
    try {
        let billDoc = await Models_1.BillModel.findOne({ id: billId }).exec();
        return billDoc.toObject();
    }
    catch (err) {
        console.log(`Fail to get bill. ${err}`);
    }
}
/**
 * findOneAndUpdate
 * @param billId id
 * @param status new status
 * @returns Bill object after update
 */
async function updateBillStatus(billId, status) {
    try {
        // let bill = await getBillAsync(billId);
        // bill.status = status;
        let updatedBill = await Models_1.BillModel.findOneAndUpdate({ id: billId }, { status: status }, { new: true, useFindAndModify: false });
        return updatedBill;
    }
    catch (err) {
        console.log(`Fail to update bill status. ${err}`);
    }
}
async function updateBillStatusTest() {
    // let bill = await getBillAsync("12345");
    let updatedBill = await updateBillStatus("12345", Status.shipping);
    console.log(`Update bill result: ${updatedBill}`);
}
async function saveBillTest() {
    let bill = {
        id: "12345",
        purchasedDate: new Date(Date.now()),
        shippingAddress: "VN",
        billItems: [
            {
                amount: 1,
                item: {
                    id: "Acrq4g0N7ZYCeEFO1FvD",
                    name: "Áo thun nam Cotton Compact phiên bản Premium in Care&Share màu trắng",
                    oldPrice: 259000,
                    price: 221000,
                    imageThumbnail: "resources/img/product/ao-thun-ngan-tay/careshare_ao_trang_1_10_550x623.jpg",
                    imagePaths: [
                        "resources/img/product/ao-thun-ngan-tay/careshare_ao_trang_1_10_550x623.jpg",
                        "resources/img/product/ao-thun-ngan-tay/2L6A3118_81_550x623.jpg",
                        "resources/img/product/ao-thun-ngan-tay/2L6A3120_44_550x623.jpg",
                    ],
                    options: ["S", "M", "L", "XL"],
                    description: "Hiểu một cách đơn giản, Care & Share: For A Better Childhood là một chương trình được xây dựng và duy trì bởi USG nhằm góp sức mình giúp đỡ những trẻ em kém may mắn, giúp các em đến trường và có cuộc sống tốt hơn. Coolmate cam kết sẽ dành 10% doanh thu từ tất cả những sản phẩm trong danh mục Care & Share để đóng góp vào quỹ dành cho trẻ em có hoàn cảnh khó khăn. Coolmate mong muốn là một cầu nối để viết tiếp những ước mơ con trẻ còn dang dở, hướng tới một tương lai tốt đẹp hơn. ",
                    stock: 300,
                    sales: 200,
                    postedTime: new Date(Date.now()),
                    lastUpdateTime: new Date(Date.now()),
                    category: "ao-thun-tay-ngan",
                },
            },
        ],
        totalPrice: 1000000,
        status: 0,
        phone: "0123",
        paymentMethod: 0,
    };
    let isSuccess = await saveBillAsync(bill);
    console.log(`Save bill result:  ${isSuccess}`);
}
async function getBillTest() {
    let bill = await getBillAsync("12345");
    console.log(`Get bill result: ${JSON.stringify(bill, null, 4)}`);
}
// saveBillTest();
// getBillTest();
// updateBillStatusTest();
//#endregion
