import { inject } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { Router, type CanActivateFn } from '@angular/router';
import { map } from 'rxjs';

export const guestGuardGuard: CanActivateFn = (route, state) => {
  
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    map(user => {
      if (user) {
        router.navigate(['/']); 
        return false; 
      } else {
        return true; 
      }
    })
  );
};
