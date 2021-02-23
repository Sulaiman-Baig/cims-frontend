import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


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
    MatTooltipModule,
    MatDividerModule,
    MatStepperModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatSnackBarModule
} from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseSharedModule } from '@fuse/shared.module';

// custom 
import { StudentComponent } from './student/student.component';
import { StudentPersonalDetailsComponent } from './student/tabs/student-personal-details/student-personal-details.component';
import { StudentsComponent } from './students/students.component';
import { StudentAcademicRecordsComponent } from './student/tabs/student-academic-records/student-academic-records.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { CoursesByStudentComponent } from './student/tabs/courses-by-student/courses-by-student.component';
import { FuseHighlightModule, FuseDemoModule } from '@fuse/components';
import { TransferBatchDialogComponent } from './student/transfer-batch-dialog/transfer-batch-dialog.component';
import { TransferCampusDialogComponent } from './student/transfer-campus-dialog/transfer-campus-dialog.component';
import { FreezedStudentsComponent } from './freezed-students/freezed-students.component';
import { SuspendedStudentsComponent } from './suspended-students/suspended-students.component';
import { AlumnusStudentsComponent } from './alumnus-students/alumnus-students.component';
import { PrintFeeSlipComponent } from './student/print-fee-slip/print-fee-slip.component';
import { CreateFeeSlipComponent } from './student/create-fee-slip/create-fee-slip.component';


const routes = [
    {
        path: 'students',
        component: StudentsComponent
    },
    {
        path: 'freezed',
        component: FreezedStudentsComponent
    },
    {
        path: 'suspended',
        component: SuspendedStudentsComponent
    },
    {
        path: 'alumnus',
        component: AlumnusStudentsComponent
    },
    {
        path: 'profile/:studentId',
        component: StudentComponent
    },
    {
        path: 'print-fee-slip',
        component: PrintFeeSlipComponent
    },
    {
        path: 'create-fee-slip/:installmentId',
        component: CreateFeeSlipComponent
    },

];


@NgModule({
    declarations: [
        StudentComponent,
        StudentPersonalDetailsComponent,
        StudentsComponent,
        StudentAcademicRecordsComponent,
        EnrollmentComponent,
        CoursesByStudentComponent,
        TransferBatchDialogComponent,
        TransferCampusDialogComponent,
        FreezedStudentsComponent,
        SuspendedStudentsComponent,
        AlumnusStudentsComponent,
        PrintFeeSlipComponent,
        CreateFeeSlipComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        FormsModule,
        ReactiveFormsModule,
        FuseSharedModule,

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
        MatTooltipModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatStepperModule,
        MatMenuModule,
        NgxChartsModule,
        FuseDemoModule,
        MatSnackBarModule

    ],
    entryComponents: [
        EnrollmentComponent,
        TransferBatchDialogComponent,
        TransferCampusDialogComponent
    ]
})
export class StudentManagementModule { }
