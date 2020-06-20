import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map, take} from "rxjs/operators";
import { getAllCategoriesUrl, getAllSlidersUrl, getSpecificSlidersUrl, addSliderUrl, deleteSliderUrl, deleteCategoryUrl, deletePostUrl, updateCategoryNameUrl, getAllNewPostesUrl, getAllAcceptedPostesUrl, getAllCatPostesUrl, getUserListUrl, getSpecificUserChatUrl, getSpecificRoomUrl, addCategoryUrl, acceptOrderUrl, getSpecificCategoryUrl } from 'src/assets/environment/environmentVariables';
import { Categories } from '../interfaces/categories';
import { Slider } from '../interfaces/slider';
  
@Injectable({
  providedIn: 'root'
})


export class ApiService {

  constructor(private  http: HttpClient) { }

  getAllCategories(): Observable<Categories[]>{
    return this.http.get(getAllCategoriesUrl).pipe(map((res:any)=>res.data));
  }

  
  getSpecificCategory(id){
    return this.http.get(getSpecificCategoryUrl+id).pipe(map((res:any)=>res.data));
  }

  getAllSliders(): Observable<Slider[]>{
    return this.http.get(getAllSlidersUrl).pipe(map((res:any)=>res.data));
  }

  getSpecificSliders(id): Observable<Slider>{
    return this.http.get(getSpecificSlidersUrl + id).pipe(map((res:any)=>res.data));
  }

  // add something  
  addSlider(slider){
    return this.http.post(addSliderUrl, slider).pipe(take(1));
  }

  addCategory(category){
    return this.http.post(addCategoryUrl, category).pipe(take(1));
  }

  
  // delete something 
  deleteSlider(id){
    return this.http.delete(deleteSliderUrl +id).pipe(take(1));
  }

  deleteCategory(id){
    return this.http.delete(deleteCategoryUrl +id).pipe(take(1));
  }

  
  deletePost(id){
    return this.http.delete(deletePostUrl +id).pipe(take(1));
  }
  
  // updatesomthing
  updateCategory(id , item){
    return this.http.post(updateCategoryNameUrl + id, item)
  }

  acceptPost(id){
    return this.http.put(acceptOrderUrl + id, {})
  }

  // get new orders
  getNewPosts(pageNumber){
    return this.http.get(getAllNewPostesUrl + pageNumber).pipe(map((res: any)=>res.data), take(1));
  }

  getAcceptedPosts(pageNumber){
    return this.http.get(getAllAcceptedPostesUrl + pageNumber).pipe(map((res: any)=>res.data), take(1));
  }
  
  getCatPosts(id, pageNumber){
    return this.http.get(getAllCatPostesUrl + id + '?page=' + pageNumber).pipe(map((res: any)=>res.data), take(1));
  }
  
  // user list 
  getUserList(){
    return this.http.get(getUserListUrl).pipe(map((res: any)=>res.data), take(1));
  }
  

  // chat 
  getSpecificUserChat(id){
    return this.http.get(getSpecificUserChatUrl + id).pipe(map((res: any)=>res.data), take(1));
  }

  getSpecificRoom(id){
    return this.http.get(getSpecificRoomUrl + id).pipe(map((res: any)=>res.data), take(1));
  }

}