import { TokenService } from './token.service';
import { tap, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.model';
import { User, userCreateDTO } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/auth';

  constructor(private http: HttpClient,
    private tokenSvc:TokenService) { }

  login(email:string, password:string){
    return this.http.post<Auth>(this.apiUrl+'/login',{email,password})
    .pipe(
      tap(
        response => this.tokenSvc.saveToken(response.access_token)
      )
    );
  }

  profile(){
    return this.http.get<User>(this.apiUrl+'/profile');
  }

  loginAndGet(email: string, password:string){
    return this.login(email,password)
    .pipe(
      switchMap(()=> this.profile())
    )
  }
}
