import express from "express";
import fs from "fs";

import { ItemComment } from "../resources/js/Models/comment";
// import { ItemCommentModel } from "../controllers/Models";
import { ItemCommentsController } from "../controllers/ItemCommentsController";

const router = express.Router();

import * as ItemController from "../controllers/ItemController";

router.get("/", async (req, res) => {
	let id = req.query["id"].toString();
	let item = await ItemController.getItemAsync(id);

	// let commentDocs = await ItemCommentModel.find({ commentedItem: id })
	// 	.lean()
	// 	.exec();

	// let comments = commentDocs.map((val, idx) => {
	// 	return (val as unknown) as ItemComment;
	// });

	let comments = await ItemCommentsController.getCommentsAysnc(id);

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

	let comment: ItemComment = {
		commentedItem: id,
		personName: name,
		email: email,
		date: new Date(Date.now()),
		content: content,
	};

	// let commentDoc = await new ItemCommentModel(comment).save();
	await ItemCommentsController.makeComment(comment);

	// console.log(`Post comment: ${JSON.stringify(commentDoc, null, 4)}`);

	res.redirect("back");
	// res.redirect(`/list-product/item?id=${id}`);
});


router.get("/rate", (req, res) => {
	let id = req.query["id"].toString();
	res.redirect(`/list-product/item?id=${id}#rate`);
});


module.exports = router;
// export default router;
