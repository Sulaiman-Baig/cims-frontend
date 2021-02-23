import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CourseOutline } from './model';
import { CourseManagementService } from '../../../course-management.service';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-create-course-outline-dialog',
    templateUrl: './create-course-outline-dialog.component.html',
    styleUrls: ['./create-course-outline-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})


export class CreateCourseOutlineDialogComponent implements OnInit {

    form: FormGroup;
    selectedCourse: any;
    index: number = 1;
    data: any;
    headings = [];
    topics = [];
    previews = [];
    courses: any;
    heading: any;
    topic: any;
    courseOutline: CourseOutline = new CourseOutline();
    isPreview: boolean;

    constructor(
        private courseService: CourseManagementService,
        private router: Router,
        private dialogRef: MatDialogRef<CreateCourseOutlineDialogComponent>
        ) { }

    ngOnInit(): any {
        this.isPreview = false;
        this.courseService.getAllCourses().subscribe((coursesRes: any) => {
            this.courses = coursesRes;
            console.log(this.courses);
        });
    }

    onCreteOutline(): void {
        const outlineData = {
            course_id: this.selectedCourse,
            outline: this.previews
        };
        console.log(outlineData);
        this.courseService.createCourseOutline(outlineData).subscribe((outlineRes: any) => {
            this.dialogRef.close(); 
            this.router.navigate(['/course/showoutline/' + outlineRes.course_id]);
            console.log(outlineRes);
          
            
        });
    }

    onSlectCourse(): void {
        console.log(this.selectedCourse);
    }

    addHeading(): any {
        // if (this.headings.length === 1 || this.headings.length === 0) {
        //     this.headings.push({ heading: this.heading });
        //     this.headings.push({ heading: this.heading });
        //     console.log(this.headings);
        // }
        this.courseOutline.heading = this.heading;
        this.heading = ' ';



    }

    addTopic(): any {

        this.topics.push(this.topic);
        this.courseOutline.topics = this.topics;
        this.topic = ' ';


    }
    preview(): any {

        // this.previews.push({ headings: this.headings, topics: this.topics });
        // console.log(this.previews);
        // this.headings.shift();
        // this.topics = null;
        // this.heading = null;
        // this.topic = null;
        // console.log(this.previews);
        // console.log(this.headings);
        // console.log(this.topics);
        // console.log(this.heading);
        // console.log(this.topic);

        localStorage.setItem('outline' + this.index, JSON.stringify(this.courseOutline));
        this.courseOutline.heading = '';
        this.courseOutline.topics = [];
        this.topics = [];
        this.topic = ' ';
        this.heading = ' ';
        // console.log(this.headings);
        // for (let index = 0; index < this.index; index++) {
        const storedOutline = JSON.parse(localStorage.getItem('outline' + this.index));
        // console.log(storedOutline);
        this.previews.push(storedOutline);

        // }
        this.index = this.index + 1;
        this.isPreview = true;
        console.log(this.previews);

    }
}
