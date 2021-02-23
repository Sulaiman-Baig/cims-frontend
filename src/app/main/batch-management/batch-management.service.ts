import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject, Observable } from 'rxjs';
import { Batch } from './batch.model';

@Injectable({
    providedIn: 'root'
})
export class BatchManagementService {

    public url = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getAllEmployeesForDDByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/employee/employees-dropdown/' + campusId);

    }
    createBatch(batch: Batch): Observable<any> {
        return this.http.post(this.url + '/batch/create', batch);
    }
    getAllBatches(): Observable<any> {

        return this.http.get(this.url + '/batches');
    }
    getAllUpcomingBatchesByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/batch/upcoming/' + campusId);
    }
    getAllRecentlyStartedBatchesByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/batch/recentlystarted/' + campusId);
    }
    getAllRecentlyEndedBatchesByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/batch/recentlyended/' + campusId);
    }
    getAllEndedBatchesByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/batch/ended/' + campusId);
    }
    getAllInProgressBatchesByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/batch/inprogress/' + campusId);
    }
    getAllCoursesForDD(): Observable<any> {
        return this.http.get(this.url + '/course/courses-dropdown');
    }
    getAllCampusesForDD(): Observable<any> {
        return this.http.get(this.url + '/campus/campuses-dropdown');
    }
    getAllBatchesBadgesByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/batch/getall-batches-badges/' + campusId);
    }
}
