import { Item } from "./item";
import { User } from "./user";

interface BillItem {
	item: Item;
	amount: number;
}

class Bill {
	id: string;
	billItems: BillItem[];
	totalPrice?: number;
	purchasedDate: Date;
	customer?: User;
	shippingAddress: string;
}

export { Bill };
