import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.mode';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private httpSvc: HttpClient
  ) { }

  getAllProduct(): Observable<any>{
    return this.httpSvc.get<Product[]>('http://fakestoreapi.com/products');
  }
}
