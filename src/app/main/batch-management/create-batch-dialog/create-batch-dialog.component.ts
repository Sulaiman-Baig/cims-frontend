import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BatchManagementService } from '../batch-management.service';
import { Batch } from '../batch.model';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import io from 'socket.io-client';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from 'app/main/auth/token.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-create-batch-dialog',
    templateUrl: './create-batch-dialog.component.html',
    styleUrls: ['./create-batch-dialog.component.scss']
})
export class CreateBatchDialogComponent implements OnInit {

    form: FormGroup;
    batch: Batch = new Batch();
    employees: any;
    courses: any;
    month: number;
    campuses: any;
    user: any;
    socket: any;
    url = environment.baseUrl;
    batchstartmonth: string;
    batchstartdate: string;
    campusId: string;



    isActives = [
        { status: 'Activate', value: 1 },
        { status: 'Deactivate', value: 0 }
    ];

    roles = [
        { type: 'Front Desk Representative', value: 'front_desk_representative' },
        { type: 'Telesales Representative', value: 'telesales_representative' },
        { type: 'Admissions Coordinator', value: 'admissions_coordinator' },
        { type: 'Program Manager', value: 'program_manager' },
        { type: 'Campus Head', value: 'campus_head' },
        { type: 'Admin', value: 'admin' },

    ];

    times = [
        // '00:00',
        // '00:15',
        // '00:30',
        // '00:45',
        // '01:00',
        // '01:15',
        // '01:30',
        // '01:45',
        // '02:00',
        // '02:15',
        // '02:30',
        // '02:45',
        // '03:00',
        // '03:15',
        // '03:30',
        // '03:45',
        // '04:00',
        // '04:15',
        // '04:30',
        // '04:45',
        // '05:00',
        // '05:15',
        // '05:30',
        // '05:45',
        '06:00',
        '06:15',
        '06:30',
        '06:45',
        '07:00',
        '07:15',
        '07:30',
        '07:45',
        '08:00',
        '08:15',
        '08:30',
        '08:45',
        '09:00',
        '09:15',
        '09:30',
        '09:45',
        '10:00',
        '10:15',
        '10:30',
        '10:45',
        '11:00',
        '11:15',
        '11:30',
        '11:45',
        '12:00',
        '12:15',
        '12:30',
        '12:45',
        '13:00',
        '13:15',
        '13:30',
        '13:45',
        '14:00',
        '14:15',
        '14:30',
        '14:45',
        '15:00',
        '15:15',
        '15:30',
        '15:45',
        '16:00',
        '16:15',
        '16:30',
        '16:45',
        '17:00',
        '17:15',
        '17:30',
        '17:45',
        '18:00',
        '18:15',
        '18:30',
        '18:45',
        '19:00',
        '19:15',
        '19:30',
        '19:45',
        '20:00',
        '20:15',
        '20:30',
        '20:45',
        '21:00',
        '21:15',
        '21:30',
        '21:45',
        '22:00',
        // '22:15',
        // '22:30',
        // '22:45',
        // '23:00',
        // '23:15',
        // '23:30',
        // '23:45',
    ];
    constructor(
        private _formBuilder: FormBuilder,
        private batchService: BatchManagementService,
        private router: Router,
        private matSnackBar: MatSnackBar,
        private tokenService: TokenService,
        private dialogRef: MatDialogRef<CreateBatchDialogComponent>
    ) {
        this.socket = io(this.url);
    }

    ngOnInit(): any {
        this.form = this._formBuilder.group({
            course_id: ['', Validators.required],
            campus_id: ['', Validators.required],
            employee_id: ['', Validators.required],
            title: ['', Validators.required],
            no_of_seats: ['', Validators.required],
            batch_start_date: ['', Validators.required],
            starttime: ['', Validators.required],
            remarks: ['', Validators.required]
        });
        this.user = this.tokenService.GetAccount();
        this.campusId = this.tokenService.GetCampusId();

        this.batchService.getAllEmployeesForDDByCampus(this.campusId).subscribe((empRes: any) => {
            this.employees = empRes;
            this.batchService.getAllCoursesForDD().subscribe((corsRes: any) => {
                this.courses = corsRes;
                this.batchService.getAllCampusesForDD().subscribe((cmpRes: any) => {
                    this.campuses = cmpRes;

                });
            });

        });
    }

    close(): void {
    }

    onCreateBatch(): void {
        if (this.form.invalid) {
            return;
        }
      
        this.batch_start_date();
        this.batch_start_month();
        const data = this.form.getRawValue();
        this.batch.courseId = data.course_id;
        this.batch.campusId = data.campus_id;
        this.batch.employeeId = data.employee_id;
        this.batch.title = data.title;
        this.batch.no_of_seats = data.no_of_seats;
        this.batch.batch_start_date = data.batch_start_date;
        this.batch.batch_start_date =
            data.batch_start_date._i.year
            + '-' +
            this.batchstartmonth
            + '-' +
            this.batchstartdate,
            this.batch.batch_time = data.starttime;
        this.batch.remarks = data.remarks;
        this.batch.userId = this.user.id;

        console.log(this.batch);
        console.log('ma batch dialog ma ho');

        this.batchService.createBatch(this.batch).subscribe((batchRes: any) => {
            // console.log(batchRes);
            this.form.reset();
            this.dialogRef.close({ close: 'closeAfterSaved' });
            this.socket.emit('refresh', {});
            this.matSnackBar.open('Batch Created Successfully', null, {
                verticalPosition: 'top',
                duration: 3000
            });
            this.router.navigate(['/batch/up-coming']);
        });
    }

  
    batch_start_month(): any {
        const data = this.form.getRawValue();
        const batchstartmonth = data.batch_start_date._i.month;
        switch (batchstartmonth) {
            case 0:
                this.batchstartmonth = '01';
                break;
            case 1:
                this.batchstartmonth = '02';
                break;
            case 2:
                this.batchstartmonth = '03';
                break;
            case 3:
                this.batchstartmonth = '04';
                break;
            case 4:
                this.batchstartmonth = '05';
                break;
            case 5:
                this.batchstartmonth = '06';
                break;
            case 6:
                this.batchstartmonth = '07';
                break;
            case 7:
                this.batchstartmonth = '08';
                break;
            case 8:
                this.batchstartmonth = '09';
                break;
            case 9:
                this.batchstartmonth = '10';
                break;
            case 10:
                this.batchstartmonth = '11';
                break;
            case 11:
                this.batchstartmonth = '12';
                break;

            default:
                console.log('No such month exists!');
                break;
        }
    }
    batch_start_date(): any {
        const data = this.form.getRawValue();
        const batchstartdate = data.batch_start_date._i.date;
        switch (batchstartdate) {

            case 1:
                this.batchstartdate = '01';
                break;
            case 2:
                this.batchstartdate = '02';
                break;
            case 3:
                this.batchstartdate = '03';
                break;
            case 4:
                this.batchstartdate = '04';
                break;
            case 5:
                this.batchstartdate = '05';
                break;
            case 6:
                this.batchstartdate = '06';
                break;
            case 7:
                this.batchstartdate = '07';
                break;
            case 8:
                this.batchstartdate = '08';
                break;
            case 9:
                this.batchstartdate = '09';
                break;

            default:
                this.batchstartdate = batchstartdate;
                break;
        }
    }

}
