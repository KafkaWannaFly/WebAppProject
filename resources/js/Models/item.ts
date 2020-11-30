import { Category } from "./category";

class Item {
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

export { Item };
