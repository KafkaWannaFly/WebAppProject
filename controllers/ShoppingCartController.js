import fs from "fs";
let bills = JSON.parse(fs.readFileSync("./data/bills.json", {
    encoding: "utf-8",
}));
function getBill(id) {
    for (let i = 0; i < bills.length; i++) {
        if (bills[i].id === id) {
            return bills[i];
        }
    }
    return undefined;
}
export { getBill };
