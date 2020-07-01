import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-chat',
  templateUrl: './client-chat.component.html',
  styleUrls: ['./client-chat.component.scss']
})
export class ClientChatComponent implements OnInit {
  // chatData;
  users; 
  loading: boolean = false;
  
  // specificUserData; // second user

  filteredUsers;
  // specificChat: boolean = false;
 
  currentUser; // first user
  currentUserId; // first user
  isLoading:boolean = false ; // for chat

  constructor(private api : ApiService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getCurrentUser();
    this.getSpecificUserChat();
  }

  private getCurrentUser(){
    this.currentUserId = this.route.snapshot.paramMap.get('id');
    this.currentUser = this.route.snapshot.paramMap.get('name');
  }

  // getSpecificChat(user){ 
  //   this.isLoading = true;
  //   this.specificChat = true;
  //   this.specificUserData = user;
  //   console.log(user);
    
  //   this.api.getSpecificRoom(user.chatRoomId)
  //   .subscribe(res=>{
  //     this.chatData = res;
  //   },()=>{}
  //   ,()=>this.isLoading = false
  //   );
  // }


  getSpecificUserChat(){ // get users not chat
    this.loading = true;

    this.api.getSpecificUserChat(this.currentUserId)
      .subscribe(
        res=>{
            this.users = this.filteredUsers = res.map(res=> {
                       
            return res.user2_data.id != this.currentUserId? res.user2_data : res.user1_data;
            });


            let roomsIds = res.map(res=> res.id)

            this.users.forEach((element, i) => {
                element['chatRoomId'] = roomsIds[i];
          });
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
