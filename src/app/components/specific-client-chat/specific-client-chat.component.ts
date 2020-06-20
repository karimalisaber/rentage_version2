import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-specific-client-chat',
  templateUrl: './specific-client-chat.component.html',
  styleUrls: ['./specific-client-chat.component.scss']
})
export class SpecificClientChatComponent implements OnInit {

  @Input('chatData') chatData;
  @Input('secondUser') secondUser;
  @Input('firstUserName') firstUserName; //name
  @Input('firstUserId') firstUserId; //name

  @Input('isLoading') isLoading;
  

  // mapedChat;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
  }

}
