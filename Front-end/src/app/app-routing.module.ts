import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ItemComponent } from './item/item.component';
import { OrderComponent } from './order/order.component';
const routes: Routes = [
  { path: '', component:  LandingPageComponent }, 
  {path:'signup',component: SignupComponent},
  {path: 'login', component:LoginComponent},
  {path:'menu', component:MenuComponent},
  {path:'item',component:ItemComponent},
  {path:'order',component:OrderComponent}

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
