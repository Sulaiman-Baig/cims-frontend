import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import SimpleCrypto from 'simple-crypto-js';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor(private cookieSevice: CookieService) { }

    SetToken(token): any {
        // this.cookieSevice.set('token', token);
        localStorage.setItem('token', token);
    }

    GetToken(): any {
        // return this.cookieSevice.get('token');
        return localStorage.getItem('token');
    }

    DeleteToken(): any {
        // await this.cookieSevice.delete('token');
        localStorage.removeItem('token');
    }

    SetRole(role): any {
        // this.cookieSevice.set('role', role);
        const kunnjji = 'yekhaaschaabiha';
        const cryptor = new SimpleCrypto(kunnjji);
        const chiperText = cryptor.encrypt(role);
        localStorage.setItem('role', chiperText);
    }

    GetRole(): any {
        // return this.cookieSevice.get('role');
        const kunnjji = 'yekhaaschaabiha';
        const cryptor = new SimpleCrypto(kunnjji);
        const cipheredRole =  localStorage.getItem('role');
        if (cipheredRole !== null) {
            const decipherText = cryptor.decrypt(cipheredRole);
            return decipherText;
        } else {
            return null;
        }
        
     
      
    }

    DeleteRole(): any {
        // await this.cookieSevice.delete('role');
        localStorage.removeItem('role');
    }

    SetCampusId(campusId): any {
        // this.cookieSevice.set('role', role);
        const kunnjji = 'yekhaaschaabiha';
        const cryptor = new SimpleCrypto(kunnjji);
        const chiperText = cryptor.encrypt(campusId);
        localStorage.setItem('campusId', chiperText);
    }

    GetCampusId(): any {
        // return this.cookieSevice.get('role');
        const kunnjji = 'yekhaaschaabiha';
        const cryptor = new SimpleCrypto(kunnjji);
        const decipherText = cryptor.decrypt(localStorage.getItem('campusId'));
        return decipherText;
    }

    DeleteCampusId(): any {
        // await this.cookieSevice.delete('role');
        localStorage.removeItem('campusId');
    }

    SetAccount(account): any {
        // this.cookieSevice.set('account', JSON.stringify(account));
        return localStorage.setItem('account', JSON.stringify(account));

    }

    GetAccount(): any {
        // var account = this.cookieSevice.get('account');
        const account = localStorage.getItem('account');
        return JSON.parse(account);
    }

    DeleteAccount(): any {
        localStorage.removeItem('account');
    }

    SetCompanyId(id): any {
        // this.cookieSevice.set('token', token);
        localStorage.setItem('companyId', id);
    }

    GetCompanyId(): any {
        // return this.cookieSevice.get('token');
        return localStorage.getItem('companyId');
    }


}
