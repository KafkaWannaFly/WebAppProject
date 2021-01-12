import { BillModel, ItemModel, UserModel } from "../controllers/Models";
import { Bill } from "../resources/js/Models/bill";
import { Item } from "../resources/js/Models/item";
import { User } from "../resources/js/Models/user";

enum PaymentMethod {
	cod,
	momo,
	vnpay,
	zalopay,
}

enum Status {
	waiting,
	shipping,
	complete,
}

//#region User query
async function getUserAsync(username: string): Promise<User> {
	try {
		let userDoc = await UserModel.findOne({ username: username }).exec();
		return userDoc.toObject() as User;
	} catch (err) {
		console.warn(`Fail getUserAsync. ${err}`);
	}
}

async function getAllUsers() {
	try {
		let userDocs = await UserModel.find({}).exec();
		let users: User[] = userDocs.map((val, idx) => {
			return (val as unknown) as User;
		});

		return users;
	} catch (err) {
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
async function registerUserAsync(user: User): Promise<boolean> {
	try {
		let existedUser = await getUserAsync(user.username);
		if (existedUser !== undefined) {
			return false;
		}

		let userModel = new UserModel(user);
		await userModel.save();

		return true;
	} catch (err) {
		console.warn(`Fail registerUserAsync. ${err}`);
	}
}

async function updateUserAsync(username: string, newValue: User) {
	try {
		let updatedUserDoc = await UserModel.findOneAndUpdate(
			{ username: username },
			newValue,
			{ new: true, useFindAndModify: false }
		);

		return (updatedUserDoc as unknown) as User;
	} catch (err) {
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
	let registeredUser: User = {
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
async function getItemAsync(id: string): Promise<Item> {
	try {
		let itemDoc = await ItemModel.findOne({ id: id }).exec();
		return itemDoc.toObject() as Item;
	} catch (err) {
		console.log(`Fail to getItemAsync. ${err}`);
	}
}

async function getAllItemsAsync() {
	try {
		let itemDocs = await ItemModel.find({}).exec();
		let items = itemDocs.map((val, idx) => {
			return (val as unknown) as Item;
		});

		return items;
	} catch (err) {
		console.log(`Fail to getAllItemsAsync. ${err}`);
	}
}

/**
 * Get the top highest sale items
 * @param amount amount of top items
 * @returns
 */
async function getTopSaleItemsAsync(amount: number) {
	try {
		let items = await getAllItemsAsync();

		items.sort((a, b) => {
			return a.sales - b.sales;
		});

		return items.slice(0, amount);
	} catch (err) {
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
async function getItemsByCategory(category: string) {
	try {
		let itemDocs = await ItemModel.find({ category: category }).exec();
		let items = itemDocs.map((val, idx) => {
			return (val as unknown) as Item;
		});

		return items;
	} catch (err) {
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
	let items: Item[] = await getAllItemsAsync();
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

async function saveBillAsync(bill: Bill) {
	try {
		let billModel = new BillModel(bill);
		let billDoc = await billModel.save();

		return true;
	} catch (err) {
		console.log(`Fail to save bill. ${err}`);
		return false;
	}
}

async function getBillAsync(billId: string) {
	try {
		let billDoc = await BillModel.findOne({ id: billId }).exec();
		return billDoc.toObject() as Bill;
	} catch (err) {
		console.log(`Fail to get bill. ${err}`);
	}
}

/**
 * findOneAndUpdate
 * @param billId id
 * @param status new status
 * @returns Bill object after update
 */
async function updateBillStatus(billId: string, status: Status) {
	try {
		// let bill = await getBillAsync(billId);
		// bill.status = status;

		let updatedBill = await BillModel.findOneAndUpdate(
			{ id: billId },
			{ status: status },
			{ new: true, useFindAndModify: false }
		);
		return updatedBill;
	} catch (err) {
		console.log(`Fail to update bill status. ${err}`);
	}
}

async function updateBillStatusTest() {
	// let bill = await getBillAsync("12345");
	let updatedBill = await updateBillStatus("12345", Status.shipping);
	console.log(`Update bill result: ${updatedBill}`);
}

async function saveBillTest() {
	let bill: Bill = {
		id: "12345",
		purchasedDate: new Date(Date.now()),
		shippingAddress: "VN",
		billItems: [
			{
				amount: 1,
				item: {
					id: "Acrq4g0N7ZYCeEFO1FvD",
					name:
						"Áo thun nam Cotton Compact phiên bản Premium in Care&Share màu trắng",
					oldPrice: 259000,
					price: 221000,
					imageThumbnail:
						"resources/img/product/ao-thun-ngan-tay/careshare_ao_trang_1_10_550x623.jpg",
					imagePaths: [
						"resources/img/product/ao-thun-ngan-tay/careshare_ao_trang_1_10_550x623.jpg",
						"resources/img/product/ao-thun-ngan-tay/2L6A3118_81_550x623.jpg",
						"resources/img/product/ao-thun-ngan-tay/2L6A3120_44_550x623.jpg",
					],
					options: ["S", "M", "L", "XL"],
					description:
						"Hiểu một cách đơn giản, Care & Share: For A Better Childhood là một chương trình được xây dựng và duy trì bởi USG nhằm góp sức mình giúp đỡ những trẻ em kém may mắn, giúp các em đến trường và có cuộc sống tốt hơn. Coolmate cam kết sẽ dành 10% doanh thu từ tất cả những sản phẩm trong danh mục Care & Share để đóng góp vào quỹ dành cho trẻ em có hoàn cảnh khó khăn. Coolmate mong muốn là một cầu nối để viết tiếp những ước mơ con trẻ còn dang dở, hướng tới một tương lai tốt đẹp hơn. ",
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

//#region ItemComment

//#endregion
