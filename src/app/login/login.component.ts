import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';
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

  onSubmit() {
    this.loginService
      .requestSignIn(this.loginForm.value as SignInRequest)
      .subscribe({
        next: (data) => {
          this.loginService.userData$.next(data as UserData);
          this.router.navigate(['home']);
        },
        error: ({ error }) => this.loginService.loginError$.next(error),
      });
  }
}
