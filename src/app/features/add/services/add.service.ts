import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Person, PersonForSearch } from '../models/Persons.model';
import { Observable } from 'rxjs';
import { Item } from '../models/addItem';

@Injectable({
  providedIn: 'root',
})
export class AddService {
  constructor(private apiService: ApiService) {}

  addClient(clientData: Person): Observable<any> {
    return this.apiService.post(
      '/PersonContoller/AddOrUpdatePerson',
      clientData
    );
  }

  addItem(itemData: Item): Observable<any> {
    return this.apiService.post('/Item/AddOrUpdateItem', itemData);
  }

  getPersonsForSearch(searchValue: string): Observable<PersonForSearch[]> {
    return this.apiService.get('/PersonContoller/GetPersonsForSearch', { searchValue: searchValue });
  }
}
