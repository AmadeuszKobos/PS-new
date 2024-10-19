import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Person, PersonForSearch } from '../models/Persons.model';
import { Observable } from 'rxjs';
import { Item, ItemForSale } from '../models/addItem';

@Injectable({
  providedIn: 'root',
})
export class AddService {
  constructor(private apiService: ApiService) {}

  addClient(clientData: Person): Observable<any> {
    debugger
    return this.apiService.post(
      '/Person/AddOrUpdatePerson',
      clientData
    );
  }

  addItem(itemData: Item): Observable<any> {
    return this.apiService.post('/Item/AddOrUpdateItem', itemData);
  }

  getPersonsForSearch(searchValue: string): Observable<PersonForSearch[]> {
    return this.apiService.get('/Person/GetPersonsForSearch', { searchValue: searchValue });
  }


}
