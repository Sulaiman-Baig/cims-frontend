import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { EnquiryManagementService } from 'app/main/enquiry-management/enquiry-management.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import io from 'socket.io-client';
import { environment } from 'environments/environment';
import { TokenService } from 'app/main/auth/token.service';

@Component({
    selector: 'quick-panel',
    templateUrl: './quick-panel.component.html',
    styleUrls: ['./quick-panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class QuickPanelComponent implements OnInit {
    date: Date;
    events: any[];
    notes: any[];
    settings: any;
    followups: any;
    comFollowups: any;
    socket: any;
    url = environment.baseUrl;
    campusId: string;

    /**
     * Constructor
     */
    constructor(
        private enquiryService: EnquiryManagementService,
        private _fuseSidebarService: FuseSidebarService,
        private tokenService: TokenService
    ) {
        this.socket = io(this.url);
        // Set the defaults
        this.date = new Date();
        this.settings = {
            notify: true,
            cloud: false,
            retro: true
        };
    }

    ngOnInit(): any {
        const token = this.tokenService.GetToken();
        if (token !== null) {
            this.campusId = this.tokenService.GetCampusId();
            this.enquiryService.getAllFollowUpInquiriesByCampus(this.campusId).subscribe((followupsRes: any) => {
                //    console.log(followupsRes);
                this.followups = followupsRes;
            });
            this.enquiryService.getAllUpcomingFollowUpInquiriesByCampus(this.campusId).subscribe((comFollowupsRes: any) => {
                // console.log(comFollowupsRes);
                this.comFollowups = comFollowupsRes;
            });

            this.socket.on('refreshPage', () => {
                this.campusId = this.tokenService.GetCampusId();
                this.enquiryService.getAllFollowUpInquiriesByCampus(this.campusId).subscribe((followupsRes: any) => {
                    //    console.log(followupsRes);
                    this.followups = followupsRes;
                });
                this.enquiryService.getAllUpcomingFollowUpInquiriesByCampus(this.campusId).subscribe((comFollowupsRes: any) => {
                    // console.log(comFollowupsRes);
                    this.comFollowups = comFollowupsRes;
                });
            });
        }


    }



    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }
}
