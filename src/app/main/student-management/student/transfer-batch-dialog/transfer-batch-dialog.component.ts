import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { StudentMenagementService } from '../../student-menagement.service';
import { TokenService } from 'app/main/auth/token.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-transfer-batch-dialog',
    templateUrl: './transfer-batch-dialog.component.html',
    styleUrls: ['./transfer-batch-dialog.component.scss']
})
export class TransferBatchDialogComponent implements OnInit {
    form: FormGroup;
    batches: any;
    courseId: string;
    batchId: string;
    studentId: string;
    campusId: string;
    courseAdmissionId: string;
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
        private dialogRef: MatDialogRef<TransferBatchDialogComponent>,
        private tokenService: TokenService,
        private route: ActivatedRoute,
        @Inject(MAT_DIALOG_DATA) data
    ) {

        this.courseId = data.courseId;
        this.batchId = data.batchId;
        this.studentId = data.studentId;
        this.campusId = data.campusId;
        this.courseAdmissionId = data.courseAdmissionId;
    }

    ngOnInit(): void {
        const ids = {
            courseId: this.courseId,
            batchId: this.batchId,
            campusId: this.campusId
        };
      
        this.studentService.getAllBatchesToTransferBatch(ids).subscribe((batRes: any) => {
            
            this.batches = batRes;
        });
        this.user = this.tokenService.GetAccount();
        this.form = this._formBuilder.group({
            batchTo: ['', Validators.required],
            reason: ['', Validators.required],
            remarks: ['', Validators.required],
        });

    }

    close(): void {

    }

    onBatchTransfer(): void {
        if (this.form.invalid) {
            return;
        }
        const data = this.form.getRawValue();
        const batchTransferData = {
            batchId: this.batchId,
            batchToId: data.batchTo,
            userId: this.user.id,
            reason: data.reason,
            remarks: data.remarks
        };

        this.studentService.transferBatch(this.courseAdmissionId, batchTransferData).subscribe((trRes: any) => {
            // console.log(trRes);
            this.dialogRef.close({close: 'closeAfterTransfered'});
        });
    }

}
