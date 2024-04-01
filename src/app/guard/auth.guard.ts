import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    // Check if the user is authenticated
    const userData = this.userService.Getuserdatafromstorage();
    if (!userData || !userData.role) {
      // If not authenticated or role is missing, redirect to login page
      console.log('back to login')
      this.router.navigate(['/login']);
      return false;
    }

    // Check if the user has the required role
    const requiredRole = next.data['role'];
    if (userData.role === requiredRole) {
      console.log('to dashboard')
      return true; // User has required role, allow access
    } else {
      // User does not have required role, redirect to unauthorized page or handle as needed
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }
}
