import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.mode';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() product:Product = {
    id: '',
    image: '',
    price: 0,
    title: '',
    description: '',
    taxes: 0,
    category: '',
    rating: {
      count: 0,
      rate: 0
    }
  };
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct  = new EventEmitter<string>();

  constructor() { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {

  }

  addToCart(){
    this.addedProduct.emit(this.product)
  }

  showDetail(){
    this.showProduct.emit(this.product.id)
  }
}
