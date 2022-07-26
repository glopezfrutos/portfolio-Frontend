import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { loginAnswerType, loginFormType } from '../shared/types/loginType';
import { Router } from "@angular/router";
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable()
export class LoginComponent implements OnInit {
  messageClass = ""
  message = ""
  customerId: any;
  editData: any;
  responseData: any;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService) {
    localStorage.clear();
  }

  ngOnInit(): void {
  }


  submitLogin() {
    if (this.loginForm.valid) {
      this.authService
        .procedLogin(this.loginForm.value)
        .subscribe(result =>{
          if(result != null) {
            this.responseData = result;
            localStorage.setItem("access_token", this.responseData.access_token);
            localStorage.setItem("refresh_token", this.responseData.refresh_token);
          }}
        )
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
