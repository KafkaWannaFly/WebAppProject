import { Item } from "./item";
import { User } from "./user";

interface BillItem {
	item: Item;
	amount: number;
}

class Bill {
	id: string = Date.now().toString(36) + Math.random().toString(36).substr(2);
	billItems: BillItem[];
	totalPrice?: number;
	purchasedDate: Date = new Date();
	customer?: User;
	shippingAddress: string = "";
}

export { Bill, BillItem };
