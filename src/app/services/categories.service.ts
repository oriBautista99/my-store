import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/product.mode';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/categories';

  constructor(
    private httpSvc: HttpClient
  ) { }

  getAll(limit?:number, offset?:number): Observable<any>{
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit',limit);
      params = params.set('offset',offset);
    }
    return this.httpSvc.get<Category[]>(this.apiUrl,{params});
  }
}
