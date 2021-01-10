import { Item } from "./item";

interface BillItem {
	item: Item;
	amount: number;
}

enum PaymentMethod {
	cod,
	momo,
	vnpay,
	zalopay,
}

enum Status {
	waiting,
	shipping,
	complete,
}

class Bill {
	id: string;
	billItems: BillItem[];
	totalPrice?: number;
	purchasedDate: Date = new Date();
	phone?: string;
	customerID?: string;
	shippingAddress: string = "";
	paymentMethod: PaymentMethod;
	notes?: string = "";
	status: Status;
}

export { Bill, BillItem };
