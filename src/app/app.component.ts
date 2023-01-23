import { UsersService } from './services/users.service';
import { Component } from '@angular/core';
import { Product } from './models/product.mode';
import { AuthService } from './services/auth.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  imgValue = '';
  token:string = '';
  imgRta = '';

  constructor(private usersService: UsersService,
    private authSvc: AuthService,
    private fileSvc:FilesService){}

  onLoaded(img:string){
    console.log('padre')
  }

  createUser() {
    this.usersService.create({
      name: 'Sebas',
      email: 'sebas@mail.com',
      password: '1212'
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }

  login(){
    this.authSvc.login('sebas@mail.com','1212')
      .subscribe(rta => {
        this.token = rta.access_token;
      });
  }

  getProfile(){
    this.authSvc.profile()
  }

  downloadPdf(){
    this.fileSvc.getFile('my_pdf','https://young-sands-07814.herokuapp.com/api/files/dummy.pdf','application/pdf')
    .subscribe()
  }

  onUpload(event: Event){
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file){
      this.fileSvc.uploadFile(file)
        .subscribe(rta => {
          this.imgRta = rta.location;
        });
    }
  }
}
