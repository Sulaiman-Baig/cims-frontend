import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../../@fuse/animations';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { StudentMenagementService } from '../student-menagement.service';
import { Router } from '@angular/router';
import io from 'socket.io-client';
import { environment } from 'environments/environment';
import { Admission } from '../../admission-management/admission.model';
import { TokenService } from 'app/main/auth/token.service';



@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StudentsComponent implements OnInit {

    url = environment.baseUrl;
    dataSource;
    displayedColumns = ['student_name', 'registeration_no', 'roll_no', 'personal_contact', 'guardian_contact'];
    ELEMENT_DATA: Admission[] = [];
    socket: any;
    campusId: string;


    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private studentService: StudentMenagementService,
        private matSnackBar: MatSnackBar,
        private tokenService: TokenService
    ) {
        this.socket = io(this.url);
    }

    ngOnInit(): void {
        this.campusId = this.tokenService.GetCampusId();
        this.studentService.getAllStudentByCampus(this.campusId).subscribe((stdRes: Admission[]) => {
            this.ELEMENT_DATA = stdRes;
            if (stdRes.length === 0) {
                this.matSnackBar.open('No Student Found', null, {
                    duration: 3000
                });
            }
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;
            // console.log(stdRes);
        });
        this.socket.on('refreshStudent', () => {
            this.campusId = this.tokenService.GetCampusId();
            this.studentService.getAllStudentByCampus(this.campusId).subscribe((stdRes: Admission[]) => {
                this.ELEMENT_DATA = stdRes;
                if (stdRes.length === 0) {
                    this.matSnackBar.open('No Student Found', null, {
                        duration: 3000
                    });
                }
                this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                this.dataSource.paginator = this.paginator;
                // console.log(stdRes);
            });

        });
    }

}
