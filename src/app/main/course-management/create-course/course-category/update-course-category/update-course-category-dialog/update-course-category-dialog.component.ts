import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { CourseManagementService } from '../../../../course-management.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-update-course-category-dialog',
    templateUrl: './update-course-category-dialog.component.html',
    styleUrls: ['./update-course-category-dialog.component.scss']
})
export class UpdateCourseCategoryDialogComponent implements OnInit {

    form: FormGroup;   
    data: any;
    constructor(
        private _formBuilder: FormBuilder,
        private courseService: CourseManagementService,
        private router: Router,
        private matSnackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) data) { this.data = data; }

    ngOnInit(): any {
        // console.log(this.data);
        // console.log('ab ma dialog ma ho');

        this.form = this._formBuilder.group({

            name: ['', Validators.required]

        });
        this.form.setValue({
            // name: this.data.course_category.name laravel
            name: this.data.name
        });
    }

    close(): void {
        
    }

    onUpdateCategory(): void {

        if (this.form.invalid) {
            return;
        }
        const data = this.form.getRawValue();       
        this.courseService.updateCourseCategory(this.data.id, data.name).subscribe((catData: any) => {
            // console.log(catData);
            this.form.reset();
            this.matSnackBar.open('Category Updated Successfully', null, {
                verticalPosition: 'top',
                duration: 3000
            });
            this.router.navigate(['/course/showcategory']);
        });
    }

}
