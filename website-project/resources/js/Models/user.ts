enum UserType {
	normal,
	shopEmployee,
}

class User {
	username: string;
	password: string;
	email: string;
	name: string;
	DoB: Date;
	gender: boolean; // True is Male. False is Female
	address: string;
	phone: string;

	height: number; // Meter
	weight: number; // Kg

	userType: UserType;
}

export { User };
