enum UserType {
	normal,
	shopEmployee,
}

class User {
	username: string;
	password: string;
	email: string;
	name: string;
	DoB?: Date;
	gender?: boolean; // True is Male. False is Female
	address?: string;
	phone: string;

	height?: number = 0; // Meter
	weight?: number = 0; // Kg

	userType: UserType;

	purchasedItems?: string[]; // list of bill id
}

export { User };
