import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  invalidLogin: boolean = false;
  isLogin:boolean = false;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  animateLabel(label: HTMLElement){
    label.classList.add('animate');
  }


  login(credentials) {
    this.isLoading = true;

    this.auth.login(credentials).subscribe(
     resl=>
    {
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

      this.router.navigate([returnUrl || '/admin']);
      
    }, error => {
      this.isLoading = false;
      this.invalidLogin = true;
    }
    ,()=> this.isLoading = false 
     
  );  
  }
}
