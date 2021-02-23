import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { CourseManagementService } from '../../../course-management.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Category } from '../category.model';
import { CreateCourseCategoryDialogComponent } from '../create-course-category/create-course-category-dialog/create-course-category-dialog.component';

@Component({
    selector: 'app-show-course-category',
    templateUrl: './show-course-category.component.html',
    styleUrls: ['./show-course-category.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ShowCourseCategoryComponent implements OnInit {

    url = environment.baseUrl;
    dataSource;
    displayedColumns = ['ID', 'Category Name', 'Action'];
    ELEMENT_DATA: Category[] = [];


    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private dialog: MatDialog,
        private courseService: CourseManagementService,
        private matSnackBar: MatSnackBar,
        private router: Router

    ) { }



    ngOnInit(): any {

        this.courseService.getAllCourseCategories().subscribe((courseCats: Category[]) => {
            this.ELEMENT_DATA = courseCats;
            if (courseCats.length === 0) {
                this.matSnackBar.open('No Category Found', null, {
                    duration: 3000
                });
            }
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;
            // console.log(courseCats);
        });
    }

    onCreateCategory(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        const dialogRef = this.dialog.open(CreateCourseCategoryDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => this.ngOnInit());
    }

    onUpdateCategory(category): void {
        // console.log(category);

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.data = { category: category };
        this.dialog.open(CreateCourseCategoryDialogComponent, dialogConfig);
    }

    onDeleteCategory(categoryId): void {
        this.courseService.deleteCourseCategory(categoryId).subscribe((courseCats: any) => {
            this.ngOnInit();
            console.log(courseCats);
        });

    }

}
