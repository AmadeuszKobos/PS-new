import { Address, Client } from "../models/addClient.model";
import { Item } from "../models/addItem";

export function mapClientFormToClient(clientFormValue: any): Client {
    return {
      name: clientFormValue.name,
      surname: clientFormValue.surname,
      personalNumber: clientFormValue.personalNumber,
      phoneNumber: clientFormValue.phoneNumber,
      emailAddress: clientFormValue.emailAddress,

      address: mapAddressFormToAddress(clientFormValue)
    };
  }
  
export function mapAddressFormToAddress(addressFormValue: any): Address {
  return {
    country: addressFormValue.country,
    city: addressFormValue.city,
    street: addressFormValue.street,
    postalCode: addressFormValue.postalCode
  };
}

export function mapItemFormToItem(itemFormValue: any): Item {
  return {
    name: itemFormValue.name,
    producer: itemFormValue.producer,
    notes: itemFormValue.description,
    cost: itemFormValue.cost,
    days: itemFormValue.days,
    clientId: itemFormValue.clientId,
    conditionId: itemFormValue.conditionId
  }
}