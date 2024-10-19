import { OperationTypeEnum } from "../../../shared/Enums/operation-type-enum.model";
import { Address, Person } from "../models/Persons.model";
import { Item, ItemForSale, ItemHistory } from "../models/addItem";

export function mapClientFormToClient(clientFormValue: any, addressId: number, personId: number): Person {
    return {
      personId: personId,
      name: clientFormValue.name,
      surname: clientFormValue.surname,
      personalNumber: clientFormValue.personalNumber,
      phoneNumber: clientFormValue.phoneNumber,
      emailAddress: clientFormValue.emailAddress,
      addressId: addressId,
      address: mapAddressFormToAddress(clientFormValue)
    };
  }
  
export function mapAddressFormToAddress(addressFormValue: any): Address {
  return {
    country: addressFormValue.country.name,
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
    days: itemFormValue.days,
    history: mapItemFormToItemHisotry(itemFormValue, personId)
  }
}


export function mapItemFormToItemHisotry(itemFormValue: any, personId: number): ItemHistory {
  return {
    id: 0,
    operationDate: undefined,
    transactionAmount: itemFormValue.transactionAmount,
    notes: itemFormValue.notes,
    conditionId: itemFormValue.conditionId,
    itemId: 0,
    userId: 0,
    personId: personId,
    operationId: itemFormValue.operationId
  }
}

export function mapSaleFormToItemForSale(saleFormValue: any, personId: number, itemId: number): ItemForSale {
  return {
    itemId: itemId,
    transactionAmount: saleFormValue.transactionAmount,
    personId: personId,
  };
}