import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-followups-to-enquiry',
    templateUrl: './followups-to-enquiry.component.html',
    styleUrls: ['./followups-to-enquiry.component.scss']
})
export class FollowupsToEnquiryComponent implements OnInit {

    constructor(
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const enquiryId = this.route.snapshot.params.enquiryId;
        this.router.navigate(['enquiry/enquiry/' + enquiryId]);
    }

}
