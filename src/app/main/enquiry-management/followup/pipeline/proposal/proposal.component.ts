import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { EnquiryManagementService } from '../../../enquiry-management.service';
import { Router } from '@angular/router';
import io from 'socket.io-client';
import { environment } from 'environments/environment';
import { Enquiry } from '../../../enquiry.model';
import { VoiceCallComponent } from 'app/main/enquiry-management/actions/voice-call/voice-call.component';
import { SendSmsComponent } from 'app/main/enquiry-management/actions/send-sms/send-sms.component';
import { SendEmailComponent } from 'app/main/enquiry-management/actions/send-email/send-email.component';
import { WalkInComponent } from 'app/main/enquiry-management/actions/walk-in/walk-in.component';
import { EnquiryToAdmissionComponent } from 'app/main/enquiry-management/actions/enquiry-to-admission/enquiry-to-admission.component';
import { TransferEnquiryComponent } from 'app/main/enquiry-management/actions/transfer-enquiry/transfer-enquiry.component';
import { CreateAdmissionDialogComponent } from 'app/main/admission-management/create-admission/create-admission-dialog/create-admission-dialog.component';
import { TokenService } from 'app/main/auth/token.service';

@Component({
    selector: 'app-proposal',
    templateUrl: './proposal.component.html',
    styleUrls: ['./proposal.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProposalComponent implements OnInit {

    url = environment.baseUrl;
    socket: any;
    dataSource;
    displayedColumns = ['Name', 'Course', 'Contact', 'Email', 'Campus', 'Status', 'Actions'];
    ELEMENT_DATA: Enquiry[] = [];
    campusId: string;


    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private dialog: MatDialog,
        private matSnackBar: MatSnackBar,
        private enquiryService: EnquiryManagementService,
        private router: Router,
        private tokenService: TokenService

    ) {
        this.socket = io(this.url);
    }

    ngOnInit(): any {
        this.campusId = this.tokenService.GetCampusId();
        this.enquiryService.getAllProposalEnquiriesByCampus(this.campusId).subscribe((enqRes: Enquiry[]) => {
            if (enqRes.length === 0) {
                this.matSnackBar.open('No Proposal Enquiry Found', null, {
                    duration: 3000
                });
            }
            this.ELEMENT_DATA = enqRes;
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;
            // console.log(enqRes);
        });

        this.socket.on('refreshInquiry', () => {
            this.campusId = this.tokenService.GetCampusId();
            this.enquiryService.getAllProposalEnquiriesByCampus(this.campusId).subscribe((enqRes: Enquiry[]) => {
                if (enqRes.length === 0) {
                    this.matSnackBar.open('No Proposal Enquiry Found', null, {
                        duration: 3000
                    });
                }
                this.ELEMENT_DATA = enqRes;
                this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                this.dataSource.paginator = this.paginator;
                // console.log(enqRes);
            });
        });
    }

    onCall(enquiry): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { enquiry };
        const dialogRef = this.dialog.open(VoiceCallComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data.close === 'closeAfterSaved') {
                this.socket.emit('refresh', {});
                this.ngOnInit();
            }
        });
    }

    onSendSMS(enquiry): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { enquiry };
        const dialogRef = this.dialog.open(SendSmsComponent, dialogConfig);
    }

    onSendEmail(enquiry): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { enquiry };
        const dialogRef = this.dialog.open(SendEmailComponent, dialogConfig);
    }

    onWalkIn(enquiry): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { enquiry };
        const dialogRef = this.dialog.open(WalkInComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data.close === 'closeAfterSaved') {
                this.socket.emit('refresh', {});
                this.ngOnInit();
            }
        });
    }

    onEnquiryToAdmission(enquiry): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { enquiry };
        const dialogRef = this.dialog.open(CreateAdmissionDialogComponent, dialogConfig);
    }

    onTransferEnquiry(enquiry): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { enquiry };
        const dialogRef = this.dialog.open(TransferEnquiryComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data.close === 'closeAfterSaved') {
                this.ngOnInit();
            }
        });
    }

}
