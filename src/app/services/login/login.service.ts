import { BehaviorSubject, Subject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { SignInRequest, UserData } from '../models';
import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userData$ = new BehaviorSubject<null | UserData>(null);
  loginError$ = new BehaviorSubject<null | { message: string }>(null);
  isAuthenticating$ = new Subject();

  constructor(
    private http: HttpClient,
    private router: Router,
    private sessionService: SessionService
  ) {}

  requestSignIn(requestBody: SignInRequest) {
    this.loginError$.next(null);
    this.http.post(`/api/Account/SignIn`, requestBody).subscribe({
      next: (data) => {
        const userData = data as UserData;
        this.userData$.next(userData);
        this.router.navigate(['home']);
        this.isAuthenticating$.next(false);
        this.sessionService.setSession(userData);
      },
      error: ({ error }) => {
        this.loginError$.next(error);
        this.isAuthenticating$.next(false);
      },
    });
  }

  logOut() {
    this.userData$.next(null);
    this.sessionService.clearSession();
  }

  isLoggedIn() {
    return this.userData$.value || this.sessionService.getSession();
  }
}
