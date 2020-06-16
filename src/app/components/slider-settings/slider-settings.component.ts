import { AssetsService } from './../../services/assets.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-slider-settings',
  templateUrl: './slider-settings.component.html',
  styleUrls: ['./slider-settings.component.scss']
})

export class SliderSettingsComponent implements OnInit { 
  slider: FormData = new FormData(); // for post new slider
  sliders;

  imageFile: any = null; // for uploaded image

  constructor(private apiRequest:ApiService, private snackBar: MatSnackBar, private assets: AssetsService) { }

  ngOnInit() {
    this.getSliders();
  }
  
  private getSliders(){
    this.apiRequest.getAllSliders().subscribe(res => this.sliders = res);
  }

  addSlider(){
      this.slider.append('img', this.imageFile, this.imageFile.name);
      
      this.apiRequest.addSlider(this.slider)
      .subscribe((res: {data}) => {
         this.sliders.push(res.data); // push to the view
         this.resetInputs(); // reset inputs

         this.snackBar.open('تم اضافة سلايدر جديد', `` , {duration: 1500})

    }, () =>  this.snackBar.open('حدثت مشكلة بالاتصال بالسيرفر برجاء المحاولة مرة أخرى', `` , {duration: 1500})
    );
  }

  private resetInputs(){
    this.imageFile = null;
  }

  deleteAlert(id){
    this.assets.deleteAlert(id).subscribe(res=> res? this.deleteSlider(id): false );
  }

  private deleteSlider(id){
    let itemIndex = this.sliders.findIndex( item =>{ return item.id === id });
    let item = this.sliders.filter(res=> res.id === id)[0];
    this.sliders.splice(itemIndex, 1);
    
    this.apiRequest.deleteSlider(id)
     .subscribe(
       res=> this.snackBar.open('تم حذف السلايدر بنجاح', `` , {duration: 1500}), 
      () => {
        this.snackBar.open('حدثت مشكلة بالاتصال بالسيرفر برجاء المحاولة مرة أخرى', `` ,{duration: 1500})
        this.sliders.splice(itemIndex, 0, item);
     }
    );
  }

  imageUpload(event){
    if(event.target.files)
      this.imageFile = event.target.files[0];
  }
}
