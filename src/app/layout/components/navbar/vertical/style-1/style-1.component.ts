import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FusePerfectScrollbarDirective } from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { TokenService } from 'app/main/auth/token.service';
import io from 'socket.io-client';
import { EnquiryManagementService } from 'app/main/enquiry-management/enquiry-management.service';
import { BatchManagementService } from 'app/main/batch-management/batch-management.service';
import { EmployeeManagementService } from 'app/main/employee-management/employee-management.service';
import { UserManagementService } from 'app/main/user-management/user-management.service';
import { CampusManagementService } from 'app/main/campus-management/campus-management.service';
import { environment } from 'environments/environment';
import { CourseManagementService } from 'app/main/course-management/course-management.service';
import { AdmissionManagementService } from 'app/main/admission-management/admission-management.service';

@Component({
    selector: 'navbar-vertical-style-1',
    templateUrl: './style-1.component.html',
    styleUrls: ['./style-1.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle1Component implements OnInit, OnDestroy {
    fuseConfig: any;
    navigation: any;
    user: any;
    socket: any;
    role: string = '';
    campusId: string;
    url = environment.baseUrl;

    // Private
    private _fusePerfectScrollbar: FusePerfectScrollbarDirective;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseNavigationService} _fuseNavigationService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {Router} _router
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private enquiryService: EnquiryManagementService,
        private admissionService: AdmissionManagementService,
        private campusService: CampusManagementService,
        private batchService: BatchManagementService,
        private employeeService: EmployeeManagementService,
        private userService: UserManagementService,
        private courseService: CourseManagementService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _router: Router,
        private tokenService: TokenService
    ) {
        this.socket = io(this.url);
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Directive
    @ViewChild(FusePerfectScrollbarDirective, { static: true })
    set directive(theDirective: FusePerfectScrollbarDirective) {
        if (!theDirective) {
            return;
        }

        this._fusePerfectScrollbar = theDirective;

        // Update the scrollbar on collapsable item toggle
        this._fuseNavigationService.onItemCollapseToggled
            .pipe(
                delay(500),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this._fusePerfectScrollbar.update();
            });

        // Scroll to the active item position
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                setTimeout(() => {
                    this._fusePerfectScrollbar.scrollToElement('navbar .nav-link.active', -120);
                });
            }
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Custom 
        console.log('m from style');
        const token = this.tokenService.GetToken();
        


        if (token !== null) {
            this.campusId = this.tokenService.GetCampusId();
            this.user = this.tokenService.GetAccount();
            this.role = this.tokenService.GetRole();
        }
        if (this.role !== 'owner') {
            console.log('role is  not owner from style');
            this._fuseNavigationService.updateNavigationItem('campuses', {
                hidden: true
            });
            this._fuseNavigationService.updateNavigationItem('employees', {
                hidden: true
            });
            this._fuseNavigationService.updateNavigationItem('users', {
                hidden: true
            });
        }
        // Custom ends

        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                if (this._fuseSidebarService.getSidebar('navbar')) {
                    this._fuseSidebarService.getSidebar('navbar').close();
                }
            }
            );

        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {
                this.fuseConfig = config;
            });

        // Get current navigation
        this._fuseNavigationService.onNavigationChanged
            .pipe(
                filter(value => value !== null),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this.navigation = this._fuseNavigationService.getCurrentNavigation();
            });

        // Update Navigation 
        if (token !== null) {
            // Enquiries starts        
            this.socket.on('refreshInquiry', () => {
                this.campusId = this.tokenService.GetCampusId();
                this.enquiryService.getAllEnquiriesBadgesByCampus(this.campusId).subscribe((enqbadgesRes: any) => {
                    // console.log(enqbadgesRes);


                    this._fuseNavigationService.updateNavigationItem('enquries', {
                        badge: {
                            title:
                                enqbadgesRes.successfull
                                + enqbadgesRes.not_interested
                                + enqbadgesRes.prospective
                                + enqbadgesRes.need_analysis
                                + enqbadgesRes.proposal
                                + enqbadgesRes.negotiation,

                            bg: '#F44336',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('followup', {
                        badge: {
                            title:
                                enqbadgesRes.followup
                                + enqbadgesRes.prospective
                                + enqbadgesRes.need_analysis
                                + enqbadgesRes.proposal
                                + enqbadgesRes.negotiation,

                            bg: '#F44336',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('todayfollowup', {
                        badge: {
                            title: enqbadgesRes.followup,

                            bg: '#e91e63',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('todayenquiry', {
                        badge: {
                            title: enqbadgesRes.today,

                            bg: '#e91e63',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('pipeline', {
                        badge: {
                            title:
                                enqbadgesRes.prospective
                                + enqbadgesRes.need_analysis
                                + enqbadgesRes.proposal
                                + enqbadgesRes.negotiation,

                            bg: '#F44336',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('prospective', {
                        badge: {
                            title: enqbadgesRes.prospective,

                            bg: '#e91e63',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('needanalysis', {
                        badge: {
                            title: enqbadgesRes.need_analysis,

                            bg: '#e91e63',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('proposal', {
                        badge: {
                            title: enqbadgesRes.proposal,

                            bg: '#e91e63',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('negotiation', {
                        badge: {
                            title: enqbadgesRes.negotiation,

                            bg: '#e91e63',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('successfullyenrolled', {
                        badge: {
                            title: enqbadgesRes.successfull,

                            bg: '#e91e63',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('notinterested', {
                        badge: {
                            title: enqbadgesRes.not_interested,

                            bg: '#e91e63',
                            fg: '#FFFFFF'
                        }
                    });


                });
            });
            this.enquiryService.getAllEnquiriesBadgesByCampus(this.campusId).subscribe((enqbadgesRes: any) => {
                // console.log(enqbadgesRes);


                this._fuseNavigationService.updateNavigationItem('enquries', {
                    badge: {
                        title:
                            enqbadgesRes.successfull
                            + enqbadgesRes.not_interested
                            + enqbadgesRes.prospective
                            + enqbadgesRes.need_analysis
                            + enqbadgesRes.proposal
                            + enqbadgesRes.negotiation,

                        bg: '#F44336',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('followup', {
                    badge: {
                        title:
                            enqbadgesRes.followup
                            + enqbadgesRes.prospective
                            + enqbadgesRes.need_analysis
                            + enqbadgesRes.proposal
                            + enqbadgesRes.negotiation,

                        bg: '#F44336',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('todayfollowup', {
                    badge: {
                        title: enqbadgesRes.followup,

                        bg: '#e91e63',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('todayenquiry', {
                    badge: {
                        title: enqbadgesRes.today,

                        bg: '#e91e63',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('pipeline', {
                    badge: {
                        title:
                            enqbadgesRes.prospective
                            + enqbadgesRes.need_analysis
                            + enqbadgesRes.proposal
                            + enqbadgesRes.negotiation,

                        bg: '#F44336',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('prospective', {
                    badge: {
                        title: enqbadgesRes.prospective,

                        bg: '#e91e63',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('needanalysis', {
                    badge: {
                        title: enqbadgesRes.need_analysis,

                        bg: '#e91e63',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('proposal', {
                    badge: {
                        title: enqbadgesRes.proposal,

                        bg: '#e91e63',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('negotiation', {
                    badge: {
                        title: enqbadgesRes.negotiation,

                        bg: '#e91e63',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('successfullyenrolled', {
                    badge: {
                        title: enqbadgesRes.successfull,

                        bg: '#e91e63',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('notinterested', {
                    badge: {
                        title: enqbadgesRes.not_interested,

                        bg: '#e91e63',
                        fg: '#FFFFFF'
                    }
                });


            });
            // Enquiries ends
            // Batches starts
            this.socket.on('refreshBatch', () => {
                this.campusId = this.tokenService.GetCampusId();
                this.batchService.getAllBatchesBadgesByCampus(this.campusId).subscribe((batchBadgeRes: any) => {
                    // console.log(batchBadgeRes);
                    this._fuseNavigationService.updateNavigationItem('batches', {
                        badge: {
                            title:
                                batchBadgeRes.upcoming
                                + batchBadgeRes.recentlystarted
                                + batchBadgeRes.inprogress
                                + batchBadgeRes.recentlyended
                                + batchBadgeRes.ended,


                            bg: '#228b22',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('upcoming', {
                        badge: {
                            title: batchBadgeRes.upcoming,

                            bg: '#039487',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('recently-started', {
                        badge: {
                            title: batchBadgeRes.recentlystarted,

                            bg: '#039487',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('inprogress', {
                        badge: {
                            title: batchBadgeRes.inprogress,

                            bg: '#039487',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('recently-ended', {
                        badge: {
                            title: batchBadgeRes.recentlyended,

                            bg: '#039487',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('ended', {
                        badge: {
                            title: batchBadgeRes.ended,

                            bg: '#039487',
                            fg: '#FFFFFF'
                        }
                    });
                });
            });
            this.batchService.getAllBatchesBadgesByCampus(this.campusId).subscribe((batchBadgeRes: any) => {
                // console.log(batchBadgeRes);
                this._fuseNavigationService.updateNavigationItem('batches', {
                    badge: {
                        title:
                            batchBadgeRes.upcoming
                            + batchBadgeRes.recentlystarted
                            + batchBadgeRes.inprogress
                            + batchBadgeRes.recentlyended
                            + batchBadgeRes.ended,


                        bg: '#228b22',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('upcoming', {
                    badge: {
                        title: batchBadgeRes.upcoming,

                        bg: '#039487',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('recently-started', {
                    badge: {
                        title: batchBadgeRes.recentlystarted,

                        bg: '#039487',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('inprogress', {
                    badge: {
                        title: batchBadgeRes.inprogress,

                        bg: '#039487',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('recently-ended', {
                    badge: {
                        title: batchBadgeRes.recentlyended,

                        bg: '#039487',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('ended', {
                    badge: {
                        title: batchBadgeRes.ended,

                        bg: '#039487',
                        fg: '#FFFFFF'
                    }
                });
            });
            // Batches ends
            // Employees starts
            this.socket.on('refreshEmployee', () => {
                this.campusId = this.tokenService.GetCampusId();
                this.employeeService.getAllEmployeesBadgesByCampus(this.campusId).subscribe((empBadgeRes: any) => {
                    // console.log(empBadgeRes);
                    this._fuseNavigationService.updateNavigationItem('employees', {
                        badge: {
                            title: empBadgeRes,

                            bg: '#9B870C',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('showempployee', {
                        badge: {
                            title: empBadgeRes,

                            bg: '#FFBF00',
                            fg: '#FFFFFF'
                        }
                    });
                });
            });
            this.employeeService.getAllEmployeesBadgesByCampus(this.campusId).subscribe((empBadgeRes: any) => {
                // console.log(empBadgeRes);
                this._fuseNavigationService.updateNavigationItem('employees', {
                    badge: {
                        title: empBadgeRes,

                        bg: '#9B870C',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('showempployee', {
                    badge: {
                        title: empBadgeRes,

                        bg: '#FFBF00',
                        fg: '#FFFFFF'
                    }
                });
            });
            // Employees ends
            // Users starts
            this.socket.on('refreshUser', () => {
                this.campusId = this.tokenService.GetCampusId();
                this.userService.getAllUsersBadgesByCampus(this.campusId).subscribe((usrBadgeRes: any) => {
                    // console.log(usrBadgeRes);
                    this._fuseNavigationService.updateNavigationItem('users', {
                        badge: {
                            title: usrBadgeRes,

                            bg: '#00308F',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('showuser', {
                        badge: {
                            title: usrBadgeRes,

                            bg: '#72A0C1',
                            fg: '#FFFFFF'
                        }
                    });
                });
            });
            this.userService.getAllUsersBadgesByCampus(this.campusId).subscribe((usrBadgeRes: any) => {
                // console.log(usrBadgeRes);
                this._fuseNavigationService.updateNavigationItem('users', {
                    badge: {
                        title: usrBadgeRes,

                        bg: '#00308F',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('showuser', {
                    badge: {
                        title: usrBadgeRes,

                        bg: '#72A0C1',
                        fg: '#FFFFFF'
                    }
                });
            });
            // Users ends
            // Campuses starts
            this.socket.on('refreshPage', () => {
                this.campusId = this.tokenService.GetCampusId();
                this.campusService.getAllCampusesBadges().subscribe((cmpBadgeRes: any) => {
                    // console.log(empBadgeRes);
                    this._fuseNavigationService.updateNavigationItem('campuses', {
                        badge: {
                            title: cmpBadgeRes,

                            bg: '#FF8C00',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('showCampus', {
                        badge: {
                            title: cmpBadgeRes,

                            bg: '#FFA500',
                            fg: '#FFFFFF'
                        }
                    });
                });
            });

            this.campusService.getAllCampusesBadges().subscribe((cmpBadgeRes: any) => {
                // console.log(empBadgeRes);
                this._fuseNavigationService.updateNavigationItem('campuses', {
                    badge: {
                        title: cmpBadgeRes,

                        bg: '#FF8C00',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('showCampus', {
                    badge: {
                        title: cmpBadgeRes,

                        bg: '#FFA500',
                        fg: '#FFFFFF'
                    }
                });
            });
            // Campuses ends
            // Admissions starts
            this.socket.on('refreshAdmission', () => {
                this.campusId = this.tokenService.GetCampusId();
                this.admissionService.getAllAdmissionsBadgesByCampus(this.campusId).subscribe((cmpBadgeRes: any) => {
                    console.log(cmpBadgeRes);
                    this._fuseNavigationService.updateNavigationItem('admissions', {
                        badge: {
                            title: cmpBadgeRes.alladmissions + cmpBadgeRes.todayadmissions + cmpBadgeRes.monthadmissions + cmpBadgeRes.yearadmissions,

                            bg: '#491474',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('todayadmissions', {
                        badge: {
                            title: cmpBadgeRes.todayadmissions,

                            bg: '#c900ff',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('currentmonthadmissions', {
                        badge: {
                            title: cmpBadgeRes.monthadmissions,

                            bg: '#c900ff',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('currentyearadmissions', {
                        badge: {
                            title: cmpBadgeRes.yearadmissions,

                            bg: '#c900ff',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('alladmissions', {
                        badge: {
                            title: cmpBadgeRes.alladmissions,

                            bg: '#c900ff',
                            fg: '#FFFFFF'
                        }
                    });
                });
            });
            this.admissionService.getAllAdmissionsBadgesByCampus(this.campusId).subscribe((cmpBadgeRes: any) => {
                console.log(cmpBadgeRes);
                this._fuseNavigationService.updateNavigationItem('admissions', {
                    badge: {
                        title: cmpBadgeRes.alladmissions + cmpBadgeRes.todayadmissions + cmpBadgeRes.monthadmissions + cmpBadgeRes.yearadmissions,

                        bg: '#491474',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('todayadmissions', {
                    badge: {
                        title: cmpBadgeRes.todayadmissions,

                        bg: '#c900ff',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('currentmonthadmissions', {
                    badge: {
                        title: cmpBadgeRes.monthadmissions,

                        bg: '#c900ff',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('currentyearadmissions', {
                    badge: {
                        title: cmpBadgeRes.yearadmissions,

                        bg: '#c900ff',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('alladmissions', {
                    badge: {
                        title: cmpBadgeRes.alladmissions,

                        bg: '#c900ff',
                        fg: '#FFFFFF'
                    }
                });
            });
            // Admissions ends
            // Students starts
            // this.socket.on('refreshPage', () => {
            //     this.campusId = this.tokenService.GetCampusId();
            //     this.campusService.getAllCampusesBadges(this.campusId).subscribe((cmpBadgeRes: any) => {
            //         // console.log(empBadgeRes);
            //         this._fuseNavigationService.updateNavigationItem('students', {
            //             badge: {
            //                 title: 0,

            //                 bg: '#9D1917',
            //                 fg: '#FFFFFF'
            //             }
            //         });
            //         this._fuseNavigationService.updateNavigationItem('currentstudents', {
            //             badge: {
            //                 title: 0,

            //                 bg: '#B14C22',
            //                 fg: '#FFFFFF'
            //             }
            //         });
            //         this._fuseNavigationService.updateNavigationItem('freezedstudents', {
            //             badge: {
            //                 title: 0,

            //                 bg: '#B14C22',
            //                 fg: '#FFFFFF'
            //             }
            //         });
            //         this._fuseNavigationService.updateNavigationItem('suspendedstudents', {
            //             badge: {
            //                 title: 0,

            //                 bg: '#B14C22',
            //                 fg: '#FFFFFF'
            //             }
            //         });
            //         this._fuseNavigationService.updateNavigationItem('alumnus', {
            //             badge: {
            //                 title: 0,

            //                 bg: '#B14C22',
            //                 fg: '#FFFFFF'
            //             }
            //         });
            //     });
            // });
            // this.campusId = this.tokenService.GetCampusId();
            // this.campusService.getAllCampusesBadges(this.campusId).subscribe((cmpBadgeRes: any) => {
            //     // console.log(empBadgeRes);
            //     this._fuseNavigationService.updateNavigationItem('students', {
            //         badge: {
            //             title: 0,

            //             bg: '#9D1917',
            //             fg: '#FFFFFF'
            //         }
            //     });
            //     this._fuseNavigationService.updateNavigationItem('currentstudents', {
            //         badge: {
            //             title: 0,

            //             bg: '#B14C22',
            //             fg: '#FFFFFF'
            //         }
            //     });
            //     this._fuseNavigationService.updateNavigationItem('freezedstudents', {
            //         badge: {
            //             title: 0,

            //             bg: '#B14C22',
            //             fg: '#FFFFFF'
            //         }
            //     });
            //     this._fuseNavigationService.updateNavigationItem('suspendedstudents', {
            //         badge: {
            //             title: 0,

            //             bg: '#B14C22',
            //             fg: '#FFFFFF'
            //         }
            //     });
            //     this._fuseNavigationService.updateNavigationItem('alumnus', {
            //         badge: {
            //             title: 0,

            //             bg: '#B14C22',
            //             fg: '#FFFFFF'
            //         }
            //     });
            // });
            // Students ends
            // Courses starts
            this.socket.on('refreshPage', () => {
                this.campusId = this.tokenService.GetCampusId();
                this.courseService.getAllCoursesBadges().subscribe((crsBadgeRes: any) => {
                    // console.log(empBadgeRes);
                    this._fuseNavigationService.updateNavigationItem('courses', {
                        badge: {
                            title: crsBadgeRes.noOfcourses,

                            bg: '#111111',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('categories', {
                        badge: {
                            title: crsBadgeRes.noOfcategories,

                            bg: '#555555',
                            fg: '#FFFFFF'
                        }
                    });
                    this._fuseNavigationService.updateNavigationItem('currentcourses', {
                        badge: {
                            title: 0,

                            bg: '#555555',
                            fg: '#FFFFFF'
                        }
                    });
                });
            });
            this.courseService.getAllCoursesBadges().subscribe((crsBadgeRes: any) => {
                // console.log(empBadgeRes);
                this._fuseNavigationService.updateNavigationItem('courses', {
                    badge: {
                        title: crsBadgeRes.noOfcourses,

                        bg: '#111111',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('categories', {
                    badge: {
                        title: crsBadgeRes.noOfcategories,

                        bg: '#555555',
                        fg: '#FFFFFF'
                    }
                });
                this._fuseNavigationService.updateNavigationItem('currentcourses', {
                    badge: {
                        title: 0,

                        bg: '#555555',
                        fg: '#FFFFFF'
                    }
                });
            });
            // Courses ends

        }


    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar opened status
     */
    toggleSidebarOpened(): void {
        this._fuseSidebarService.getSidebar('navbar').toggleOpen();
    }

    /**
     * Toggle sidebar folded status
     */
    toggleSidebarFolded(): void {
        this._fuseSidebarService.getSidebar('navbar').toggleFold();
    }
}
