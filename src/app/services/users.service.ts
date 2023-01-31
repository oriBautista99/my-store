import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, userCreateDTO } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'https://damp-spire-59848.herokuapp.com/api/users';

  constructor(private http: HttpClient) { }

  create(dto: userCreateDTO){
    return this.http.post<User>(this.apiUrl,dto);
  }

  getAll(){
    return this.http.get<User[]>(this.apiUrl)
  }
}
