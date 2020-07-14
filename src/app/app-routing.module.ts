import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AddsComponent } from './components/adds/adds.component';
import { ClientsComponent } from './components/clients/clients.component';
import { BlockedOrdersComponent } from './components/blocked-orders/blocked-orders.component';
import { AcceptedOrdersComponent } from './components/accepted-orders/accepted-orders.component';
import { LastedUsersComponent } from './components/lasted-users/lasted-users.component';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { LoginWrapperComponent } from './components/login-wrapper/login-wrapper.component';
import { PasswordSentComponent } from './components/password-sent/password-sent.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChatComponent } from './components/chat/chat.component';
import { AdminSettingsComponent } from './components/admin-settings/admin-settings.component';
import { SliderSettingsComponent } from './components/slider-settings/slider-settings.component';
import { UserReviewsComponent } from './components/user-reviews/user-reviews.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ClientChatComponent } from './components/client-chat/client-chat.component';

import { AuthGuardService } from './services/auth-guard.service';
import { AllOwnersOrdersComponent } from './components/all-owners-orders/all-owners-orders.component';
import { SpecificClientChatComponent } from './components/specific-client-chat/specific-client-chat.component';
import { AllClientsOrdersComponent } from './components/all-clients-orders/all-clients-orders.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate:[AuthGuardService], children: [
    { path: '', redirectTo: '/admin', pathMatch: 'full'},
    {path: 'admin', component:  MainComponent},
    {path: 'messages', component:  ChatComponent},
    {path: 'messages/:id/:name', component:  ClientChatComponent, children:[
      {path: ':secondId/:secondName/:roomId', component:  SpecificClientChatComponent},

    ]},
    {path: 'adds', component:  AddsComponent},
    {path: 'clients', component:  ClientsComponent},
    {path: 'add-category', component:  AddCategoryComponent},

    {path: 'settings/sliders', component: SliderSettingsComponent},
    {path: 'settings/categories', component: CategoriesComponent},
    {path: 'settings/:type', component:  AdminSettingsComponent},
    {path: 'settings/:type', component: AdminSettingsComponent},
    
    {path: 'recieved_orders', component:  BlockedOrdersComponent},
    {path: 'owner_orders/:id/:name', component:  AllOwnersOrdersComponent},
    {path: 'clients_orders/:id/:name', component:  AllClientsOrdersComponent},
    {path: 'accepted-orders', component:  AcceptedOrdersComponent},
    {path: 'last-users', component:  LastedUsersComponent},
    {path: 'reviews', component:  UserReviewsComponent},
    {path: 'products/:cat_id', component:  ProductsComponent},
    // {path: 'products/:cat_id/:subCat_id', component:  ProductsComponent},
    
]},

  {path: 'login', component:  LoginWrapperComponent, children: [
  {path: '', component: LoginComponent },
  {path: 'forget-password', component:  ForgetPasswordComponent},
  {path: 'password-sent', component:  PasswordSentComponent}, 
]},
{path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
