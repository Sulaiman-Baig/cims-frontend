import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FuseSharedModule } from '@fuse/shared.module';


// Material Modules
import {
    MatListModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatSliderModule,
    MatStepperModule,
    MatDialogModule,
    MatButtonModule,
    MatChipsModule,
    MatRippleModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatSlideToggleModule,      
    MatDividerModule,  
    MatMenuModule,
  
} from '@angular/material';

import { ProjectDashboardComponent } from './project-dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FuseSidebarModule, FuseWidgetModule } from '@fuse/components';

const routes = [
    {
        path: 'show',
        component: ProjectDashboardComponent
    },


];

@NgModule({
    declarations: [ProjectDashboardComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FuseSharedModule,

        FormsModule,
        ReactiveFormsModule,

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
        MatStepperModule,
        MatDividerModule,  
        MatMenuModule,
        NgxChartsModule,
        FuseSidebarModule,
        FuseWidgetModule
    ],
})
export class ProjectDashboardModule { }
