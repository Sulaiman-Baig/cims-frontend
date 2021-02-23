import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CourseService implements Resolve<any> {

    onCourseChanged: BehaviorSubject<any>;
    url = environment.baseUrl;

   
    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.onCourseChanged = new BehaviorSubject({});
    }

    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getCourse(route.params.courseId)
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    
    getCourse(courseId): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(this.url + '/course/' + courseId)
                .subscribe((response: any) => {
                    this.onCourseChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }
}
