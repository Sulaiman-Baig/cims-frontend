import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject, Observable } from 'rxjs';
import { Enquiry } from './enquiry.model';


@Injectable({
    providedIn: 'root'
})
export class EnquiryManagementService {

    public url = environment.baseUrl;

    constructor(private http: HttpClient) { }

    createEnquiry(enquiry: Enquiry): Observable<any> {
        return this.http.post(this.url + '/inquiry/create', enquiry);
    }
    updateEnquiry(enquiryId, enquiry: Enquiry): Observable<any> {

        return this.http.post(this.url + '/update-enquiry/' + enquiryId, enquiry);
    }
    sendSMS(textmsg: any): Observable<any> {
        console.log(textmsg);

        return this.http.post(this.url + '/add-enquiry-remarks', textmsg);
    }
    voiceCall(vc: any): Observable<any> {
        return this.http.post(this.url + '/inquiryremarks/create-enquiry-remarks', vc);
    }
    walkIn(vc: any): Observable<any> {
        return this.http.post(this.url + '/inquiryremarks/create-enquiry-remarks', vc);
    }
    transferEnquiry(transfer: any): Observable<any> {
        return this.http.post(this.url + '/inquiry/transfer_inquiry', transfer);
    }
    getAllRemarksByEnquiry(enqId): Observable<any> {
        return this.http.get(this.url + '/inquiry/remarks/' + enqId);
    }
    getAllCampusesByCityForDD(city): Observable<any> {
        return this.http.post(this.url + '/inquiry/campuses-by-city', { city: city });
    }
    getAllCampusesForDD(): Observable<any> {
        return this.http.get(this.url + '/campus/campuses-dropdown');
    }
    getAllCampusesForDDToTransferCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/campus/campuses-dropdown-to-transfer-campus/' + campusId);
    }
    getAllCoursesForDD(): Observable<any> {
        return this.http.get(this.url + '/course/courses-dropdown');
    }
    getAllProspectiveInquiriesByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/inquiry/prospective/' + campusId);
    }
    getAllNeedAnalysisEnquiriesByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/inquiry/need_analysis/' + campusId);
    }
    getAllProposalEnquiriesByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/inquiry/proposal/' + campusId);
    }
    getAllNegociationEnquiriesByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/inquiry/negotiation/' + campusId);
    }
    getAllSuccessfullEnquiriesByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/inquiry/successfull/' + campusId);
    }
    getAllNotInterestedEnquiriesByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/inquiry/not_interested/' + campusId);
    }
    getAllTodaysInquiriesByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/inquiry/todays/' + campusId);
    }
    getAllFollowUpInquiriesByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/inquiry/followup/' + campusId);
    }
    getAllFollowUpInquiriesCountByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/inquiry/followup-count/' + campusId);
    }
    getAllUpcomingFollowUpInquiriesByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/inquiry/followup-upcoming/' + campusId);
    }
    getAllUpcomingFollowUpInquiriesCountByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/inquiry/followup-upcoming-count/' + campusId);
    }
    getEnquiryById(enqId): Observable<any> {
        return this.http.get(this.url + '/inquiry/get/' + enqId);
    }
    getAllEnquiriesBadgesByCampus(campusId: string): Observable<any> {
        return this.http.get(this.url + '/inquiry/getall-enquiries-badges/' + campusId);
    }



}
