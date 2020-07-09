import { Categories } from './../../interfaces/categories';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AssetsService } from 'src/app/services/assets.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCatDialogComponent } from './../edit-cat-dialog/edit-cat-dialog.component';
import { AddSubCatComponent } from './../../add-sub-cat/add-sub-cat.component';

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
  
  private getUpdateCatId(id, idPrefix){
    let element = document.getElementById(idPrefix + id);
   
    this.editCategoryDisabled = !this.editCategoryDisabled;
    return element;
  }

  enableItemUpdate(catId, idPrefix){
    let element =  this.getUpdateCatId(catId, idPrefix);
    if (!this.editCategoryDisabled) setTimeout( () =>  element.focus() ,100);
  }

  updateCat(name:string , id:number){
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
        // console.log(error);

        this.snackBar.open('حدثت مشكلة أثناء تعديل القسم برجاء المحاولة مرة أخرى', `` , {duration: 1500})
        this.categories[itemIndex].name = oldName;
      }
    );
  }

  updateSubCat(name:string , catId:number, subCatId:number){  
    this.apiRequest.updateSubCategory(subCatId, {name,category_id:catId }).subscribe(
      data=> 
         this.assets.addSuccess().afterDismissed().subscribe(res=> { location.reload()})
       
      ,error =>
        this.snackBar.open('حدثت مشكلة أثناء تعديل القسم برجاء المحاولة مرة أخرى', `` , {duration: 1500})
      
    );
  }

  
  deleteAlert(id , type){
    this.assets.deleteAlert(id).subscribe(res=>  {
      if(type ==="cat")
       return res? this.deleteCategory(id): false

      else if(type ==="subCat")
       return res? this.deleteSubCategory(id): false

    } );
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

  
  private deleteSubCategory(id){
    this.apiRequest.deleteSubCategory(id)
     .subscribe(
       res=> {
         this.assets.deleteSuccess(); 
         location.reload();
        },      
       () => {
        this.snackBar.open('لم يتم حذف القسم برجاء المحاولة مرة أخرى', `` ,{duration: 1500})
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
 
  addSubCat(id){
      this.dialog.open(AddSubCatComponent,{
        data: id,
        width: '40%',
        height: '300px'
      });
  }
  
  editImage(cat){
    this.dialog.open(EditCatDialogComponent, {
      data: {cat}
    });
  }
}