import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateCourseCategoryDialogComponent } from './create-course-category-dialog/create-course-category-dialog.component';


@Component({
    selector: 'app-create-course-category',
    templateUrl: './create-course-category.component.html',
    styleUrls: ['./create-course-category.component.scss']
})
export class CreateCourseCategoryComponent implements OnInit {
    data: any;
    constructor(
        private dialog: MatDialog
    ) {  }

    ngOnInit(): any {

        console.log(this.data);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        this.dialog.open(CreateCourseCategoryDialogComponent, dialogConfig);

    }

}
