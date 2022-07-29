import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backendUrl } from 'src/app/shared/backendUrl';
import { About } from 'src/app/shared/types/About';


@Injectable({
  providedIn: 'root'
})
export class AboutService {
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<About[]> {
    return this.http.get<About[]>(backendUrl + "/portfolio/about")
  }

  put(formValue: any): Observable<About> {
    return this.http.put<About>(backendUrl + "/portfolio/about", formValue)
  }
}
