import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { ItemRegister } from '../models/item-register.model';
import { Item, ItemForSale, ItemHistory, ItemHistoryRegister } from '../../add/models/addItem';
import { OperationTypeEnum } from '../../../shared/Enums/operation-type-enum.model';
import { PersonForSearch } from '../../add/models/Persons.model';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  constructor(private apiService: ApiService) { }

  getItems(): Observable<ItemRegister[]>{
    return this.apiService.get('/ItemRegister/GetItems');
  }

  getItemHistory(itemId: number): Observable<ItemHistoryRegister[]> {
    return this.apiService.get('/ItemHistoryRegister/GetItemHistory', {itemId: itemId})
  }

  GetItemPriceSuggestion(itemId: number, pawnshopOwnershipDate: Date): Observable<number>{
    return this.apiService.get('/ItemHistory/GetItemPriceSuggestion', { itemId: itemId, pawnshopOwnershipDate: pawnshopOwnershipDate });
  }

  updateItemSell(itemForSale: ItemForSale): Observable<any> {
    return this.apiService.post('/Item/UpdateItemSell', itemForSale);
  }

  updateItemDelete(itemId: number): Observable<any> {
    return this.apiService.post('/Item/UpdateItemDelete', itemId)
  }

  getPersonForItem(id: number): Observable<PersonForSearch> {
    return this.apiService.get('/Person/GetPersonForItem', { itemId: id });
  }

}
