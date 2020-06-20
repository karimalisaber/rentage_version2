import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  categories$;
  
  constructor(private getApi: ApiService, private router: Router ) { }

  ngOnInit(): void {
    this.categories$ = this.getApi.getAllCategories();
  }

  
  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    this.router.navigate(['/login']);
  }
  
}
