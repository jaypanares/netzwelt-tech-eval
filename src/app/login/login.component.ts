import { Subject } from 'rxjs';

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../services/login/login.service';
import { SignInRequest, UserData } from '../services/models';
import { SessionService } from '../services/session/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  loginError$ = this.loginService.loginError$;
  isAuthenticating$ = this.loginService.isAuthenticating$;

  onSubmit() {
    this.isAuthenticating$.next(true);
    this.loginService.requestSignIn(this.loginForm.value as SignInRequest);
  }
}
