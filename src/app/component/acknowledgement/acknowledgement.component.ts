import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrl: './acknowledgement.component.scss'
})
export class AcknowledgementComponent {
  password!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Retrieve the password from local storage
    this.password = localStorage.getItem('password') ?? ''; 
  }

  proceedToLogin(): void {
    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
