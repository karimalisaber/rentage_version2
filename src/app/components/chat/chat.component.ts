import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  chatData;
  users; 
  loading: boolean = false;
  specificUserData; // second user
  specificUser: boolean = false;
  filteredUsers;
  specificChat: boolean = false;  
  currentUser; // first user
  
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

  getSpecificChat(user){
    this.specificChat = true;
    this.specificUserData = user;
    this.api.getSpecificRoom(user.chatRoomId)
    .subscribe(res=>{
      this.chatData = res;
    })
    
    
  }


  getSpecificUserChat(user){
    this.loading = true;

    this.currentUser = user;

    this.api.getSpecificUserChat(user.id)
      .subscribe(
        res=>{
          
            this.users = this.filteredUsers = res.map(res=> {
            return res.user2_data.id !== user.id? res.user2_data : res.user1_data;
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
