import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private tokenService: TokenService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    // return next.handle(req);

    const headersConfig = { 
        'Content-Type': 'application/json',
        Accept: 'application/json'
    };
    const token =  this.tokenService.GetToken();
    // console.log(token);
    // console.log('////////////////////////////////');

    if (token) {
        headersConfig['Authorization'] = `Bearer ${token}`;
    }

    const _req = req.clone({setHeaders:  headersConfig});
    // console.log(_req.headers);
    // console.log('////////////////////////////////');
    return next.handle(_req);
  }
}
 