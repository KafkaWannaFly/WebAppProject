import mongoose from "mongoose";
import fs from "fs";

import { User } from "../resources/js/Models/user";
import { Bill } from "../resources/js/Models/bill";
import { Item } from "../resources/js/Models/item";

const Schema = mongoose.Schema;
const url =
	"mongodb+srv://admin:0123456789@cluster0.2diud.mongodb.net/usg-clothes?authSource=admin&replicaSet=atlas-37amtr-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

/**
 * Important! Mongoose buffers all the commands until it's connected to the database. This means that you don't have to wait until it connects to MongoDB in order to define models, run queries, etc.
 */
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const collectionList = mongoose.connection.collections;

// ===========================================================================
//#region User Schema
const userSchema = new Schema(
	{
		username: {
			type: "String",
		},
		password: {
			type: "String",
		},
		phone: {
			type: "String",
		},
		email: {
			type: "String",
		},
		userType: {
			type: "Number",
		},
		name: {
			type: "String",
		},
		DoB: {
			type: "Date",
			required: false,
		},
		address: {
			type: "String",
			required: false,
		},
		gender: {
			type: "Boolean",
			required: false,
		},
		purchasedItems: {
			type: ["String"],
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

const UserModel = mongoose.model("User", userSchema);

const usersData: User[] = require("../data/users.json");

function insertUsers(model: any, data: User[]) {
	model
		.insertMany(data)
		.then((val) => {
			console.log(`Write users: ${val}`);
		})
		.catch((err) => {
			console.log(`Error writing users: ${err}`);
		});
}

function dropUsers(model: mongoose.Model<mongoose.Document<any>>) {
	model.db
		.dropCollection("users")
		.then(() => {
			console.log(`Done drop users`);
		})
		.catch((err) => {
			console.log(`Fail to drop users. Error: ${err}`);
		});
}

//#endregion

//#region Bill Schema

const billSchema = new Schema({
	id: {
		type: "Date",
	},
	totalPrice: {
		type: "Number",
	},
	shippingAddress: {
		type: "String",
	},
	purchasedDate: {
		type: "Date",
	},
	billItems: [
		{
			amount: {
				type: "Number",
			},
			item: {
				id: {
					type: "String",
				},
				name: {
					type: "String",
				},
				oldPrice: {
					type: "Number",
				},
				price: {
					type: "Number",
				},
				imageThumbnail: {
					type: "String",
				},
				imagePaths: {
					type: ["String"],
				},
				options: {
					type: ["String"],
				},
				description: {
					type: "String",
				},
				stock: {
					type: "Number",
				},
				sales: {
					type: "Number",
				},
				postedTime: {
					type: "Date",
				},
				lastUpdateTime: {
					type: "Date",
				},
				category: {
					type: "String",
				},
			},
		},
	],
});

const BillModel = mongoose.model("Bill", billSchema);

const billsData: Bill[] = require("../data/bills.json");

function insertBills(
	model: mongoose.Model<mongoose.Document<any>>,
	data: Bill[]
) {
	model
		.insertMany(data)
		.then((val) => {
			console.log(`Done insert bills: ${val}`);
		})
		.catch((err) => {
			console.log(`Fail insert bills. Error: ${err}`);
		});
}

function dropBills(model: mongoose.Model<mongoose.Document<any>>) {
	model.db
		.dropCollection("bills")
		.then(() => {
			console.log(`Done drop bills`);
		})
		.catch((err) => {
			console.log(`Fail to drop bill. Error: ${err}`);
		});
}

//#endregion

//#region Item Schema

const itemSchema = new Schema({
	id: {
		type: "String",
	},
	name: {
		type: "String",
	},
	oldPrice: {
		type: "Number",
		required: false,
	},
	price: {
		type: "Number",
	},
	imageThumbnail: {
		type: "String",
	},
	imagePaths: {
		type: ["String"],
	},
	options: {
		type: ["String"],
	},
	description: {
		type: "String",
	},
	stock: {
		type: "Number",
	},
	sales: {
		type: "Number",
	},
	postedTime: {
		type: "Date",
	},
	lastUpdateTime: {
		type: "Date",
	},
	category: {
		type: "String",
	},
});

const ItemModel = mongoose.model("Item", itemSchema);

const itemsData: Item[] = require("../data/items.json");

function insertItems(
	model: mongoose.Model<mongoose.Document<any>>,
	data: Item[]
) {
	model
		.insertMany(data)
		.then((val) => {
			console.log(`Done insert items: ${val}`);
		})
		.catch((err) => {
			console.log(`Fail insert items. ${err}`);
		});
}

function dropItems(model: mongoose.Model<mongoose.Document<any>>) {
	model.db
		.dropCollection("items")
		.then(() => {
			console.log(`Done drop items`);
		})
		.catch((err) => {
			console.log(`Fail to drop items. ${err}`);
		});
}

//#endregion

// insertUsers(UserModel, usersData);
// insertBills(BillModel, billsData);
// insertItems(ItemModel, itemsData);

// dropUsers(UserModel);
// dropBills(BillModel);
// dropItems(ItemModel);

export { UserModel, BillModel, ItemModel };
