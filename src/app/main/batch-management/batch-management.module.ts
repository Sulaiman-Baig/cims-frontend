import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseSharedModule } from '@fuse/shared.module';

// Material Modules
import {
    MatListModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatSliderModule,
    MatStepperModule,
    MatDialogModule,
    MatButtonModule,
    MatChipsModule,
    MatRippleModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatSlideToggleModule
} from '@angular/material';
import { CreateBatchComponent } from './create-batch/create-batch.component';
import { UpcomingBatchComponent } from './upcoming-batch/upcoming-batch.component';
import { RecentlyStartedBatchComponent } from './recently-started-batch/recently-started-batch.component';
import { InProgressBatchComponent } from './in-progress-batch/in-progress-batch.component';
import { RecentlyEndedBatchComponent } from './recently-ended-batch/recently-ended-batch.component';
import { EndedBatchComponent } from './ended-batch/ended-batch.component';
import { CreateBatchDialogComponent } from './create-batch-dialog/create-batch-dialog.component';
import { StudentsByBatchComponent } from './students-by-batch/students-by-batch.component';

const routes = [
    {
        path: 'create',
        component: CreateBatchComponent
    },
    {
        path: 'students-by-batch',
        component: StudentsByBatchComponent
    },
    {
        path: 'up-coming',
        component: UpcomingBatchComponent
    },
    {
        path: 'recently-started',
        component: RecentlyStartedBatchComponent
    },
    {
        path: 'in-progress',
        component: InProgressBatchComponent
    },
    {
        path: 'recently-ended',
        component: RecentlyEndedBatchComponent
    },
    {
        path: 'ended',
        component: EndedBatchComponent
    },

];

@NgModule({
    declarations: [
        CreateBatchComponent,
        UpcomingBatchComponent,
        RecentlyStartedBatchComponent,
        InProgressBatchComponent,
        RecentlyEndedBatchComponent,
        EndedBatchComponent,
        CreateBatchDialogComponent,
        StudentsByBatchComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FuseSharedModule,

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
        CreateBatchDialogComponent
    ]
})
export class BatchManagementModule { }
