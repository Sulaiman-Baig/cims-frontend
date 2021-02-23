import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { EnquiryManagementService } from '../enquiry-management.service';
import { ActivatedRoute } from '@angular/router';
import io from 'socket.io-client';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { VoiceCallComponent } from '../actions/voice-call/voice-call.component';
import { SendSmsComponent } from '../actions/send-sms/send-sms.component';
import { SendEmailComponent } from '../actions/send-email/send-email.component';
import { WalkInComponent } from '../actions/walk-in/walk-in.component';
import { EnquiryToAdmissionComponent } from '../actions/enquiry-to-admission/enquiry-to-admission.component';
import { TransferEnquiryComponent } from '../actions/transfer-enquiry/transfer-enquiry.component';
import { CreateAdmissionDialogComponent } from 'app/main/admission-management/create-admission/create-admission-dialog/create-admission-dialog.component';
import { UpdateEnquiryComponent } from '../update-enquiry/update-enquiry.component';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-enquiry',
    templateUrl: './enquiry.component.html',
    styleUrls: ['./enquiry.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EnquiryComponent implements OnInit {
    enquiry: any;
    socket: any;
    url = environment.baseUrl;

    constructor(
        private enquiryService: EnquiryManagementService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
    ) {
        this.socket = io(this.url);
     }

    ngOnInit(): void {
        const enquiryId = this.route.snapshot.params.id;
        this.enquiryService.getEnquiryById(enquiryId).subscribe((enqRes: any) => {
            this.enquiry = enqRes;
            // console.log(enqRes);
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

    onSendSMS(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = this.enquiry;
        const dialogRef =  this.dialog.open(SendSmsComponent, dialogConfig);
    }

    onSendEmail(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = this.enquiry;
        const dialogRef =  this.dialog.open(SendEmailComponent, dialogConfig);
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

    onEnquiryToAdmission(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = this.enquiry;
        const dialogRef =  this.dialog.open(CreateAdmissionDialogComponent, dialogConfig);
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

    onUpdateEnquiry(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = this.enquiry;
        const dialogRef =  this.dialog.open(UpdateEnquiryComponent, dialogConfig);
    }

}
