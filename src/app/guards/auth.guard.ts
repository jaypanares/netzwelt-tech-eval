import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { LoginService } from '../services/login/login.service';

export const authGuard: CanActivateFn = (route) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (route.routeConfig?.path === 'home') {
    return loginService.isLoggedIn() ? true : router.parseUrl('/login');
  } else {
    return loginService.isLoggedIn() ? router.parseUrl('/home') : true;
  }
};
