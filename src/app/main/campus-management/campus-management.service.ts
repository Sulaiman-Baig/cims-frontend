import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CampusManagementService {
    public url = environment.baseUrl;

    constructor(private http: HttpClient) { }

    createCampus(campus: any): Observable<any> {
        return this.http.post(this.url + '/campus/create', campus);
    }
    updateCampus(campusId, campus: any): Observable<any> {
        return this.http.post(this.url + '/campus/update/' + campusId, campus);
    }
    getAllCampuses(): Observable<any> {
        return this.http.get(this.url + '/campus/getall');
    }
    getAllCampusesBadges(): Observable<any> {
        return this.http.get(this.url + '/campus/getall-campuses-badges');
    }


}
