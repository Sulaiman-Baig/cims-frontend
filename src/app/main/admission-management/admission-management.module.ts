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
import {
    MatListModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatSliderModule,
    MatStepperModule
} from '@angular/material';
import { MatDialogModule } from '@angular/material';

// Custom
import { CreateAdmissionComponent } from './create-admission/create-admission.component';
import { CreateAdmissionDialogComponent } from './create-admission/create-admission-dialog/create-admission-dialog.component';
import { TodaysAdmissionsComponent } from './todays-admissions/todays-admissions.component';
import { MonthAdmissionsComponent } from './month-admissions/month-admissions.component';
import { YearAdmissionsComponent } from './year-admissions/year-admissions.component';
import { AllAdmissionsComponent } from './all-admissions/all-admissions.component';
import { FuseSharedModule } from '@fuse/shared.module';

const routes = [
    {
        path: 'create',
        component: CreateAdmissionComponent
    },
    {
        path: 'all',
        component: AllAdmissionsComponent
    },
    {
        path: 'today',
        component: TodaysAdmissionsComponent
    },
    {
        path: 'currentmonth',
        component: MonthAdmissionsComponent
    },
    {
        path: 'currentyear',
        component: YearAdmissionsComponent
    },

];


@NgModule({
    declarations: [
        CreateAdmissionComponent,
        CreateAdmissionDialogComponent,
        TodaysAdmissionsComponent,
        MonthAdmissionsComponent,
        YearAdmissionsComponent,
        AllAdmissionsComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        FormsModule,
        FuseSharedModule,
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
        CreateAdmissionDialogComponent
    ]
})
export class AdmissionManagementModule { }
