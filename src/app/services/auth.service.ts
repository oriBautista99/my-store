import { TokenService } from './token.service';
import { tap, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.model';
import { User, userCreateDTO } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://damp-spire-59848.herokuapp.com/api/auth';
  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

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
    return this.http.get<User>(this.apiUrl+'/profile')
    .pipe(
      tap(user => this.user.next(user)) //tap -> una accion al obtener los datos
    );
  }

  loginAndGet(email: string, password:string){
    return this.login(email,password)
    .pipe(
      switchMap(()=> this.profile())
    )
  }

  logout(){
    this.tokenSvc.removeToken();
  }
}
