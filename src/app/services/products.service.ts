import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateProductDTO, Product, UpdateProductDTO } from '../models/product.mode';
import {catchError, map, retry} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { checkTime } from '../interceptors/time.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api';

  constructor(
    private httpSvc: HttpClient
  ) { }

  getByCategory(idCategory: string, limit: number, offset: number){
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit',limit);
      params = params.set('offset',offset);
    }
    return this.httpSvc.get<Product[]>(`${this.apiUrl}/categories/${idCategory}/products`,{params})
  }

  getAllProducts(limit?:number, offset?:number): Observable<any>{
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit',limit);
      params = params.set('offset',offset);
    }
    return this.httpSvc.get<Product[]>(this.apiUrl+'/products',{params, context: checkTime()})
    .pipe(
      retry(3),
      map( products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  getProduct(id: string){
    return this.httpSvc.get<Product>(`${this.apiUrl}/products/${id}`)
      .pipe(
        catchError((error:HttpErrorResponse) => {
          if(error.status === HttpStatusCode.Conflict){
            return throwError('Algo esta fallando en el server');
          }
          if(error.status == HttpStatusCode.NotFound){
            return throwError('El product no existe');
          }
          if(error.status == HttpStatusCode.Unauthorized){
            return throwError('No esta permitido');
          }
          return throwError('Ups algo salio mal');
        })
      );
  }

  create(product: CreateProductDTO){
    return this.httpSvc.post<Product>(this.apiUrl+'/products',product);
  }

  update(id:string, product: UpdateProductDTO){
    return this.httpSvc.put<Product>(`${this.apiUrl}/products/${id}`,product);
  }

  delete(id: string){
    return this.httpSvc.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}
