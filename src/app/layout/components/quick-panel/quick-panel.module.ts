import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FuseSharedModule } from '@fuse/shared.module';

import { QuickPanelComponent } from 'app/layout/components/quick-panel/quick-panel.component';
import { MatExpansionModule, MatFormFieldModule } from '@angular/material';
import { RouterModule } from '@angular/router';
const routes = [
   
];

@NgModule({
    declarations: [
        QuickPanelComponent
    ],
    imports     : [
        MatDividerModule,
        MatListModule,
        MatSlideToggleModule,
        MatExpansionModule,
        MatFormFieldModule,

        FuseSharedModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        QuickPanelComponent
    ]
})
export class QuickPanelModule
{
}
