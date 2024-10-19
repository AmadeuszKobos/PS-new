import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Information } from '../models/information.model';
import { Observable } from 'rxjs';
import { ItemHistoryRegister } from '../../add/models/addItem';
import { Summary } from '../models/summary.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apiService: ApiService) { }

  // SummaryController API

  getSummariesByDateRange(startDate: Date, endDate: Date, getAll: boolean): Observable<Summary[]> {
    return this.apiService.get('/Summary/GetSummariesByDateRange', { startDate: startDate,  endDate: endDate, getAll: getAll});
  }

  // ItemHistoryRegisterController API

  getUserLastModificatedItemsHistory(): Observable<ItemHistoryRegister[]> {
    return this.apiService.get('/ItemHistoryRegister/GetUserLastModificatedItemsHistory');
  }

  // UserController

  getUserNotes(): Observable<string> {
    return this.apiService.get('/User/GetUserNotes');
  }

  // InformationContoller API

  getInformations(): Observable<Information[]> {
    return this.apiService.get('/Information/GetInformations');
  }

  getLastInformations(): Observable<Information[]> {
    return this.apiService.get('/Information/GetLastInformations');
  }
}
