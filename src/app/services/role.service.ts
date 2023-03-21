import { Injectable } from '@angular/core';
import { Role } from '../models/Role';
import { CrudService } from './crud.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends CrudService<Role> {

  constructor(
    http: HttpService
  ) {
    super(http, 'roles');
  }

}
