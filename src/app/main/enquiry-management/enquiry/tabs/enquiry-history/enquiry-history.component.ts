import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../../../../@fuse/animations';
import { EnquiryManagementService } from '../../../enquiry-management.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { MatPaginator, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-enquiry-history',
  templateUrl: './enquiry-history.component.html',
  styleUrls: ['./enquiry-history.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class EnquiryHistoryComponent implements OnInit {

    url = environment.baseUrl;
    dataSource;
    displayedColumns = ['Follower', 'Status', 'Type', 'Availability', 'Probability', 'Last Followup Date', 'Remarks'];
    ELEMENT_DATA: any[] = [];


    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        // public dialog: MatDialog,
        private enquiryService: EnquiryManagementService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {

        const enquiryId = this.route.snapshot.params.id;
        this.enquiryService.getAllRemarksByEnquiry(enquiryId).subscribe((enqRmkRes: any[]) => {
            this.ELEMENT_DATA = enqRmkRes;
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;
            // console.log(enqRmkRes);
        });  
  }

}
