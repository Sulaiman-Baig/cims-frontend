import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CreateEmployeeDialogComponent } from '../create-employee-dialog/create-employee-dialog.component';

@Component({
    selector: 'app-create-employee',
    templateUrl: './create-employee.component.html',
    styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

    constructor(
        private dialog: MatDialog,

    ) { }

    ngOnInit(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        this.dialog.open(CreateEmployeeDialogComponent, dialogConfig);
        
    }

}
