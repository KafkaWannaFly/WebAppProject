import { BillModel, ItemModel, UserModel } from "../controllers/Models";
import { Item } from "../resources/js/Models/item";
import { User } from "../resources/js/Models/user";

//#region User query
async function getUserAsync(username: string): Promise<User> {
	try {
		let userDoc = await UserModel.findOne({ username: username }).exec();
		return userDoc.toObject() as User;
	} catch (err) {
		console.warn(`Fail getUserAsync. ${err}`);
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

function registerWithLameUserObjectTest() {
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

// registerNormallyTest();

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
getItemsByUnExistedCateTest();

//#endregion ItemTest

//#endregion
