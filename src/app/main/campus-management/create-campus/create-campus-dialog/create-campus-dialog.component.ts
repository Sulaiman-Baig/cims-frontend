import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampusManagementService } from '../../campus-management.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Campus } from '../../campus.model';
import { Router } from '@angular/router';
import io from 'socket.io-client';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-create-campus-dialog',
    templateUrl: './create-campus-dialog.component.html',
    styleUrls: ['./create-campus-dialog.component.scss']
})


export class CreateCampusDialogComponent implements OnInit {

    campus: Campus = new Campus();
    form: FormGroup;
    // selectedCity: any;
    campusname: any;
    location: any;
    inagurationdate: any;
    remarks: any;
    socket: any;
    url = environment.baseUrl;

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
    month: number;
    campData: any;
    edit: boolean;
    btnTxt = 'CREATE';
    cmpTxt = 'New Campus';

    constructor(
        private _formBuilder: FormBuilder,
        private campusService: CampusManagementService,
        private router: Router,
        private dialogRef: MatDialogRef<CreateCampusDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        this.campData = data;
        this.socket = io(this.url);
    }

    ngOnInit(): any {

        this.edit = false;
        this.form = this._formBuilder.group({
            name: ['', Validators.required],
            alias: ['', Validators.required],
            city: ['', Validators.required],
            location: ['', Validators.required],
            campus_inguration_date: ['', Validators.required],
            remarks: ['', Validators.required],
        });

        if (this.campData.action === 'update') {

            this.form.setValue({
                name: this.campData.campus.name,
                city: this.campData.campus.city,
                location: this.campData.campus.location,
                alias: this.campData.campus.alias,
                campus_inguration_date: null,
                remarks: this.campData.campus.remarks

            });
            this.edit = true;
            this.btnTxt = 'UPDATE';
            this.cmpTxt = 'Update Campus';
        }

    }

    onDateChange(): void {
        console.log('date changed');
    }

    addCampus(): void {

        // if (this.form.invalid) {
        //     return;
        // }

        const data = this.form.getRawValue();

        this.months(data.campus_inguration_date._i.month);
        this.campus.name = data.name;
        this.campus.alias = data.alias;
        this.campus.city = this.form.value.city;
        this.campus.location = data.location;
        this.campus.campus_inguration_date =
            data.campus_inguration_date._i.year
            + '-' +
            this.month
            + '-' +
            data.campus_inguration_date._i.date,
            this.campus.remarks = data.remarks;

        if (this.edit === false) {
            console.log('crete');
            
            this.dialogRef.close({ mode: 'create', campus: this.campus, });
        } else if (this.edit === true) {
            console.log(this.campus);
            this.campus.id = this.campData.campus.id;
            this.dialogRef.close({ mode: 'update', campus: this.campus });
        }

    }

    close(): void {
        this.dialogRef.close({ mode: 'close' });
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
