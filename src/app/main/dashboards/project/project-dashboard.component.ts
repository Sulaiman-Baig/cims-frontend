import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, from } from 'rxjs';
import * as shape from 'd3-shape';

import { fuseAnimations } from '@fuse/animations';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { ProjectDashboardService } from './project-dashboard.service';
import { TokenService } from 'app/main/auth/token.service';
import * as moment from 'moment';


@Component({
    selector: 'app-project-dashboard',
    templateUrl: './project-dashboard.component.html',
    styleUrls: ['./project-dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProjectDashboardComponent implements OnInit {

    projects: any[];
    selectedProject: any;

    widgets: any;
    widget5: any = {};
    widget6: any = {};
    widget7: any = {};
    widget8: any = {};
    widget9: any = {};
    widget11: any = {};
    today: boolean;
    week: boolean;
    month: boolean;
    all: boolean;
    nextStartingDate: Date;
    noOfNextStartingBarches: string;
    noOfFollowups: string;
    noOfMonthInq: string;
    noOfMonthInqInPip: string;
    noOfMonthAdmissions: string;
    greet: string;
    NoUpcomingBatch: string;
    user: any;


    dateNow = Date.now();
    inquiryVSadmissionData: any[] = [];
    todayinquiryVSadmissionData: any[] = [];
    weekinquiryVSadmissionData: any[] = [];
    monthinquiryVSadmissionData: any[] = [];
    data: any[] = [];

    inquiryVSadmission: {
        name: string,
        series: {
            name: string,
            value: string
        }[]
    }[];
    a = {
        name: 'Pakistan',
        series: [
            {
                name: '2010',
                value: 7300000
            },
            {
                name: '2011',
                value: 8940000
            }
        ]
    };

    b = {
        name: 'India',
        series: [
            {
                name: '2010',
                value: 6670000
            },
            {
                name: '2011',
                value: 3570000
            }
        ]
    };

    c = {
        name: 'England',
        series: [
            {
                name: '2010',
                value: 2600000
            },
            {
                name: '2011',
                value: 2340000
            }
        ]
    };

    d = [
        {
            name: 'USA',
            series: [
                {
                    name: '2010',
                    value: 9870000
                },
                {
                    name: '2011',
                    value: 8270000
                }
            ]
        },
        {
            name: 'UK',
            series: [
                {
                    name: '2010',
                    value: 9830000
                },
                {
                    name: '2011',
                    value: 8280000
                },
                {
                    name: '2012',
                    value: 8280000
                },
                {
                    name: '2013',
                    value: 9170000
                },
                {
                    name: '2014',
                    value: 8870000
                },
                {
                    name: '2015',
                    value: 8770000
                },
                {
                    name: '2016',
                    value: 9970000
                },
                {
                    name: '2017',
                    value: 8670000
                },
                {
                    name: '2018',
                    value: 8570000
                },
                {
                    name: '2019',
                    value: 9870000
                },
                {
                    name: '2020',
                    value: 8470000
                },
                {
                    name: '2021',
                    value: 8370000
                }
            ]
        }
    ];


    pie = [
        {
            name: 'Germany',
            value: 40632,
            extra: {
                code: 'de'
            }
        },
        {
            name: 'United States',
            value: 50000,
            extra: {
                code: 'us'
            }
        },
        {
            name: 'France',
            value: 36745,
            extra: {
                code: 'fr'
            }
        },
        {
            name: 'United Kingdom',
            value: 36240,
            extra: {
                code: 'uk'
            }
        },
        {
            name: 'Spain',
            value: 33000,
            extra: {
                code: 'es'
            }
        },
        {
            name: 'Italy',
            value: 35800,
            extra: {
                code: 'it'
            }
        }
    ];



    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private _projectDashboardService: ProjectDashboardService,
        private dashboardService: ProjectDashboardService,
        private tokenService: TokenService
    ) {
        /**
         * Widget 5
         */

        this.widget5 = {
            currentRange: 'TW',
            xAxis: true,
            yAxis: true,
            gradient: false,
            legend: false,
            showXAxisLabel: false,
            xAxisLabel: 'Days',
            showYAxisLabel: false,
            yAxisLabel: 'Isues',
            scheme: {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA', '#FF0000', '#FFFF00', '#800080', '#00FF00', '#0000FF', '#FF00FF']
            },
            onSelect: (ev) => {
                console.log(ev);
            },
            supporting: {
                currentRange: '',
                xAxis: false,
                yAxis: false,
                gradient: false,
                legend: false,
                showXAxisLabel: false,
                xAxisLabel: 'Days',
                showYAxisLabel: false,
                yAxisLabel: 'Isues',
                scheme: {
                    domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA', '#FF0000', '#FFFF00', '#800080', '#00FF00', '#0000FF', '#FF00FF']
                },
                curve: shape.curveBasis
            }
        };

        /**
         * Widget 6
         */
        this.widget6 = {
            currentRange: 'TW',
            legend: false,
            explodeSlices: false,
            labels: true,
            doughnut: true,
            gradient: false,
            scheme: {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63']
            },
            onSelect: (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 7
         */
        this.widget7 = {
            currentRange: 'T'
        };

        /**
         * Widget 8
         */
        this.widget8 = {
            legend: false,
            explodeSlices: false,
            labels: true,
            doughnut: false,
            gradient: false,
            scheme: {
                domain: ['#f44336', '#9c27b0', '#03a9f4', '#e91e63', '#ffc107']
            },
            onSelect: (ev) => {
                console.log(ev);
            }
        };

        /**
         * Widget 9
         */
        this.widget9 = {
            currentRange: 'TW',
            xAxis: false,
            yAxis: false,
            gradient: false,
            legend: false,
            showXAxisLabel: false,
            xAxisLabel: 'Days',
            showYAxisLabel: false,
            yAxisLabel: 'Isues',
            scheme: {
                domain: ['#42BFF7', '#C6ECFD', '#C7B42C', '#AAAAAA']
            },
            curve: shape.curveBasis
        };

        setInterval(() => {
            this.dateNow = Date.now();
        }, 1000);

    }



    ngOnInit(): void {

        this.user = this.tokenService.GetAccount();

        this.today = false;
        this.week = false;
        this.month = false;
        this.all = false;

        const date = new Date();
        const hrs = date.getHours();
        if (hrs < 12) {
            this.greet = 'Good Morning';
        } else if (hrs >= 12 && hrs <= 17) {
            this.greet = 'Good Afternoon';
        }
        else if (hrs >= 17 && hrs <= 24) {
            this.greet = 'Good Evening';
        }



        this.dashboardService.getNextStartingBatchDate().subscribe((nextDateRes => {
            // console.log(nextDateRes);
            if (nextDateRes.nextStartingOn === 'No Upcoming Batch') {
                this.NoUpcomingBatch = 'No Upcoming Batch';
            } else {
                this.nextStartingDate = nextDateRes.nextStartingOn;
            }
        }));
        this.dashboardService.getNoOfUpcomingBatches().subscribe((noBatchRes => {
            // console.log(noBatchRes);
            this.noOfNextStartingBarches = noBatchRes;
        }));
        this.dashboardService.getNoOfFollowUps().subscribe((noFolwRes => {
            // console.log(noFolwRes);
            this.noOfFollowups = noFolwRes;
        }));
        this.dashboardService.getNoOfMonthInquiries().subscribe((noInqRes => {
            // console.log(noInqRes);
            this.noOfMonthInq = noInqRes;
        }));
        this.dashboardService.getNoOfInquiriesInPipelines().subscribe((noInqInPipRes => {
            // console.log(noInqInPipRes);
            this.noOfMonthInqInPip = noInqInPipRes;
        }));
        this.dashboardService.getNoOfMonthAdmissions().subscribe((noAdmRes => {
            // console.log(noAdmRes);
            this.noOfMonthAdmissions = noAdmRes;
        }));

        this.dashboardService.getInquiryVSAdmission(this.user.employee.campus.id).subscribe((inqvsadmRes: any) => {

            this.data = inqvsadmRes;
            this.all = true;
            this.today = false;
            this.week = false;
            this.month = false;

        });
    }

    todayenquiryvsadmission(): void {

        this.dashboardService.getTodayEnquiryVSAdmission(this.user.employee.campus.id).subscribe((inqvsadmRes: any) => {
            this.data = inqvsadmRes;
            this.today = true;
            this.week = false;
            this.month = false;
            this.all = false;
        });
    }

    thisweekenquiryvsadmission(): void {
        this.dashboardService.getThisWeekEnquiryVSAdmission(this.user.employee.campus.id).subscribe((inqvsadmRes: any) => {
            this.data = inqvsadmRes;
            this.week = true;
            this.today = false;
            this.month = false;
            this.all = false;
        });
    }

    thismonthenquiryvsadmission(): void {
        this.dashboardService.getThisMonthEnquiryVSAdmission(this.user.employee.campus.id).subscribe((inqvsadmRes: any) => {
            this.data = inqvsadmRes;
            this.month = true;
            this.today = false;
            this.week = false;
            this.all = false;

        });
    }

    allenquiryvsadmission(): void {
        this.ngOnInit();
    }






}

export class FilesDataSource extends DataSource<any>
{

    constructor(private _widget11) {
        super();
    }


    connect(): Observable<any[]> {
        return this._widget11.onContactsChanged;
    }


    disconnect(): void {
    }
}
