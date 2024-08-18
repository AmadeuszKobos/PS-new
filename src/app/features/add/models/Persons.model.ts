export class AddClient {
}

export interface Person {
    name: string;
    surname: string;
    personalNumber: string;
    phoneNumber: string;
    emailAddress: string;
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

  export interface Address {
    country: string;
    city: string;
    street: string;
    postalCode: string;
  }