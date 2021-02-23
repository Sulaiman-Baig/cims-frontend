import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateCourseDialogComponent } from './create-course-dialog/create-course-dialog.component';
import { CourseManagementService } from '../course-management.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-course',
    templateUrl: './create-course.component.html',
    styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

    constructor(
        private dialog: MatDialog,
        private router: Router) { }

    ngOnInit(): any {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        const dialogRef = this.dialog.open(CreateCourseDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => {            
            this.router.navigate(['/course/all']);
        });
    }


}
