import { Injectable } from '@angular/core';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {
  constructor(private auth: AuthService) { }

  intercept(req, next){
    let token = this.auth.getToken();
    
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(tokenizedReq);
  }
}
