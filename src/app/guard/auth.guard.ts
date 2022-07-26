import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) { }

  canActivate() {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    return false;
  }
}
