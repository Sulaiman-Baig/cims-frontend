import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeManagementService } from '../employee-management.service';
import { Employee } from '../employee.model';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import io from 'socket.io-client';
import { environment } from 'environments/environment';
import { FileUploader } from 'ng2-file-upload';



@Component({
    selector: 'app-create-employee-dialog',
    templateUrl: './create-employee-dialog.component.html',
    styleUrls: ['./create-employee-dialog.component.scss']
})
export class CreateEmployeeDialogComponent implements OnInit {
    form: FormGroup;
    public url = environment.baseUrl;
    uploadAPI = this.url + '/image/upload';
    socket: any;
    employee: Employee = new Employee();
    campuses: any;
    month: number;
    imageData;
    public uploader: FileUploader = new FileUploader({ url: this.uploadAPI, itemAlias: 'file' });



    titles = [
        'Mr',
        'Ms'
    ];

    genders = [
        'Male',
        'Female',
        'Other'
    ];

    maritalstatuses = [
        'Married',
        'Un-Married',
        'Engaged'
    ];
    constructor(
        private _formBuilder: FormBuilder,
        private matSnackBar: MatSnackBar,
        private employeeService: EmployeeManagementService,
        private router: Router,
        private dialogRef: MatDialogRef<CreateEmployeeDialogComponent>
    ) {
        this.socket = io(this.url);
    }

    ngOnInit(): any {
        this.form = this._formBuilder.group({
            title: ['', Validators.required],
            full_name: ['', Validators.required],
            gender: ['', Validators.required],
            campus_id: ['', Validators.required],
            designation: ['', Validators.required],
            primary_mobile_no: ['', Validators.required],
            maritalstatus: ['', Validators.required],
            dob: ['', Validators.required],
            basic_salary: ['', Validators.required],
            religion: ['', Validators.required],
            personal_email: ['', [Validators.required, Validators.email]],
            address: ['', Validators.required],
            CNIC: ['', Validators.required],
            other_mobile_no: ['', Validators.required],
            postalCode: ['', Validators.required]
        });

        this.employeeService.getAllCampusesForDD().subscribe((campRes: any) => {
            this.campuses = campRes;

        });
    }

    close(): void {

    }

    onImagePicked(event): any {

        this.imageData = event.target.files[0] as File;
        console.log(this.imageData);
    }



    onCreateEmployee(): void {
        if (this.form.invalid) {
            return;
        }
        const data = this.form.getRawValue();
        this.months(data.dob._i.month);
        this.employee.title = data.title;
        this.employee.full_name = data.full_name;
        this.employee.gender = data.gender;
        this.employee.dob =
            data.dob._i.year
            + '-' +
            this.month
            + '-' +
            data.dob._i.date,
            this.employee.campusId = this.form.value.campus_id;
        this.employee.designation = data.designation;
        this.employee.cnic = data.CNIC;
        this.employee.primary_mobile_no = data.primary_mobile_no;
        this.employee.other_mobile_no = data.other_mobile_no;
        this.employee.maritial_status = this.form.value.maritalstatus;
        this.employee.basic_salary = data.basic_salary;
        this.employee.religion = data.religion;
        this.employee.personal_email = data.personal_email;
        this.employee.address = data.address;

        console.log(this.employee);

        // this.employeeService.upLoadImage(this.imageData).subscribe((imageName: any) => {
        //     this.employee.image = imageName;
        // });

        // this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        //     // this.employee.image = imageName;
            
        //     console.log('FileUpload:uploaded successfully:', item, status, response);
        //     alert('Your file has been uploaded successfully');      
            
        // };

        this.employeeService.createEmployee(this.employee).subscribe((empRes: any) => {
            // console.log(empRes);
            this.form.reset();
            this.dialogRef.close();
            this.socket.emit('refresh', {});
            this.matSnackBar.open('Employee Created Successfully', null, {
                verticalPosition: 'top',
                duration: 3000
            });
            this.router.navigate(['/employee/show']);
        });

        

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
