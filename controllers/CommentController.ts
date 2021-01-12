import { ItemComment } from "../resources/js/Models/comment";
import { ItemCommentModel } from "../controllers/Models";
import e from "express";

async function getCommentAsync(id: string) {
	try {
		let commentDocs = await ItemCommentModel.find({ commentedItem: id }).exec();
		let comments = commentDocs.map((val, idx) => {
			return (val as unknown) as ItemComment;
		});
		return comments;
	} catch (err) {
		console.log(`Fail to get comment. ${err}`);
	}
}

async function getAllComments() {
	try {
		let commentsDocs = await ItemCommentModel.find({}).lean().exec();
		let comments = commentsDocs.map((val, idx) => {
			return val as ItemComment;
		});

		return comments;
	} catch (err) {
		console.log(`Fail to get comments. ${err}`);
	}
}

export { getCommentAsync, getAllComments };
