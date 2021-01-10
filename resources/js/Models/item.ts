import { Category } from "./category";

export class Item {
	id: string;
	name: string;
	oldPrice?: number;
	price: number;
	imageThumbnail: string;
	imagePaths: string[];
	options?: string[];
	description?: string;
	stock?: number;
	sales?: number;
	postedTime?: Date;
	lastUpdateTime?: Date;

	category?: string;
}

// export { Item };
// module.exports = { Item };
