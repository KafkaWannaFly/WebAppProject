import { Bill } from "../resources/js/Models/bill";
import { BillModel } from "./Models";

async function saveBillAsync(bill: Bill) {
	try {
		let billModel = new BillModel(bill);
		let billDoc = await billModel.save();

		return true;
	} catch (err) {
		console.log(`Fail to save bill. ${err}`);
		return false;
	}
}

async function getBillAsync(billId: string) {
	try {
		let billDoc = await BillModel.findOne({ id: billId }).exec();
		return billDoc.toObject() as Bill;
	} catch (err) {
		console.log(`Fail to get bill. ${err}`);
	}
}

/**
 * findOneAndUpdate
 * @param billId id
 * @param status new status
 * @returns Bill object after update
 */
async function updateBillStatus(billId: string, status: number) {
	try {
		let bill = await getBillAsync(billId);
		bill.status = status;

		let updatedBill = await BillModel.findOneAndUpdate(
			{ id: billId },
			{ status: status },
			{ new: true, useFindAndModify: false }
		);
		return updatedBill;
	} catch (err) {
		console.log(`Fail to update bill status. ${err}`);
	}
}

async function getAllBills() {
	try {
		let billDocs = await BillModel.find({}).lean().exec();
		let bills = billDocs.map((val, idx) => {
			return val as Bill;
		});

		return bills;
	} catch (err) {
		console.error(`Fail to get bills. ${err}`);
	}
}

export { saveBillAsync, getBillAsync, updateBillStatus, getAllBills };
