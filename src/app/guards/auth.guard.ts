import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // const token = this.tokenSvc.getToken();
      // if(!token){
      //   this.router.navigate(['/home']);
      //   return false;
      // }
      // return true;
      return this.authService.user$.pipe(
        map(user => {
          if(!user){
            this.router.navigate(['/home']);
            return false;
          }
          return true;
        })
      )
  }

}
