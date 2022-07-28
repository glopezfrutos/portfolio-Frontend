import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
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
      if (req.method == "PUT") {
        const putReq = req.clone({
          headers: req.headers
            .append('Authorization', `Bearer ${currentUser.access_token}`)
            .append('Content-Type', 'application/json')
        });
        console.log(putReq);
        return next.handle(putReq);
      }

      req = req.clone({
        headers: req.headers
          .append('Authorization', `Bearer ${currentUser.access_token}`)
      });
    }

    
    return next.handle(req);
  }
}
