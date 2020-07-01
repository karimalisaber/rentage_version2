import { Categories } from './../../interfaces/categories';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssetsService } from 'src/app/services/assets.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCatDialogComponent } from './../edit-cat-dialog/edit-cat-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  isLoading: boolean = true;
  categories:Categories[];
  editCategoryDisabled: boolean = true;
  addCatEnabled: boolean = false;
  newCategory: FormData = new FormData(); // for post new slider
  imageFile: any = null; // for uploaded image

  constructor(private apiRequest:ApiService, private snackBar: MatSnackBar, private assets: AssetsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  private getAllCategories(){
    this.isLoading = true;
    this.apiRequest.getAllCategories()
      .subscribe(
        res => this.categories = res
        ,()=> {}
        ,()=> this.isLoading = false
      );
  }
  
  private getUpdateItemId(id){
    let element = document.getElementById('item-' + id);
   
    this.editCategoryDisabled = !this.editCategoryDisabled;
    return element;
  }

  enableUpdateItem(id){
    let element =  this.getUpdateItemId(id);
    if (!this.editCategoryDisabled) setTimeout( () =>  element.focus() ,100);
  }

  updateItem(name:string , id:number){
    let itemIndex = this.categories.findIndex( item =>{ return item.id === id });
    let item = this.categories.filter(res => res.id === id)[0];
    let oldName = this.categories[itemIndex].name;
    this.categories[itemIndex].name = name;
   
    this.editCategoryDisabled = !this.editCategoryDisabled;
    
    this.apiRequest.updateCategory(id, {name}).subscribe(
      data=> {
        this.assets.addSuccess();
        this.categories.splice(itemIndex, 1, item);
        
      },error => {
        this.snackBar.open('حدثت مشكلة أثناء تعديل القسم برجاء المحاولة مرة أخرى', `` , {duration: 1500})
        this.categories[itemIndex].name = oldName;
      }
    );
  }

  deleteAlert(id){
    this.assets.deleteAlert(id).subscribe(res=> res? this.deleteCategory(id): false );
  }

  private deleteCategory(id){
    let itemIndex = this.categories.findIndex( item =>{ return item.id === id });
    let item = this.categories.filter(res=> res.id === id)[0];
    this.categories.splice(itemIndex, 1);
    
    this.apiRequest.deleteCategory(id)
     .subscribe(
       res=> this.assets.deleteSuccess(), 
      
       () => {
        this.snackBar.open('لم يتم حذف القسم برجاء المحاولة مرة أخرى', `` ,{duration: 1500})
        this.categories.splice(itemIndex, 0, item);
       }
    );
  }

  // private resetInputs(){
  //   this.imageFile = null;
  // }

  imageUpload(event){
    if(event.target.files){
      this.imageFile = event.target.files[0];
    }
  }
  
  addCategory(data){
    delete data.img;
    this.newCategory.append("name", data.name);
    this.newCategory.append("img", this.imageFile, this.imageFile.name);
    
    this.apiRequest.addCategory(this.newCategory)
    
      .subscribe((res: {data}) => {
        this.assets.addSuccess().afterDismissed().subscribe(res=>{location.reload();});
      }, () =>  this.snackBar.open('حدثت مشكلة بالاتصال بالسيرفر برجاء المحاولة مرة أخرى', `` , {duration: 1500})
    );
  }
  
  editImage(cat){
    this.dialog.open(EditCatDialogComponent, {
      data: {cat}
    });
  }
}