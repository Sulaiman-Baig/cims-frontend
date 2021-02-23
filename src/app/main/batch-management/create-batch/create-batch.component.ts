import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CreateBatchDialogComponent } from '../create-batch-dialog/create-batch-dialog.component';
import { Router } from '@angular/router';


@Component({
    selector: 'app-create-batch',
    templateUrl: './create-batch.component.html',
    styleUrls: ['./create-batch.component.scss']
})
export class CreateBatchComponent implements OnInit {

    constructor(
        private dialog: MatDialog,
        private router: Router

    ) { }

    ngOnInit(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        const dialogRef = this.dialog.open(CreateBatchDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => {
            this.router.navigate(['/batch/up-coming']);
        });
    }

}
