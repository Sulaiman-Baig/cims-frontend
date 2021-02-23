import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnquiryManagementService } from '../enquiry-management.service';
import { Enquiry } from '../enquiry.model';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'app-update-enquiry',
    templateUrl: './update-enquiry.component.html',
    styleUrls: ['./update-enquiry.component.scss']
})
export class UpdateEnquiryComponent implements OnInit {

    enquiry: any;
    form: FormGroup;
    campuses: any;
    courses: any;
    enquiryData: Enquiry = new Enquiry();
    possiblejoindate: number;
    nextfollowupdate: number;
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
        @Inject(MAT_DIALOG_DATA) data,
        private dialogRef: MatDialogRef<UpdateEnquiryComponent>
    ) {
        this.enquiry = data;
    }

    ngOnInit(): any {

        this.enquiryService.getAllCoursesForDD().subscribe((corsRes: any) => {
            this.courses = corsRes;
            // console.log(corsRes);
        });

        console.log(this.enquiry.enquiry.course.title);
        const campusToDisplay = {id: this.enquiry.enquiry.campus.id, name: this.enquiry.enquiry.campus.name};
        const courseToDisplay = {id: this.enquiry.enquiry.course.id, name: this.enquiry.enquiry.course.title};
        






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

        this.form.setValue({
            full_name: this.enquiry.enquiry.full_name,
            email: this.enquiry.enquiry.email,
            contact: this.enquiry.enquiry.contact,
            gender: this.enquiry.enquiry.gender,
            country: this.enquiry.enquiry.country,
            city: this.enquiry.enquiry.city,
            campus_id: this.enquiry.enquiry.campus.name,
            course_id: this.enquiry.enquiry.course.title,
            marketing_source: this.enquiry.enquiry.marketing_source,
            area: this.enquiry.enquiry.area,
            possible_join_date: this.enquiry.enquiry.possible_join_date,
            next_follow_up_date: this.enquiry.enquiry.next_follow_up_date,
            probability: this.enquiry.enquiry.probability,
            remarks: ''
        });

    }

    onCityChange(c): void {
        this.enquiryService.getAllCampusesByCityForDD(c.value).subscribe((campRes: any) => {
            // console.log(campRes);
            this.campuses = campRes;
        });

    }

    onUpdateEnquiry(): void {
        if (this.form.invalid) {
            return;
        }
        
        this.possible_join_date();
        this.next_follow_up_date();
        const data = this.form.getRawValue();
        this.enquiryData.full_name = data.full_name;
        this.enquiryData.email = data.email;
        this.enquiryData.contact = data.contact;
        this.enquiryData.gender = data.gender;
        this.enquiryData.country = data.country;
        this.enquiryData.city = data.city;
        this.enquiryData.campusId = data.campus_id;
        this.enquiryData.courseId = data.course_id;
        this.enquiryData.marketing_source = data.marketing_source;
        this.enquiryData.area = data.area;
        this.enquiryData.remarks = data.remarks;
        this.enquiryData.probability = data.probability;
        this.enquiryData.possible_join_date = 
            data.possible_join_date._i.year
            + '/' +
            this.possiblejoindate
            + '/' +
            data.possible_join_date._i.date;
        this.enquiryData.next_follow_up_date =
            data.next_follow_up_date._i.year
            + '/' +
            this.nextfollowupdate
            + '/' +
            data.next_follow_up_date._i.date;


        console.log(this.enquiryData);
        // this.enquiryService.updateEnquiry(this.enquiry.enquiry.id, this.enquiryData).subscribe((enqRes: any) => {
        //     console.log(enqRes);
        //     this.form.reset();
        //     this.dialogRef.close();
        //     this.ngOnInit();
        //     this.router.navigate(['/enquiry/todaysenquiries']);
        // });
    }

    possible_join_date(): any {
        const data = this.form.getRawValue();
        const possiblejoindate = data.possible_join_date._i.month;
        switch (possiblejoindate) {
            case 0:
                this.possiblejoindate = 1;
                break;
            case 1:
                this.possiblejoindate = 2;
                break;
            case 2:
                this.possiblejoindate = 3;
                break;
            case 3:
                this.possiblejoindate = 4;
                break;
            case 4:
                this.possiblejoindate = 5;
                break;
            case 5:
                this.possiblejoindate = 6;
                break;
            case 6:
                this.possiblejoindate = 7;
                break;
            case 7:
                this.possiblejoindate = 7;
                break;
            case 8:
                this.possiblejoindate = 9;
                break;
            case 9:
                this.possiblejoindate = 10;
                break;
            case 10:
                this.possiblejoindate = 11;
                break;
            case 11:
                this.possiblejoindate = 12;
                break;

            default:
                console.log('No such month exists!');
                break;
        }
    }

    next_follow_up_date(): any {
        const data = this.form.getRawValue();
        const nextfollowupdate = data.next_follow_up_date._i.month;
        switch (nextfollowupdate) {
            case 0:
                this.nextfollowupdate = 1;
                break;
            case 1:
                this.nextfollowupdate = 2;
                break;
            case 2:
                this.nextfollowupdate = 3;
                break;
            case 3:
                this.nextfollowupdate = 4;
                break;
            case 4:
                this.nextfollowupdate = 5;
                break;
            case 5:
                this.nextfollowupdate = 6;
                break;
            case 6:
                this.nextfollowupdate = 7;
                break;
            case 7:
                this.nextfollowupdate = 7;
                break;
            case 8:
                this.nextfollowupdate = 9;
                break;
            case 9:
                this.nextfollowupdate = 10;
                break;
            case 10:
                this.nextfollowupdate = 11;
                break;
            case 11:
                this.nextfollowupdate = 12;
                break;

            default:
                console.log('No such month exists!');
                break;
        }
    }

    close(): void {

    }

}
