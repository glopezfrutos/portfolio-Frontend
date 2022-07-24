import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, retry, throwError } from 'rxjs';
import { backendUrl } from '../../shared/backendUrl';
import { loginAnswerType, loginFormType } from '../../shared/types/loginType';
import { catchError, map } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};


class HttpErrorHandler {
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  currentUserSubject: BehaviorSubject<any>

  constructor(
    private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('current') || '{}'));
  }

  postLogin(user: loginFormType): Observable<any> {
    const body = new HttpParams()
      .set('username', user.username)
      .set('password', user.password)

    return this.http.post(backendUrl + "/api/v1/login", body, httpOptions)
    .pipe(
        retry(3), // retry a failed request up to 3 times
        map(
          data => {
            localStorage.setItem('currentUser', JSON.stringify(data));
            this.currentUserSubject.next(data)
            return data;
          })
      )
  }
}
