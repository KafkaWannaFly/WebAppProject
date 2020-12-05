import { Category } from "./category";

export class Item {
	id: string;
	name: string;
	price: number;
	imagePath: string[];
	options: string[];
	description: string;
	stock: number;
	postedTime: Date;

	category: Category;

	constructor() {}
}

// export { Item };
// module.exports = { Item };
