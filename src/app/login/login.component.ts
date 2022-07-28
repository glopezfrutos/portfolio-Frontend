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
        .procedLogin(this.loginForm.value)
        .subscribe(result => console.log(result))
    }
  }
}


//   validationMessages = {
//     'username': {
//       'required': 'Username is required.',
//       'minlength': 'Username must be at least 2 characters long.',
//       'maxlength': 'Username cannot be more than 25 characters long.'
//     },
//     'password': {
//       'required': 'The password is required.',
//       'minlength': 'The password must be at least 8 characters long.'
//     }
//   };
