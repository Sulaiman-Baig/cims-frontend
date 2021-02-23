import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../../@fuse/animations';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { BatchManagementService } from '../batch-management.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Batch } from '../batch.model';
import { TokenService } from 'app/main/auth/token.service';

@Component({
    selector: 'app-students-by-batch',
    templateUrl: './students-by-batch.component.html',
    styleUrls: ['./students-by-batch.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StudentsByBatchComponent implements OnInit {

    url = environment.baseUrl;
    dataSource;
    displayedColumns = ['Alias', 'Course', 'User', 'Employee', 'batch_time', 'batch_start_date', 'no_of_seats'];
    ELEMENT_DATA: Batch[] = [];
    campusId: string;


    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private dialog: MatDialog,
        private batchService: BatchManagementService,
        private router: Router,
        private tokenService: TokenService

    ) { }

    ngOnInit(): any {
        this.campusId = this.tokenService.GetCampusId();
        this.batchService.getAllUpcomingBatchesByCampus(this.campusId).subscribe((batchRes: Batch[]) => {
            this.ELEMENT_DATA = batchRes;
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;
            console.log(batchRes);
        });
    }

}
