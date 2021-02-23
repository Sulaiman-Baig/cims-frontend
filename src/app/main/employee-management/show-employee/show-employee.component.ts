import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../../@fuse/animations';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource, MatDialogRef, MatSnackBar } from '@angular/material';
import { EmployeeManagementService } from '../employee-management.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Employee } from '../employee.model';
import io from 'socket.io-client';
import { CreateEmployeeDialogComponent } from '../create-employee-dialog/create-employee-dialog.component';
import { TokenService } from 'app/main/auth/token.service';

@Component({
    selector: 'app-show-employee',
    templateUrl: './show-employee.component.html',
    styleUrls: ['./show-employee.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ShowEmployeeComponent implements OnInit {

    url = environment.baseUrl;
    dataSource;
    displayedColumns = ['Full Name', 'Designation', 'Personal Email', 'Primary Mobile No', 'Basic Salary'];
    ELEMENT_DATA: Employee[] = [];
    socket: any;
    campusId: string;


    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private dialog: MatDialog,
        private employeeService: EmployeeManagementService,
        private matSnackBar: MatSnackBar,
        private tokenService: TokenService,
        private router: Router

    ) {
        this.socket = io(this.url);
    }

    ngOnInit(): any {

        this.campusId = this.tokenService.GetCampusId();
        
        this.employeeService.getAllEmployeesByCampus(this.campusId).subscribe((empRes: Employee[]) => {
            this.ELEMENT_DATA = empRes;
            if (empRes.length === 0) {
                this.matSnackBar.open('No Employee Found', null, {
                    duration: 3000
                });
            }
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;
            // console.log(empRes);
        });

        this.socket.on('refreshEmployee', () => {
            this.campusId = this.tokenService.GetCampusId();
            console.log(this.campusId);
            this.employeeService.getAllEmployeesByCampus(this.campusId).subscribe((empRes: Employee[]) => {
                this.ELEMENT_DATA = empRes;
                if (empRes.length === 0) {
                    this.matSnackBar.open('No Employee Found', null, {
                        duration: 3000
                    });
                }
                this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                this.dataSource.paginator = this.paginator;
                // console.log(empRes);
            });
        });
    }

    onCreateEmployee(): void {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        const dialogRef = this.dialog.open(CreateEmployeeDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            campusData => this.ngOnInit()
        );
    }

}
