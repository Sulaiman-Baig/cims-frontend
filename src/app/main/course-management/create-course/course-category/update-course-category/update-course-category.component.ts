import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseManagementService } from 'app/main/course-management/course-management.service';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { UpdateCourseCategoryDialogComponent } from './update-course-category-dialog/update-course-category-dialog.component';

@Component({
    selector: 'app-update-course-category',
    templateUrl: './update-course-category.component.html',
    styleUrls: ['./update-course-category.component.scss']
})
export class UpdateCourseCategoryComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private courseService: CourseManagementService,
        private dialog: MatDialog,
        private router: Router

    ) { }

    ngOnInit(): void {
        const categoryId = this.route.snapshot.params.categoryId;
        this.courseService.getCategoryById(categoryId).subscribe((catRes: any) => {
            console.log(catRes);
            console.log('ma update category ma ho');
            const dialogConfig = new MatDialogConfig();
            dialogConfig.disableClose = true;
            dialogConfig.autoFocus = true;
            dialogConfig.data = catRes;
            const dialogRef = this.dialog.open(UpdateCourseCategoryDialogComponent, dialogConfig);
            dialogRef.afterClosed().subscribe(() => {
                this.router.navigate(['/course/showcategory']);
            });
        });

    }



}
