import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(
    private injector: Injector
  ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authService = this.injector.get(AuthService)
    const token: string = authService.getToken();

    let request = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`
      }
    });

    return next.handle(request);
  }
}
