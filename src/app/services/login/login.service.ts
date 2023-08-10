import { BehaviorSubject } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SignInRequest, UserData } from '../models';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  userData$ = new BehaviorSubject<null | UserData>(null);
  loginError$ = new BehaviorSubject<null | { message: string }>(null);

  constructor(private http: HttpClient) {}

  requestSignIn(requestBody: SignInRequest) {
    this.loginError$.next(null);
    return this.http.post(`/api/Account/SignIn`, requestBody);
  }
}
