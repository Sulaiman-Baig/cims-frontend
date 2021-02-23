import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnquiryManagementService } from '../../enquiry-management.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'app-send-email',
    templateUrl: './send-email.component.html',
    styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {

    enquiry: any;
    form: FormGroup;
    isAvailavle: boolean;
    isDateValid: boolean;


    availability = [
        {key: 'Yes', value: true},
        {key: 'No', value: false},
    ];

    prospective = [
        {key: 'Prospective', value: 'prospective'},
        {key: 'Need Analysis', value: 'need_analysis'},
        {key: 'Proposal', value: 'proposal'},
        {key: 'Negotiation', value: 'negotiation'},
        {key: 'Successfully Enrolled', value: 'successfull'},
        {key: 'Not Interested', value: 'not_interested'},
    ];
    needanalysis = [
        {key: 'Need Analysis', value: 'need_analysis'},
        {key: 'Proposal', value: 'proposal'},
        {key: 'Negotiation', value: 'negotiation'},
        {key: 'Successfully Enrolled', value: 'successfull'},
        {key: 'Not Interested', value: 'not_interested'},
    ];
    proposal = [
        {key: 'Proposal', value: 'proposal'},
        {key: 'Negotiation', value: 'negotiation'},
        {key: 'Successfully Enrolled', value: 'successfull'},
        {key: 'Not Interested', value: 'not_interested'},
    ];
    negotiation = [
        {key: 'Negotiation', value: 'negotiation'},
        {key: 'Successfully Enrolled', value: 'successfull'},
        {key: 'Not Interested', value: 'not_interested'},
    ];
    successfull = [
        {key: 'Successfully Enrolled', value: 'successfull'},
        {key: 'Not Interested', value: 'not_interested'},
    ];
    notinterested = [
        {key: 'Successfully Enrolled', value: 'successfull'},
        {key: 'Not Interested', value: 'not_interested'},
    ];


    constructor(
        private _formBuilder: FormBuilder,
        private enquiryService: EnquiryManagementService,
        private router: Router,
        private dialogRef: MatDialogRef<SendEmailComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.enquiry = data;
    }

    ngOnInit(): void {

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

    close(): void {

    }

}
