import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject, Observable } from 'rxjs';
import { Employee } from './employee.model';


@Injectable({
    providedIn: 'root'
})
export class EmployeeManagementService {
    public url = environment.baseUrl;


    constructor(
        private http: HttpClient) {

    }

    getAllCampusesForDD(): Observable<any> {
        return this.http.get(this.url + '/campus/campuses-dropdown');
    }
    getAllEmployeesBadgesByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/employee/getall-employees-badges/' + campusId);
    }
    createEmployee(employee: Employee): Observable<any> {
        return this.http.post(this.url + '/employee/create', employee);
    }
    getAllEmployeesByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/employee/employees/' + campusId);
    }
    upLoadImage(data): any {
        const fd = new FormData();
        fd.append('image', data);
        return this.http.post(this.url + '/image/upload', fd);
    }
}
