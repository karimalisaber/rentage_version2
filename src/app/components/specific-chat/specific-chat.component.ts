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
  // @Input('firstUser') firstName;
  @Input('isLoading') isLoading;
  

  // mapedChat;
  constructor() { }

  ngOnInit(): void {
  
    
  }

  ngOnChanges(){
    console.log(this.secondUser, 'second');
    console.log(this.firstUser);
  }



}
