import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProjectDashboardService {

    public url = environment.baseUrl;

    constructor(private http: HttpClient) { }

    getInquiryVSAdmission(campusId): Observable<any> {

        return this.http.get(this.url + '/dashboard/enquiry-vs-admission/' + campusId);
    }

    getTodayEnquiryVSAdmission(campusId): Observable<any> {

        return this.http.get(this.url + '/dashboard/today-inquiry-vs-admission/' + campusId);
    }

    getThisWeekEnquiryVSAdmission(campusId): Observable<any> {

        return this.http.get(this.url + '/dashboard/week-inquiry-vs-admission/' + campusId);
    }

    getThisMonthEnquiryVSAdmission(campusId): Observable<any> {

        return this.http.get(this.url + '/dashboard/month-inquiry-vs-admission/' + campusId);
    }

    getNextStartingBatchDate(): Observable<any> {

        return this.http.get(this.url + '/dashboard/next-starting-batch-date'); 
    }

    getNoOfUpcomingBatches(): Observable<any> {

        return this.http.get(this.url + '/dashboard/no-of-upcoming-batches'); 
    }

    getNoOfFollowUps(): Observable<any> {

        return this.http.get(this.url + '/dashboard/no-of-followups'); 
    }

    getNoOfMonthInquiries(): Observable<any> {

        return this.http.get(this.url + '/dashboard/no-of-month-inquiries'); 
    }

    getNoOfInquiriesInPipelines(): Observable<any> {

        return this.http.get(this.url + '/dashboard/no-of-inquiries-in-pipeline'); 
    }

    getNoOfMonthAdmissions(): Observable<any> {

        return this.http.get(this.url + '/dashboard/no-of-month-admissions'); 
    }
}
