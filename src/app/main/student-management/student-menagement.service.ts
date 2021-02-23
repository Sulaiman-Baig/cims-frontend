import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Admission } from '../admission-management/admission.model';

@Injectable({
    providedIn: 'root'
})
export class StudentMenagementService {

    public url = environment.baseUrl;

    constructor(
        private http: HttpClient,

    ) { }

    getAllStudentByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/student/getall/' + campusId);
    }

    getStudentById(admissionId: string): Observable<any> {
        return this.http.get(this.url + '/student/get/' + admissionId);
    }

    getStudentAcademicRecord(admissionId: string): Observable<any> {
        return this.http.get(this.url + '/student/academic-record/' + admissionId);
    }

    enrollToAnotherCourse(studentId: string, admission: Admission): Observable<any> {
        return this.http.post(this.url + '/admission/enroll/' + studentId, admission);
    }

    getAllCoursesByStudent(studentId: string): Observable<any> {
        return this.http.get(this.url + '/student/courses-by-student/' + studentId);
    }

    collectInstallment(courseAdmissionId: string): Observable<any> {
        return this.http.get(this.url + '/student/collect-installment/' + courseAdmissionId);
    }

    concludeCourse(courseAdmissionId: string): Observable<any> {
        return this.http.get(this.url + '/student/conclude-course/' + courseAdmissionId);
    }

    notCompletedCourse(courseAdmissionId: string): Observable<any> {
        return this.http.get(this.url + '/student/not-completed-course/' + courseAdmissionId);
    }

    suspendCourse(courseAdmissionId: string): Observable<any> {
        return this.http.get(this.url + '/student/suspend-course/' + courseAdmissionId);
    }

    resumeCourse(courseAdmissionId: string): Observable<any> {
        return this.http.get(this.url + '/student/resume-course/' + courseAdmissionId);
    }

    freezeCourse(courseAdmissionId: string): Observable<any> {
        return this.http.get(this.url + '/student/freeze-course/' + courseAdmissionId);
    }

    unfreezeCourse(courseAdmissionId: string): Observable<any> {
        return this.http.get(this.url + '/student/unfreeze-course/' + courseAdmissionId);
    }

    getAllBatchesToTransferBatch(ids): Observable<any> {
        return this.http.post(this.url + '/student/all-batches-to-transfer-batch', ids);
    }

    getAllBatchesToTransferCampus(studentId: string, campusId: string): Observable<any> {
        return this.http.post(this.url + '/student/all-batches-to-transfer-campus/' + studentId, {campusId: campusId});
    }

    getAllCampusesToTransferCampus(studentId: string): Observable<any> {
        return this.http.get(this.url + '/student/all-campuses-to-transfer-campus/' + studentId);
    }

    transferBatch(courseAdmissionId: string, batchTransferData): Observable<any> {
        return this.http.post(this.url + '/student/transfer-batch/' + courseAdmissionId , batchTransferData);
    }

    transferCampus(courseAdmissionId: string, campusTransferData): Observable<any> {
        return this.http.post(this.url + '/student/transfer-campus/' + courseAdmissionId , campusTransferData);
    }

    createFeeSlip(installmentId: string): Observable<any> {
        return this.http.get(this.url + '/student/create-fee-slip/' + installmentId);
    }


}
