import { NgModule } from "@angular/core";
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { ConfirmRestoredPasswordComponent } from './confirm-restored-password/confirm-restored-password.component';
import { UserProfileComponent, UserProfileComponentDialog } from './user-profile/user-profile.component';


@NgModule({
    declarations: [
        RestorePasswordComponent,
        ConfirmRestoredPasswordComponent,
        UserProfileComponent,
        UserProfileComponentDialog
    ],
    imports: [ProfileRoutingModule, SharedModule, HttpClientModule],
}
)

export class ProfileModule{
}