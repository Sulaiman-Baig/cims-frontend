import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject, Observable } from 'rxjs';
import { User } from '../admin/admin.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // createUser(user: User): Observable<object> {
  //   console.log(this.url);
  //   return this.http.post(this.url + '/users/create', user);
  // }

  login(user: User): Observable<object> {
    // console.log(this.url);
    return this.http.post(this.url + '/user/signin', user);
    // return this.http.post(this.url + '/login', user);
  }

 

  resetAdminPassword(id, adminObject): any {
    return this.http.post(this.url + '/users/resetpassword/' + id, adminObject);
  }

}
