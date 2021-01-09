var usernames = ["abc", "def", "ghi", "jkl", "mno"];
var names = ["John", "James", "Jack", "Rose", "Mia"];
const loremIpsum = require("lorem-ipsum").loremIpsum;
const { MongoClient } = require("mongodb");
const url = "mongodb+srv://admin:0123456789@cluster0.2diud.mongodb.net/test?authSource=admin&replicaSet=atlas-37amtr-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
const client = new MongoClient(url);
const dbName = "UGS";
async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);
        const Users_col = db.collection("Users");
        const Items_col = db.collection("Items");
        const Categories_col = db.collection("Categories");
        for (let i = 0; i < usernames.length; i++) {
            let User = {
                username: usernames[i],
                password: "0123456789",
                email: usernames[i] + "@demomail.com",
                name: names[i],
                DoB: "01/01/2000",
                gender: "",
                address: "demo address",
                phone: "0123456789",
                height: 1.7,
                weight: 50,
                UserType: "normal",
            };
<<<<<<< Updated upstream
            if (User.name == "John" || User.name == "James" || User.name == "Jack") {
                User.gender = "male";
                let Userdata = JSON.stringify(User);
                let Userobj = JSON.parse(Userdata);
                let p = await Users_col.insertOne(Userobj);
            }
            else {
                User.gender = "female";
                let Userdata = JSON.stringify(User);
                let Userobj = JSON.parse(Userdata);
                let p = await Users_col.insertOne(Userobj);
            }
        }
        let Admin = {
            username: "admin",
            password: "0123456789",
            email: "admin@demomail.com",
            name: "Admin",
            DoB: "01/01/2000",
            gender: "",
            address: "demo address",
            phone: "0123456789",
            height: 1.7,
            weight: 50,
            UserType: "shopEmployee",
        };
        let Admindata = JSON.stringify(Admin);
        let Adminobj = JSON.parse(Admindata);
        let p = await Users_col.insertOne(Adminobj);
        var catergoryNames = ["Shirt", "Pant", "Sock", "Accessory"];
        var ShirtCategory = [
            "Short sleeve T-shirt",
            "Long sleeve T-shirt",
            "Tank top",
            "Shirt",
        ];
        var PantCategory = ["Short", "Jean", "Kaki", "Jogger"];
        var SockCategory = ["Ankle sock", "Crew sock"];
        var AccessoryCategory = ["Belt", "Wallet", "Face mask", "Hat"];
        var ShortSleeveTShirts = 10;
        var LongSleeveTShirts = 10;
        var TankTops = 10;
        var Shirts = 10;
        var Shorts = 10;
        var Jeans = 10;
        var Kakis = 10;
        var Joggers = 10;
        var AnkleSocks = 10;
        var CrewSocks = 10;
        var Belts = 10;
        var Wallets = 10;
        var FaceMasks = 10;
        var Hats = 10;
        for (let i = 0; i < catergoryNames.length; i++) {
            if (i == 0) {
                for (let j = 0; j < ShirtCategory.length; j++) {
                    let Category = {
                        name: catergoryNames[i],
                        detailName: ShirtCategory[j],
                    };
                    let Categorydata = JSON.stringify(Category);
                    let Categoryobj = JSON.parse(Categorydata);
                    let p = await Categories_col.insertOne(Categoryobj);
                    if (j == 0) {
                        for (let k = 0; k < ShortSleeveTShirts; k++) {
                            let Item = {
                                id: i.toString() + " - " + j.toString() + " - " + k.toString(),
                                name: loremIpsum({
                                    count: Math.floor(Math.random() * (3 - 1 + 1) + 1),
                                    units: 'words',
                                    format: 'plain'
                                }),
                                price: Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                                description: loremIpsum({
                                    count: 1,
                                    units: 'paragraphs',
                                    sentenceLowerBound: 5,
                                    sentenceUpperBound: 10,
                                    paragraphLowerBound: 1,
                                    paragraphUpperBound: 3,
                                    format: 'plain'
                                }),
                                stock: Math.floor(Math.random() * (500 - 0 + 1) + 0),
                                postedTime: "01/01/2020",
                                category: Category,
                            };
                            let Itemdata = JSON.stringify(Item);
                            let Itemobj = JSON.parse(Itemdata);
                            let p = await Items_col.insertOne(Itemobj);
=======
            let Admindata = JSON.stringify(Admin);
            let Adminobj = JSON.parse(Admindata);
            let p = yield Users_col.insertOne(Adminobj);
            var catergoryNames = ["Shirt", "Pant", "Sock", "Accessory"];
            var ShirtCategory = [
                "Short sleeve T-shirt",
                "Long sleeve T-shirt",
                "Tank top",
                "Shirt",
            ];
            var PantCategory = ["Short", "Jean", "Kaki", "Jogger"];
            var SockCategory = ["Ankle sock", "Crew sock"];
            var AccessoryCategory = ["Belt", "Wallet", "Face mask", "Hat"];
            var ShortSleeveTShirts = 10;
            var LongSleeveTShirts = 10;
            var TankTops = 10;
            var Shirts = 10;
            var Shorts = 10;
            var Jeans = 10;
            var Kakis = 10;
            var Joggers = 10;
            var AnkleSocks = 10;
            var CrewSocks = 10;
            var Belts = 10;
            var Wallets = 10;
            var FaceMasks = 10;
            var Hats = 10;
            for (let i = 0; i < catergoryNames.length; i++) {
                if (i == 0) {
                    for (let j = 0; j < ShirtCategory.length; j++) {
                        let Category = {
                            cateName: catergoryNames[i],
                            detailName: ShirtCategory[j],
                        };
                        let Categorydata = JSON.stringify(Category);
                        let Categoryobj = JSON.parse(Categorydata);
                        let p = yield Categories_col.insertOne(Categoryobj);
                        if (j == 0) {
                            for (let k = 0; k < ShortSleeveTShirts; k++) {
                                let Item = {
                                    id: i.toString() + " - " + j.toString() + " - " + k.toString(),
                                    name: loremIpsum({
                                        count: Math.floor(Math.random() * (3 - 1 + 1) + 1),
                                        units: 'words',
                                        format: 'plain'
                                    }),
                                    price: Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                                    description: loremIpsum({
                                        count: 1,
                                        units: 'paragraphs',
                                        sentenceLowerBound: 5,
                                        sentenceUpperBound: 10,
                                        paragraphLowerBound: 1,
                                        paragraphUpperBound: 3,
                                        format: 'plain'
                                    }),
                                    stock: Math.floor(Math.random() * (500 - 0 + 1) + 0),
                                    postedTime: "01/01/2020",
                                    category: Category,
                                };
                                let Itemdata = JSON.stringify(Item);
                                let Itemobj = JSON.parse(Itemdata);
                                let p = yield Items_col.insertOne(Itemobj);
                            }
>>>>>>> Stashed changes
                        }
                    }
                    if (j == 1) {
                        for (let k = 0; k < LongSleeveTShirts; k++) {
                            let Item = {
                                id: i.toString() + " - " + j.toString() + " - " + k.toString(),
                                name: loremIpsum({
                                    count: Math.floor(Math.random() * (3 - 1 + 1) + 1),
                                    units: 'words',
                                    format: 'plain'
                                }),
                                price: Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                                description: loremIpsum({
                                    count: 1,
                                    units: 'paragraphs',
                                    sentenceLowerBound: 5,
                                    sentenceUpperBound: 10,
                                    paragraphLowerBound: 1,
                                    paragraphUpperBound: 3,
                                    format: 'plain'
                                }),
                                stock: Math.floor(Math.random() * (500 - 0 + 1) + 0),
                                postedTime: "01/01/2020",
                                category: Category,
                            };
                            let Itemdata = JSON.stringify(Item);
                            let Itemobj = JSON.parse(Itemdata);
                            let p = await Items_col.insertOne(Itemobj);
                        }
                    }
                    if (j == 2) {
                        for (let k = 0; k < TankTops; k++) {
                            let Item = {
                                id: i.toString() + " - " + j.toString() + " - " + k.toString(),
                                name: loremIpsum({
                                    count: Math.floor(Math.random() * (3 - 1 + 1) + 1),
                                    units: 'words',
                                    format: 'plain'
                                }),
                                price: Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                                description: loremIpsum({
                                    count: 1,
                                    units: 'paragraphs',
                                    sentenceLowerBound: 5,
                                    sentenceUpperBound: 10,
                                    paragraphLowerBound: 1,
                                    paragraphUpperBound: 3,
                                    format: 'plain'
                                }),
                                stock: Math.floor(Math.random() * (500 - 0 + 1) + 0),
                                postedTime: "01/01/2020",
                                category: Category,
                            };
                            let Itemdata = JSON.stringify(Item);
                            let Itemobj = JSON.parse(Itemdata);
                            let p = await Items_col.insertOne(Itemobj);
                        }
                    }
                    if (j == 3) {
                        for (let k = 0; k < Shirts; k++) {
                            let Item = {
                                id: i.toString() + " - " + j.toString() + " - " + k.toString(),
                                name: loremIpsum({
                                    count: Math.floor(Math.random() * (3 - 1 + 1) + 1),
                                    units: 'words',
                                    format: 'plain'
                                }),
                                price: Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                                description: loremIpsum({
                                    count: 1,
                                    units: 'paragraphs',
                                    sentenceLowerBound: 5,
                                    sentenceUpperBound: 10,
                                    paragraphLowerBound: 1,
                                    paragraphUpperBound: 3,
                                    format: 'plain'
                                }),
                                stock: Math.floor(Math.random() * (500 - 0 + 1) + 0),
                                postedTime: "01/01/2020",
                                category: Category,
                            };
                            let Itemdata = JSON.stringify(Item);
                            let Itemobj = JSON.parse(Itemdata);
                            let p = await Items_col.insertOne(Itemobj);
                        }
                    }
                }
            }
            if (i == 1) {
                for (let j = 0; j < PantCategory.length; j++) {
                    let Category = {
                        name: catergoryNames[i],
                        detailName: PantCategory[j],
                    };
                    let Categorydata = JSON.stringify(Category);
                    let Categoryobj = JSON.parse(Categorydata);
                    let p = await Categories_col.insertOne(Categoryobj);
                    if (j == 0) {
                        for (let k = 0; k < Shorts; k++) {
                            let Item = {
                                id: i.toString() + " - " + j.toString() + " - " + k.toString(),
                                name: loremIpsum({
                                    count: Math.floor(Math.random() * (3 - 1 + 1) + 1),
                                    units: 'words',
                                    format: 'plain'
                                }),
                                price: Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                                description: loremIpsum({
                                    count: 1,
                                    units: 'paragraphs',
                                    sentenceLowerBound: 5,
                                    sentenceUpperBound: 10,
                                    paragraphLowerBound: 1,
                                    paragraphUpperBound: 3,
                                    format: 'plain'
                                }),
                                stock: Math.floor(Math.random() * (500 - 0 + 1) + 0),
                                postedTime: "01/01/2020",
                                category: Category,
                            };
                            let Itemdata = JSON.stringify(Item);
                            let Itemobj = JSON.parse(Itemdata);
                            let p = await Items_col.insertOne(Itemobj);
                        }
                    }
                    if (j == 1) {
                        for (let k = 0; k < Jeans; k++) {
                            let Item = {
                                id: i.toString() + " - " + j.toString() + " - " + k.toString(),
                                name: loremIpsum({
                                    count: Math.floor(Math.random() * (3 - 1 + 1) + 1),
                                    units: 'words',
                                    format: 'plain'
                                }),
                                price: Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                                description: loremIpsum({
                                    count: 1,
                                    units: 'paragraphs',
                                    sentenceLowerBound: 5,
                                    sentenceUpperBound: 10,
                                    paragraphLowerBound: 1,
                                    paragraphUpperBound: 3,
                                    format: 'plain'
                                }),
                                stock: Math.floor(Math.random() * (500 - 0 + 1) + 0),
                                postedTime: "01/01/2020",
                                category: Category,
                            };
                            let Itemdata = JSON.stringify(Item);
                            let Itemobj = JSON.parse(Itemdata);
                            let p = await Items_col.insertOne(Itemobj);
                        }
                    }
                    if (j == 2) {
                        for (let k = 0; k < Kakis; k++) {
                            let Item = {
                                id: i.toString() + " - " + j.toString() + " - " + k.toString(),
                                name: loremIpsum({
                                    count: Math.floor(Math.random() * (3 - 1 + 1) + 1),
                                    units: 'words',
                                    format: 'plain'
                                }),
                                price: Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                                description: loremIpsum({
                                    count: 1,
                                    units: 'paragraphs',
                                    sentenceLowerBound: 5,
                                    sentenceUpperBound: 10,
                                    paragraphLowerBound: 1,
                                    paragraphUpperBound: 3,
                                    format: 'plain'
                                }),
                                stock: Math.floor(Math.random() * (500 - 0 + 1) + 0),
                                postedTime: "01/01/2020",
                                category: Category,
                            };
                            let Itemdata = JSON.stringify(Item);
                            let Itemobj = JSON.parse(Itemdata);
                            let p = await Items_col.insertOne(Itemobj);
                        }
                    }
                    if (j == 3) {
                        for (let k = 0; k < Joggers; k++) {
                            let Item = {
                                id: i.toString() + " - " + j.toString() + " - " + k.toString(),
                                name: loremIpsum({
                                    count: Math.floor(Math.random() * (3 - 1 + 1) + 1),
                                    units: 'words',
                                    format: 'plain'
                                }),
                                price: Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                                description: loremIpsum({
                                    count: 1,
                                    units: 'paragraphs',
                                    sentenceLowerBound: 5,
                                    sentenceUpperBound: 10,
                                    paragraphLowerBound: 1,
                                    paragraphUpperBound: 3,
                                    format: 'plain'
                                }),
                                stock: Math.floor(Math.random() * (500 - 0 + 1) + 0),
                                postedTime: "01/01/2020",
                                category: Category,
                            };
                            let Itemdata = JSON.stringify(Item);
                            let Itemobj = JSON.parse(Itemdata);
                            let p = await Items_col.insertOne(Itemobj);
                        }
                    }
                }
            }
            if (i == 2) {
                for (let j = 0; j < SockCategory.length; j++) {
                    let Category = {
                        name: catergoryNames[i],
                        detailName: SockCategory[j],
                    };
                    let Categorydata = JSON.stringify(Category);
                    let Categoryobj = JSON.parse(Categorydata);
                    let p = await Categories_col.insertOne(Categoryobj);
                    if (j == 0) {
                        for (let k = 0; k < AnkleSocks; k++) {
                            let Item = {
                                id: i.toString() + " - " + j.toString() + " - " + k.toString(),
                                name: loremIpsum({
                                    count: Math.floor(Math.random() * (3 - 1 + 1) + 1),
                                    units: 'words',
                                    format: 'plain'
                                }),
                                price: Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                                description: loremIpsum({
                                    count: 1,
                                    units: 'paragraphs',
                                    sentenceLowerBound: 5,
                                    sentenceUpperBound: 10,
                                    paragraphLowerBound: 1,
                                    paragraphUpperBound: 3,
                                    format: 'plain'
                                }),
                                stock: Math.floor(Math.random() * (500 - 0 + 1) + 0),
                                postedTime: "01/01/2020",
                                category: Category,
                            };
                            let Itemdata = JSON.stringify(Item);
                            let Itemobj = JSON.parse(Itemdata);
                            let p = await Items_col.insertOne(Itemobj);
                        }
                    }
                    if (j == 1) {
                        for (let k = 0; k < CrewSocks; k++) {
                            let Item = {
                                id: i.toString() + " - " + j.toString() + " - " + k.toString(),
                                name: loremIpsum({
                                    count: Math.floor(Math.random() * (3 - 1 + 1) + 1),
                                    units: 'words',
                                    format: 'plain'
                                }),
                                price: Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                                description: loremIpsum({
                                    count: 1,
                                    units: 'paragraphs',
                                    sentenceLowerBound: 5,
                                    sentenceUpperBound: 10,
                                    paragraphLowerBound: 1,
                                    paragraphUpperBound: 3,
                                    format: 'plain'
                                }),
                                stock: Math.floor(Math.random() * (500 - 0 + 1) + 0),
                                postedTime: "01/01/2020",
                                category: Category,
                            };
                            let Itemdata = JSON.stringify(Item);
                            let Itemobj = JSON.parse(Itemdata);
                            let p = await Items_col.insertOne(Itemobj);
                        }
                    }
                }
            }
            if (i == 3) {
                for (let j = 0; j < AccessoryCategory.length; j++) {
                    let Category = {
                        name: catergoryNames[i],
                        detailName: AccessoryCategory[j],
                    };
                    let Categorydata = JSON.stringify(Category);
                    let Categoryobj = JSON.parse(Categorydata);
                    let p = await Categories_col.insertOne(Categoryobj);
                    if (j == 0) {
                        for (let k = 0; k < Belts; k++) {
                            let Item = {
                                id: i.toString() + " - " + j.toString() + " - " + k.toString(),
                                name: loremIpsum({
                                    count: Math.floor(Math.random() * (3 - 1 + 1) + 1),
                                    units: 'words',
                                    format: 'plain'
                                }),
                                price: Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                                description: loremIpsum({
                                    count: 1,
                                    units: 'paragraphs',
                                    sentenceLowerBound: 5,
                                    sentenceUpperBound: 10,
                                    paragraphLowerBound: 1,
                                    paragraphUpperBound: 3,
                                    format: 'plain'
                                }),
                                stock: Math.floor(Math.random() * (500 - 0 + 1) + 0),
                                postedTime: "01/01/2020",
                                category: Category,
                            };
                            let Itemdata = JSON.stringify(Item);
                            let Itemobj = JSON.parse(Itemdata);
                            let p = await Items_col.insertOne(Itemobj);
                        }
                    }
                    if (j == 1) {
                        for (let k = 0; k < Wallets; k++) {
                            let Item = {
                                id: i.toString() + " - " + j.toString() + " - " + k.toString(),
                                name: loremIpsum({
                                    count: Math.floor(Math.random() * (3 - 1 + 1) + 1),
                                    units: 'words',
                                    format: 'plain'
                                }),
                                price: Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                                description: loremIpsum({
                                    count: 1,
                                    units: 'paragraphs',
                                    sentenceLowerBound: 5,
                                    sentenceUpperBound: 10,
                                    paragraphLowerBound: 1,
                                    paragraphUpperBound: 3,
                                    format: 'plain'
                                }),
                                stock: Math.floor(Math.random() * (500 - 0 + 1) + 0),
                                postedTime: "01/01/2020",
                                category: Category,
                            };
                            let Itemdata = JSON.stringify(Item);
                            let Itemobj = JSON.parse(Itemdata);
                            let p = await Items_col.insertOne(Itemobj);
                        }
                    }
                    if (j == 2) {
                        for (let k = 0; k < FaceMasks; k++) {
                            let Item = {
                                id: i.toString() + " - " + j.toString() + " - " + k.toString(),
                                name: loremIpsum({
                                    count: Math.floor(Math.random() * (3 - 1 + 1) + 1),
                                    units: 'words',
                                    format: 'plain'
                                }),
                                price: Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                                description: loremIpsum({
                                    count: 1,
                                    units: 'paragraphs',
                                    sentenceLowerBound: 5,
                                    sentenceUpperBound: 10,
                                    paragraphLowerBound: 1,
                                    paragraphUpperBound: 3,
                                    format: 'plain'
                                }),
                                stock: Math.floor(Math.random() * (500 - 0 + 1) + 0),
                                postedTime: "01/01/2020",
                                category: Category,
                            };
                            let Itemdata = JSON.stringify(Item);
                            let Itemobj = JSON.parse(Itemdata);
                            let p = await Items_col.insertOne(Itemobj);
                        }
                    }
                    if (j == 3) {
                        for (let k = 0; k < Hats; k++) {
                            let Item = {
                                id: i.toString() + " - " + j.toString() + " - " + k.toString(),
                                name: loremIpsum({
                                    count: Math.floor(Math.random() * (3 - 1 + 1) + 1),
                                    units: 'words',
                                    format: 'plain'
                                }),
                                price: Math.floor(Math.random() * (300000 - 250000 + 1) + 250000),
                                description: loremIpsum({
                                    count: 1,
                                    units: 'paragraphs',
                                    sentenceLowerBound: 5,
                                    sentenceUpperBound: 10,
                                    paragraphLowerBound: 1,
                                    paragraphUpperBound: 3,
                                    format: 'plain'
                                }),
                                stock: Math.floor(Math.random() * (500 - 0 + 1) + 0),
                                postedTime: "01/01/2020",
                                category: Category,
                            };
                            let Itemdata = JSON.stringify(Item);
                            let Itemobj = JSON.parse(Itemdata);
                            let p = await Items_col.insertOne(Itemobj);
                        }
                    }
                }
            }
        }
    }
    finally {
        await client.close();
    }
}
run();
