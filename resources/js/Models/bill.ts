import { Item } from "./item";

interface BillItem {
	item: Item;
	amount: number;
}

enum PaymentMethod {
	COD,
	MOMO,
	VNPay,
	ZaloPay,
}

enum ShipStatus {
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
	status: ShipStatus;
}

export { Bill, BillItem, PaymentMethod, ShipStatus };
