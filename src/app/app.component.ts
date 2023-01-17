import { Component } from '@angular/core';
import { Product } from './models/product.mode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  imgValue = '';

  onLoaded(img:string){
    console.log('padre')
  }
}
