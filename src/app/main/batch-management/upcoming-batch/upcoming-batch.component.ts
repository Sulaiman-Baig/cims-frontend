import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../../@fuse/animations';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { BatchManagementService } from '../batch-management.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Batch } from '../batch.model';
import io from 'socket.io-client';
import { CreateBatchDialogComponent } from '../create-batch-dialog/create-batch-dialog.component';
import { TokenService } from 'app/main/auth/token.service';

@Component({
    selector: 'app-upcoming-batch',
    templateUrl: './upcoming-batch.component.html',
    styleUrls: ['./upcoming-batch.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UpcomingBatchComponent implements OnInit {

    url = environment.baseUrl;
    dataSource;
    displayedColumns = ['Alias', 'Course', 'User', 'Employee', 'batch_time', 'batch_start_date', 'no_of_seats'];
    ELEMENT_DATA: Batch[] = [];
    campusId: string;
    socket: any;



    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private dialog: MatDialog,
        private matSnackBar: MatSnackBar,
        private batchService: BatchManagementService,
        private router: Router,
        private tokenService: TokenService

    ) { 
        this.socket = io(this.url);
    }

    ngOnInit(): any {
        this.campusId = this.tokenService.GetCampusId();
        this.batchService.getAllUpcomingBatchesByCampus(this.campusId).subscribe((batchRes: Batch[]) => {
            if (batchRes.length === 0) {
                this.matSnackBar.open('No Upcoming Batch Found', null, {
                    duration: 3000
                });
            }
            this.ELEMENT_DATA = batchRes;
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;
            console.log(batchRes);
        });

        this.socket.on('refreshBatch', () => {
            this.campusId = this.tokenService.GetCampusId();
            this.batchService.getAllUpcomingBatchesByCampus(this.campusId).subscribe((batchRes: Batch[]) => {
                if (batchRes.length === 0) {
                    this.matSnackBar.open('No Upcoming Batch Found', null, {
                        duration: 3000
                    });
                }
                this.ELEMENT_DATA = batchRes;
                this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                this.dataSource.paginator = this.paginator;
                console.log(batchRes);
            });
        });
    }

    onCreateBatch(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        const dialogRef = this.dialog.open(CreateBatchDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((data) => {
            if (data.close === 'closeAfterSaved') {
                this.ngOnInit();
            }
        });
    }

}
