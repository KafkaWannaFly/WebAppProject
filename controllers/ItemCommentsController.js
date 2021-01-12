"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemCommentsController = void 0;
const Models_1 = require("./Models");
let ItemCommentsController = {
    async getCommentsAysnc(commentedItem) {
        try {
            let commentDocs = await Models_1.ItemCommentModel.find({
                commentedItem: commentedItem,
            })
                .lean()
                .exec();
            let comments = commentDocs.map((val, idx) => {
                return val;
            });
            return comments;
        }
        catch (err) {
            console.log(`Fail to get comments. %${err}`);
        }
    },
    async makeComment(comment) {
        try {
            let commentDoc = await new Models_1.ItemCommentModel(comment).save();
        }
        catch (err) {
            console.log(`Fail to make comment. ${err}`);
        }
    },
};
exports.ItemCommentsController = ItemCommentsController;
