export class ItemHistory {
}

export interface ItemHistory {
    id: number;
    modificationDate: Date;
    operationId: number;
    conditionId?: number;
    clientName: string;
    userName: string;
    notes: string;
}



