import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backendUrl } from 'src/app/shared/backendUrl';
import { Experience } from 'src/app/shared/types/Experience';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Experience[]> {
    return this.http.get<Experience[]>(backendUrl + "/portfolio/experience")
  }

  put(formValue: any): Observable<Experience> {
    return this.http.put<Experience>(backendUrl + "/portfolio/experience", formValue)
  }

  post(formValue: any): Observable<Experience> {
    return this.http.post<Experience>(backendUrl + "/portfolio/experience", formValue)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(backendUrl + "/portfolio/experience/" + id)
  }
}
