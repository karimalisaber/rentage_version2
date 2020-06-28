import { MaterialModule, materialEntryComponents } from './modules/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ChartModule }     from 'angular2-highcharts'; 
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { AddsComponent } from './components/adds/adds.component';
import { ClientsComponent } from './components/clients/clients.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BlockedOrdersComponent } from './components/blocked-orders/blocked-orders.component';
import { AcceptedOrdersComponent } from './components/accepted-orders/accepted-orders.component';
import { LastedUsersComponent } from './components/lasted-users/lasted-users.component';
import { LoginComponent } from './components/login/login.component';
import { RightWidgetComponent } from './components/assets/right-widget/right-widget.component';
import { ChartComponent } from './components/assets/chart/chart.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { LoginWrapperComponent } from './components/login-wrapper/login-wrapper.component';
import { PasswordSentComponent } from './components/password-sent/password-sent.component';
import { ChatComponent } from './components/chat/chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllChatsComponent } from './components/all-chats/all-chats.component';
import { SpecificChatComponent } from './components/specific-chat/specific-chat.component';
import { AllMessagesComponent } from './components/chat/all-messages/all-messages.component';
import { SpecificMessageComponent } from './components/chat/specific-message/specific-message.component';
import { ViewChatsComponent } from './components/chat/view-chats/view-chats.component';
import { OrderWrapperComponent } from './components/order-wrapper/order-wrapper.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';
import { MembersSettingsComponent } from './components/members-settings/members-settings.component';
import { SliderSettingsComponent } from './components/slider-settings/slider-settings.component';
import { UserReviewsComponent as ReviewsComponent } from './components/user-reviews/user-reviews.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ApiService } from './services/api.service';
// import {MatIconModule} from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { DeleteDialogComponentComponent } from './components/assets/delete-dialog-component/delete-dialog-component.component';
import { FormsModule } from '@angular/forms';
import { ViewProductDialogComponent } from './components/view-product-dialog/view-product-dialog.component';
import { MonthChartComponent } from './components/assets/month-chart/month-chart.component';
import { YearChartComponent } from './components/assets/year-chart/year-chart.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { SearchComponent } from './components/search/search.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import {  LightboxModule } from 'ngx-lightbox';
import { EditCatDialogComponent } from './components/edit-cat-dialog/edit-cat-dialog.component';
import { ClientChatComponent } from './components/client-chat/client-chat.component';
import { SpecificClientChatComponent } from './components/specific-client-chat/specific-client-chat.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

declare var require: any;
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    AddsComponent,
    ClientsComponent,
    SettingsComponent,
    BlockedOrdersComponent,
    AcceptedOrdersComponent,
    LastedUsersComponent,
    LoginComponent,
    RightWidgetComponent,
    ChartComponent,
    DashboardComponent,
    ForgetPasswordComponent,
    LoginWrapperComponent,
    PasswordSentComponent,
    ChatComponent,
    AllChatsComponent,
    SpecificChatComponent,
    AllMessagesComponent,
    SpecificMessageComponent,
    ViewChatsComponent,
    OrderWrapperComponent,
    AdminSettingsComponent,
    MembersSettingsComponent,
    SliderSettingsComponent,
    ReviewsComponent,
    ProductsComponent,
    CategoriesComponent,
    AddCategoryComponent,
    DeleteDialogComponentComponent,
    MonthChartComponent,
    YearChartComponent,
    AddItemComponent,
    UserOrdersComponent,
    SearchComponent,
    EditCatDialogComponent,
    ClientChatComponent,
    SpecificClientChatComponent,
    SnackbarComponent,


  ],
  entryComponents:[
    materialEntryComponents,
    ViewProductDialogComponent
  ],
  imports: [
 
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    CarouselModule,
    LightboxModule,
    ChartModule.forRoot(require('highcharts')),
  ],
  providers: [
    ApiService,
    AuthService,
    AuthGuardService
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
