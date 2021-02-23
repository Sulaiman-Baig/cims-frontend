import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../../@fuse/animations';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { BatchManagementService } from '../batch-management.service';
import { Router } from '@angular/router';
import io from 'socket.io-client';
import { environment } from 'environments/environment';
import { Batch } from '../batch.model';
import { TokenService } from 'app/main/auth/token.service';

@Component({
  selector: 'app-recently-started-batch',
  templateUrl: './recently-started-batch.component.html',
  styleUrls: ['./recently-started-batch.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class RecentlyStartedBatchComponent implements OnInit {

    url = environment.baseUrl;
    dataSource;
    displayedColumns = ['Title', 'Course', 'User', 'Employee', 'batch_time', 'batch_start_date', 'no_of_seats'];
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
        this.batchService.getAllRecentlyStartedBatchesByCampus(this.campusId).subscribe((batchRes: Batch[]) => {
            if (batchRes.length === 0) {
                this.matSnackBar.open('No Recently Started Batch Found', null, {               
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
            this.batchService.getAllRecentlyStartedBatchesByCampus(this.campusId).subscribe((batchRes: Batch[]) => {
                if (batchRes.length === 0) {
                    this.matSnackBar.open('No Recently Started Batch Found', null, {               
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

}
