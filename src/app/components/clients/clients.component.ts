import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AssetsService } from './../../services/assets.service';
import { map } from 'rxjs/operators';
import { UserRatesDialogComponent } from '../user-rates-dialog/user-rates-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clients;
  filteredClients;

  isLoading= false;

  constructor(private api: ApiService, private dialog: MatDialog, private assets: AssetsService) { }

  ngOnInit(): void {
    this.getClients();
  }

  deleteUserAlert(id){
    this.assets.deleteAlert(id).subscribe(res=> res? this.deleteUser(id): false );
  }

  private  getClients(){
    this.isLoading = true;
    this.api.getUserList()
      .subscribe(
        res=>{
          
          res.filter(res=> { // map result
            res.rate = Array(Math.round(res.rate)).fill('').map((res, i)=> res = i+1);
            res.emptyRate = Array( 5 - Math.round(res.rate)).fill('').map((res, i)=> res = i+1);
          });
        
          this.filteredClients = this.clients = res;          
        },
        ()=>{},
        ()=> this.isLoading = false 
      );
  }
  
  filter(value){
    this.filteredClients = (value)? this.clients.filter(res=> res.name.toLowerCase().includes(value.trim().toLowerCase())): this.clients;    
  }

  
  private deleteUser(id){
    this.isLoading = true;
    
    let index = this.clients.findIndex(res=> res.id == id);
    var item = this.clients.splice(index, 1);
    this.filteredClients = this.clients;
    
     
    this.api.deleteUser(id)
      .subscribe(
        res => {this.assets.deleteSuccess();},
        ()=> {
          this.clients.splice(index, 0, item[0]);
          this.filteredClients = this.clients;
        },
        ()=> this.isLoading = false
      );
  }

  
  showRate(id){    
    this.dialog.open(UserRatesDialogComponent, {
      data: id,
      panelClass: 'rate-order-wrapper',
      width: '80%'
    });
    }
}
