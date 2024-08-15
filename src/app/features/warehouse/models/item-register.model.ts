export class ItemRegister {
}

export interface ItemRegister {
    id: number;
    name: string;
    producer: string;
    itemStatus: ItemStatus;
    lastModificationDate: Date;
    conditionId?: number;
    condition?: string;
    notes: string;
}

export interface ItemStatus {
    statusId: number;
    statusName?: string;
    statusDescription?: string;
}

