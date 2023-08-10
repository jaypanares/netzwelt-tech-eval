import { Injectable } from '@angular/core';

import { UserData } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  setSession(data: UserData) {
    sessionStorage.setItem('displayName', data.displayName);
  }

  getSession() {
    return sessionStorage.getItem('displayName');
  }

  clearSession() {
    sessionStorage.clear();
  }
}
