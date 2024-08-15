import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { PersonsRegister } from '../models/person-register.model';


@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  constructor(private apiService: ApiService) { }

  getPersons(): Observable<PersonsRegister[]>{
    return this.apiService.get('/PersonRegister/GetPersonRegister');
  }
}
