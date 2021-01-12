import { ItemComment } from "../resources/js/Models/comment";
import { ItemCommentModel } from "../controllers/Models";

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

export {
	getCommentAsync
};