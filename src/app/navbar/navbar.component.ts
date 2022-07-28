import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isLoggedIn: Observable<boolean>;

  constructor(
    private authService: AuthService
  ) {
    this.isLoggedIn = authService.isLoggedIn();
  }

  logOut() {
    this.authService.logOut()
  }
}
