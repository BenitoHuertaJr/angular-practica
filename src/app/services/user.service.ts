import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User> {

  constructor(
    http: HttpService
  ) {
    super(http, 'users');
  }

}
