import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.afAuth.authState.pipe(
      map(user => !!user),
      take(1),
      map(loggedIn => {
        if (!loggedIn) {
          // Redirect to sign-in page if not logged in
          this.router.navigate(['/sign-in']);
          return false;
        }

        // Retrieve user details and store them securely
        // (replace with your user data retrieval logic)
        const userDetails = {
          name: 'John Doe',
          email: 'johndoe@example.com'
          // ...other user details
        };
        localStorage.setItem('userDetails', JSON.stringify(userDetails));

        return true;
      })
    );
  }
}
