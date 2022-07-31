import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backendUrl } from 'src/app/shared/backendUrl';
import { Education } from 'src/app/shared/types/Education';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Education[]> {
    return this.http.get<Education[]>(backendUrl + "/portfolio/education")
  }

  put(formValue: any): Observable<Education> {
    return this.http.put<Education>(backendUrl + "/portfolio/education", formValue)
  }

  post(formValue: any): Observable<Education> {
    return this.http.post<Education>(backendUrl + "/portfolio/education", formValue)
  }

  delete(id?: number): Observable<void> {
    return this.http.delete<void>(backendUrl + "/portfolio/education/" + id)
  }
}
