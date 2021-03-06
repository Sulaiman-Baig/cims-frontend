import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
    constructor(private router: Router, private tokenService: TokenService) { }
    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const token = this.tokenService.GetToken();
        const user = this.tokenService.GetAccount();
  
        if (token) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }

}
