import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateAdmissionDialogComponent } from './create-admission-dialog/create-admission-dialog.component';

@Component({
  selector: 'app-create-admission',
  templateUrl: './create-admission.component.html',
  styleUrls: ['./create-admission.component.scss']
})
export class CreateAdmissionComponent implements OnInit {

    constructor(private dialog: MatDialog) { }

    ngOnInit(): any {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.dialog.open(CreateAdmissionDialogComponent, dialogConfig);
    }

}
