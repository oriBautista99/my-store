import { Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import { zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CreateProductDTO, Product } from 'src/app/models/product.mode';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCart: Product[] = [];
  total:number = 0;
  @Input() products: Product[] = [];
  @Input()
  set productId(id: string | null){
    if(id){
      this.onShowDetail(id);
    }
  }
  @Output() loadMore: EventEmitter<boolean> = new EventEmitter();
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    images: [],
    price: 0,
    title: '',
    description: '',
    category: {
      id:'',
      name: ''
    }
  }
  limit = 10;
  offset = 1;
  statusDetail : 'loading' |  'success' | 'error' | 'init' = 'init';

  constructor(
    private stroreSvc: StoreService,
    private productSvc: ProductsService
  ) {
    this.myShoppingCart = this.stroreSvc.getShoppingCart();
  }


  onAddToShoppingCart(product: Product){
    this.stroreSvc.addProduct(product);
    this.total = this.stroreSvc.getTotal();
  }

   sendLoadMore() {
    this.loadMore.emit(true);
  }

  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string){
    this.statusDetail = 'loading';
    if(!this.showProductDetail){
      this.showProductDetail = true;
    }
    this.productSvc.getProduct(id).subscribe(res => {
      this.productChosen = res;
      this.statusDetail = 'success';
      //this.toggleProductDetail();
    }, error => {
      window.alert(error);
      this.statusDetail = 'error';
    });
  }

  readAndUpdate(id:string){
    // concatenar si existe dependencia
    this.productSvc.getProduct(id)
    .pipe(
      switchMap((product) => {
        return this.productSvc.update(product.id, {title:'change'});
      })
    )
    .subscribe( data => {
      console.log(data)
    });
    // concatenar peticiones a la vez - no dependen
    zip(
      this.productSvc.getProduct(id),
      this.productSvc.update(id, {title:'change'})
    ).subscribe(response => {
      const read = response[0];
      const update = response[1];
    })
  }

  createNewProduct(){
    const product: CreateProductDTO = {
      title: 'Nuevo Product',
      description: 'descripcion',
      price: 200,
      categoryId: 2,
      images: []
    }
    this.productSvc.create(product).subscribe( res => {
      this.products.unshift(res);
    });
  }

  editProduct(){
    const changes = {
      title: 'Nuevo Titulo'
    }
    const id = this.productChosen.id;
    this.productSvc.update(id,changes).subscribe( res => {
      const product = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[product] = res;
    });
  }

  deleteProduct(){
    const id= this.productChosen.id;
    this.productSvc.delete(id).subscribe(data => {
      const product = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(product,1);
      this.showProductDetail = false;
    });
  }

}
