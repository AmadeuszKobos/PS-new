export class Item {
}

export interface Item {
    id: number
    name: string;
    producer: string;
    notes: string;
    transactionAmount: number;
    days: number;
    personId: number;
    conditionId: number;
    operationTypeId: number;
}

export interface ItemForSale {
    itemId: number,
    personId: number,
    transactionAmount: number
}

