import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import io from 'socket.io-client';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { TokenService } from 'app/main/auth/token.service';
import { navigation } from 'app/navigation/navigation';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { EnquiryManagementService } from 'app/main/enquiry-management/enquiry-management.service';
import { AdmissionManagementService } from 'app/main/admission-management/admission-management.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    socket: any;
    role: string = '';
    user: any;
    userPic: any;
    url = environment.baseUrl;
    followupsCount: number;
    comFollowupsCount: number;
    campuses: any;
    isOwner: boolean;
    selectCampusId: FormGroup;
    campusId: string;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private enquiryService: EnquiryManagementService,
        private admissionService: AdmissionManagementService,
        private tokenService: TokenService,
        private _formBuilder: FormBuilder,
        private router: Router
    ) {
        this.socket = io(this.url);
        // Set the defaults
        this.userStatusOptions = [
            {
                title: 'Online',
                icon: 'icon-checkbox-marked-circle',
                color: '#4CAF50'
            },
            {
                title: 'Away',
                icon: 'icon-clock',
                color: '#FFC107'
            },
            {
                title: 'Do not Disturb',
                icon: 'icon-minus-circle',
                color: '#F44336'
            },
            {
                title: 'Invisible',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#BDBDBD'
            },
            {
                title: 'Offline',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#616161'
            }
        ];

        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'tr',
                title: 'Turkish',
                flag: 'tr'
            }
        ];

        this.navigation = navigation;

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------


    /**
     * On init
     */
    ngOnInit(): void {
        const token = this.tokenService.GetToken();

        this.selectCampusId = this._formBuilder.group({
            campus_id: ['']
        });
        if (token !== null) {
            this.role = this.tokenService.GetRole();
            this.user = this.tokenService.GetAccount();

            if (this.role === 'owner') {
                console.log('role is owner from toolbar');
                this.isOwner = true;
                this.admissionService.getAllCampusesForDD().subscribe((campsRes: any) => {
                    this.campuses = campsRes;
                });
                const campusId = this.selectCampusId.get('campus_id');
                campusId.setValidators(Validators.required);
                campusId.updateValueAndValidity();
            } else {
                console.log('role is  not owner from toolbar');
                this.isOwner = false;

            }
            this.campusId = this.tokenService.GetCampusId();
            this.enquiryService.getAllFollowUpInquiriesCountByCampus(this.campusId).subscribe((followupsRes: any) => {
                this.followupsCount = followupsRes;
            });
            this.enquiryService.getAllUpcomingFollowUpInquiriesCountByCampus(this.campusId).subscribe((comFollowupsRes: any) => {
                this.comFollowupsCount = comFollowupsRes;
            });

            this.socket.on('refreshPage', () => {
                this.campusId = this.tokenService.GetCampusId();
                this.enquiryService.getAllFollowUpInquiriesCountByCampus(this.campusId).subscribe((followupsRes: any) => {
                    this.followupsCount = followupsRes;
                });
                this.enquiryService.getAllUpcomingFollowUpInquiriesCountByCampus(this.campusId).subscribe((comFollowupsRes: any) => {
                    this.comFollowupsCount = comFollowupsRes;
                });
            });
        }

        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, { id: this._translateService.currentLang });



        if (token !== null) {

            this.user = this.tokenService.GetAccount();

        }
        this.campusId = this.tokenService.GetCampusId();
        this.enquiryService.getAllFollowUpInquiriesCountByCampus(this.campusId).subscribe((followupsRes: any) => {
            this.followupsCount = followupsRes;
        });
        this.enquiryService.getAllUpcomingFollowUpInquiriesCountByCampus(this.campusId).subscribe((comFollowupsRes: any) => {
            this.comFollowupsCount = comFollowupsRes;
        });
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

    onLogout(): any {

        // this.role = this.tokenService.GetRole();

        this._fuseNavigationService.updateNavigationItem('campuses', {
            hidden: false
        });
        this._fuseNavigationService.updateNavigationItem('employees', {
            hidden: false
        });
        this._fuseNavigationService.updateNavigationItem('users', {
            hidden: false
        });


        this.tokenService.DeleteToken();
        this.tokenService.DeleteRole();
        this.tokenService.DeleteAccount();
        this.tokenService.DeleteCampusId();
        this.router.navigate(['login']);


    }
    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
        console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }

    onChangeCampus(e): void {
        this.tokenService.SetCampusId(e.value);
        // const campusId = this.tokenService.GetCampusId();
        this.socket.emit('refresh', {});
        this.socket.emit('onStudent', {});
        this.socket.emit('onAdmission', {});
        this.socket.emit('onInquiry', {});
        this.socket.emit('onBatch', {});
        this.socket.emit('onEmployee', {});
        this.socket.emit('onUser', {});
    }
}
