import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdmissionManagementService } from '../../admission-management/admission-management.service';
import { Admission } from '../../admission-management/admission.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatPaginator, MatTableDataSource, MatTooltip } from '@angular/material';
import { Router } from '@angular/router';
import io from 'socket.io-client';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from 'app/main/auth/token.service';
import { StudentMenagementService } from '../student-menagement.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-enrollment',
    templateUrl: './enrollment.component.html',
    styleUrls: ['./enrollment.component.scss']
})
export class EnrollmentComponent implements OnInit {

    paymentplans = [
        'Lumpsum',
        'Installment'
    ];

    genders = [
        'Male',
        'Female',
        'Other'
    ];

    noofinstalments = [
        'Two',
        'Three'
    ];

    selectcourse: FormGroup;
    personalinfo: FormGroup;
    academicinfo: FormGroup;
    form: FormGroup;
    forofficeuse: FormGroup;
    month: number;
    courses: any;
    course: any;
    batches: any;
    campuses: any;
    feepackage: number;
    discountpercentage: number;
    isinstallments: boolean;
    twoinstallments: boolean;
    threeinstallments: boolean;
    instalments: string;
    role: string;
    user: any;
    isOwner: boolean;
    invalidInstalments: boolean;
    isStudentAlreadyExist: boolean;
    admission: Admission = new Admission();
    studentId: string;
    campusId: string;
    socket: any;
    url = environment.baseUrl;


    constructor(
        private _formBuilder: FormBuilder,
        private studentService: StudentMenagementService,
        private router: Router,
        private matSnackBar: MatSnackBar,
        private tokenService: TokenService,
        private admissionService: AdmissionManagementService,
        private dialogRef: MatDialogRef<EnrollmentComponent>,
        @Inject(MAT_DIALOG_DATA) data
    ) { 
        this.studentId = data;
        this.socket = io(this.url);
    }

    ngOnInit(): any {
       
        if (this.role !== 'owner') {            
            this.campusId = this.tokenService.GetCampusId();
            // console.log(this.campusId);
        }

        this.user = this.tokenService.GetAccount();
        this.invalidInstalments = false;
        this.isinstallments = false;
        this.twoinstallments = false;
        this.threeinstallments = false;
        this.isStudentAlreadyExist = false;
        this.instalments = 'default';

        this.selectcourse = this._formBuilder.group({
            course_id: ['', Validators.required],
            batch_id: ['', Validators.required],
            campus_id: ['']
        });

        this.forofficeuse = this._formBuilder.group({

            feepackage: ['', Validators.required],
            discountpercentage: ['', Validators.required],
            paymentplan: ['', Validators.required],
            payable: ['', Validators.required],

            instalment21: [''],
            duedate21: [''],
            instalment22: [''],
            duedate22: [''],

            instalment31: [''],
            duedate31: [''],
            instalment32: [''],
            duedate32: [''],
            instalment33: [''],
            duedate33: [''],
        });


        this.role = this.tokenService.GetRole();
        if (this.role === 'owner') {
            this.isOwner = true;
            this.admissionService.getAllCampusesForDD().subscribe((campsRes: any) => {
                this.campuses = campsRes;
            });
            const campusId = this.selectcourse.get('campus_id');
            campusId.setValidators(Validators.required);
            campusId.updateValueAndValidity();
        } else {
            this.isOwner = false;
        }
        this.admissionService.getAllCoursesForDD().subscribe((corsRes: any) => {
            this.courses = corsRes;
        });






    }

    close(): void {
        this.router.navigate(['/dashboard/show']);
    }



    onDiscountPercentage(e): void {
        // console.log(e.target.value);
        const data = this.forofficeuse.getRawValue();
        this.discountpercentage = data.discountpercentage;
        const payable = (this.feepackage - (this.feepackage * (this.discountpercentage / 100)));
        this.forofficeuse.setValue({
            feepackage: this.feepackage,
            discountpercentage: this.discountpercentage,
            payable: payable,
            paymentplan: null,
            instalment21: null,
            instalment22: null,
            duedate21: null,
            duedate22: null,
            instalment31: null,
            duedate31: null,
            instalment32: null,
            duedate32: null,
            instalment33: null,
            duedate33: null,
        });

        console.log('percentage has been changed');

    }

    onPaymentPalan(e): void {

        if (e.value === 'Installment') {
            this.isinstallments = true;
        } else if (e.value === 'Lumpsum') {
            this.isinstallments = false;
            this.twoinstallments = false;
            this.threeinstallments = false;
        }
    }

    onNoOfInstalments(e): void {

        const instalment21 = this.forofficeuse.get('instalment21');
        const duedate21 = this.forofficeuse.get('duedate21');
        const duedate22 = this.forofficeuse.get('duedate22');
        const instalment22 = this.forofficeuse.get('instalment22');
        const instalment31 = this.forofficeuse.get('instalment31');
        const duedate31 = this.forofficeuse.get('duedate31');
        const instalment32 = this.forofficeuse.get('instalment32');
        const duedate32 = this.forofficeuse.get('duedate32');
        const instalment33 = this.forofficeuse.get('instalment33');
        const duedate33 = this.forofficeuse.get('duedate33');

        if (e.value === 'Two') {
            this.twoinstallments = true;
            this.instalments = 'Two';
            this.threeinstallments = false;

            instalment21.setValidators(Validators.required);
            instalment21.updateValueAndValidity();
            duedate21.setValidators(Validators.required);
            duedate21.updateValueAndValidity();
            duedate22.setValidators(Validators.required);
            duedate22.updateValueAndValidity();
            instalment22.setValidators(Validators.required);
            instalment22.updateValueAndValidity();
            instalment31.clearValidators();
            instalment31.updateValueAndValidity();
            duedate31.clearValidators();
            duedate31.updateValueAndValidity();
            instalment32.clearValidators();
            instalment32.updateValueAndValidity();
            duedate32.clearValidators();
            duedate32.updateValueAndValidity();
            instalment33.clearValidators();
            instalment33.updateValueAndValidity();
            duedate33.clearValidators();
            duedate33.updateValueAndValidity();

        } else if (e.value === 'Three') {
            this.twoinstallments = false;
            this.instalments = 'Three';
            this.threeinstallments = true;

            instalment21.clearValidators();
            instalment21.updateValueAndValidity();
            duedate21.clearValidators();
            duedate21.updateValueAndValidity();
            duedate22.clearValidators();
            duedate22.updateValueAndValidity();
            instalment22.clearValidators();
            instalment22.updateValueAndValidity();
            instalment31.setValidators(Validators.required);
            instalment31.updateValueAndValidity();
            duedate31.setValidators(Validators.required);
            duedate31.updateValueAndValidity();
            instalment32.setValidators(Validators.required);
            instalment32.updateValueAndValidity();
            duedate32.setValidators(Validators.required);
            duedate32.updateValueAndValidity();
            instalment33.setValidators(Validators.required);
            instalment33.updateValueAndValidity();
            duedate33.setValidators(Validators.required);
            duedate33.updateValueAndValidity();

        }
    }

    onSearchStudentWithNIC(e): void {
        //    console.log(e.target.value);
        this.admissionService.getStudentWithNIC(e.target.value).subscribe((res: any) => {
            if (res.isExist === true) {
                this.isStudentAlreadyExist = true;
            } else if (res.isExist === false) {
                this.isStudentAlreadyExist = false;
            }
            // console.log(res);
        });

    }

    onSearchStudentWithContactNo(e): void {
        //    console.log(e.target.value);
        this.admissionService.getStudentWithContactNo(e.target.value).subscribe((res: any) => {
            if (res.isExist === true) {
                this.isStudentAlreadyExist = true;
            } else if (res.isExist === false) {
                this.isStudentAlreadyExist = false;
            }
            // console.log(res);
        });

    }

    onSearchStudentWithGuardianContactNo(e): void {
        //    console.log(e.target.value);
        this.admissionService.getStudentWithGuardianContactNo(e.target.value).subscribe((res: any) => {
            if (res.isExist === true) {
                this.isStudentAlreadyExist = true;
            } else if (res.isExist === false) {
                this.isStudentAlreadyExist = false;
            }
            // console.log(res);
        });

    }

    onSearchStudentWithEmail(e): void {
        //    console.log(e.target.value);
        this.admissionService.getStudentWithEmail(e.target.value).subscribe((res: any) => {
            if (res.isExist === true) {
                this.isStudentAlreadyExist = true;
            } else if (res.isExist === false) {
                this.isStudentAlreadyExist = false;
            }
            // console.log(res);
        });

    }

    onCampusChange(e): void {
      
        if (this.role === 'owner') {            
            this.campusId = e.value;
            // console.log(this.campusId);
        }
    }

    onCourseChange(e): void {

        this.admissionService.getAllBatchesByCourseAndCampus(e.value, this.campusId).subscribe((batchRes: any) => {
            this.batches = batchRes;
            console.log(batchRes);

            const noBatches = [{ alias: 'No Batches for this Course' }];
            if (batchRes.length === 0) {
                this.batches = noBatches;
            }
            this.admissionService.getCourseById(e.value).subscribe((corsRes: any) => {
                // console.log(corsRes);
                this.feepackage = corsRes.fee_package;
                this.forofficeuse.setValue({
                    feepackage: corsRes.fee_package,
                    discountpercentage: null,
                    paymentplan: null,
                    payable: null,
                    instalment21: null,
                    instalment22: null,
                    duedate21: null,
                    duedate22: null,
                    instalment31: null,
                    duedate31: null,
                    instalment32: null,
                    duedate32: null,
                    instalment33: null,
                    duedate33: null,
                });

                // console.log(this.feepackage);
                // console.log('fee honi chahye');
            });
        });
    }

    enrollToAnotherCourse(): void {
        console.log('enrolled clicked');

        if (this.selectcourse.invalid) {
            return;
        }

        if (this.forofficeuse.invalid) {
            return;
        }

        const selectcoursedata = this.selectcourse.getRawValue();
        this.admission.batchId = selectcoursedata.batch_id;
        this.admission.courseId = selectcoursedata.course_id;
        if (this.isOwner === true) {
            this.admission.campusId = selectcoursedata.campus_id;
        }


        const forofficeusedata = this.forofficeuse.getRawValue();
        if (this.instalments === 'Two') {

            this.months(forofficeusedata.duedate21._i.month);
            const duedate21month = this.month;
            this.months(forofficeusedata.duedate22._i.month);
            const duedate22month = this.month;

            const installments = [
                {

                    installment: forofficeusedata.instalment21,
                    due_date:
                        forofficeusedata.duedate21._i.year
                        + '/' +
                        duedate21month
                        + '/' +
                        forofficeusedata.duedate21._i.date
                },
                {

                    installment: forofficeusedata.instalment22,
                    due_date:
                        forofficeusedata.duedate22._i.year
                        + '/' +
                        duedate22month
                        + '/' +
                        forofficeusedata.duedate22._i.date
                }

            ];
            this.admission.installments = installments;
        } else if (this.instalments === 'Three') {
            this.months(forofficeusedata.duedate31._i.month);
            const duedate31month = this.month;
            this.months(forofficeusedata.duedate32._i.month);
            const duedate32month = this.month;
            this.months(forofficeusedata.duedate33._i.month);
            const duedate33month = this.month;


            const installments = [
                {

                    installment: forofficeusedata.instalment31,
                    due_date:
                        forofficeusedata.duedate31._i.year
                        + '/' +
                        duedate31month
                        + '/' +
                        forofficeusedata.duedate31._i.date
                },
                {

                    installment: forofficeusedata.instalment32,
                    due_date:
                        forofficeusedata.duedate32._i.year
                        + '/' +
                        duedate32month
                        + '/' +
                        forofficeusedata.duedate32._i.date
                },
                {

                    installment: forofficeusedata.instalment33,
                    due_date:
                        forofficeusedata.duedate33._i.year
                        + '/' +
                        duedate33month
                        + '/' +
                        forofficeusedata.duedate33._i.date
                }
            ];
            this.admission.installments = installments;
        }


        this.admission.fee_package = forofficeusedata.feepackage;
        this.admission.discount = forofficeusedata.discountpercentage;
        this.admission.fee_package_after_discount = forofficeusedata.payable;
        this.admission.remarks = 'This is remarks from system';
        this.admission.is_installment = this.isinstallments;
        this.admission.userId = this.user.id;
        this.admission.admission_date = new Date().toDateString();

        // console.log(this.admission);
        // console.log('ma admission dialog ma ho');

        this.studentService.enrollToAnotherCourse(this.studentId, this.admission).subscribe((admRes: any) => {
            console.log(admRes);
            this.selectcourse.reset();
            this.forofficeuse.reset();
            this.dialogRef.close();
            // this.ngOnInit();
            this.matSnackBar.open('Enrolled Successfully', null, {
                verticalPosition: 'top',
                duration: 3000
            });
            this.socket.emit('onNewEnlollment', {});
            // this.router.navigate(['/admission/show']);
        });
    }

    is2InstallmentsValid(): void {
        // console.log('2 instalmetns valid');
        const forofficeusedata = this.forofficeuse.getRawValue();
        if (Number(forofficeusedata.instalment21) + Number(forofficeusedata.instalment22) !== Number(forofficeusedata.payable)) {
            this.invalidInstalments = true;
        } else if (Number(forofficeusedata.instalment21) + Number(forofficeusedata.instalment22) === Number(forofficeusedata.payable)) {
            this.invalidInstalments = false;
        }
    }

    is3InstallmentsValid(): void {
        console.log('3 instalmetns valid');
        const forofficeusedata = this.forofficeuse.getRawValue();
        if (Number(forofficeusedata.instalment31) + Number(forofficeusedata.instalment32) + Number(forofficeusedata.instalment33) !== Number(forofficeusedata.payable)) {
            this.invalidInstalments = true;
        } else if (Number(forofficeusedata.instalment31) + Number(forofficeusedata.instalment32) + Number(forofficeusedata.instalment33) === Number(forofficeusedata.payable)) {
            this.invalidInstalments = false;
        }
    }

    months(month): any {

        switch (month) {
            case 0:
                this.month = 1;
                break;
            case 1:
                this.month = 2;
                break;
            case 2:
                this.month = 3;
                break;
            case 3:
                this.month = 4;
                break;
            case 4:
                this.month = 5;
                break;
            case 5:
                this.month = 6;
                break;
            case 6:
                this.month = 7;
                break;
            case 7:
                this.month = 7;
                break;
            case 8:
                this.month = 9;
                break;
            case 9:
                this.month = 10;
                break;
            case 10:
                this.month = 11;
                break;
            case 11:
                this.month = 12;
                break;

            default:
                console.log('No such month exists!');
                break;
        }
    }

}
