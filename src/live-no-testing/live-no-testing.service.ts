import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  getSenders: () => `/v1/sender`,
  getallNetwork: () => `/v1/network`
};

@Injectable({
  providedIn: 'root'
})
export class LiveNoTestingService {
  constructor(private httpClient: HttpClient) {}

  getSendersList(): Observable<any> {
    return this.httpClient.get(routes.getSenders(), {}).pipe(
      map((body: any) => body),
      catchError(this.handleError)
    );
  }
  getNetwoks(): Observable<any> {
    return this.httpClient.get(routes.getallNetwork(), {}).pipe(
      map((body: any) => body),
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(errMessage);
    }
    return throwError(error || 'Node.js server error');
  }
}
