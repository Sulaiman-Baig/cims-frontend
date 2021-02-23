import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnquiryManagementService } from '../../enquiry-management.service';
import { Enquiry } from '../../enquiry.model';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import io from 'socket.io-client';
import { TokenService } from 'app/main/auth/token.service';
import { environment } from 'environments/environment';


@Component({
    selector: 'app-create-enquiry-dialog',
    templateUrl: './create-enquiry-dialog.component.html',
    styleUrls: ['./create-enquiry-dialog.component.scss']
})
export class CreateEnquiryDialogComponent implements OnInit {

    enquiry: Enquiry = new Enquiry();
    form: FormGroup;
    campuses: any;
    courses: any;
    user: any;
    socket: any;
    url = environment.baseUrl;
    possiblejoiningmonth: string;
    nextfollowupmonth: string;
    possiblejoiningdate: string;
    nextfollowupdate: string;

    genders = [
        'Male',
        'Female',
        'Other'
    ];

    marketingsources = [
        'Website',
        'Social Media',
        'Event',
        'Friend n Family',
        'Career Student',
        'Career Staff',
        'Print Media',
        'Other'
    ];

    cournties = [
        'Pakistan'
    ];

    probabilities = [
        { probDB: 0, probValue: '0%' },
        { probDB: 10, probValue: '10%' },
        { probDB: 20, probValue: '20%' },
        { probDB: 30, probValue: '30%' },
        { probDB: 40, probValue: '40%' },
        { probDB: 50, probValue: '50%' },
        { probDB: 60, probValue: '60%' },
        { probDB: 70, probValue: '70%' },
        { probDB: 80, probValue: '80%' },
        { probDB: 90, probValue: '90%' },
        { probDB: 100, probValue: '100%' },
    ];

    cities = [
        'Ahmadpur East',
        'Ahmed Nager Chatha',
        'Ali Khan Abad',
        'Alipur',
        'Arifwala',
        'Attock',
        'Bhera',
        'Bhalwal',
        'Bahawalnagar',
        'Bahawalpur',
        'Bhakkar',
        'Burewala',
        'Chenab Nagar',
        'Chillianwala',
        'Choa Saidanshah',
        'Chakwal',
        'Chak Jhumra',
        'Chichawatni',
        'Chiniot',
        'Chishtian',
        'Chunian',
        'Dajkot',
        'Daska',
        'Davispur',
        'Darya Khan',
        'Dera Ghazi Khan',
        'Dhaular',
        'Dina',
        'Dinga',
        'Dhudial Chakwal',
        'Dipalpur',
        'Faisalabad',
        'Fateh Jang',
        'Ghakhar Mandi',
        'Gojra',
        'Gujranwala',
        'Gujrat',
        'Gujar Khan',
        'Harappa',
        'Hafizabad',
        'Haroonabad',
        'Hasilpur',
        'Haveli Lakha',
        'Islamabad',
        'Jalalpur Jattan',
        'Jampur',
        'Jaranwala',
        'Jhang',
        'Jhelum',
        'Jauharabad',
        'Kallar Syedan',
        'Kalabagh',
        'Karor Lal Esan',
        'Karachi',
        'Kasur',
        'Kamalia',
        'Kāmoke',
        'Khanewal',
        'Khanpur',
        'Khanqah Sharif',
        'Kharian',
        'Khushab',
        'Kot Adu',
        'Lahore',
        'Lalamusa',
        'Layyah',
        'Lawa Chakwal',
        'Liaquat Pur',
        'Lodhran',
        'Malakwal',
        'Mamoori',
        'Mailsi',
        'Mandi Bahauddin',
        'Mian Channu',
        'Mianwali',
        'Miani',
        'Multan',
        'Murree',
        'Muridke',
        'Mianwali Bangla',
        'Muzaffargarh',
        'Narowal',
        'Nankana Sahib',
        'Okara',
        'Pakpattan',
        'Pattoki',
        'Pindi Bhattian',
        'Pind Dadan Khan',
        'Pir Mahal',
        'Qaimpur',
        'Qila Didar Singh',
        'Raiwind',
        'Rajanpur',
        'Rahim Yar Khan',
        'Rawalpindi',
        'Renala Khurd',
        'Sadiqabad',
        'Sagri',
        'Sahiwal',
        'Sambrial',
        'Samundri',
        'Sangla Hill',
        'Sarai Alamgir',
        'Sargodha',
        'Shakargarh',
        'Sheikhupura',
        'Shujaabad',
        'Sialkot',
        'Sohawa',
        'Soianwala',
        'Siranwali',
        'Tandlianwala',
        'Talagang',
        'Taxila',
        'Toba Tek Singh',
        'Vehari',
        'Wah Cantonment',
        'Wazirabad',
        'Yazman',
        'Zafarwal'
    ];

    constructor(
        private _formBuilder: FormBuilder,
        private enquiryService: EnquiryManagementService,
        private router: Router,
        private matSnackBar: MatSnackBar,
        private tokenService: TokenService,
        private dialogRef: MatDialogRef<CreateEnquiryDialogComponent>
    ) {
        this.socket = io(this.url);
     }

    ngOnInit(): any {

        this.enquiryService.getAllCoursesForDD().subscribe((corsRes: any) => {
            this.courses = corsRes;
            console.log(corsRes);
            console.log('ma es time enquiry component ma ho');
        });
        this.user = this.tokenService.GetAccount();


        this.form = this._formBuilder.group({
            full_name: ['', Validators.required],
            email: [''],
            contact: ['', Validators.required],
            gender: ['', Validators.required],
            country: ['', Validators.required],
            city: ['', Validators.required],
            campus_id: ['', Validators.required],
            course_id: ['', Validators.required],
            marketing_source: ['', Validators.required],
            area: ['', Validators.required],
            possible_join_date: ['', Validators.required],
            next_follow_up_date: ['', Validators.required],
            probability: ['', Validators.required],
            remarks: ['', Validators.required],
        });
    }

    onCityChange(c): void {
        this.enquiryService.getAllCampusesByCityForDD(c.value).subscribe((campRes: any) => {
            console.log(campRes);
            this.campuses = campRes;
        });

    }

    onCreateEnquiry(): void {
        if (this.form.invalid) {
            return;
        }

        this.possible_join_month();
        this.next_follow_up_month();
        this.possible_join_date();
        this.next_follow_up_date();
        const data = this.form.getRawValue();
        this.enquiry.full_name = data.full_name;
        this.enquiry.email = data.email;
        this.enquiry.contact = data.contact;
        this.enquiry.gender = data.gender;
        this.enquiry.country = data.country;
        this.enquiry.city = data.city;
        this.enquiry.campusId = data.campus_id;
        this.enquiry.courseId = data.course_id;
        this.enquiry.marketing_source = data.marketing_source;
        this.enquiry.area = data.area;
        this.enquiry.remarks = data.remarks;
        this.enquiry.probability = data.probability;
        this.enquiry.possible_join_date =
            data.possible_join_date._i.year
            + '-' +
            this.possiblejoiningmonth
            + '-' +
            this.possiblejoiningdate;
        this.enquiry.next_follow_up_date =
            data.next_follow_up_date._i.year
            + '-' +
            this.nextfollowupmonth
            + '-' +
            this.nextfollowupdate;
        this.enquiry.userId = this.user.id;




        // console.log(this.enquiry.next_follow_up_date);
        // console.log(this.enquiry.possible_join_date);
        this.enquiryService.createEnquiry(this.enquiry).subscribe((enqRes: any) => {
            // console.log(enqRes);

            setTimeout(() => {
                this.form.reset();
                this.dialogRef.close({ refresh: 'refreshaftercreate' });
                this.socket.emit('refresh', {});
                this.matSnackBar.open('Enquiry Created Successfully', null, {
                    verticalPosition: 'top',
                    duration: 3000
                });
            },
                600);
        });
    }

    possible_join_month(): any {
        const data = this.form.getRawValue();
        const possiblejoiningmonth = data.possible_join_date._i.month;
        switch (possiblejoiningmonth) {
            case 0:
                this.possiblejoiningmonth = '01';
                break;
            case 1:
                this.possiblejoiningmonth = '02';
                break;
            case 2:
                this.possiblejoiningmonth = '03';
                break;
            case 3:
                this.possiblejoiningmonth = '04';
                break;
            case 4:
                this.possiblejoiningmonth = '05';
                break;
            case 5:
                this.possiblejoiningmonth = '06';
                break;
            case 6:
                this.possiblejoiningmonth = '07';
                break;
            case 7:
                this.possiblejoiningmonth = '08';
                break;
            case 8:
                this.possiblejoiningmonth = '09';
                break;
            case 9:
                this.possiblejoiningmonth = '10';
                break;
            case 10:
                this.possiblejoiningmonth = '11';
                break;
            case 11:
                this.possiblejoiningmonth = '12';
                break;

            default:
                console.log('No such month exists!');
                break;
        }
    }

    next_follow_up_month(): any {
        const data = this.form.getRawValue();
        const nextfollowupmonth = data.next_follow_up_date._i.month;
        switch (nextfollowupmonth) {
            case 0:
                this.nextfollowupmonth = '01';
                break;
            case 1:
                this.nextfollowupmonth = '02';
                break;
            case 2:
                this.nextfollowupmonth = '03';
                break;
            case 3:
                this.nextfollowupmonth = '04';
                break;
            case 4:
                this.nextfollowupmonth = '05';
                break;
            case 5:
                this.nextfollowupmonth = '06';
                break;
            case 6:
                this.nextfollowupmonth = '07';
                break;
            case 7:
                this.nextfollowupmonth = '08';
                break;
            case 8:
                this.nextfollowupmonth = '09';
                break;
            case 9:
                this.nextfollowupmonth = '10';
                break;
            case 10:
                this.nextfollowupmonth = '11';
                break;
            case 11:
                this.nextfollowupmonth = '12';
                break;

            default:
                console.log('No such month exists!');
                break;
        }
    }
    possible_join_date(): any {
        const data = this.form.getRawValue();
        const possiblejoiningdate = data.possible_join_date._i.date;
        switch (possiblejoiningdate) {

            case 1:
                this.possiblejoiningdate = '01';
                break;
            case 2:
                this.possiblejoiningdate = '02';
                break;
            case 3:
                this.possiblejoiningdate = '03';
                break;
            case 4:
                this.possiblejoiningdate = '04';
                break;
            case 5:
                this.possiblejoiningdate = '05';
                break;
            case 6:
                this.possiblejoiningdate = '06';
                break;
            case 7:
                this.possiblejoiningdate = '07';
                break;
            case 8:
                this.possiblejoiningdate = '08';
                break;
            case 9:
                this.possiblejoiningdate = '09';
                break;

            default:
                this.possiblejoiningdate = possiblejoiningdate;
                break;
        }
    }

    next_follow_up_date(): any {
        const data = this.form.getRawValue();
        const nextfollowupdate = data.next_follow_up_date._i.date;
        switch (nextfollowupdate) {
            case 1:
                this.nextfollowupdate = '01';
                break;
            case 2:
                this.nextfollowupdate = '02';
                break;
            case 3:
                this.nextfollowupdate = '03';
                break;
            case 4:
                this.nextfollowupdate = '04';
                break;
            case 5:
                this.nextfollowupdate = '05';
                break;
            case 6:
                this.nextfollowupdate = '06';
                break;
            case 7:
                this.nextfollowupdate = '07';
                break;
            case 8:
                this.nextfollowupdate = '08';
                break;
            case 9:
                this.nextfollowupdate = '09';
                break;

            default:
                this.nextfollowupdate = nextfollowupdate;
                break;
        }
    }

    close(): void {

    }





}
