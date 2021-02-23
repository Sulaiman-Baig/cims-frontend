import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateCourseOutlineDialogComponent } from '../create-course-outline-dialog/create-course-outline-dialog.component';

@Component({
  selector: 'app-create-course-outline',
  templateUrl: './create-course-outline.component.html',
  styleUrls: ['./create-course-outline.component.scss']
})
export class CreateCourseOutlineComponent implements OnInit {

    constructor(private dialog: MatDialog) { }

    ngOnInit(): any {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;

        this.dialog.open(CreateCourseOutlineDialogComponent, dialogConfig);
    }

}
