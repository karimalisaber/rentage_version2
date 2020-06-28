import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { AssetsService } from './../../services/assets.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent implements OnInit {
  emailExists:boolean =false;
  adminList : Array<any>;
  filteredAdminList : Array<any>;
  admin: boolean =false;
  viewPassword:boolean = false; //for the small icon show password
  isLoading: boolean = false;
  @ViewChild('userForm') userForm;
  
  constructor(private api: ApiService, private dialog: MatDialog, private assets: AssetsService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllAdmins();
  }

  deleteUserAlert(id){
    this.assets.deleteAlert(id).subscribe(res=> res? this.deleteUser(id): false );
  }

  private getAllAdmins(){
    this.isLoading = true;
    this.api.getAllAdmins()
      .subscribe(
        res=> this.adminList = this.filteredAdminList = res,
        ()=>{},
        ()=> this.isLoading = false
      );
  }

  private deleteUser(id){
    this.isLoading = true;
    
    let index = this.adminList.findIndex(res=> res.id == id);
    var item = this.adminList.splice(index, 1);
    this.filteredAdminList = this.adminList;
     
    this.api.deleteUser(id)
      .subscribe(
        res => {
          // this.snack.open('تمت عملية الحذف بنجاح', `` , {duration: 1500});
          this.assets.deleteSuccess();
        },
        (error)=> {
          this.adminList.splice(index, 0, item[0]);
          this.filteredAdminList = this.adminList;
        },
        ()=> this.isLoading = false
      );
  }

  register(user){
    this.emailExists = false;
    this.isLoading = true;

    this.api.postUser(user).subscribe(
      (res)=>{      
        this.assets.addSuccess().afterDismissed().subscribe(res=> location.reload());
      },
      (error)=>{
        this.assets.errorMessage();
        this.isLoading = false;
      }
    );
  }

  filter(value){
    this.filteredAdminList = (value)? this.adminList.filter(res=> res.user_data.name.toLowerCase().includes(value.trim().toLowerCase())): this.adminList;    
  }
}
