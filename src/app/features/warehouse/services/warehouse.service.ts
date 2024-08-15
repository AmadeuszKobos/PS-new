import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { ItemRegister } from '../models/item-register.model';
import { Item } from '../../add/models/addItem';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  constructor(private apiService: ApiService) { }

  getItem(itemId: number): Observable<Item>{
    return this.apiService.get('/ItemRegister/GetItem', { itemId: itemId });
  }

  getItems(): Observable<ItemRegister[]>{
    return this.apiService.get('/ItemRegister/GetItems');
  }
}
