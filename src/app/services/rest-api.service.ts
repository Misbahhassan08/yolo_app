import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  constructor(private http: HttpClient) {}

  // public getResponse: any;
  // public postResponse: any;
  public getRequest(url: string): Observable<any> {
    return this.http.get(url).pipe(
      catchError((error) => {
        return throwError(()=>{error});
      })
    );
  }

  public postRequest(url: string, body: any): Observable<any> {
    return this.http.post(url, body).pipe(
      catchError((error) => {
        return throwError(()=>{error});
      })
    );
  }
}
