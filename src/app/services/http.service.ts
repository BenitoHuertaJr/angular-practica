import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  get<T>(url: string, body: object = {}): Observable<T> {

    let params = new HttpParams();

    for (const [key, value] of Object.entries(body)) {
      params = params.append(key, value);
    }

    return this.http.get<T>(`${this.apiBaseUrl}/api/${url}`, { params });
  }

  post<T>(url: string, params: object = {}, options: object = {}): Observable<T> {
    return this.http.post<T>(`${this.apiBaseUrl}/api/${url}`, params, options);
  }

  put<T>(url: string, params: object = {}, options: object = {}): Observable<T> {
    return this.http.put<T>(`${this.apiBaseUrl}/api/${url}?_method=PUT`, params, options);
  }

  delete<T>(url: string, options: object = {}): Observable<T> {
    return this.http.delete<T>(`${this.apiBaseUrl}/api/${url}`, options);
  }
}
