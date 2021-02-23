import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
    MatStepperModule
} from '@angular/material';
import { MatDialogModule } from '@angular/material';


// custom 
import { CreateEnquiryComponent } from './create-enquiry/create-enquiry.component';
import { BulkImportEnquiryComponent } from './bulk-import-enquiry/bulk-import-enquiry.component';
import { TodaysFollowupComponent } from './followup/todays-followup/todays-followup.component';
import { TodaysEnquiriesComponent } from './followup/todays-enquiries/todays-enquiries.component';
import { ProspectiveComponent } from './followup/pipeline/prospective/prospective.component';
import { NeedAnalysisComponent } from './followup/pipeline/need-analysis/need-analysis.component';
import { ProposalComponent } from './followup/pipeline/proposal/proposal.component';
import { NegociationComponent } from './followup/pipeline/negociation/negociation.component';
import { SuccessfullyEnrolledComponent } from './successfully-enrolled/successfully-enrolled.component';
import { NotInterestedComponent } from './not-interested/not-interested.component';
import { EnquiryReportsComponent } from './enquiry-reports/enquiry-reports.component';
import { CreateEnquiryDialogComponent } from './create-enquiry/create-enquiry-dialog/create-enquiry-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseSharedModule } from '@fuse/shared.module';
import { VoiceCallComponent } from './actions/voice-call/voice-call.component';
import { SendSmsComponent } from './actions/send-sms/send-sms.component';
import { SendEmailComponent } from './actions/send-email/send-email.component';
import { WalkInComponent } from './actions/walk-in/walk-in.component';
import { TransferEnquiryComponent } from './actions/transfer-enquiry/transfer-enquiry.component';
import { EnquiryToAdmissionComponent } from './actions/enquiry-to-admission/enquiry-to-admission.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { EnquiryDetailsComponent } from './enquiry/tabs/enquiry-details/enquiry-details.component';
import { EnquiryHistoryComponent } from './enquiry/tabs/enquiry-history/enquiry-history.component';
// import { CreateAdmissionDialogComponent } from '../admission-management/create-admission/create-admission-dialog/create-admission-dialog.component';
import { UpdateEnquiryComponent } from './update-enquiry/update-enquiry.component';
import { FollowupsToEnquiryComponent } from './followups-to-enquiry/followups-to-enquiry.component';


const routes = [
    {
        path: 'create',
        component: CreateEnquiryComponent
    },
    {
        path: 'followups-to-enquiry/:enquiryId',
        component: FollowupsToEnquiryComponent
    },
    {
        path: 'enquiry/:id',
        component: EnquiryComponent
    },
    {
        path: 'bulk-import',
        component: BulkImportEnquiryComponent
    },
    {
        path: 'todaysfollowup',
        component: TodaysFollowupComponent
    },
    {
        path: 'todaysenquiries',
        component: TodaysEnquiriesComponent
    },
    {
        path: 'prospective',
        component: ProspectiveComponent
    },
    {
        path: 'needanalysis',
        component: NeedAnalysisComponent
    },
    {
        path: 'proposal',
        component: ProposalComponent
    },
    {
        path: 'negociation',
        component: NegociationComponent
    },
    {
        path: 'successfullyenrolled',
        component: SuccessfullyEnrolledComponent
    },
    {
        path: 'notinterested',
        component: NotInterestedComponent
    },
    {
        path: 'reports',
        component: EnquiryReportsComponent
    },
];


@NgModule({
    declarations: [

        CreateEnquiryComponent,
        BulkImportEnquiryComponent,
        TodaysFollowupComponent,
        TodaysEnquiriesComponent,
        ProspectiveComponent,
        NeedAnalysisComponent,
        ProposalComponent,
        NegociationComponent,
        SuccessfullyEnrolledComponent,
        NotInterestedComponent,
        EnquiryReportsComponent,
        CreateEnquiryDialogComponent,
        VoiceCallComponent,
        SendSmsComponent,
        SendEmailComponent,
        WalkInComponent,
        TransferEnquiryComponent,
        EnquiryToAdmissionComponent,
        EnquiryComponent,
        EnquiryDetailsComponent,
        EnquiryHistoryComponent,
        // CreateAdmissionDialogComponent,
        UpdateEnquiryComponent,
        FollowupsToEnquiryComponent
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
        MatTabsModule,
        MatStepperModule
    ],
    entryComponents: [
        CreateEnquiryDialogComponent,
        VoiceCallComponent,
        SendSmsComponent,
        SendEmailComponent,
        WalkInComponent,
        TransferEnquiryComponent,
        EnquiryToAdmissionComponent,
        // CreateAdmissionDialogComponent,
        UpdateEnquiryComponent
    ]
})
export class EnquiryManagementModule { }
