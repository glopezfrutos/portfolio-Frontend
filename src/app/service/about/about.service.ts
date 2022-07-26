import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backendUrl } from 'src/app/shared/backendUrl';
import { About } from 'src/app/shared/types/About';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};


@Injectable({
  providedIn: 'root'
})
export class AboutService {
  constructor(
    private http: HttpClient
  ) { }

  getAbout(): Observable<About[]>{
    return this.http.get<About[]>(backendUrl + "/portfolio/about", httpOptions)
  }
}
