import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.mode';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private myShoppingCart: Product[] = [];
  private myCart: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();

  constructor() { }

  addProduct(product:Product){
    this.myShoppingCart.push(product);
    this.myCart.next(this.myShoppingCart);
  }

  getTotal(){
    return this.myShoppingCart.reduce((sum,item) => sum + item.price ,0);
  }

  getShoppingCart(){
    return this.myShoppingCart;
  }
}
