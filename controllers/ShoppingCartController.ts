import fs from "fs";
import { Bill } from "../resources/js/Models/bill";

let bills = JSON.parse(
	fs.readFileSync("./data/bills.json", {
		encoding: "utf-8",
	})
) as Bill[];

function getBill(id: string) {
	for (let i = 0; i < bills.length; i++) {
		if (bills[i].id === id) {
			return bills[i];
		}
	}

	return undefined;
}

export { getBill };
