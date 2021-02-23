import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute } from '@angular/router';
import { StudentMenagementService } from 'app/main/student-management/student-menagement.service';

@Component({
    selector: 'app-student-personal-details',
    templateUrl: './student-personal-details.component.html',
    styleUrls: ['./student-personal-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class StudentPersonalDetailsComponent implements OnInit {

    student: any;

    constructor(
        private route: ActivatedRoute,
        private studentService: StudentMenagementService
    ) { }

    ngOnInit(): void {
        const studentId = this.route.snapshot.params.studentId;
        this.studentService.getStudentById(studentId).subscribe((stdRes: any) => {
            this.student = stdRes;
            // console.log(stdRes);

        });

    }

}
