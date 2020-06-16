import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  categories$;
  
  constructor(private getApi: ApiService ) { }

  ngOnInit(): void {
    this.categories$ = this.getApi.getAllCategories();
  }

}
