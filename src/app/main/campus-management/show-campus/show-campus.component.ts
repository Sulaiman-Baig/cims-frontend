import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../../@fuse/animations';
import { MatDialog, MatPaginator, MatTableDataSource, MatDialogConfig, MatSnackBar } from '@angular/material';
import { CampusManagementService } from '../campus-management.service';
import { Router } from '@angular/router';
import io from 'socket.io-client';
import { environment } from 'environments/environment';
import { Campus } from '../campus.model';
import { CreateCampusDialogComponent } from '../create-campus/create-campus-dialog/create-campus-dialog.component';

@Component({
    selector: 'app-show-campus',
    templateUrl: './show-campus.component.html',
    styleUrls: ['./show-campus.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ShowCampusComponent implements OnInit {

    url = environment.baseUrl;
    dataSource;
    socket: any;
    displayedColumns = ['ID', 'Name', 'City', 'Location', 'Action'];
    ELEMENT_DATA: Campus[] = [];


    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        // public dialog: MatDialog,
        private campusService: CampusManagementService,
        private matSnackBar: MatSnackBar,
        private router: Router,
        private dialog: MatDialog

    ) {
        this.socket = io(this.url);
     }



    ngOnInit(): any {

        this.campusService.getAllCampuses().subscribe((campRes: Campus[]) => {
            this.ELEMENT_DATA = campRes;
            if (campRes.length === 0) {
                this.matSnackBar.open('No Campus Found', null, {
                    duration: 3000
                });
            }
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;
            console.log(campRes);
        });
    }

    onAddCampus(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        const dialogRef = this.dialog.open(CreateCampusDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            campusData => {
                this.onCreatecampusClosing(campusData);
                this.matSnackBar.open('Campus Created Successfully', null, {
                    verticalPosition: 'top',
                    duration: 3000
                });
            }
        );
    }

    onCreatecampusClosing(campusData): void {
        if (campusData.mode === 'create') {
            this.campusService.createCampus(campusData.campus).subscribe((campData: any) => {
                console.log('created');
                this.socket.emit('refresh', {});
                this.ngOnInit();
            });
        } else if (campusData.mode === 'update') {
            this.campusService.updateCampus(campusData.campus.id, campusData.campus).subscribe((campData: any) => {
                console.log('updated');
                this.socket.emit('refresh', {});
                this.ngOnInit();
            });
        }
    }

    onUpdateCampus(e): void {
        // console.log(e);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { campus: e, action: 'update' };
        const dialogRef = this.dialog.open(CreateCampusDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            campusData => {
                this.onCreatecampusClosing(campusData);
                this.matSnackBar.open('Campus Updated Successfully', null, {
                    verticalPosition: 'top',
                    duration: 3000
                });
            }
        );
    }
}
