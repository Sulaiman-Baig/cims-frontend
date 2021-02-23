import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../admin/admin.model';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TokenService } from '../token.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    user: User = new User();
    role: string = 'admin';
    loginFailed = false;
    loginFailedMessage: string;


    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseNavigationService: FuseNavigationService,
        private _formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private tokenService: TokenService,

    ) {
        // Configure the layout
        this._fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.loginForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onLogin(): any {
        const data = this.loginForm.getRawValue();
        this.user.email = data.email;
        this.user.password = data.password;
        this.authService.login(this.user).subscribe((res: any) => {            

            if (res.message === 'Invalid credentials') {
                this.loginFailed = true;
                this.loginFailedMessage = 'UN-AUTHORIZED CREDENTIALS';
                this.router.navigate(['/login']);

            } else if (res.message === 'successfully login') {

                this.tokenService.SetToken(res.accessToken);
                this.tokenService.SetRole(res.user.role);
                this.tokenService.SetAccount(res.user);
                this.tokenService.SetCampusId(res.user.employee.campus.id);

                console.log('role is  owner from login');
                if (res.user.role !== 'owner') {
                    console.log('role is  not owner from login');
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

                this.router.navigate(['/dashboard/show']);
            }
        });
    }






}
