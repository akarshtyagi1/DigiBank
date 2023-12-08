import { Component, OnInit } from '@angular/core';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from '../../../core/service/auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  faBell = faBell;
  isLoginPage: boolean = false;
  isLoggedIn = this.authService.isLoggedIn;

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login';
      }
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.authService.logout();
  }
}
