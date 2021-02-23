import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StudentMenagementService } from '../../student-menagement.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-create-fee-slip',
    templateUrl: './create-fee-slip.component.html',
    styleUrls: ['./create-fee-slip.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreateFeeSlipComponent implements OnInit {
    feeslip: any;
    systemdate: any;
    constructor(
        private studentService: StudentMenagementService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.systemdate = new Date();
        const installmentId = this.route.snapshot.params.installmentId;
        this.studentService.createFeeSlip(installmentId).subscribe((feslpRes: any) => {
            this.feeslip = feslpRes;
            console.log(feslpRes);
        });
    }

}
