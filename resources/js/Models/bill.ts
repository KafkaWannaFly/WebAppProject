import { Item } from "./item";
import { User } from "./user";

interface BillItem {
	item: Item;
	amount: number;
}

enum PaymentMethod {
	cod,
	momo,
	vnpay,
	zalopay
}

enum Status {
	waiting,
	shipping,
	complete
}

class Bill {
	id: string = Date.now().toString(36) + Math.random().toString(36).substr(2);
	billItems: BillItem[];
	totalPrice?: number;
	purchasedDate: Date = new Date();
	phone: string;
	customer?: User;
	shippingAddress: string = "";
	paymentMethod: PaymentMethod;
	notes: string = "";
	status:Status 
}

export { Bill, BillItem };
