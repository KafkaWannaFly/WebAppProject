export class ItemComment {
	personName: string;
	email: string;
	content: string;
	date: Date = new Date(Date.now());
	commentedItem: string; // id of that item
}
