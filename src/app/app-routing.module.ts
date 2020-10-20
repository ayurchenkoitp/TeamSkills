import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppGuardGuard } from './app-guard.guard';

const routes: Routes = [
  { path: '',   redirectTo: '/auth/login', pathMatch: 'full' }, // redirect to home
  { path: 'auth', loadChildren: () => import('./ui/auth/auth.module').then(m => m.AuthModule) },
  { path: 'profile', loadChildren: () => import('./ui/profile/profile.module').then(m => m.ProfileModule)/*, canActivate: [AppGuardGuard]*/ },
  { path: '**', redirectTo: '/auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
