import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor (private route: ActivatedRoute, private router: Router, private auth: AuthService) { }

  canActivate(route, state: RouterStateSnapshot){
    if (this.auth.isLogin()) return true;

     this.router.navigate([ '/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
