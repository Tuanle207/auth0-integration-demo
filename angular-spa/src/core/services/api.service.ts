import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getData(): Observable<number[]> {
    const data = [ 1, 2, 3, 4 ];
    return this.httpClient.get('https://localhost:5000').pipe(
      switchMap(() => of(data)),
      catchError(() => of(data))
    );
  }
}