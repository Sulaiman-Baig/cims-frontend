import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnquiryManagementService } from '../../enquiry-management.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatTableDataSource, MatTooltip, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { TokenService } from 'app/main/auth/token.service';

@Component({
    selector: 'app-transfer-enquiry',
    templateUrl: './transfer-enquiry.component.html',
    styleUrls: ['./transfer-enquiry.component.scss']
})
export class TransferEnquiryComponent implements OnInit {
    enquiry: any;
    form: FormGroup;
    campuses: any;
    dataSource;
    displayedColumns = ['Follower', 'Status', 'Type', 'Availability', 'Probability', 'Last Followup Date', 'Remarks'];
    ELEMENT_DATA: any[] = [];

    user: any;
    isHistory: boolean;
    historyText: string;
    reasons = [
        'Batch Availability',
        'Instructor Preference',
        'Distance',
        'Other'
    ];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private _formBuilder: FormBuilder,
        private enquiryService: EnquiryManagementService,
        private router: Router,
        private tokenService: TokenService,
        private matSnackBar: MatSnackBar,
        private dialogRef: MatDialogRef<TransferEnquiryComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.enquiry = data;
    }

    close(): void {

        this.dialogRef.close();

    }




    ngOnInit(): void {
        this.historyText = 'HISTORY';
        this.isHistory = false;
        this.user = this.tokenService.GetAccount();
        this.enquiryService.getAllCampusesForDDToTransferCampus(this.enquiry.enquiry.campus.id).subscribe((campRes: any) => {
            this.campuses = campRes;
        });

        this.enquiryService.getAllRemarksByEnquiry(this.enquiry.enquiry.id).subscribe((enqRmkRes: any[]) => {
            this.ELEMENT_DATA = enqRmkRes;
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;
            console.log(enqRmkRes);
        });
        this.form = this._formBuilder.group({
            campus_from_id: ['', Validators.required],
            campus_to_id: ['', Validators.required],
            reason: ['', Validators.required],
            remarks: ['', Validators.required]
        });

        this.form.setValue({
            campus_from_id: this.enquiry.enquiry.campus.name,
            campus_to_id: null,
            reason: null,
            remarks: null
        });
    }

    isDateValid(): void {

    }
    onHistory(): void {

        if (this.isHistory === false) {
            this.isHistory = true;
            this.historyText = 'HISTORY';
        } else if (this.isHistory === true) {
            this.isHistory = false;
            this.historyText = 'HISTORY';
        }
    }

    onReasonChange(): void {



    }

    onTransferEnquiry(): void {
        if (this.form.invalid) {
            return;
        }

        const data = this.form.getRawValue();


        const enqTrData = {

            inquiryId: this.enquiry.enquiry.id,
            campusFromId: this.enquiry.enquiry.campus.id,
            campusToId: data.campus_to_id,
            reason: data.reason,
            remarks: data.remarks,
            userId: this.user.id

        };
        console.log(enqTrData);

        this.enquiryService.transferEnquiry(enqTrData).subscribe((enqTrRes: any) => {
            // console.log(enqTrRes);
            this.form.reset();
            this.dialogRef.close({ close: 'closeAfterSaved' });
            this.matSnackBar.open('Enquiry Transferd Successfully', null, {
                verticalPosition: 'top',
                duration: 3000
            });
            // this.router.navigate(['/enquiry/todaysfollowup']);
        });
    }
}


