var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod[PaymentMethod["COD"] = 0] = "COD";
    PaymentMethod[PaymentMethod["MOMO"] = 1] = "MOMO";
    PaymentMethod[PaymentMethod["VNPay"] = 2] = "VNPay";
    PaymentMethod[PaymentMethod["ZaloPay"] = 3] = "ZaloPay";
})(PaymentMethod || (PaymentMethod = {}));
var ShipStatus;
(function (ShipStatus) {
    ShipStatus[ShipStatus["waiting"] = 0] = "waiting";
    ShipStatus[ShipStatus["shipping"] = 1] = "shipping";
    ShipStatus[ShipStatus["complete"] = 2] = "complete";
})(ShipStatus || (ShipStatus = {}));
class Bill {
    constructor() {
        this.purchasedDate = new Date();
        this.shippingAddress = "";
        this.notes = "";
    }
}
export { Bill, PaymentMethod, ShipStatus };
