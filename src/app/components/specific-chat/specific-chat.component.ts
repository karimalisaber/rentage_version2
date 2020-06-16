import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-specific-chat',
  templateUrl: './specific-chat.component.html',
  styleUrls: ['./specific-chat.component.scss']
})
export class SpecificChatComponent implements OnInit , OnChanges {

  @Input('personalChat') personalChat: boolean ;
  @Input('chatData') chatData;
  @Input('secondUser') secondUser;
  @Input('firstUser') firstUser;
  
  
  // mapedChat;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    
    // this.chatData.map(
      console.log(this.firstUser);
      console.log(this.secondUser);
      
    // )

  }



}
