import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { StudentMenagementService } from 'app/main/student-management/student-menagement.service';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import io from 'socket.io-client';
import { TransferBatchDialogComponent } from '../../transfer-batch-dialog/transfer-batch-dialog.component';
import { TransferCampusDialogComponent } from '../../transfer-campus-dialog/transfer-campus-dialog.component';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-courses-by-student',
    templateUrl: './courses-by-student.component.html',
    styleUrls: ['./courses-by-student.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CoursesByStudentComponent implements OnInit {
    view: string;
    courses: any;
    batches: any;
    studentId: string;
    isCourses: boolean;
    demo1TabIndex = 2;
    socket: any;
    url = environment.baseUrl;

    constructor(
        private studentSercice: StudentMenagementService,
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {
        this.view = 'preview';
        this.socket = io(this.url);
    }

    ngOnInit(): void {
        this.studentId = this.route.snapshot.params.studentId;
        this.studentSercice.getAllCoursesByStudent(this.studentId).subscribe((stdCorsRes: any) => {
            console.log(stdCorsRes);
            this.courses = stdCorsRes;
            if (stdCorsRes.length === 0) {
                this.isCourses = false;
            } else if (stdCorsRes.length > 0) {
                this.isCourses = true;
            }
        });
        this.socket.on('refreshNewEnlollment', () => {
            this.studentId = this.route.snapshot.params.studentId;
            this.studentSercice.getAllCoursesByStudent(this.studentId).subscribe((stdCorsRes: any) => {
                console.log(stdCorsRes);
                this.courses = stdCorsRes;
                if (stdCorsRes.length === 0) {
                    this.isCourses = false;
                } else if (stdCorsRes.length > 0) {
                    this.isCourses = true;
                }
            });
        });
    }

    onCollectInstallment(installmentId: string): void {
        // let snackBarRef = this.snackBar.open('Are you sure, you want to collect installment', 'Collect Installment');
        // snackBarRef.afterDismissed().subscribe(() => {
        this.studentSercice.collectInstallment(installmentId).subscribe((instalmentRes: any) => {
            this.ngOnInit();
            this.snackBar.open('Installment Collected Successfully', null, {
                duration: 2000
            });
            // });
        });
    }



    onBatchTransfer(e): void {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
            batches: this.batches,
            courseAdmissionId: e.courseAdmissionId,
            courseId: e.courseId,
            campusId: e.campusId,
            batchId: e.batchId,
            studentId: this.studentId
        };
        const dialogRef = this.dialog.open(TransferBatchDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data.close === 'closeAfterTransfered') {
                this.ngOnInit();
                this.snackBar.open('Batch Transfered Successfully', null, {
                    duration: 2000
                });
            }
        });

    }
    onCampusTransfer(e): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { batches: this.batches, courseAdmissionId: e.courseAdmissionId, batchId: e.batchId, campusId: e.campusId, studentId: this.studentId };
        const dialogRef = this.dialog.open(TransferCampusDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data.close === 'closeAfterTransfered') {
                this.ngOnInit();
                this.snackBar.open('Campus Transfered Successfully', null, {
                    duration: 2000
                });
            }
        });
    }
    onConcludeCourse(courseAdmissionId: string): void {
        this.studentSercice.concludeCourse(courseAdmissionId).subscribe((concludeRes: any) => {
            this.ngOnInit();
            this.snackBar.open('Course Concluded Successfully', null, {
                duration: 2000
            });
            // console.log(concludeRes);
        });
    }
    onNotCompletedCourse(courseAdmissionId: string): void {
        this.studentSercice.notCompletedCourse(courseAdmissionId).subscribe((notCompRes: any) => {
            this.ngOnInit();
            this.snackBar.open('Course Not Completed', null, {
                duration: 2000
            });
            // console.log(notCompRes);
        });
    }
    onSuspendCourse(courseAdmissionId: string): void {
        this.studentSercice.suspendCourse(courseAdmissionId).subscribe((suspRes: any) => {
            this.ngOnInit();
            this.snackBar.open('Course Suspended', null, {
                duration: 2000
            });
            // console.log(suspRes);
        });
    }
    onResumeCourse(courseAdmissionId: string): void {
        this.studentSercice.resumeCourse(courseAdmissionId).subscribe((rsmRes: any) => {
            this.ngOnInit();
            this.snackBar.open('Course Resumed Successfully', null, {
                duration: 2000
            });
            // console.log(rsmRes);
        });
    }
    onFreezeCourse(courseAdmissionId: string): void {
        this.studentSercice.freezeCourse(courseAdmissionId).subscribe((frzRes: any) => {
            this.ngOnInit();
            this.snackBar.open('Course Freezed Successfully', null, {
                duration: 2000
            });
            // console.log(frzRes);
        });
    }
    onUnfreezeCourse(courseAdmissionId: string): void {
        this.studentSercice.unfreezeCourse(courseAdmissionId).subscribe((unfrzRes: any) => {
            this.ngOnInit();
            this.snackBar.open('Course Unfreezed Successfully', null, {
                duration: 2000
            });
            // console.log(unfrzRes);
        });
    }


}
