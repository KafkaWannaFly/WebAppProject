"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemModel = exports.BillModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const url = "mongodb+srv://admin:0123456789@cluster0.2diud.mongodb.net/usg-clothes?authSource=admin&replicaSet=atlas-37amtr-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
/**
 * Important! Mongoose buffers all the commands until it's connected to the database. This means that you don't have to wait until it connects to MongoDB in order to define models, run queries, etc.
 */
mongoose_1.default.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const collectionList = mongoose_1.default.connection.collections;
// ===========================================================================
//#region User Schema
const userSchema = new Schema({
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
}, {
    timestamps: true,
});
const UserModel = mongoose_1.default.model("User", userSchema);
exports.UserModel = UserModel;
const usersData = require("../data/users.json");
function insertUsers(model, data) {
    model
        .insertMany(data)
        .then((val) => {
        console.log(`Write users: ${val}`);
    })
        .catch((err) => {
        console.log(`Error writing users: ${err}`);
    });
}
function dropUsers(model) {
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
const BillModel = mongoose_1.default.model("Bill", billSchema);
exports.BillModel = BillModel;
const billsData = require("../data/bills.json");
function insertBills(model, data) {
    model
        .insertMany(data)
        .then((val) => {
        console.log(`Done insert bills: ${val}`);
    })
        .catch((err) => {
        console.log(`Fail insert bills. Error: ${err}`);
    });
}
function dropBills(model) {
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
const ItemModel = mongoose_1.default.model("Item", itemSchema);
exports.ItemModel = ItemModel;
const itemsData = require("../data/items.json");
function insertItems(model, data) {
    model
        .insertMany(data)
        .then((val) => {
        console.log(`Done insert items: ${val}`);
    })
        .catch((err) => {
        console.log(`Fail insert items. ${err}`);
    });
}
function dropItems(model) {
    model.db
        .dropCollection("items")
        .then(() => {
        console.log(`Done drop items`);
    })
        .catch((err) => {
        console.log(`Fail to drop items. ${err}`);
    });
}
