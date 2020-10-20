import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';



const routes: Routes = [
  {path:'signup', component: SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'confirmemail/:username', component:ConfirmEmailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
