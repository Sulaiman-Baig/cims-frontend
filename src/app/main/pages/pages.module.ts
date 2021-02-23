import { NgModule } from '@angular/core';


import { Error404Module } from 'app/main/pages/errors/404/error-404.module';
import { Error500Module } from 'app/main/pages/errors/500/error-500.module';


@NgModule({
    imports: [
      

      
        Error404Module,
        Error500Module,

    
    ]
})
export class PagesModule
{

}
