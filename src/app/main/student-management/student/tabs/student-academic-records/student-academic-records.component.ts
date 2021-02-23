import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentMenagementService } from 'app/main/student-management/student-menagement.service';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource } from '@angular/material';
import { environment } from 'environments/environment';


@Component({
    selector: 'app-student-academic-records',
    templateUrl: './student-academic-records.component.html',
    styleUrls: ['./student-academic-records.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StudentAcademicRecordsComponent implements OnInit {
    url = environment.baseUrl;
    dataSource;
    displayedColumns = ['certificate', 'institute', 'year', 'percentage'];
    ELEMENT_DATA: any[] = [];


    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    records: any;
    isAcademicRecord: boolean;
    constructor(
        private route: ActivatedRoute,
        private studentService: StudentMenagementService
    ) { }

    ngOnInit(): void {
       
        const studentId = this.route.snapshot.params.studentId;
        this.studentService.getStudentAcademicRecord(studentId).subscribe((recordRes: any[]) => {
            this.ELEMENT_DATA = recordRes;
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;
            if (recordRes.length === 0) {
                this.isAcademicRecord = true;
            } else if (recordRes.length > 0) {
                this.isAcademicRecord = false;
            }
            // console.log(recordRes.length);
        });

    }

}
