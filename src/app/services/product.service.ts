import { Product } from './../models/Product';
import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends CrudService<Product> {

  constructor(
    http: HttpService
  ) {
    super(http, 'products');
  }

}
