import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StudentMenagementService } from '../../student-menagement.service';
import { TokenService } from 'app/main/auth/token.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-transfer-campus-dialog',
    templateUrl: './transfer-campus-dialog.component.html',
    styleUrls: ['./transfer-campus-dialog.component.scss']
})
export class TransferCampusDialogComponent implements OnInit {
    form: FormGroup;
    batches: any;
    campuses: any;
    courseAdmissionId: string;
    batchId: string;
    studentId: string;
    campusId: string;
    user: any;
    reasons = [
        'Batch Availability',
        'Instructor Preference',
        'Distance',
        'Other'
    ];
    constructor(
        private _formBuilder: FormBuilder,
        private studentService: StudentMenagementService,
        private dialogRef: MatDialogRef<TransferCampusDialogComponent>,
        private tokenService: TokenService,
        private route: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) data
    ) {

        this.courseAdmissionId = data.courseAdmissionId;
        this.batchId = data.batchId;
        this.studentId = data.studentId;
        this.campusId = data.campusId;
    }

    ngOnInit(): void {
        this.studentService.getAllCampusesToTransferCampus(this.studentId).subscribe((campRes: any) => {
            this.campuses = campRes;
        });
        this.user = this.tokenService.GetAccount();
        this.form = this._formBuilder.group({
            batchTo: ['', Validators.required],
            campusTo: ['', Validators.required],
            reason: ['', Validators.required],
            remarks: ['', Validators.required],
        });

    }

    close(): void {

    }

    onChangeCampus(): void {
        const data = this.form.getRawValue();
        this.studentService.getAllBatchesToTransferCampus(this.studentId, data.campusTo).subscribe((batRes: any) => {
            console.log(batRes.length);
            const noBatches = [{ alias: 'No Batches for this Course' }];
            this.batches = batRes;
            if (batRes.length === 0) {
                this.batches = noBatches;
            }
            
        });
    }

    onCampusTransfer(): void {
        if (this.form.invalid) {
            return;
        }
        const data = this.form.getRawValue();
        const campusTransferData = {
            batchId: this.batchId,
            batchToId: data.batchTo,
            campusId: this.campusId,
            campusToId: data.campusTo,
            userId: this.user.id,
            reason: data.reason,
            remarks: data.remarks
        };
     

        this.studentService.transferCampus(this.courseAdmissionId, campusTransferData).subscribe((trRes: any) => {
            // console.log(trRes);
            this.dialogRef.close({ close: 'closeAfterTransfered' });
        });
    }

}
