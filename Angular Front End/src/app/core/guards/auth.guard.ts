import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const isLogin = userService.isAuthenticated();
  const isAdmin = userService.isAdmin();
  const uri = route.url?.[0]?.path;

  if (!isLogin) {
    router.navigate(['/login']);
  }

  if (uri === 'products' && !isAdmin) {
    router.navigate(['/']);
  }

  return isLogin;
};
