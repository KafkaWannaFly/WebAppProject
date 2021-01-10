var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod[PaymentMethod["cod"] = 0] = "cod";
    PaymentMethod[PaymentMethod["momo"] = 1] = "momo";
    PaymentMethod[PaymentMethod["vnpay"] = 2] = "vnpay";
    PaymentMethod[PaymentMethod["zalopay"] = 3] = "zalopay";
})(PaymentMethod || (PaymentMethod = {}));
var Status;
(function (Status) {
    Status[Status["waiting"] = 0] = "waiting";
    Status[Status["shipping"] = 1] = "shipping";
    Status[Status["complete"] = 2] = "complete";
})(Status || (Status = {}));
class Bill {
    constructor() {
        this.purchasedDate = new Date();
        this.shippingAddress = "";
        this.notes = "";
    }
}
export { Bill };
