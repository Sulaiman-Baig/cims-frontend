import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject, Observable } from 'rxjs';
import { Admission } from './admission.model';

@Injectable({
    providedIn: 'root'
})
export class AdmissionManagementService {

    public url = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getAllCampusesForDD(): Observable<any> {
        return this.http.get(this.url + '/campus/campuses-dropdown');
    }
    getAllCoursesForDD(): Observable<any> {
        return this.http.get(this.url + '/course/courses-dropdown');
    }
    getAllBatchesByCourseAndCampus(courseId: string, campusId: string): Observable<any> {
        return this.http.get(this.url + '/batch/course-batches-dropdown/' + courseId + '/' + campusId);
    }
    getCourseById(courseId): Observable<any> {
        return this.http.get(this.url + '/course/get/' + courseId);
    }
    createAdmission(admission: Admission): Observable<any> {
        return this.http.post(this.url + '/admission/create', admission);
    }
    getStudentWithNIC(stdNIC): Observable<any> {
        return this.http.post(this.url + '/admission/is-student-exist-with-CNIC', { nic: stdNIC });
    }
    getStudentWithContactNo(stdCntNo): Observable<any> {
        return this.http.post(this.url + '/admission/is-student-exist-with-contact-no', { personal_contact: stdCntNo });
    }
    getStudentWithGuardianContactNo(guardCntNo): Observable<any> {
        return this.http.post(this.url + '/admission/is-student-exist-with-guardian-contact-no', { guardian_contact: guardCntNo });
    }
    getStudentWithEmail(stdEmail): Observable<any> {
        return this.http.post(this.url + '/admission/is-student-exist-with-email', { email: stdEmail });
    }
    getAllAdmissionsByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/admission/all-admissions-by-campus/' + campusId);
    }    
    getAllTodaysAdmissionsByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/admission/all-todays-admissions-by-campus/' + campusId);
    }
    getAllThisMonthsAdmissionsByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/admission/all-thismonths-admissions-by-campus/' + campusId);
    }
    getAllThisYearsAdmissionsByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/admission/all-thisyears-admissions-by-campus/' + campusId);
    }
    getAllAdmissionsBadgesByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/admission/getall-admissions-badges/' + campusId);
    }
}
