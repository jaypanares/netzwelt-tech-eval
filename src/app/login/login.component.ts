import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { LoginService } from '../services/login/login.service';
import { SignInRequest } from '../services/models';

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
