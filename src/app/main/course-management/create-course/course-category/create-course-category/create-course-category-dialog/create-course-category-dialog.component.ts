import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CourseManagementService } from '../../../../course-management.service';
import { Router } from '@angular/router';
import io from 'socket.io-client';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'environments/environment';


@Component({
    selector: 'app-create-course-category-dialog',
    templateUrl: './create-course-category-dialog.component.html',
    styleUrls: ['./create-course-category-dialog.component.scss']
})
export class CreateCourseCategoryDialogComponent implements OnInit {

    form: FormGroup;
    name: string;
    data: any;
    socket: any;
    url = environment.baseUrl;
    constructor(
        private _formBuilder: FormBuilder,
        private courseService: CourseManagementService,
        private router: Router,
        private matSnackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) data) {
        this.data = data;
        this.socket = io(this.url);
    }

    ngOnInit(): any {

        console.log('ma dialog ma ho');
        console.log(this.data);



        // Reactive Form
        this.form = this._formBuilder.group({

            name: ['', Validators.required]

        });

        if (this.data.action === 'update') {
            this.form.setValue({
                name: this.data.category.name
            });
        }

    }

    close(): void {

    }

    onAddCategory(): void {

        if (this.form.invalid) {
            return;
        }
        const data = this.form.getRawValue();
        this.name = data.name;
        // console.log(data);
        this.courseService.createCourseCategory(this.name).subscribe((catData: any) => {
            console.log(catData);
            this.form.reset();
            this.socket.emit('refresh', {});
            this.matSnackBar.open('Category Added Successfully', null, {
                verticalPosition: 'top',
                duration: 3000
            });
            this.router.navigate(['/course/showcategory']);
        });
    }

    // onUpdateCategory(): void {

    //     if (this.form.invalid) {
    //         return;
    //     }
    //     const data = this.form.getRawValue();
    //     this.name = data.name;
    //     // console.log(data);
    //     this.courseService.updateCourseCategory(this.data.category.id, this.name).subscribe((catData: any) => {
    //         console.log(catData);
    //         this.form.reset();
    //         this.router.navigate(['/course/showcategory']);
    //     });
    // }


}
