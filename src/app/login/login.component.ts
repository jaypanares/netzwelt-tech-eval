import { Subject } from 'rxjs';

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../services/login/login.service';
import { SignInRequest, UserData } from '../services/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  loginError$ = this.loginService.loginError$;
  isAuthenticating$ = new Subject<boolean>();

  onSubmit() {
    this.isAuthenticating$.next(true);
    this.loginService
      .requestSignIn(this.loginForm.value as SignInRequest)
      .subscribe({
        next: (data) => {
          this.loginService.userData$.next(data as UserData);
          this.router.navigate(['home']);
          this.isAuthenticating$.next(false);
        },
        error: ({ error }) => {
          this.loginService.loginError$.next(error);
          this.isAuthenticating$.next(false);
        },
      });
  }
}
