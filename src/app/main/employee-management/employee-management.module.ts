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
import { FileUploadModule } from 'ng2-file-upload';
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
import { ShowEmployeeComponent } from './show-employee/show-employee.component';
import { CreateEmployeeDialogComponent } from './create-employee-dialog/create-employee-dialog.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';

const routes = [
    {
        path: 'show',
        component: ShowEmployeeComponent
    },
    {
        path: 'create',
        component: CreateEmployeeComponent
    },
];

@NgModule({
  declarations: [ShowEmployeeComponent, CreateEmployeeDialogComponent, CreateEmployeeComponent],
  imports: [
    CommonModule,
    FuseSharedModule,
    RouterModule.forChild(routes),

    FormsModule,
    FileUploadModule,
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
    CreateEmployeeDialogComponent
]
})
export class EmployeeManagementModule { }
