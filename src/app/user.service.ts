import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn:boolean;
  
  constructor(private _http:HttpClient) { }

  register(body:any)
  {
    return this._http.post("http://3.16.214.113:8080/users/register",body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  login(body:any)
  {
    return this._http.post("http://3.16.214.113:8080/users/login",body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  user()
  {
    return this._http.get("http://3.16.214.113:8080/users/user",{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  logout()
  {
    return this._http.get("http://3.16.214.113:8080/users/logout",{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  
  drivers()
  {
    return this._http.get("http://3.16.214.113:8080/drivers",{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
}
