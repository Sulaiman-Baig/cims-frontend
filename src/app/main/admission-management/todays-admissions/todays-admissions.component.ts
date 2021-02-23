import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../../@fuse/animations';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { AdmissionManagementService } from '../admission-management.service';
import { Router } from '@angular/router';
import { Admission } from '../admission.model';
import io from 'socket.io-client';
import { environment } from 'environments/environment';
import { TokenService } from 'app/main/auth/token.service';

@Component({
    selector: 'app-todays-admissions',
    templateUrl: './todays-admissions.component.html',
    styleUrls: ['./todays-admissions.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TodaysAdmissionsComponent implements OnInit {

    url = environment.baseUrl;
    socket: any;
    dataSource;
    displayedColumns = ['Student Name', 'Course', 'Batch', 'Campus', 'Enrolled By'];
    ELEMENT_DATA: Admission[] = [];
    campusId: string;


    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private dialog: MatDialog,
        private matSnackBar: MatSnackBar,
        private admissionService: AdmissionManagementService,
        private router: Router,
        private tokenService: TokenService

    ) {
        this.socket = io(this.url);
    }

    ngOnInit(): any {

       
        this.campusId = this.tokenService.GetCampusId();
        this.admissionService.getAllTodaysAdmissionsByCampus(this.campusId).subscribe((admnRes: Admission[]) => {
            if (admnRes.length === 0) {
                this.matSnackBar.open('No Today\'s Admissions Found', null, {
                    duration: 3000
                });
            }
            this.ELEMENT_DATA = admnRes;
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;
            // console.log(admnRes);
        });
        this.socket.on('refreshAdmission', () => {
            this.campusId = this.tokenService.GetCampusId();
            this.admissionService.getAllTodaysAdmissionsByCampus(this.campusId).subscribe((admnRes: Admission[]) => {
                if (admnRes.length === 0) {
                    this.matSnackBar.open('No Today\'s Admissions Found', null, {
                        duration: 3000
                    });
                }
                this.ELEMENT_DATA = admnRes;
                this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                this.dataSource.paginator = this.paginator;
                // console.log(admnRes);
            });
        });
    }

}
