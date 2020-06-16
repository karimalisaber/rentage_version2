import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from './../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-messages',
  templateUrl: './all-messages.component.html',
  styleUrls: ['./all-messages.component.scss']
})
export class AllMessagesComponent implements OnInit {
  // specificUserChat: boolean = true; // it will be input prop
  users;
  loading: boolean = false;
  specificUserData;
  specificUser: boolean = false;
  filteredUsers;
  
  
  constructor(private api : ApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(){
    this.loading= true;
    this.api.getUserList()
      .subscribe(
        res=>{
          this.filteredUsers = this.users = res;  
        },
        error=>{},
        () => this.loading = false
      );
  }

  getSpecificChat(id){
    console.log(id);
    
  }

  getSpecificUserChat(id){
    this.loading = true;

    this.api.getSpecificUserChat(id)
      .subscribe(
        res=>{
          
            this.users = this.filteredUsers = res.map(res=> {
            return res.user2_data.id !== id? res.user2_data : res.user1_data;
            });

            let roomsIds = res.map(res=> res.id)

            this.users.forEach((element, i) => {
                element['chatRoomId'] = roomsIds[i];
            });
          this.specificUser = true ;
        },
        ()=> {},
        ()=>{
          this.loading= false;
        }
      );
  }

  
  filter(value){
    this.filteredUsers = (value)? this.users.filter(res=> res.name.toLowerCase().includes(value.trim().toLowerCase())): this.users;    
  }


}
