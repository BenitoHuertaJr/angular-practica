import { Injectable } from '@angular/core';
import { ResourceModel } from '../models/ResourceModel';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Pagination } from '../interfaces/Pagination';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudService<T extends ResourceModel<T>> {
  constructor(
    private http: HttpService,
    protected apiUrl: string
  ) { }

  all(params = {}): Observable<Pagination<T>>{
    return this.http.get<Pagination<T>>(this.apiUrl, params)
  }

  create(body: any): Observable<T> {
    return this.http.post<T>(this.apiUrl, body);
  }

  find(id: any): Observable<T> {
    return this.http.get<T>(this.apiUrl + '/' + id);
  }

  update(id: any, body: any): Observable<T> {
    return this.http.put<T>(this.apiUrl + '/' + id, body);
  }

  delete(id: any): Observable<T> {
    return this.http.delete<T>(this.apiUrl + '/' + id);
  }
}
