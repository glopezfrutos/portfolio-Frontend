import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var currentUser = this.authService.currentUser;
    if (currentUser && currentUser.access_token) {
      if (req.method == ("PUT" || "POST")) {
        const putReq = req.clone({
          headers: req.headers
            .append('Authorization', `Bearer ${currentUser.access_token}`)
            .append('Content-Type', 'application/json')
        });
        return next.handle(putReq);
      }

      req = req.clone({
        headers: req.headers
          .append('Authorization', `Bearer ${currentUser.access_token}`)
      });
    }

    return next.handle(req).pipe(catchError(error => {
      if (error.status === 403) {
        return this.handle403Error(req, next);
      }
      return throwError(error);
    }))


  }

  // To refactor
  private handle403Error(req: HttpRequest<any>, next: HttpHandler) {
    var currentUser = this.authService.currentUser;
    req = req.clone({
      headers: req.headers
        .delete('Authorization', `Bearer ${currentUser.access_token}`)
        .append('Authorization', `Bearer ${currentUser.refresh_token}`)
    });
    this.authService.refreshToken().subscribe()
    return next.handle(req)
  }
}
