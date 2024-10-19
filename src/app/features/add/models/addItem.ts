export class Item {
}

export interface Item {
    id: number
    name: string;
    producer: string;
    days: number;
    history: ItemHistory
}

export interface ItemHistory {
    id: number,
    operationDate?: Date,
    operationId?: number,
    conditionId: number;
    transactionAmount: number,
    notes: string;
    itemId: number;
    userId: number;
    personId: number;
}

export interface ItemHistoryRegister {
    id: number,
    operationDate?: Date,
    operationId?: number,
    transactionAmount: number,
    conditionId: number;
    notes: string;
    personId: number;
    person: string,
    itemId: number;
    itemName: string
    username: string;
}

export interface ItemForSale {
    itemId: number,
    personId: number,
    transactionAmount: number
}

