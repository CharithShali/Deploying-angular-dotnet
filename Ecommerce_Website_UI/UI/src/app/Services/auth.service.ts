import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/models';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
private baseUrl: string = "https://localhost:44325/api/User/"
private UserPayload:any;


constructor(private httpClient: HttpClient,private router:Router) {
  this.UserPayload=this.decordToken();
}
signUp(userObj:any){
  return this.httpClient.post<any>(`${this.baseUrl}register`,userObj)
}
Login(loginObj:any){
  return this.httpClient.post<any>(`${this.baseUrl}authenticate`,loginObj)
}
storeToken(tokenValue:string){
  localStorage.setItem('token',tokenValue)
}
getToken(){
  return localStorage.getItem('token')
}
isLoggedIn():boolean{
  return !!localStorage.getItem('token')
}
signOut(){
  localStorage.clear();
  this.router.navigate(['login'])
}
getAllUsers(){
  return this.httpClient.get<User[]>(`${this.baseUrl}`)
}

decordToken(){
  const jwtHelper= new JwtHelperService();
  const token=this.getToken()!;

console.log(jwtHelper.decodeToken(token))
return jwtHelper.decodeToken(token)

}
getfullname(){
  if(this.UserPayload)
  return this.UserPayload.unique_name;
}
getRoleFromToken(){
  console.log(this.UserPayload)
  if(this.UserPayload)
  return this.UserPayload.role;
}
getUserEmail(){
  if(this.UserPayload)
  return this.UserPayload.email
  ;
}


getUser(email:any){
  return this.httpClient.get<User>(`${this.baseUrl}user?email=${email}`)

}

getUserbyid(id:any){
  return this.httpClient.get<User>(`${this.baseUrl}userbyid?id=${id}`)

}
}

