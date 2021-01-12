"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { ItemCommentModel } from "../controllers/Models";
const ItemCommentsController_1 = require("../controllers/ItemCommentsController");
const router = express_1.default.Router();
const ItemController = __importStar(require("../controllers/ItemController"));
router.get("/", async (req, res) => {
    let id = req.query["id"].toString();
    let item = await ItemController.getItemAsync(id);
    // let commentDocs = await ItemCommentModel.find({ commentedItem: id })
    // 	.lean()
    // 	.exec();
    // let comments = commentDocs.map((val, idx) => {
    // 	return (val as unknown) as ItemComment;
    // });
    let comments = await ItemCommentsController_1.ItemCommentsController.getCommentsAysnc(id);
    // console.log(`Comments: ${JSON.stringify(comments, null, 4)}`);
    // Have no idea why we have to go back 1 level but it do the job
    for (let i = 0; i < item.imagePaths.length; i++) {
        item.imagePaths[i] = "../" + item.imagePaths[i];
    }
    res.render("product-item", {
        layout: "product-item-layout",
        Data: {
            Item: item,
            ItemComments: comments,
        },
    });
});
router.post("/", async (req, res) => {
    // console.log(`Post req: ${JSON.stringify(req.body, null, 4)}`);
    let id = req.query["id"].toString();
    let name = req.body["comment-name"].toString();
    let email = req.body["comment-email"].toString();
    let content = req.body["comment-content"].toString();
    let comment = {
        commentedItem: id,
        personName: name,
        email: email,
        date: new Date(Date.now()),
        content: content,
    };
    // let commentDoc = await new ItemCommentModel(comment).save();
    await ItemCommentsController_1.ItemCommentsController.makeComment(comment);
    // console.log(`Post comment: ${JSON.stringify(commentDoc, null, 4)}`);
    res.redirect("back");
    // res.redirect(`/list-product/item?id=${id}`);
});
module.exports = router;
// export default router;
