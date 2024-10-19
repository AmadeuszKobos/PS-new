import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7175'

  constructor(private http: HttpClient) { }

  private formatErrors(error: HttpErrorResponse){
    return throwError(() => new Error(error.message));
  };
  
  get<T>(path: string, params: any = {}): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${path}`, { params })
      .pipe(catchError(this.formatErrors))
  }

  // post<T>(path: string, body: object = {}): Observable<T> {
  //   return this.http.post<T>(`${this.apiUrl}${path}`, body)
  //     .pipe(catchError(this.formatErrors));
  // }

  post<T>(path: string, body: any = {}): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }
}
