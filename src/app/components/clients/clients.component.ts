import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients;
  filteredClients;

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
          this.filteredClients = this.clients = res;      
        },
        ()=>{},
        ()=> this.isLoading = false 
      );
  }
  
  filter(value){
    this.filteredClients = (value)? this.clients.filter(res=> res.name.toLowerCase().includes(value.trim().toLowerCase())): this.clients;    
  }
}
