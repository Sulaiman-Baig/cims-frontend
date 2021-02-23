import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FuseSharedModule } from '@fuse/shared.module';

import { LoginComponent } from './login/login.component';


import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token-interceptor';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
// import { AuthChildGuard } from './auth-child';

const routes = [
    {
        path: '',
        component: LoginComponent
    },
     
    // {
    //     path: '**',
    //     redirectTo: 'login',
    //     canActivate: [AuthChildGuard]
    // },
   
];



@NgModule({
    declarations: [LoginComponent, ResetPasswordComponent],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,

    ],
    providers: [CookieService, {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
    }],
})
export class AuthModule { }
