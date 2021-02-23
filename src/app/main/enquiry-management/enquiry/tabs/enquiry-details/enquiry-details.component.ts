import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';


import { fuseAnimations } from '@fuse/animations';
import { EnquiryManagementService } from 'app/main/enquiry-management/enquiry-management.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-enquiry-details',
    templateUrl: './enquiry-details.component.html',
    styleUrls: ['./enquiry-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class EnquiryDetailsComponent implements OnInit {

    enquirydetails: any;

    constructor(
        private enquiryService: EnquiryManagementService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {

        const enquiryId = this.route.snapshot.params.id;
        this.enquiryService.getEnquiryById(enquiryId).subscribe((enqRes: any) => {
            this.enquirydetails = enqRes;
            // console.log(enqRes);
        } );
    }

}
