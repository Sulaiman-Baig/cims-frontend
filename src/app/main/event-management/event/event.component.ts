import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CreateEventComponent } from '../create-event/create-event.component';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

    constructor(private dialog: MatDialog) { }

    ngOnInit(): void {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        this.dialog.open(CreateEventComponent, dialogConfig);
    }

}
