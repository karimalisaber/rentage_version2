import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { loginUrl } from 'src/assets/environment/environmentVariables';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient) { }

  login(credentials){
    return this.http.post(loginUrl, credentials).pipe(take(1),map(
      (res:any)=> {
        let result = res;
        if(result && result.data.token) {
          localStorage.setItem('token', result.data.token);
          localStorage.setItem('role', result.data.role);
          return true;
        }
        return false
      }));
  }

  isLogin(){
    const helper = new JwtHelperService();
    let token = localStorage.getItem('token');

    if(!token)
      return false ;

    const isExpired = helper.isTokenExpired(token);
  
    return !isExpired;
  }

  
  getToken(){
    let token = localStorage.getItem('token');

    return token;
  }

}
