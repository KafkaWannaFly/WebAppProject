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
//#endregion
const billSchema = new Schema({
    id: {
        type: "String",
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
    paymentMethod: {
        type: "Number",
    },
    phone: {
        type: "String",
    },
    notes: {
        type: "String",
    },
    status: {
        type: "Number",
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
