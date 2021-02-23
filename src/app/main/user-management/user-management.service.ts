import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject, Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UserManagementService {
    public url = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getAllEmployeesForEmpToUserDDByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/employee/employees-dropdown-emp-usr/' + campusId);
    }
    createUser(user: User): Observable<any> {
        return this.http.post(this.url + '/user/create', user);
    }
    getallByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/user/users/' + campusId);
    }
    getAllUsersBadgesByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/user/users-badges/' + campusId);
    }
}
