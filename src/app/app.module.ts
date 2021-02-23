import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';



import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
// import { SampleModule } from 'app/main/sample/sample.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material';
import { AuthGuard } from './main/auth/auth.guard';
import { NotOwnerPlusAuthGuard} from './main/auth/notownerplusauth.guard';
import { CookieService } from 'ngx-cookie-service';
import { TokenInterceptor } from './main/auth/token-interceptor';
import { Error404Component } from './main/pages/errors/404/error-404.component';
import { from } from 'rxjs';


const appRoutes: Routes = [
    {
        path        : 'dashboard',
        loadChildren: './main/dashboards/project/project-dashboard.module#ProjectDashboardModule',
        canActivateChild: [AuthGuard]
    },
    {
        path        : 'login',
        loadChildren: './main/auth/auth.module#AuthModule'
    },
    {
        path        : 'user',
        loadChildren: './main/user-management/user-management.module#UserManagementModule',
        canActivateChild: [NotOwnerPlusAuthGuard]
        
    },
    {
        path        : 'employee',
        loadChildren: './main/employee-management/employee-management.module#EmployeeManagementModule',
        canActivateChild: [NotOwnerPlusAuthGuard]
        
    },
    {
        path        : 'enquiry',
        loadChildren: './main/enquiry-management/enquiry-management.module#EnquiryManagementModule',
        canActivateChild: [AuthGuard]
        
    },
    {
        path        : 'admission',
        loadChildren: './main/admission-management/admission-management.module#AdmissionManagementModule',
        canActivateChild: [AuthGuard]
        
    },
    {
        path        : 'course',
        loadChildren: './main/course-management/course-management.module#CourseManagementModule',
        canActivateChild: [AuthGuard]
        
    },
    {
        path        : 'campus',
        loadChildren: './main/campus-management/campus-management.module#CampusManagementModule',
        canActivateChild: [NotOwnerPlusAuthGuard]
        
    },
    {
        path        : 'batch',
        loadChildren: './main/batch-management/batch-management.module#BatchManagementModule',
        canActivateChild: [AuthGuard]
        
    },
    {
        path        : 'event',
        loadChildren: './main/event-management/event-management.module#EventManagementModule',
        canActivateChild: [AuthGuard]
        
    },
    
    {
        path      : '404',
        loadChildren: './main/pages/errors/404/error-404.module#Error404Module',
        canActivateChild: [AuthGuard]
    },
    {
        path      : 'student',
        loadChildren: './main/student-management/student-management.module#StudentManagementModule',
        canActivateChild: [AuthGuard]
    },
    {
        path      : '**',
        redirectTo: '404/not-found'
    }
    
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,      
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,
        MatIconModule,
        MatSnackBarModule,

      
        

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        // SampleModule
    ]
    ,
    providers: [
        CookieService, 
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
