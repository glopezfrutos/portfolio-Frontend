import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  get username() {
    return this.loginForm.get("username")
  }

  get password() {
    return this.loginForm.get("password")
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService) {
    localStorage.clear();
  }


  submitLogin() {
    if (this.loginForm.valid) {
      this.authService
        .logIn(this.loginForm.value)
        .subscribe()
    }
  }
}
