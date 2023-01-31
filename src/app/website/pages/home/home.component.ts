import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.mode';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  limit = 10;
  offset = 1;
  products: Product[] = [];
  productId: string | null = null;


  constructor(
    private productSvc: ProductsService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.productSvc.getAllProducts(10, 1).subscribe((data) => {
      this.products = data;
      this.offset += this.limit;
    });
    this.route.queryParamMap.subscribe(params => {
      this.productId = params.get('product');
    })
  }

  loadMore(response: boolean){
    if(response){
      this.productSvc.getAllProducts(this.limit, this.offset).subscribe((data) => {
        this.products = this.products.concat(data);
        this.offset += this.limit;
      });
    }
  }

}
