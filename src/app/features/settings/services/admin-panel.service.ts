import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Observable } from 'rxjs';
import { User, UserPassword, UserRegister } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {

  constructor(private apiService: ApiService) { }

  // UserRegisterController
  getUsersRegister(): Observable<UserRegister[]> {
    return this.apiService.get('/UserRegister/GetUsersRegister')
  }

  // UserController
  addUser(user: User): Observable<any> {
    return this.apiService.post('/User/AddUser', user)
  }

  updateUserPassword(userPass: UserPassword): Observable<any> {
    return this.apiService.post('/User/UpdateUserPassword', userPass)
  }

  updateUserBlockState(userId: number, currentBlockState: boolean) {
    return this.apiService.post('/User/UpdateUserBlockState', {userId: userId, currentBlockState: currentBlockState})
  }

  deleteUser(userId: number): Observable<any> {
    return this.apiService.post('/User/DeleteUser', userId);
  }
}
