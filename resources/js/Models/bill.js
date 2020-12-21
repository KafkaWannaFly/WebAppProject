class Bill {
    constructor() {
        this.id = Date.now().toString(36) + Math.random().toString(36).substr(2);
        this.purchasedDate = new Date();
        this.shippingAddress = "";
    }
}
export { Bill };
