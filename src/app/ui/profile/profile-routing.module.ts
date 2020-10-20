import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppGuardGuard } from 'src/app/app-guard.guard';
import { ConfirmRestoredPasswordComponent } from './confirm-restored-password/confirm-restored-password.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';



const routes: Routes = [
  {path:'restorepass', component: RestorePasswordComponent},
  {path:'restorepassconfirm/:username', component: ConfirmRestoredPasswordComponent},
  {path:'user', component: UserProfileComponent, canActivate: [AppGuardGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }
