"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBillAsync = exports.saveBillAsync = void 0;
const Models_1 = require("./Models");
async function saveBillAsync(bill) {
    try {
        let billModel = new Models_1.BillModel(bill);
        let billDoc = await billModel.save();
        return true;
    }
    catch (err) {
        console.log(`Fail to save bill. ${err}`);
        return false;
    }
}
exports.saveBillAsync = saveBillAsync;
async function getBillAsync(billId) {
    try {
        let billDoc = await Models_1.BillModel.findOne({ id: billId }).exec();
        return billDoc.toObject();
    }
    catch (err) {
        console.log(`Fail to get bill. ${err}`);
    }
}
exports.getBillAsync = getBillAsync;
/**
 * findOneAndUpdate
 * @param billId id
 * @param status new status
 * @returns Bill object after update
 */
async function updateBillStatus(billId, status) {
    try {
        let bill = await getBillAsync(billId);
        bill.status = status;
        let updatedBill = await Models_1.BillModel.findOneAndUpdate({ id: billId }, { status: status }, { new: true, useFindAndModify: false });
        return updatedBill;
    }
    catch (err) {
        console.log(`Fail to update bill status. ${err}`);
    }
}
