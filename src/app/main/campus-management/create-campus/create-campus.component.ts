import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CreateCampusDialogComponent } from './create-campus-dialog/create-campus-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-campus',
  templateUrl: './create-campus.component.html',
  styleUrls: ['./create-campus.component.scss']
})
export class CreateCampusComponent implements OnInit {

    constructor(private dialog: MatDialog, private router: Router) { }

    ngOnInit(): any {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        this.dialog.open(CreateCampusDialogComponent, dialogConfig);
        

    }

}
