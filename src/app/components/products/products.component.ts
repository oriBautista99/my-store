import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.mode';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total:number = 0;
  products: Product[] = [];
  today = new Date();
  date = new Date(2021,1,21);

  constructor(private stroreSvc: StoreService,
    private productSvc: ProductsService) {
    this.myShoppingCart = this.stroreSvc.getShoppingCart();
   }

  ngOnInit(): void {
    this.getProducts();
  }

  onAddToShoppingCart(product: Product){
    this.stroreSvc.addProduct(product);
    this.total = this.stroreSvc.getTotal();
  }

  getProducts(){
    this.productSvc.getAllProduct().subscribe(res => {
      if(res){
        this.products = res;
      }
    });
  }
}
