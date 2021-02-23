import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseManagementService } from '../../course-management.service';
import { Course } from '../../course.model';
import { Router } from '@angular/router';
import io from 'socket.io-client';
import { MatSnackBar } from '@angular/material';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-create-course-dialog',
    templateUrl: './create-course-dialog.component.html',
    styleUrls: ['./create-course-dialog.component.scss']
})
export class CreateCourseDialogComponent implements OnInit {

    form: FormGroup;
    selectedCategory: any;
    categories: any;
    socket: any;
    url = environment.baseUrl;
    course: Course = new Course();
    constructor(
        private courseServic: CourseManagementService,
        private matSnackBar: MatSnackBar,
        private _formBuilder: FormBuilder,
        private router: Router
        ) {
            this.socket = io(this.url);
         }

    ngOnInit(): any {

        this.form = this._formBuilder.group({

            title: ['', Validators.required],
            alias: ['', Validators.required],
            fee_package: ['', Validators.required],
            duration_in_weeks: ['', Validators.required],
            course_brief: ['', Validators.required],
            learning_out_comes: ['', Validators.required],
            target_audience: ['', Validators.required],
            prerequisite: ['', Validators.required],
            category: ['', Validators.required]

        });

        this.courseServic.getAllCourseCategories().subscribe((resCates: any) => {
            this.categories = resCates;
            // console.log(resCates);
            // console.log('here should be some cats');
        });
    }

    addCourse(): void {
        if (this.form.invalid) {
            return;
        }
        const data = this.form.getRawValue();
        this.course.categoryId = this.form.value.category;
        this.course.title = data.title;
        this.course.alias = data.alias;
        this.course.fee_package = data.fee_package;
        this.course.duration_in_weeks = data.duration_in_weeks;
        this.course.course_brief = data.course_brief;
        this.course.learning_out_comes = data.learning_out_comes;
        this.course.target_audience = data.target_audience;
        this.course.prerequisite = data.prerequisite;
      

        // console.log(this.course);


        this.courseServic.createCourse(this.course).subscribe((courseData: any) => {
            // console.log(courseData);
            this.socket.emit('refresh', {});
            this.matSnackBar.open('Course Created Successfully', null, {
                verticalPosition: 'top',
                duration: 3000
            });
            this.router.navigate(['/course/all']);
            this.form.reset();
        });
    }


    close(): void {

    }

}
