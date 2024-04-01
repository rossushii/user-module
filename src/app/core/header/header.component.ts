import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userName: string | undefined;
  constructor(private router: Router) {}
  ngOnInit(): void {
    const userDataString = localStorage.getItem('userdata');
    if (userDataString !== null) {
      const userData = JSON.parse(userDataString);
      this.userName = userData.firstName + ' ' + userData.lastName;
    } else {
      this.userName = 'Default User';
    }
  }


  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
