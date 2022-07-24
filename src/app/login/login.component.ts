import {Component} from '@angular/core';
import {Validators} from '@angular/forms';
import {FormBuilder} from '@angular/forms';
import {Injectable} from '@angular/core';
import {loginFormType} from '../shared/types/loginType';
import {LoginService} from '../service/login/login.service';
import {Router} from "@angular/router";

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

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router) {
      localStorage.clear();
  }


  submitLogin() {
    if(this.loginForm.valid) {

    }


    let user: loginFormType = {
      username: this.loginForm.value.username ? this.loginForm.value.username : "",
      password: this.loginForm.value.password ? this.loginForm.value.password : ""
    }

    this.loginService
      .postLogin(user)
      .subscribe(data => {
        console.log("DATA:" + JSON.stringify(data));
      });
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
