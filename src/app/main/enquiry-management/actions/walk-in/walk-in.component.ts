import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnquiryManagementService } from '../../enquiry-management.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatTableDataSource, MatTooltip, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { TokenService } from 'app/main/auth/token.service';

@Component({
    selector: 'app-walk-in',
    templateUrl: './walk-in.component.html',
    styleUrls: ['./walk-in.component.scss']
})
export class WalkInComponent implements OnInit {

    enquiry: any;
    form: FormGroup;
    statusDDs: any;
    isDateValid: boolean;
    isHistory: boolean;
    historyText: string;
    month: number;
    user: any;
    nextfollowupmonth: string;
    nextfollowupdate: string;

    availabilities = [
        { key: 'Yes', value: true },
        { key: 'No', value: false },
    ];

    prospective = [
        { key: 'Prospective', value: 'prospective' },
        { key: 'Need Analysis', value: 'need_analysis' },
        { key: 'Proposal', value: 'proposal' },
        { key: 'Negotiation', value: 'negotiation' },
        { key: 'Successfully Enrolled', value: 'successfull' },
        { key: 'Not Interested', value: 'not_interested' },
    ];
    needanalysis = [
        { key: 'Need Analysis', value: 'need_analysis' },
        { key: 'Proposal', value: 'proposal' },
        { key: 'Negotiation', value: 'negotiation' },
        { key: 'Successfully Enrolled', value: 'successfull' },
        { key: 'Not Interested', value: 'not_interested' },
    ];
    proposal = [
        { key: 'Proposal', value: 'proposal' },
        { key: 'Negotiation', value: 'negotiation' },
        { key: 'Successfully Enrolled', value: 'successfull' },
        { key: 'Not Interested', value: 'not_interested' },
    ];
    negotiation = [
        { key: 'Negotiation', value: 'negotiation' },
        { key: 'Successfully Enrolled', value: 'successfull' },
        { key: 'Not Interested', value: 'not_interested' },
    ];
    successfull = [
        { key: 'Successfully Enrolled', value: 'successfull' },
        { key: 'Not Interested', value: 'not_interested' },
    ];
    notinterested = [
        { key: 'Successfully Enrolled', value: 'successfull' },
        { key: 'Not Interested', value: 'not_interested' },
    ];
    probabilities = [
        { probDB: 0, probValue: '0%' },
        { probDB: 10, probValue: '10%' },
        { probDB: 20, probValue: '20%' },
        { probDB: 30, probValue: '30%' },
        { probDB: 40, probValue: '40%' },
        { probDB: 50, probValue: '50%' },
        { probDB: 60, probValue: '60%' },
        { probDB: 70, probValue: '70%' },
        { probDB: 80, probValue: '80%' },
        { probDB: 90, probValue: '90%' },
        { probDB: 100, probValue: '100%' },
    ];
    dataSource;
    displayedColumns = ['Follower', 'Status', 'Type', 'Availability', 'Probability', 'Last Followup Date', 'Remarks'];
    ELEMENT_DATA: any[] = [];


    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private _formBuilder: FormBuilder,
        private enquiryService: EnquiryManagementService,
        private router: Router,
        private matSnackBar: MatSnackBar,
        private tokenService: TokenService,
        private dialogRef: MatDialogRef<WalkInComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.enquiry = data;
    }

    ngOnInit(): void {

        this.user = this.tokenService.GetAccount();
        this.isDateValid = false;
        // console.log(this.enquiry);
        this.isHistory = false;
        this.historyText = 'HISTORY';

        this.enquiryService.getAllRemarksByEnquiry(this.enquiry.enquiry.id).subscribe((enqRmkRes: any[]) => {
            this.ELEMENT_DATA = enqRmkRes;
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;
            // console.log(enqRmkRes);
        });

        this.statusSelection(this.enquiry.enquiry.status);
        this.form = this._formBuilder.group({

            next_follow_up_date: ['', Validators.required],
            remarks: ['', Validators.required],
            status: ['', Validators.required],
            probability: ['', Validators.required],
        });
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



    statusSelection(status): any {

        switch (status) {
            case 'prospective':
                this.statusDDs = this.prospective;
                break;
            case 'need_analysis':
                this.statusDDs = this.needanalysis;
                break;
            case 'proposal':
                this.statusDDs = this.proposal;
                break;
            case 'negotiation':
                this.statusDDs = this.negotiation;
                break;
            case 'not_interested':
                this.statusDDs = this.notinterested;
                break;
            case 'successfull':
                this.statusDDs = this.successfull;
                break;
            default:
                console.log('No such statusDDs exists!');
                break;
        }
    }

    onWalkin(): void {
        if (this.form.invalid) {
            return;
        }

        this.next_follow_up_month();
        this.next_follow_up_date();
        const data = this.form.getRawValue();
        // this.months(data.next_follow_up_date._i.month);

        const pickerDate =
            new Date(data.next_follow_up_date._i.year
                + '/' +
                this.nextfollowupmonth
                + '-' +
                this.nextfollowupdate);
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
            const voiceCallData = {
                type: 'walk_in',
                status: data.status,
                inquiryId: this.enquiry.enquiry.id,
                userId: this.user.id,
                next_follow_up_date: data.next_follow_up_date._i.year
                    + '-' +
                    this.nextfollowupmonth
                    + '-' +
                    this.nextfollowupdate,
                probability: data.probability,
                remarks: data.remarks,
            };
            console.log(voiceCallData);
            this.enquiryService.walkIn(voiceCallData).subscribe((wiRes: any) => {
                // console.log(wiRes);
                this.form.reset();
                this.dialogRef.close({close: 'closeAfterSaved'});
                this.matSnackBar.open('Walk-In Saved Successfully', null, {
                    verticalPosition: 'top',
                    duration: 3000
                });
                // this.router.navigate(['/enquiry/todaysfollowup']);
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

    next_follow_up_month(): any {
        const data = this.form.getRawValue();
        const nextfollowupmonth = data.next_follow_up_date._i.month;
        switch (nextfollowupmonth) {
            case 0:
                this.nextfollowupmonth = '01';
                break;
            case 1:
                this.nextfollowupmonth = '02';
                break;
            case 2:
                this.nextfollowupmonth = '03';
                break;
            case 3:
                this.nextfollowupmonth = '04';
                break;
            case 4:
                this.nextfollowupmonth = '05';
                break;
            case 5:
                this.nextfollowupmonth = '06';
                break;
            case 6:
                this.nextfollowupmonth = '07';
                break;
            case 7:
                this.nextfollowupmonth = '08';
                break;
            case 8:
                this.nextfollowupmonth = '09';
                break;
            case 9:
                this.nextfollowupmonth = '10';
                break;
            case 10:
                this.nextfollowupmonth = '11';
                break;
            case 11:
                this.nextfollowupmonth = '12';
                break;

            default:
                console.log('No such month exists!');
                break;
        }
    }

    next_follow_up_date(): any {
        const data = this.form.getRawValue();
        const nextfollowupdate = data.next_follow_up_date._i.date;
        switch (nextfollowupdate) {
            case 1:
                this.nextfollowupdate = '01';
                break;
            case 2:
                this.nextfollowupdate = '02';
                break;
            case 3:
                this.nextfollowupdate = '03';
                break;
            case 4:
                this.nextfollowupdate = '04';
                break;
            case 5:
                this.nextfollowupdate = '05';
                break;
            case 6:
                this.nextfollowupdate = '06';
                break;
            case 7:
                this.nextfollowupdate = '07';
                break;
            case 8:
                this.nextfollowupdate = '08';
                break;
            case 9:
                this.nextfollowupdate = '09';
                break;

            default:
                this.nextfollowupdate = nextfollowupdate;
                break;
        }
    }

}
