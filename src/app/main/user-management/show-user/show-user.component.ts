import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '../../../../@fuse/animations';
import { MatDialog, MatDialogConfig, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { UserManagementService } from '../user-management.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { User } from '../user.model';
import io from 'socket.io-client';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';
import { TokenService } from 'app/main/auth/token.service';

@Component({
    selector: 'app-show-user',
    templateUrl: './show-user.component.html',
    styleUrls: ['./show-user.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ShowUserComponent implements OnInit {

    url = environment.baseUrl;
    dataSource;
    displayedColumns = ['Full Name', 'Username', 'Designation', 'Role', 'Personal Email', 'Primary Mobile No'];
    ELEMENT_DATA: User[] = [];
    campusId: string;
    socket: any;


    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(
        private dialog: MatDialog,
        private userService: UserManagementService,
        private matSnackBar: MatSnackBar,
        private tokenService: TokenService,
        private router: Router

    ) {
        this.socket = io(this.url);
    }

    ngOnInit(): any {
        this.campusId = this.tokenService.GetCampusId();

        this.userService.getallByCampus(this.campusId).subscribe((userRes: User[]) => {
            this.ELEMENT_DATA = userRes;
            if (userRes.length === 0) {
                this.matSnackBar.open('No User Found', null, {
                    duration: 3000
                });
            }
            this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;
            // console.log(userRes);
        });

        this.socket.on('refreshUser', () => {
            this.campusId = this.tokenService.GetCampusId();
            this.userService.getallByCampus(this.campusId).subscribe((userRes: User[]) => {
                this.ELEMENT_DATA = userRes;
                if (userRes.length === 0) {
                    this.matSnackBar.open('No User Found', null, {
                        duration: 3000
                    });
                }
                this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
                this.dataSource.paginator = this.paginator;
                // console.log(userRes);
            });
        });
    }

    onCreateUser(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        const dialogRef = this.dialog.open(CreateUserDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(() => {
            this.ngOnInit();
        });

    }

}
