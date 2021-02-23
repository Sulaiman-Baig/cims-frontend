import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnquiryManagementService } from '../../enquiry-management.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatTableDataSource, MatTooltip } from '@angular/material';
import { Router } from '@angular/router';


@Component({
    selector: 'app-send-sms',
    templateUrl: './send-sms.component.html',
    styleUrls: ['./send-sms.component.scss']
})
export class SendSmsComponent implements OnInit {

    enquiry: any;
    form: FormGroup;
    month: number;
    isDateValid: boolean;
    isHistory: boolean;
    historyText: string;

    dataSource;
    displayedColumns = ['Follower', 'Status', 'Type', 'Availability', 'Probability', 'Last Followup Date', 'Remarks'];
    ELEMENT_DATA: any[] = [];


    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private _formBuilder: FormBuilder,
        private enquiryService: EnquiryManagementService,
        private router: Router,
        private dialogRef: MatDialogRef<SendSmsComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.enquiry = data;
    }

    ngOnInit(): void {
        this.isDateValid = false;
        // console.log(this.enquiry);

        this.isHistory = false;
        this.historyText = 'SHOW HISTORY';

        this.enquiryService.getAllRemarksByEnquiry(this.enquiry.enquiry.id).subscribe((enqRmkRes: any[]) => {
            this.ELEMENT_DATA = enqRmkRes;
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;
            console.log(enqRmkRes);
        });

        this.form = this._formBuilder.group({
            contact: ['', Validators.required],
            next_follow_up_date: ['', Validators.required],
            remarks: ['', Validators.required]
        });
        this.form.controls['contact'].disable();

        this.form.setValue({
            contact: this.enquiry.enquiry.contact,
            next_follow_up_date: null,
            remarks: ''
        });
    }

    onHistory(): void {

        if (this.isHistory === false) {
            this.isHistory = true;
            this.historyText = 'HIDE HISTORY';
        } else if (this.isHistory === true) {
            this.isHistory = false;
            this.historyText = 'SHOW HISTORY';
        }
    }

    onSendSMS(): void {
        if (this.form.invalid) {
            return;
        }

        const data = this.form.getRawValue();
        this.months(data.next_follow_up_date._i.month);

        const pickerDate =
            new Date(data.next_follow_up_date._i.year
                + '/' +
                this.month
                + '/' +
                data.next_follow_up_date._i.date);
        const previousDate = new Date(this.enquiry.enquiry.next_follow_up_date);
        const dateDiff = this.compareDate(pickerDate, previousDate);

        if (
            data.next_follow_up_date._i.year === new Date().getFullYear()
            &&
            data.next_follow_up_date._i.month === new Date().getMonth()
            &&
            data.next_follow_up_date._i.date === new Date().getDate()
        ) {
            // console.log('same');
            this.isDateValid = true;

        } else if (dateDiff === -1) {

            this.isDateValid = true;
            // console.log('less');

        } else if (dateDiff === 1) {

            this.isDateValid = false;
            const smsData = {
                type: 'text_message',
                enquiry_id: this.enquiry.enquiry.id,
                remarks: data.remarks,
                to: data.contact,
                next_follow_up_date: data.next_follow_up_date._i.year
                    + '/' +
                    this.month
                    + '/' +
                    data.next_follow_up_date._i.date,
            };


            this.enquiryService.sendSMS(smsData).subscribe((smsRes: any) => {
                // console.log(smsRes);
                this.form.reset();
                this.dialogRef.close();
                this.router.navigate(['/enquiry/todaysfollowup']);
            });
        }
    }



    compareDate(date1: Date, date2: Date): number {

        let d1 = new Date(date1); let d2 = new Date(date2);


        let same = d1 === d2;

        if (same) {
            return 0;
        }
        if (d1 > d2) {
            return 1;
        }
        if (d1 < d2) {
            return -1;
        }
    }

    close(): void {
        if (this.isDateValid === false) {
            this.dialogRef.close();
        } else if (this.isDateValid === true) {
            this.dialogRef.close();
        }
    }

    months(month): any {

        switch (month) {
            case 0:
                this.month = 1;
                break;
            case 1:
                this.month = 2;
                break;
            case 2:
                this.month = 3;
                break;
            case 3:
                this.month = 4;
                break;
            case 4:
                this.month = 5;
                break;
            case 5:
                this.month = 6;
                break;
            case 6:
                this.month = 7;
                break;
            case 7:
                this.month = 7;
                break;
            case 8:
                this.month = 9;
                break;
            case 9:
                this.month = 10;
                break;
            case 10:
                this.month = 11;
                break;
            case 11:
                this.month = 12;
                break;

            default:
                console.log('No such month exists!');
                break;
        }
    }

}
