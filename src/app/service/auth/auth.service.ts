import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(
    private http: HttpClient
  ) { }

  procedLogin(user:any){
    const body = new HttpParams()
      .set('username', user.username)
      .set('password', user.password);

    return this.http.post(backendUrl + "/login", body, httpOptions)
  }

  isLoggedIn(){
    return localStorage.getItem("access_token") != null;
  }

  getToken() {
    return localStorage.getItem("access_token") || "";
  }

  hasAdminAuthorization(){
    let token = localStorage.getItem("access_token") || "";
    let _extractedToken = token.split(".")[1];
    let _atobData = atob(_extractedToken);
    let finalData = JSON.parse(_atobData);
    
    let isAdmin = false;
    finalData.roles.map((role: string) => {
      if (role == "ROLE_ADMIN"){
        isAdmin = true;
      }
    })
    if(!isAdmin) alert("You do not have authorization.")
    return isAdmin;
  }
}
