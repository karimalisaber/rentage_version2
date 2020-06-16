import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients;
  isLoading= false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(){
    this.isLoading = true;
    this.api.getUserList()
      .subscribe(
        res=>{
          this.clients = res;
          console.log(this.clients);
          
        },
        ()=>{},
        ()=> this.isLoading = false 
      );
  }

}
