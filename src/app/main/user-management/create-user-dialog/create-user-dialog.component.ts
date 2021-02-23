import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserManagementService } from '../user-management.service';
import { User } from '../user.model';
import io from 'socket.io-client';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from 'environments/environment';
import { TokenService } from 'app/main/auth/token.service';

@Component({
    selector: 'app-create-user-dialog',
    templateUrl: './create-user-dialog.component.html',
    styleUrls: ['./create-user-dialog.component.scss']
})
export class CreateUserDialogComponent implements OnInit, OnDestroy {

    registerForm: FormGroup;
    user: User = new User();
    employees: any;
    socket: any;
    campusId: string;
    public url = environment.baseUrl;
    private _unsubscribeAll: Subject<any>;



    isActives = [
        { status: 'Activate', value: 1 },
        { status: 'Deactivate', value: 0 }
    ];

    roles = [
        { type: 'Front Desk Representative', value: 'front_desk_representative' },
        { type: 'Telesales Representative', value: 'telesales_representative' },
        { type: 'Admissions Coordinator', value: 'admissions_coordinator' },
        { type: 'Program Manager', value: 'program_manager' },
        { type: 'Campus Head', value: 'campus_head' },
        { type: 'Admin', value: 'admin' },

    ];

    maritalstatuses = [
        'Married',
        'Un-Married',
        'Engaged'
    ];
    constructor(
        private _formBuilder: FormBuilder,
        private userService: UserManagementService,
        private router: Router,
        private matSnackBar: MatSnackBar,
        private tokenService: TokenService,
        private dialogRef: MatDialogRef<CreateUserDialogComponent>
    ) {
        this._unsubscribeAll = new Subject();
        this.socket = io(this.url);
    }

    ngOnInit(): any {
        this.campusId = this.tokenService.GetCampusId();

        this.registerForm = this._formBuilder.group({
            employee_id: ['', Validators.required],
            is_active: ['', Validators.required],
            username: ['', Validators.required],
            role: ['', Validators.required],
            password: ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
        });

        this.userService.getAllEmployeesForEmpToUserDDByCampus(this.campusId).subscribe((empRes: any) => {
            this.employees = empRes;
            // console.log(empRes);
            const noEmp = [{ full_name: 'No Employee' }];
            if (empRes.length === 0) {
                this.employees = noEmp;
            }
        });

        this.socket.on('refreshPage', () => {
            this.campusId = this.tokenService.GetCampusId();
            this.userService.getAllEmployeesForEmpToUserDDByCampus(this.campusId).subscribe((empRes: any) => {
                this.employees = empRes;
                // console.log(empRes);
                const noEmp = [{ full_name: 'No Employee' }];
                if (empRes.length === 0) {
                    this.employees = noEmp;
                }
            });
        });

        this.registerForm.get('password').valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this.registerForm.get('passwordConfirm').updateValueAndValidity();
            });
    }



    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    close(): void {
    }

    onCreateUser(): void {
        this.socket.emit('refresh', {});
        if (this.registerForm.invalid) {
            return;
        }
        const data = this.registerForm.getRawValue();
        this.user.employeeId = data.employee_id;
        this.user.is_active = data.is_active;
        this.user.username = data.username;
        this.user.role = data.role;
        this.user.password = data.password;

        // console.log(this.user);
        // console.log('ma user dialog ma ho');

        this.userService.createUser(this.user).subscribe((userRes: any) => {
            // console.log(userRes);
            this.registerForm.reset();
            this.dialogRef.close();
            this.socket.emit('refresh', {});
            this.matSnackBar.open('User Created Successfully', null, {
                verticalPosition: 'top',
                duration: 3000
            });
            this.router.navigate(['/user/show']);
        });
    }

}

export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    if (!control.parent || !control) {
        return null;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return null;
    }

    if (passwordConfirm.value === '') {
        return null;
    }

    if (password.value === passwordConfirm.value) {
        return null;
    }

    return { passwordsNotMatching: true };
};
