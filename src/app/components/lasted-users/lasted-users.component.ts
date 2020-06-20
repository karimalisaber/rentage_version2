import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-lasted-users',
  templateUrl: './lasted-users.component.html',
  styleUrls: ['./lasted-users.component.scss']
})
export class LastedUsersComponent implements OnInit {
users;
filteredUsers;

isLoading: boolean = false;
  constructor(private api : ApiService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.api.getUserList()
    .subscribe(
      res=>{
        this.filteredUsers = this.users = res;
      },
      ()=>{},
      ()=> this.isLoading = false
    );
  }

  filter(value){
    this.filteredUsers = (value)? this.users.filter(res=> res.name.toLowerCase().includes(value.trim().toLowerCase())): this.users;    
  }
}
