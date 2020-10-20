import { NgModule } from "@angular/core";
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmEmailComponent } from './pages/confirm-email/confirm-email.component';


@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
        ConfirmEmailComponent
    ],
    imports: [AuthRoutingModule, SharedModule, HttpClientModule],
    
}
)

export class AuthModule{
}