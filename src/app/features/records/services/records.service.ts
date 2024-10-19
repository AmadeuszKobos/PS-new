import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { PersonsRegister } from '../models/person-register.model';
import { Person, PersonBlacklistFlag } from '../../add/models/Persons.model';
import { ItemHistory, ItemHistoryRegister } from '../../add/models/addItem';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  constructor(private apiService: ApiService) {}

  getPerson(personId: number): Observable<Person> {
    return this.apiService.get('/Person/GetPerson', { personId: personId });
  }

  updateBlacklistStatus(
    personId: number,
    currentBlacklistFlag: boolean
  ): Observable<PersonBlacklistFlag> {
    return this.apiService.post('/Person/UpdateBlacklistFlag', {
      personId: personId,
      currentBlacklistFlag: currentBlacklistFlag,
    });
  }

  getPersons(): Observable<PersonsRegister[]> {
    return this.apiService.get('/PersonRegister/GetPersonRegister');
  }

  getPersonItemHistory(personId: number): Observable<ItemHistoryRegister[]> {
    return this.apiService.get('/ItemHistoryRegister/GetPersonItemHistory', {
      personId: personId,
    });
  }
}
