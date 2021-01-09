const { MongoClient } = require("mongodb");
const url = "mongodb+srv://admin:0123456789@cluster0.2diud.mongodb.net/test?authSource=admin&replicaSet=atlas-37amtr-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
const client = new MongoClient(url);
const dbName = "UGS";
async function delete_Database() {
    try {
        await client.connect();
        const db = client.db(dbName);
        db.dropDatabase();
    }
    finally {
        await client.close();
    }
}
async function delete_Collections(Colname) {
    try {
        await client.connect();
        const db = client.db(dbName);
        db.collection(Colname).drop();
    }
    finally {
        await client.close();
    }
}
<<<<<<< Updated upstream
async function delete_Documents(obj) {
    try {
        await client.connect();
        const db = client.db(dbName);
        const Users_col = db.collection("Users");
        const Items_col = db.collection("Items");
        const Categories_col = db.collection("Categories");
        let objdata = JSON.stringify(obj);
        let obj_JSON = JSON.parse(objdata);
        db.Users_col.remove(obj_JSON);
        db.Items_col.remove(obj_JSON);
        db.Categories_col.remove(obj_JSON);
    }
    finally {
        await client.close();
    }
}
delete_Database();
export {};
=======
function delete_Documents(obj) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const db = client.db(dbName);
            const Users_col = db.collection("Users");
            const Items_col = db.collection("Items");
            const Categories_col = db.collection("Categories");
            let objdata = JSON.stringify(obj);
            let obj_JSON = JSON.parse(objdata);
            Users_col.deleteMany(obj_JSON);
            Items_col.deleteMany(obj_JSON);
            let sub_objdata = objdata.slice(0, -1) + ', "detailName": { "$exists": "true" }}';
            console.log(sub_objdata);
            let sub_objJSON = { category: JSON.parse(sub_objdata) };
            console.log(sub_objJSON);
            Items_col.deleteMany(sub_objJSON);
            Categories_col.deleteMany(obj_JSON);
        }
        finally {
            yield client.close();
        }
    });
}
let obj = {
    cateName: "Shirt"
};
delete_Documents(obj);
>>>>>>> Stashed changes
