export {}

const { MongoClient } = require("mongodb");

const url = "mongodb+srv://admin:0123456789@cluster0.2diud.mongodb.net/test?authSource=admin&replicaSet=atlas-37amtr-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true"
const client = new MongoClient(url);

const dbName = "UGS";

let item_list = [];

async function find_Documents(obj) {
    try {
        await client.connect();
        const db = client.db(dbName);

        const Users_col = db.collection("Users");
		const Items_col = db.collection("Items"); 
        const Categories_col = db.collection("Categories");
        
        let objdata = JSON.stringify(obj);
        let obj_JSON = JSON.parse((objdata));
        
        Users_col.find(obj_JSON)
        .toArray()
        .then(items => {
            console.log(`Successfully found ${items.length} documents.`)
            if(items.length != 0){
                for(let i = 0; i < items.length; i++){
                    item_list.push(items[i]);
                    console.log(item_list);
                }
            }
        });
        Items_col.find(obj_JSON)
        .toArray()
        .then(items => {
            console.log(`Successfully found ${items.length} documents.`)
            if(items.length != 0){
                for(let i = 0; i < items.length; i++){
                    item_list.push(items[i]);
                    console.log(item_list);
                }
            }
        });
        Categories_col.find(obj_JSON)
        .toArray()
        .then(items => {
            console.log(`Successfully found ${items.length} documents.`)
            if(items.length != 0){
                for(let i = 0; i < items.length; i++){
                    item_list.push(items[i]);
                    console.log(item_list);
                }
            }
        });
    }
    finally {
		await client.close();
	}
}

let obj = {
    id: "0 - 0 - 0"
}

find_Documents(obj);
console.log(item_list);