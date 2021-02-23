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



// CUSTOM
import { CreateCampusComponent } from './create-campus/create-campus.component';
import { ManageCampusComponent } from './manage-campus/manage-campus.component';
import { AllCampusComponent } from './all-campus/all-campus.component';
import { SuspendedCampusComponent } from './suspended-campus/suspended-campus.component';
import { CreateCampusDialogComponent } from './create-campus/create-campus-dialog/create-campus-dialog.component';
import { ShowCampusComponent } from './show-campus/show-campus.component';


const routes = [
    {
        path: 'show',
        component: ShowCampusComponent
    },
    {
        path: 'create',
        component: CreateCampusComponent
    },
    {
        path: 'manage',
        component: ManageCampusComponent
    },
    {
        path: 'suspended',
        component: SuspendedCampusComponent
    },
    {
        path: 'all',
        component: AllCampusComponent
    },
    // {
    //     path: 'prospective',
    //     component: ProspectiveComponent
    // },
    // {
    //     path: 'needanalysis',
    //     component: NeedAnalysisComponent
    // },
    // {
    //     path: 'proposal',
    //     component: ProposalComponent
    // },
    // {
    //     path: 'negociation',
    //     component: NegociationComponent
    // },
    // {
    //     path: 'successfullyenrolled',
    //     component: SuccessfullyEnrolledComponent
    // },
    // {
    //     path: 'notinterested',
    //     component: NotInterestedComponent
    // },
    // {
    //     path: 'reports',
    //     component: EnquiryReportsComponent
    // },
];

@NgModule({
    declarations: [CreateCampusComponent,
        ManageCampusComponent,
        AllCampusComponent,
        SuspendedCampusComponent,
        CreateCampusDialogComponent,
        ShowCampusComponent],
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
        CreateCampusDialogComponent
    ]
})
export class CampusManagementModule { }
