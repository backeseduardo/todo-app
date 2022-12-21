import { v4 } from "uuid";

export interface IUUID {
	generate(): string;
}

export class UUID implements IUUID {
	generate(): string {
		return v4();
	}
}
