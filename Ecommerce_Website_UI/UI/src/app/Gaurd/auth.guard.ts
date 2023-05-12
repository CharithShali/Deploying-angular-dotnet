import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route,  Router,  UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router,private toust:NgToastService){

  }
  canActivate():boolean{
    if(this.auth.isLoggedIn()){
      return true;
    }else{
      this.toust.error({detail:"ERROR",summary:"Please Login First"});
      this.router.navigate(['login'])
      return false;
    }

  }

}
