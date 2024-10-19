export class AddClient {
}

export interface Person {
    personId: number,
    name: string;
    surname: string;
    personalNumber: string;
    phoneNumber: string;
    emailAddress: string;
    addressId?: number;
    address: Address;
  }

export interface PersonForSearch {
  personId: number;
  name: string;
  surname: string;
  personalNumber: string;
  phoneNumber: string;
  emailAddress: string;
}

export interface PersonBlacklistFlag {
  personId: number;
  currentBlacklistFlag: boolean;
}

  export interface Address {
    country: string;
    city: string;
    street: string;
    postalCode: string;
  }