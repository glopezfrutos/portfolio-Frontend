import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { backendUrl } from 'src/app/shared/backendUrl';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSubject: BehaviorSubject<any>;

  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem("currentUser") || "{}"))
  }

  procedLogin(user: any) {
    const httpParams = new HttpParams()
      .set('username', user.username)
      .set('password', user.password);

    return this.http.post(backendUrl + "/login", httpParams, httpOptions).pipe(map(data => {
      localStorage.setItem("currentUser", JSON.stringify(data));
      this.currentUserSubject.next(data);
      return data;
    }))
  }

  get currentUser() {
    return this.currentUserSubject.value;
  }

  hasAdminAuthorization() {
    let isAdmin = false;
    if (this.currentUser.access_token) {
      let _extractedToken = this.currentUser.access_token.split(".")[1];
      let _atobData = atob(_extractedToken);
      let finalData = JSON.parse(_atobData);

      finalData.roles.map((role: string) => {
        if (role == "ROLE_ADMIN") {
          isAdmin = true;
        }
      })
    }
    if (!isAdmin) alert("You do not have authorization.")
    return isAdmin;
  }

}
