import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AllCourseService implements Resolve<any> {

    onCategoriesChanged: BehaviorSubject<any>;
    onCoursesChanged: BehaviorSubject<any>;
    url = environment.baseUrl;

    
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onCategoriesChanged = new BehaviorSubject({});
        this.onCoursesChanged = new BehaviorSubject({});
    }

    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getCategories(),
                this.getCourses()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

   
    getCategories(): Promise<any> {
        return new Promise((resolve, reject) => {
            // this._httpClient.get(this.url + '/course-categories')
            this._httpClient.get(this.url + '/category/getall')
                .subscribe((response: any) => {
                    this.onCategoriesChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

    
    getCourses(): Promise<any> {
        return new Promise((resolve, reject) => {
            // this._httpClient.get(this.url + '/courses')
            this._httpClient.get(this.url + '/course/getall')
                .subscribe((response: any) => {
                    this.onCoursesChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }
}
