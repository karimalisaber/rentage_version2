import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-specific-client-chat',
  templateUrl: './specific-client-chat.component.html',
  styleUrls: ['./specific-client-chat.component.scss']
})
export class SpecificClientChatComponent implements OnInit {
  // @Input('firstUserName') firstUserName; //name
  // @Input('firstUserId') firstUserId; //name


  // @Input('chatData') chatData;
  // @Input('secondUser') secondUser;
  firstUserName;
  isLoading;
  firstUserId
  secondUserId;
  secondUserName;
  roomId;
  chatData;

  constructor(private route :ActivatedRoute, private api: ApiService ) { }

  ngOnInit(): void {
    this.getFirstUserData();
    this.getSecondUser();
    this.getSpecificChat();
  
    
    // this.getSpecificChat();
  }


  getFirstUserData(){
     this.route.parent.paramMap.subscribe(res=>{
      this.firstUserId = res.get('id');
      this.firstUserName = res.get('name');
    });
  }

  getSpecificChat(){ 
    this.isLoading = true;
    
    this.api.getSpecificRoom(this.roomId)
    .subscribe(res=>{
      this.chatData = res.reverse();
      
    },()=>{}
    ,()=>this.isLoading = false
    );
  }
  
  private getSecondUser(){
    this.route.paramMap.subscribe(res=>{
      this.secondUserId = res.get('secondId');
      this.roomId = res.get('roomId');
      this.secondUserName = res.get('secondName');

      this.getSpecificChat();
      
    }) 
    
  }

}
