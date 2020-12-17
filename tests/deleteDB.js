"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { MongoClient } = require("mongodb");
const url = "mongodb+srv://admin:0123456789@cluster0.2diud.mongodb.net/test?authSource=admin&replicaSet=atlas-37amtr-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";
const client = new MongoClient(url);
const dbName = "UGS";
async function delete_UGS() {
    try {
        await client.connect();
        const db = client.db(dbName);
        db.dropDatabase();
    }
    finally {
        await client.close();
    }
}
async function delete_Categories() {
    try {
        await client.connect();
        const db = client.db(dbName);
        db.collection("Categories").drop();
    }
    finally {
        await client.close();
    }
}
async function delete_Users() {
    try {
        await client.connect();
        const db = client.db(dbName);
        db.collection("Users").drop();
    }
    finally {
        await client.close();
    }
}
async function delete_Items() {
    try {
        await client.connect();
        const db = client.db(dbName);
        db.collection("Items").drop();
    }
    finally {
        await client.close();
    }
}
delete_UGS();
