import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Modules

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { FuseSharedModule } from '@fuse/shared.module';
import {
    MatListModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatSliderModule,
    MatStepperModule
} from '@angular/material';
import { MatDialogModule } from '@angular/material';

// CUSTOM 
import { ShowUserComponent } from './show-user/show-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';


const routes = [
    {
        path: 'show',
        component: ShowUserComponent
    },
    // {
    //     path: 'create',
    //     component: CreateUserComponent
    // },

];

@NgModule({
    declarations: [ShowUserComponent, CreateUserComponent, CreateUserDialogComponent],
    imports: [
        CommonModule,
        FuseSharedModule,
        RouterModule.forChild(routes),

        FormsModule,
        ReactiveFormsModule,

        // Material
        MatButtonModule,
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatListModule,
        MatToolbarModule,
        MatDatepickerModule,
        MatSliderModule,
        MatStepperModule
    ],
    entryComponents: [
        CreateUserDialogComponent
    ]
})
export class UserManagementModule { }
