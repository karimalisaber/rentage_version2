import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-edit-cat-dialog',
  templateUrl: './edit-cat-dialog.component.html',
  styleUrls: ['./edit-cat-dialog.component.scss']
})

export class EditCatDialogComponent  {
  category;
  imgUrl;
  imageFile: any = null; // for uploaded image
  imgChanged: boolean = false;
  
  item: FormData = new FormData();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private api: ApiService
  ) { }

  ngOnInit() {
    console.log(this.data);
    
    this.api.getSpecificCategory(this.data.cat.id).subscribe(res => {
      this.category = res;
      this.imgUrl = 'http://rentage.clicktopass.com/public/category/' + this.data.cat.img;
      console.log(res)
      
      
    });
  }


  imageUpload(event) {
    if (event.target.files) {
      this.imgChanged = true;
      this.imageFile = event.target.files[0];

      var render = new FileReader();
      render.readAsDataURL(this.imageFile);
      render.onload = (event: any) => this.imgUrl = event.target.result;
    }
  }

  updateSlider(category) {
    this.item.append("name", category.name);

    if(this.imageFile)
      this.item.append("update_img", this.imageFile, this.imageFile.name );
    
    this.api.updateCategory(this.data.cat.id, this.item)
      .subscribe(
        () =>  {
          this.snackBar.open('تم تعديل القسم بنجاح', `` , {duration: 1500})
          location.reload();
        },
        () =>  this.snackBar.open('حدثت مشكلة بالاتصال بالسيرفر برجاء المحاولة مرة أخرى', `` , {duration: 1500})
      );
  
  }
}
