import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Course } from './course.model';

@Injectable({
    providedIn: 'root'
})
export class CourseManagementService {
    public url = environment.baseUrl;

    constructor(private http: HttpClient) { }

    geAllCategories(): any {
        return this.http.get(this.url + '/course-categories');
    }
    getAllCoursesBadges(): any {
        return this.http.get(this.url + '/course/getall-courses-badges');
    }
    createCourseCategory(categoryName: string): Observable<any> {
        return this.http.post(this.url + '/category/create', { name: categoryName });
    }
    createCourseOutline(outlineData: any): Observable<any> {
        return this.http.post(this.url + '/add-course-outline', outlineData);
    }
    createCourse(course: Course): Observable<any> {
        return this.http.post(this.url + '/course/create', course);
    }
    getAllCourseCategories(): Observable<any> {
        return this.http.get(this.url + '/category/getall');
    }
    getAllCourses(): Observable<any> {
        return this.http.get(this.url + '/course/getall');
    }
    getCategoryById(categoryId): Observable<any> {
        return this.http.get(this.url + '/category/get/' + categoryId);
    }
    getOutlineByCourse(courseId): Observable<any> {
        return this.http.get(this.url + '/course-outline/' + courseId);
    }
    deleteCourseCategory(categoryId): Observable<any> {
        return this.http.post(this.url + '/delete-course-category/' + categoryId, null);
    }
    updateCourseCategory(catId, catName): Observable<any> {
        return this.http.post(this.url + '/category/update/' + catId, { name: catName });
    }

}







