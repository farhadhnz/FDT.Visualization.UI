import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  post(url: string, data: any): Observable<any> {
    return this.http.post(url, data);
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  put(url: string, data: any): Observable<any> {
    return this.http.put(url, data);
  }

  delete(url: string): Observable<any> {
    console.log('Deleting project with ID:', url);
    return this.http.delete(url);
  }
}