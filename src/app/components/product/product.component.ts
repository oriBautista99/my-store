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
    category: ''
  };
  @Output() addedProduct = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  }

  addToCart(){
    this.addedProduct.emit(this.product)
  }
}
