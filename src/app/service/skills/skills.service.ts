import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { backendUrl } from 'src/app/shared/backendUrl';
import { Skills } from 'src/app/shared/types/Skills';


@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Skills[]> {
    return this.http.get<Skills[]>(backendUrl + "/portfolio/skill")
  }

  put(formValue: any): Observable<Skills> {
    return this.http.put<Skills>(backendUrl + "/portfolio/skill", formValue)
  }

  post(formValue: any): Observable<Skills> {
    return this.http.post<Skills>(backendUrl + "/portfolio/skill", formValue)
  }

  delete(id?: number): Observable<void> {
    return this.http.delete<void>(backendUrl + "/portfolio/skill/" + id)
  }
}
