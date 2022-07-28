import { Component } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private authService: AuthService
  ) { }

  currentUser = this.authService.currentUser

  logOut() {
    localStorage.clear()
    this.authService.currentUserSubject.next({})
  }
}
