import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Modules

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { FuseSharedModule } from '@fuse/shared.module';
import {
    MatListModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatSliderModule,
    MatStepperModule
} from '@angular/material';
import { MatDialogModule } from '@angular/material';

// Custom
import { CreateCourseComponent } from './create-course/create-course.component';
import { AllCourseComponent } from './all-course/all-course.component';
import { FeaturedCourseComponent } from './featured-course/featured-course.component';
import { UpcomingCourseComponent } from './upcoming-course/upcoming-course.component';
import { CreateCourseDialogComponent } from './create-course/create-course-dialog/create-course-dialog.component';
import { CreateCourseOutlineComponent } from './create-course/course-outline/create-course-outline/create-course-outline.component';
import { CreateCourseOutlineDialogComponent } from './create-course/course-outline/create-course-outline-dialog/create-course-outline-dialog.component';
import { CreateCourseOutlineDialogElementComponent } from './create-course/course-outline/create-course-outline-dialog-element/create-course-outline-dialog-element.component';
import { CreateCourseCategoryComponent } from './create-course/course-category/create-course-category/create-course-category.component';
import { CreateCourseCategoryDialogComponent } from './create-course/course-category/create-course-category/create-course-category-dialog/create-course-category-dialog.component';
import { ShowCourseCategoryComponent } from './create-course/course-category/show-course-category/show-course-category.component';
import { ShowCourseOutlineComponent } from './create-course/course-outline/show-course-outline/show-course-outline.component';
import { UpdateCourseCategoryComponent } from './create-course/course-category/update-course-category/update-course-category.component';
import { UpdateCourseCategoryDialogComponent } from './create-course/course-category/update-course-category/update-course-category-dialog/update-course-category-dialog.component';
import { CourseComponent } from './course/course.component';
import { AllCourseService } from './all-course/all-course.service';
import { CourseService } from './course/course.service';
import { FuseSidebarModule } from '@fuse/components/sidebar/sidebar.module';



const routes = [
    {
        path: 'showcategory',
        component: ShowCourseCategoryComponent
    },
    {
        path: 'createcategory',
        component: CreateCourseCategoryComponent
    },
    {
        path: 'updatecategory/:categoryId',
        component: UpdateCourseCategoryComponent
    },
    {
        path: 'create',
        component: CreateCourseComponent
    },
    {
        path: 'upcoming',
        component: UpcomingCourseComponent
    },
    {
        path: 'featured',
        component: FeaturedCourseComponent
    },
    {
        path: 'all',
        component: AllCourseComponent,
        resolve  : {
            academy: AllCourseService
        }
    },
    {
        path: 'details/:courseId',
        component: CourseComponent,
        resolve  : {
            academy: CourseService
        }
    },
    {
        path: 'outline',
        component: CreateCourseOutlineComponent
    },
    {
        path: 'showoutline/:courseId',
        component: ShowCourseOutlineComponent
    },

];

@NgModule({
    declarations: [
        CreateCourseComponent,
        AllCourseComponent,
        FeaturedCourseComponent,
        UpcomingCourseComponent,
        CreateCourseDialogComponent,
        CreateCourseOutlineComponent,
        CreateCourseOutlineDialogComponent,
        CreateCourseOutlineDialogElementComponent,
        CreateCourseCategoryComponent,
        CreateCourseCategoryDialogComponent,
        ShowCourseCategoryComponent,
        ShowCourseOutlineComponent,
        UpdateCourseCategoryComponent,
        UpdateCourseCategoryDialogComponent,
        CourseComponent,
    ],
    imports: [
        CommonModule,
        FuseSharedModule,
        RouterModule.forChild(routes),

        FormsModule,
        ReactiveFormsModule,
        FuseSidebarModule,

        // Material
        MatButtonModule,
        MatButtonModule,
        MatChipsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatPaginatorModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatTableModule,
        MatTabsModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatListModule,
        MatToolbarModule,
        MatDatepickerModule,
        MatSliderModule,
        MatStepperModule
    ],
    entryComponents: [
        CreateCourseDialogComponent,
        CreateCourseOutlineDialogComponent,
        CreateCourseCategoryDialogComponent,
        UpdateCourseCategoryDialogComponent
    ]
})
export class CourseManagementModule { }
