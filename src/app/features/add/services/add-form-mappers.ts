import { OperationTypeEnum } from "../../../shared/Enums/operation-type-enum.model";
import { Address, Person } from "../models/Persons.model";
import { Item, ItemForSale } from "../models/addItem";

export function mapClientFormToClient(clientFormValue: any): Person {
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

export function mapItemFormToItem(itemFormValue: any, personId: number, id: number): Item {
  debugger
  return {
    id: id,
    name: itemFormValue.name,
    producer: itemFormValue.producer,
    notes: itemFormValue.description,
    transactionAmount: itemFormValue.transactionAmount,
    days: itemFormValue.days,
    personId: personId,
    conditionId: itemFormValue.conditionId,
    operationTypeId: itemFormValue.operationType
  }
}

export function mapSaleFormToItemForSale(saleFormValue: any, personId: number, itemId: number): ItemForSale {
  return {
    itemId: itemId,
    transactionAmount: saleFormValue.transactionAmount,
    personId: personId,
  };
}