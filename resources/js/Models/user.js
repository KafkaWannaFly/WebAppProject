var UserType;
(function (UserType) {
    UserType[UserType["normal"] = 0] = "normal";
    UserType[UserType["shopEmployee"] = 1] = "shopEmployee";
})(UserType || (UserType = {}));
class User {
    constructor() {
        this.height = 0; // Meter
        this.weight = 0; // Kg
    }
}
export { User };
