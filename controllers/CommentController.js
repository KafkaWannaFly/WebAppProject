"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllComments = exports.getCommentAsync = void 0;
const Models_1 = require("../controllers/Models");
async function getCommentAsync(id) {
    try {
        let commentDocs = await Models_1.ItemCommentModel.find({ commentedItem: id }).exec();
        let comments = commentDocs.map((val, idx) => {
            return val;
        });
        return comments;
    }
    catch (err) {
        console.log(`Fail to get comment. ${err}`);
    }
}
exports.getCommentAsync = getCommentAsync;
async function getAllComments() {
    try {
        let commentsDocs = await Models_1.ItemCommentModel.find({}).lean().exec();
        let comments = commentsDocs.map((val, idx) => {
            return val;
        });
        return comments;
    }
    catch (err) {
        console.log(`Fail to get comments. ${err}`);
    }
}
exports.getAllComments = getAllComments;
