export class AddClient {
}

export interface Client {
    name: string;
    surname: string;
    personalNumber: string;
    phoneNumber: string;
    emailAddress: string;
    address: Address;
  }

  export interface Address {
    country: string;
    city: string;
    street: string;
    postalCode: string;
  }