import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { backendUrl } from 'src/app/shared/backendUrl';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoginSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient
  ) {
    this.isLoginSubject = new BehaviorSubject<boolean>(this.hasAccessToken());
  }

  private hasAccessToken(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  logIn(user: any) {
    const httpParams = new HttpParams()
      .set('username', user.username)
      .set('password', user.password);

    return this.http.post(backendUrl + "/login", httpParams).pipe(map(data => {
      localStorage.setItem("currentUser", JSON.stringify(data));
      this.isLoginSubject.next(true);
      return data;
    }))
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.isLoginSubject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  get currentUser() {
    return JSON.parse(localStorage.getItem("currentUser") || "{}");
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

  refreshToken() {
    return this.http.get(backendUrl + "/refreshtoken").pipe(map(data => {
      localStorage.setItem("currentUser", JSON.stringify(data));
      this.isLoginSubject.next(true);
      return data;
    }))
  }
}
