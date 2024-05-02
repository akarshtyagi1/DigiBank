import { Component, OnInit } from '@angular/core';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from '../../../core/service/auth/auth.service';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
    standalone: true,
    imports: [
        NgIf,
        RouterLink,
        MatButtonModule,
        MatBadgeModule,
        FaIconComponent,
    ],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  faBell = faBell;
  isLoginPage: boolean = false;
  isLoggedIn = this.authService.isLoggedIn;

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login' || event.url === '/';
      }
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
