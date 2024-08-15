export class PersonRegister {}

export interface PersonsRegister {
    id: number;
    name: string;
    email?: string;
    phoneNumber: string;
    blacklistFlag: boolean;
    pawned: number;
    notes: string;
}
