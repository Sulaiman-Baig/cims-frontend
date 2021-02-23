import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateEnquiryDialogComponent } from './create-enquiry-dialog/create-enquiry-dialog.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-enquiry',
    templateUrl: './create-enquiry.component.html',
    styleUrls: ['./create-enquiry.component.scss']
})
export class CreateEnquiryComponent implements OnInit {

    constructor(
        private dialog: MatDialog,
        private router: Router
        ) { }

    ngOnInit(): any {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        const dialogRef = this.dialog.open(CreateEnquiryDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => {
            this.router.navigate(['/enquiry/todaysenquiries']);
        });
    }


}
