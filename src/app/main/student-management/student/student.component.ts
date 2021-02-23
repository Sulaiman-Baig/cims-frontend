import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { StudentMenagementService } from '../student-menagement.service';
import { EnrollmentComponent } from '../enrollment/enrollment.component';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StudentComponent implements OnInit {

    student: any;
    constructor(
        private route: ActivatedRoute,
        private studentService: StudentMenagementService,
        private dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        const studentId = this.route.snapshot.params.studentId;
        this.studentService.getStudentById(studentId).subscribe((stdRes: any) => {
            this.student = stdRes;
            // console.log(stdRes);

        });

    }

    onEnroll(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = this.student.id;
        this.dialog.open(EnrollmentComponent, dialogConfig);
    }

}
