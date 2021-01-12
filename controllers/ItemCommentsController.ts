import { ItemComment } from "../resources/js/Models/comment";
import { ItemCommentModel } from "./Models";

let ItemCommentsController = {
	async getCommentsAysnc(commentedItem: string) {
		try {
			let commentDocs = await ItemCommentModel.find({
				commentedItem: commentedItem,
			})
				.lean()
				.exec();
			let comments = commentDocs.map((val, idx) => {
				return (val as unknown) as ItemComment;
			});

			return comments;
		} catch (err) {
			console.log(`Fail to get comments. %${err}`);
		}
	},
	async makeComment(comment: ItemComment) {
		try {
			let commentDoc = await new ItemCommentModel(comment).save();
		} catch (err) {
			console.log(`Fail to make comment. ${err}`);
		}
	},
};
export { ItemCommentsController };
