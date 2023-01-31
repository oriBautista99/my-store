import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Product } from 'src/app/models/product.mode';
import { ProductsService } from 'src/app/services/products.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productId:string | null = null;
  product: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productSvc: ProductsService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(
      switchMap(params => {
        this.productId = params.get('idProduct');
        if(this.productId){
          return this.productSvc.getProduct(this.productId)
        }
        return [null];
      })
    )
    .subscribe(data => {
      this.product = data;
    });
  }

  goToBack(){
    this.location.back();
  }

}
