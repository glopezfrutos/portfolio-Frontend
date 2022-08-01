import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backendUrl } from 'src/app/shared/backendUrl';
import { Project } from 'src/app/shared/types/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Project[]> {
    return this.http.get<Project[]>(backendUrl + "/portfolio/project")
  }

  put(formValue: any): Observable<Project> {
    return this.http.put<Project>(backendUrl + "/portfolio/project", formValue)
  }

  post(formValue: any): Observable<Project> {
    return this.http.post<Project>(backendUrl + "/portfolio/project", formValue)
  }

  delete(id?: number): Observable<void> {
    return this.http.delete<void>(backendUrl + "/portfolio/project/" + id)
  }
}
